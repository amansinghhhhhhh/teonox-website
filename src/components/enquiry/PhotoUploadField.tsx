import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, ImageIcon, RefreshCcw, Trash2, Upload, X } from 'lucide-react';
import {
  captureSelfie,
  formatBytes,
  isCameraSupported,
  startCamera,
  stopCamera,
  validateImageFile,
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
} from '../../utils/image';

interface PhotoUploadFieldProps {
  /** Current File (already compressed by the parent before setField). */
  file: File | null;
  /** Receives a validated File, or null when the user removes the photo. */
  onChange: (file: File | null) => void;
  /** Receives a validation error string, or null when clear/valid. */
  onError?: (message: string | null) => void;
  error?: string;
}

/**
 * Compulsory photo capture with two paths:
 *
 *  1. **Live selfie** — `getUserMedia` opens the front camera in an inline
 *     preview (permission prompt is the browser's own), and the frame is
 *     grabbed to a JPEG on capture.
 *  2. **Gallery/file fallback** — a plain `accept="image/*"` input, which
 *     also covers devices without a usable camera.
 *
 * The live stream is stopped on capture, on cancel and on unmount so the
 * camera light never stays on. The object URL is revoked on replace and
 * unmount to avoid leaks.
 */
export function PhotoUploadField({ file, onChange, onError, error }: PhotoUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraBusy, setCameraBusy] = useState(false);
  const [cameraError, setCameraError] = useState('');

  const cameraAvailable = isCameraSupported();

  // Build/revoke the preview URL whenever the file changes.
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Never leave the camera running after the field unmounts.
  useEffect(
    () => () => {
      stopCamera(streamRef.current);
      streamRef.current = null;
    },
    [],
  );

  // Attach the stream once the <video> element is on screen.
  useEffect(() => {
    if (!cameraOpen) return;
    const video = videoRef.current;
    const stream = streamRef.current;
    if (!video || !stream) return;

    video.srcObject = stream;
    const played = video.play();
    if (played && typeof played.catch === 'function') played.catch(() => undefined);
  }, [cameraOpen]);

  const closeCamera = useCallback(() => {
    stopCamera(streamRef.current);
    streamRef.current = null;
    setCameraOpen(false);
    setCameraBusy(false);
    setCameraError('');
  }, []);

  const openCamera = async () => {
    if (cameraBusy) return;
    setCameraError('');
    setCameraBusy(true);
    try {
      streamRef.current = await startCamera();
      setCameraOpen(true);
    } catch (err) {
      setCameraError(err instanceof Error ? err.message : 'Could not open the camera.');
    } finally {
      setCameraBusy(false);
    }
  };

  const acceptFile = (next: File | undefined | null) => {
    if (!next) return;
    const check = validateImageFile(next);
    if (!check.valid) {
      onError?.(check.message || 'Invalid image file.');
      return;
    }
    onError?.(null);
    onChange(next);
  };

  const handleFiles = (files: FileList | null) => acceptFile(files?.[0]);

  const handleCapture = async () => {
    if (cameraBusy) return;
    const video = videoRef.current;
    if (!video) return;

    setCameraError('');
    setCameraBusy(true);
    try {
      const captured = await captureSelfie(video);
      const check = validateImageFile(captured);
      if (!check.valid) {
        setCameraError(check.message || 'Invalid image file.');
        return;
      }
      onError?.(null);
      onChange(captured);
      closeCamera();
    } catch (err) {
      setCameraError(err instanceof Error ? err.message : 'Could not capture the photo.');
    } finally {
      setCameraBusy(false);
    }
  };

  const clear = () => {
    onError?.(null);
    onChange(null);
    closeCamera();
    if (inputRef.current) inputRef.current.value = '';
  };

  const openGallery = () => {
    closeCamera();
    inputRef.current?.click();
  };

  const label = (
    <span className="block font-sora text-[13px] font-[600] text-[#111111] mb-1.5">
      Photo <span className="text-[#F15A29] ml-0.5">*</span>
      <span className="ml-2 font-inter text-[11.5px] font-[400] text-[#888888]">
        Live selfie or upload
      </span>
    </span>
  );

  const errorLine = cameraError || error ? (
    <p role="alert" className="font-inter text-sm text-[#DC2626] mt-2 flex items-center gap-2">
      {cameraError || error}
      {file && file.size > MAX_IMAGE_BYTES && (
        <span className="text-xs text-[#F15A29] ml-1">— file too large (max 2MB)</span>
      )}
      {file && !ALLOWED_IMAGE_TYPES.includes(file.type) && (
        <span className="text-xs text-[#F15A29] ml-1">— supported: JPG/PNG/WebP</span>
      )}
    </p>
  ) : null;

  const hiddenInput = (
    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      className="sr-only"
      id="enquiry-photo-input"
      onChange={(e) => handleFiles(e.target.files)}
    />
  );

  // ── Live camera panel ────────────────────────────────────────────────
  if (cameraOpen) {
    return (
      <div>
        {label}
        {hiddenInput}

        <div className="overflow-hidden rounded-2xl border border-[#EFE9E3] bg-[#0E0E10] shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
          <div className="relative aspect-[4/3] sm:aspect-[16/10]">
            <video
              ref={videoRef}
              playsInline
              muted
              autoPlay
              className="absolute inset-0 h-full w-full object-cover -scale-x-100"
            />
            {/* Face guide ring */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[74%] aspect-square rounded-full border-2 border-white/45 shadow-[0_0_0_9999px_rgba(0,0,0,0.28)]" />
            </div>
            <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D4D]" /> Live
            </span>
          </div>

          <div className="flex items-center gap-2.5 bg-white px-4 py-3.5">
            <button
              type="button"
              onClick={handleCapture}
              disabled={cameraBusy}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F15A29] px-4 py-2.5 font-sora text-[13.5px] font-[700] text-white transition-colors hover:bg-[#D8420F] cursor-pointer disabled:opacity-70"
            >
              <Camera size={15} />
              {cameraBusy ? 'Capturing…' : 'Capture Selfie'}
            </button>
            <button
              type="button"
              onClick={closeCamera}
              disabled={cameraBusy}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#E7E2DC] bg-white px-4 py-2.5 font-sora text-[13.5px] font-[600] text-[#555555] transition-colors hover:border-[#D6CFC8] hover:text-[#111111] cursor-pointer disabled:opacity-70"
            >
              <X size={15} /> Cancel
            </button>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="font-inter text-[11.5px] text-[#888888]">
            Look straight at the camera and keep your face inside the circle.
          </p>
          <button
            type="button"
            onClick={openGallery}
            className="shrink-0 font-sora text-[12px] font-[600] text-[#0066FF] hover:underline cursor-pointer"
          >
            Upload instead
          </button>
        </div>

        {errorLine}
      </div>
    );
  }

  return (
    <div>
      {label}
      {hiddenInput}

      {!previewUrl ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`rounded-2xl border border-dashed px-5 py-6 transition-colors ${
            dragActive
              ? 'border-[#F15A29] bg-[#F15A29]/5'
              : error
                ? 'border-[#DC2626]/50 bg-white'
                : 'border-[#E4DAD2] bg-white'
          }`}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF1EB] text-[#F15A29]">
              <Camera size={19} />
            </span>

            <div>
              <p className="font-sora text-[14px] font-[600] text-[#111111]">
                Capture a live selfie
              </p>
              <p className="mt-1 font-inter text-[12.5px] leading-relaxed text-[#888888]">
                Use your camera, or upload a JPG, PNG or WebP up to 2MB.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {cameraAvailable ? (
                <button
                  type="button"
                  onClick={openCamera}
                  disabled={cameraBusy}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#111111] px-4 py-2.5 font-sora text-[13px] font-[600] text-white transition-colors hover:bg-[#F15A29] cursor-pointer disabled:opacity-70"
                >
                  <Camera size={14} />
                  {cameraBusy ? 'Opening…' : 'Start Camera'}
                </button>
              ) : null}

              <button
                type="button"
                onClick={openGallery}
                className="inline-flex items-center gap-2 rounded-xl border border-[#E7E2DC] bg-white px-4 py-2.5 font-sora text-[13px] font-[600] text-[#555555] transition-colors hover:border-[#F15A29] hover:text-[#F15A29] cursor-pointer"
              >
                <Upload size={14} /> Upload Photo
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 rounded-2xl border border-[#EFE9E3] bg-white px-4 py-4 shadow-[0_1px_3px_rgba(16,24,40,0.04)]">
          <img
            src={previewUrl}
            alt="Your photo"
            className="h-16 w-16 rounded-xl border border-[#EFE9E3] object-cover flex-shrink-0"
          />
          <div className="min-w-0 flex-1 flex flex-col gap-1.5 max-w-xs">
            <p className="truncate w-full max-w-[200px] sm:max-w-xs block font-inter text-[13.5px] text-[#111111]">
              {file?.name || 'photo.jpg'}
            </p>
            <p className="font-inter text-[11px] text-[#888888]">
              {file ? formatBytes(file.size) : ''}
            </p>
          </div>
          <div className="flex shrink-0 flex-col sm:flex-row items-center gap-2">
            {cameraAvailable ? (
              <button
                type="button"
                onClick={openCamera}
                aria-label="Retake with camera"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-[#E7E2DC] bg-white px-3 py-2 font-sora text-[12px] font-[600] text-[#555555] transition-colors hover:border-[#F15A29] hover:text-[#F15A29] cursor-pointer"
              >
                <RefreshCcw size={13} /> Retake
              </button>
            ) : null}
            <button
              type="button"
              onClick={openGallery}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-[#E7E2DC] bg-white px-3 py-2 font-sora text-[12px] font-[600] text-[#555555] transition-colors hover:border-[#F15A29] hover:text-[#F15A29] cursor-pointer"
            >
              <Upload size={13} /> Replace
            </button>
            <button
              type="button"
              onClick={clear}
              aria-label="Remove photo"
              className="shrink-0 rounded-xl bg-[#F15A29] px-3 py-1.5 font-sora text-[12px] font-[600] text-white transition-colors hover:bg-[#D8420F] cursor-pointer"
            >
              <Trash2 size={14} /> Remove
            </button>
          </div>
        </div>
      )}

      {errorLine}
    </div>
  );
}
