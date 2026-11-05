import React, { useEffect, useRef, useState } from 'react';
import { Camera, ImageIcon, Trash2, Upload } from 'lucide-react';
import { formatBytes, validateImageFile } from '../../utils/image';

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
 * Optional photo upload with live preview. Uses a plain file input with
 * `accept="image/*"` so mobile offers both gallery and camera capture.
 * The object URL is revoked on replace and unmount to avoid leaks.
 */
export function PhotoUploadField({ file, onChange, onError, error }: PhotoUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

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

  const handleFiles = (files: FileList | null) => {
    const next = files?.[0];
    if (!next) return;

    const check = validateImageFile(next);
    if (!check.valid) {
      onError?.(check.message || 'Invalid image file.');
      return;
    }
    onError?.(null);
    onChange(next);
  };

  const clear = () => {
    onError?.(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <span className="block font-sora text-[13px] font-[600] text-[#111111] mb-1.5">
        Photo <span className="text-[#888888] font-[400] font-inter text-[12px]">(optional)</span>
      </span>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        id="enquiry-photo-input"
        onChange={(e) => handleFiles(e.target.files)}
      />

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
          className={`flex flex-col sm:flex-row items-center gap-4 px-5 py-5 rounded-2xl border border-dashed transition-colors ${
            dragActive
              ? 'border-[#F15A29] bg-[#F15A29]/5'
              : error
                ? 'border-[#DC2626]/50 bg-white'
                : 'border-[#E4DAD2] bg-[#FAF8F5]/40'
          }`}
        >
          <span className="shrink-0 w-12 h-12 rounded-full bg-[#F15A29]/10 text-[#F15A29] flex items-center justify-center">
            <Camera size={20} />
          </span>

          <div className="flex-1 text-center sm:text-left">
            <p className="font-inter text-[13.5px] text-[#555555]">
              Upload your photo — JPG, PNG or WebP, up to 2MB.
            </p>
            <p className="font-inter text-[11.5px] text-[#888888] mt-0.5">
              Take a selfie with your camera or pick one from your gallery.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111111] hover:bg-[#F15A29] text-white font-sora font-[600] text-[13px] transition-colors cursor-pointer"
            >
              <Upload size={14} /> Choose Photo
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 px-4 py-4 rounded-2xl border border-[#F4EBE6] bg-white">
          <img
            src={previewUrl}
            alt="Selected photo preview"
            className="w-16 h-16 rounded-xl object-cover border border-[#F4EBE6]"
          />
          <div className="flex-1 min-w-0">
            <p className="font-inter text-[13.5px] text-[#111111] truncate">
              {file?.name || 'photo'}
            </p>
            <p className="font-inter text-[11.5px] text-[#888888] flex items-center gap-1 mt-0.5">
              <ImageIcon size={12} /> {file ? formatBytes(file.size) : ''}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3.5 py-2 rounded-full border border-[#EFEFEF] text-[13px] font-sora font-[600] text-[#555555] hover:border-[#F15A29] hover:text-[#F15A29] transition-colors cursor-pointer"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={clear}
              aria-label="Remove photo"
              className="p-2 rounded-full border border-[#EFEFEF] text-[#888888] hover:border-[#DC2626] hover:text-[#DC2626] transition-colors cursor-pointer"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      )}

      {error ? (
        <p role="alert" className="font-inter text-[11.5px] text-[#DC2626] mt-1.5">
          {error}
        </p>
      ) : null}
    </div>
  );
}
