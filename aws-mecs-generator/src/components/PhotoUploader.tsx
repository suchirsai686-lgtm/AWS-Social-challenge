'use client';

import { useState, useRef, useEffect, ChangeEvent, DragEvent } from 'react';
import { maxFileSize, allowedMimeTypes } from '@/config/template';

interface PhotoUploaderProps {
  onPhotoChange: (file: File | null, preview: string | null) => void;
  onPositionChange?: (position: { x: number; y: number; scale: number }) => void;
  initialPhoto?: string | null;
  initialPosition?: { x: number; y: number; scale: number };
  error?: string;
  disabled?: boolean;
}

export default function PhotoUploader({
  onPhotoChange,
  onPositionChange,
  initialPhoto,
  initialPosition = { x: 0, y: 0, scale: 1 },
  error,
  disabled = false,
}: PhotoUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialPhoto || null);
  const [showCropper, setShowCropper] = useState(false);
  const [cropPosition, setCropPosition] = useState(initialPosition);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropperCanvasRef = useRef<HTMLCanvasElement>(null);
  const cropperImageRef = useRef<HTMLImageElement>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (initialPhoto) {
      setPreview(initialPhoto);
    }
  }, [initialPhoto]);

  const validateFile = (file: File): boolean => {
    if (!allowedMimeTypes.includes(file.type)) {
      return false;
    }
    if (file.size > maxFileSize) {
      return false;
    }
    return true;
  };

  const handleFile = (file: File) => {
    if (!validateFile(file)) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        setPreview(dataUrl);
        setCropPosition({ x: 0, y: 0, scale: 1 });
        setShowCropper(true);
        onPhotoChange(file, dataUrl);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (!disabled) setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const removePhoto = () => {
    setPreview(null);
    setOriginalImage(null);
    setShowCropper(false);
    setCropPosition({ x: 0, y: 0, scale: 1 });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onPhotoChange(null, null);
    onPositionChange?.({ x: 0, y: 0, scale: 1 });
  };

  const handleCropperMouseDown = (e: React.MouseEvent) => {
    if (!cropperCanvasRef.current || !originalImage) return;
    
    const canvas = cropperCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    const startCropX = cropPosition.x;
    const startCropY = cropPosition.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = (moveEvent.clientX - rect.left - startX) / cropPosition.scale;
      const dy = (moveEvent.clientY - rect.top - startY) / cropPosition.scale;
      const newX = Math.max(-originalImage.width * cropPosition.scale + canvas.width, 
        Math.min(0, startCropX + dx));
      const newY = Math.max(-originalImage.height * cropPosition.scale + canvas.height, 
        Math.min(0, startCropY + dy));
      setCropPosition(prev => ({ ...prev, x: newX, y: newY }));
      onPositionChange?.({ ...cropPosition, x: newX, y: newY });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.max(0.5, Math.min(3, cropPosition.scale - e.deltaY * 0.001));
    setCropPosition(prev => ({ ...prev, scale: newScale }));
    onPositionChange?.({ ...cropPosition, scale: newScale });
  };

  const renderCropper = () => {
    if (!cropperCanvasRef.current || !originalImage) return;
    
    const canvas = cropperCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const displayWidth = Math.min(originalImage.width, 400);
    const displayHeight = (originalImage.height / originalImage.width) * displayWidth;
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(
      originalImage,
      cropPosition.x,
      cropPosition.y,
      displayWidth / cropPosition.scale,
      displayHeight / cropPosition.scale,
      0,
      0,
      displayWidth,
      displayHeight
    );
  };

  useEffect(() => {
    renderCropper();
  }, [cropPosition, originalImage]);

  const getAcceptString = () => allowedMimeTypes.join(',');

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-aws-blue mb-2" htmlFor="photo-upload">
        Profile Photo
      </label>

      {!showCropper ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
            dragActive ? 'border-aws-orange bg-aws-orange/5' : 'border-aws-gray hover:border-aws-orange/50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && fileInputRef.current?.click()}
          role="button"
          tabIndex={disabled ? undefined : 0}
          onKeyDown={(e) => { if (!disabled && (e.key === 'Enter' || e.key === ' ')) fileInputRef.current?.click(); }}
        >
          <input
            ref={fileInputRef}
            id="photo-upload"
            type="file"
            accept={getAcceptString()}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={disabled}
            aria-label="Upload profile photo"
          />
          
          {preview ? (
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Profile preview"
                className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover shadow-card mx-auto mb-4"
              />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removePhoto(); }}
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-aws-gray-dark hover:text-aws-orange hover:bg-white shadow-soft flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-aws-orange"
                aria-label="Remove photo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <svg className="mx-auto w-12 h-12 text-aws-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-aws-gray-dark">Drag & drop your photo here, or click to browse</p>
              <p className="text-sm text-aws-gray">JPG, PNG, or WebP • Max 10MB</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-aws-gray-dark text-center">Adjust your photo position and zoom</p>
          <div className="relative">
            <canvas
              ref={cropperCanvasRef}
              className="w-full max-w-xs mx-auto rounded-xl border border-aws-gray shadow-soft cursor-move"
              onMouseDown={handleCropperMouseDown}
              onWheel={handleWheel}
              tabIndex={0}
              aria-label="Photo cropper - drag to reposition, scroll to zoom"
            />
          </div>
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={() => {
                setShowCropper(false);
                if (cropperCanvasRef.current && originalImage) {
                  const canvas = cropperCanvasRef.current;
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = canvas.width;
                    tempCanvas.height = canvas.height;
                    const tempCtx = tempCanvas.getContext('2d')!;
                    tempCtx.drawImage(canvas, 0, 0);
                    const finalDataUrl = tempCanvas.toDataURL('image/png');
                    setPreview(finalDataUrl);
                    onPhotoChange(
                      new File([dataURLtoBlob(finalDataUrl)!], 'photo.png', { type: 'image/png' }),
                      finalDataUrl
                    );
                  }
                }
              }}
              className="px-6 py-2 bg-aws-orange text-white rounded-lg font-medium hover:bg-aws-orange-dark transition-colors focus:outline-none focus:ring-2 focus:ring-aws-orange focus:ring-offset-2"
            >
              Done
            </button>
            <button
              type="button"
              onClick={() => {
                setShowCropper(false);
                setCropPosition({ x: 0, y: 0, scale: 1 });
              }}
              className="px-6 py-2 border-2 border-aws-gray text-aws-gray-dark rounded-lg font-medium hover:border-aws-orange hover:text-aws-orange transition-colors focus:outline-none focus:ring-2 focus:ring-aws-orange focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>
      )}

      {preview && !showCropper && (
        <button
          type="button"
          onClick={removePhoto}
          className="mt-3 text-sm text-aws-orange hover:text-aws-orange-dark font-medium flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Change photo
        </button>
      )}
    </div>
  );
}

function dataURLtoBlob(dataurl: string): Blob | null {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  if (!mime) return null;
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}