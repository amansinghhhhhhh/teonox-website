// Image validation + client-side compression for lead-form photo uploads.
//
// The webhook payload is base64-encoded (33% larger than the raw file), so we
// compress BEFORE handing the file to submitForm() to keep the POST body well
// inside Apps Script's practical request limits.

export interface ImageValidationResult {
  valid: boolean;
  message?: string;
}

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/** Hard cap accepted from the file picker (matches the product spec: 2MB). */
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

/** Compression target — keeps base64 output around 1.3MB. */
const TARGET_BYTES = 1024 * 1024;

/** Longest edge after downscaling. */
const MAX_EDGE = 1600;

const START_QUALITY = 0.82;
const MIN_QUALITY = 0.4;
const QUALITY_STEP = 0.12;

/**
 * Rejects non-images and anything over 2MB. Deliberately separate from
 * utils/validation.ts validateFile(), which is PDF/DOC-only and is relied on
 * by the resume/brochure flows — widening it would break those.
 */
export const validateImageFile = (file: File | null | undefined): ImageValidationResult => {
  if (!file) return { valid: true };

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, message: 'Only JPEG, PNG and WebP images are allowed.' };
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return { valid: false, message: 'Maximum image size is 2MB.' };
  }

  return { valid: true };
};

const loadImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read the selected image.'));
    };
    img.src = url;
  });

const scaleToMaxEdge = (w: number, h: number): { width: number; height: number } => {
  const longest = Math.max(w, h);
  if (longest <= MAX_EDGE) return { width: w, height: h };
  const ratio = MAX_EDGE / longest;
  return { width: Math.round(w * ratio), height: Math.round(h * ratio) };
};

const canvasToJpeg = (canvas: HTMLImageCanvas, quality: number): Promise<Blob | null> =>
  new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));

type HTMLImageCanvas = HTMLCanvasElement;

/**
 * Re-encodes the image as JPEG at <=1MB (shrinking quality until it fits),
 * downscaling any edge longer than 1600px first. Returns the input untouched
 * when it is already a small JPEG, so nothing lossy happens needlessly.
 *
 * White is composited underneath first — PNG transparency would otherwise
 * become black when flattened to JPEG.
 */
export const compressImage = async (
  file: File,
  targetBytes: number = TARGET_BYTES,
): Promise<File> => {
  if (file.size <= targetBytes && file.type === 'image/jpeg') return file;

  let img: HTMLImageElement;
  try {
    img = await loadImage(file);
  } catch {
    return file;
  }

  const { width, height } = scaleToMaxEdge(img.naturalWidth, img.naturalHeight);
  if (!width || !height) return file;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return file;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  let quality = START_QUALITY;
  let blob = await canvasToJpeg(canvas, quality);

  while (blob && blob.size > targetBytes && quality > MIN_QUALITY) {
    quality = Math.max(MIN_QUALITY, quality - QUALITY_STEP);
    blob = await canvasToJpeg(canvas, quality);
  }

  if (!blob) return file;

  const baseName = file.name.replace(/\.[^.]+$/, '') || 'photo';
  return new File([blob], `${baseName}.jpg`, {
    type: 'image/jpeg',
    lastModified: Date.now(),
  });
};

/** Human-readable size for the upload preview. */
export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
