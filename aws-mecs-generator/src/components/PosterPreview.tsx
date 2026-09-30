'use client';

import { useEffect, useRef, useState } from 'react';
import { composePoster } from '@/lib/imageComposer';
import { UserData, TemplateConfig, GeneratedPoster } from '@/types/template';
import { templateConfig } from '@/config/template';

interface PosterPreviewProps {
  userData: UserData;
  config?: TemplateConfig;
  onGenerated?: (poster: GeneratedPoster) => void;
  className?: string;
}

export default function PosterPreview({ 
  userData, 
  config = templateConfig, 
  onGenerated,
  className = '' 
}: PosterPreviewProps) {
  const [poster, setPoster] = useState<GeneratedPoster | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!userData.name.trim() && !userData.photoPreview) {
      setPoster(null);
      setError(null);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const generated = await composePoster(userData, config);
        setPoster(generated);
        onGenerated?.(generated);
      } catch (err) {
        console.error('Failed to generate preview:', err);
        setError('Failed to generate preview. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [userData.name, userData.photoPreview, config]);

  const aspectRatio = config.height / config.width;

  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-2xl overflow-hidden shadow-elevated bg-aws-blue" style={{ aspectRatio: `${1 / aspectRatio}` }}>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-aws-blue/50">
            <div className="flex flex-col items-center gap-3 text-white">
              <div className="w-10 h-10 border-4 border-aws-orange border-t-transparent rounded-full animate-spin" />
              <p className="text-lg font-medium">Generating preview...</p>
            </div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-aws-blue/50 p-4 text-center">
            <div className="text-white">
              <svg className="mx-auto w-12 h-12 text-aws-orange mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-lg font-medium mb-1">Unable to generate preview</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          </div>
        ) : poster ? (
          <img
            ref={previewImgRef}
            src={poster.dataUrl}
            alt="Personalized AWS MECS LinkedIn post preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-aws-blue p-8 text-center">
            <div className="text-white">
              <svg className="mx-auto w-16 h-16 text-aws-orange/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium mb-1">Your personalized post will appear here</p>
              <p className="text-sm opacity-70">Enter your name and upload a photo to get started</p>
            </div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}