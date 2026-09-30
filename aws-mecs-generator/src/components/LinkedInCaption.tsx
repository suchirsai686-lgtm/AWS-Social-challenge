'use client';

import { useState, useEffect } from 'react';
import { generateLinkedInCaption } from '@/lib/linkedin';

interface LinkedInCaptionProps {
  name: string;
  onCaptionChange: (caption: string) => void;
  initialCaption?: string;
}

export default function LinkedInCaption({ name, onCaptionChange, initialCaption }: LinkedInCaptionProps) {
  const [caption, setCaption] = useState(initialCaption || '');
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    if (!edited && name.trim()) {
      const newCaption = generateLinkedInCaption(name);
      setCaption(newCaption);
      onCaptionChange(newCaption);
    }
  }, [name, edited, onCaptionChange]);

  const handleChange = (newCaption: string) => {
    setCaption(newCaption);
    setEdited(true);
    onCaptionChange(newCaption);
  };

  const handleReset = () => {
    const newCaption = generateLinkedInCaption(name);
    setCaption(newCaption);
    setEdited(false);
    onCaptionChange(newCaption);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-aws-blue">LinkedIn Caption</label>
        {edited && name.trim() && (
          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-aws-orange hover:text-aws-orange-dark font-medium"
          >
            Reset to default
          </button>
        )}
      </div>
      <textarea
        value={caption}
        onChange={(e) => handleChange(e.target.value)}
        rows={7}
        className="w-full px-4 py-3 rounded-xl border-2 border-aws-gray focus:border-aws-orange focus:ring-2 focus:ring-aws-orange/20 focus:outline-none text-aws-blue bg-white font-sans text-base resize-y min-h-[140px]"
        placeholder="Your LinkedIn caption will appear here after you enter your name..."
        aria-label="LinkedIn caption - edit before copying"
      />
      <p className="text-sm text-aws-gray">
        Edit the caption above, then use the <strong>Copy Caption</strong> button below.
      </p>
    </div>
  );
}