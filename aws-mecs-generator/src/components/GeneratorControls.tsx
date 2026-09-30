'use client';

import { useState } from 'react';
import { downloadPoster } from '@/lib/imageComposer';
import { copyToClipboard, openLinkedInShare, openLinkedInPostWindow } from '@/lib/linkedin';
import { GeneratedPoster } from '@/types/template';

interface GeneratorControlsProps {
  poster: GeneratedPoster | null;
  caption: string;
  onCaptionChange: (caption: string) => void;
  loading?: boolean;
  userName: string;
}

export default function GeneratorControls({ 
  poster, 
  caption, 
  onCaptionChange, 
  loading = false,
  userName 
}: GeneratorControlsProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    if (!poster) return;
    try {
      await downloadPoster(poster);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const handleCopyCaption = async () => {
    try {
      await copyToClipboard(caption);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleOpenLinkedIn = () => {
    openLinkedInPostWindow(caption);
  };

  const handleShareLinkedIn = () => {
    openLinkedInShare();
  };

  if (!poster) {
    return (
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          type="button"
          disabled
          className="flex-1 px-6 py-3.5 bg-aws-gray text-aws-gray-dark rounded-xl font-semibold text-lg cursor-not-allowed"
        >
          Download Image
        </button>
        <button
          type="button"
          disabled
          className="flex-1 px-6 py-3.5 border-2 border-aws-gray text-aws-gray-dark rounded-xl font-semibold text-lg cursor-not-allowed"
        >
          Copy Caption
        </button>
        <button
          type="button"
          disabled
          className="flex-1 px-6 py-3.5 border-2 border-aws-gray text-aws-gray-dark rounded-xl font-semibold text-lg cursor-not-allowed"
        >
          Open LinkedIn
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          type="button"
          onClick={handleDownload}
          disabled={loading}
          className="flex-1 px-6 py-3.5 bg-aws-orange text-white rounded-xl font-semibold text-lg hover:bg-aws-orange-dark transition-colors focus:outline-none focus:ring-2 focus:ring-aws-orange focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {downloadSuccess ? 'Downloaded!' : 'Download Image'}
        </button>
        <button
          type="button"
          onClick={handleCopyCaption}
          disabled={loading}
          className="flex-1 px-6 py-3.5 border-2 border-aws-blue text-aws-blue rounded-xl font-semibold text-lg hover:bg-aws-blue hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-aws-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          {copySuccess ? 'Copied!' : 'Copy Caption'}
        </button>
        <button
          type="button"
          onClick={handleOpenLinkedIn}
          disabled={loading}
          className="flex-1 px-6 py-3.5 border-2 border-aws-teal text-aws-teal rounded-xl font-semibold text-lg hover:bg-aws-teal hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-aws-teal focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Open LinkedIn
        </button>
      </div>

      <div className="pt-4 border-t border-aws-gray">
        <button
          type="button"
          onClick={handleShareLinkedIn}
          className="w-full px-6 py-3 bg-white border-2 border-aws-gray text-aws-gray-dark rounded-xl font-semibold text-lg hover:border-aws-orange hover:text-aws-orange transition-colors focus:outline-none focus:ring-2 focus:ring-aws-orange focus:ring-offset-2 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Share on LinkedIn (opens in new tab)
        </button>
      </div>

      <div className="pt-4">
        <label className="block text-sm font-medium text-aws-blue mb-2">
          LinkedIn Caption (editable)
        </label>
        <textarea
          value={caption}
          onChange={(e) => onCaptionChange(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 rounded-xl border-2 border-aws-gray focus:border-aws-orange focus:ring-2 focus:ring-aws-orange/20 focus:outline-none text-aws-blue bg-white font-sans text-base resize-y min-h-[120px]"
          placeholder="Your LinkedIn caption will appear here..."
        />
        <p className="mt-2 text-sm text-aws-gray">
          Edit the caption above, then copy it and paste into your LinkedIn post along with the downloaded image.
        </p>
      </div>
    </div>
  );
}