'use client';

import { useState, ChangeEvent, FocusEvent } from 'react';

interface NameInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  maxLength?: number;
}

export default function NameInput({ 
  value, 
  onChange, 
  onBlur, 
  error, 
  disabled = false, 
  maxLength = 100 
}: NameInputProps) {
  const [focused, setFocused] = useState(false);
  const [showCount, setShowCount] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, maxLength);
    onChange(newValue);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    setShowCount(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    setTimeout(() => setShowCount(false), 1000);
    onBlur?.();
  };

  const trimmedValue = value.trim();
  const charCount = trimmedValue.length;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-aws-blue mb-2" htmlFor="name-input">
        Full Name
      </label>
      <div className="relative">
        <input
          id="name-input"
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          maxLength={maxLength}
          placeholder="Enter your full name"
          className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all text-lg ${
            error 
              ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
              : focused 
                ? 'border-aws-orange bg-white focus:ring-aws-orange/20' 
                : 'border-aws-gray hover:border-aws-orange/50 bg-white'
          } focus:outline-none focus:ring-2 focus:ring-offset-0 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'name-error' : charCount > 0 ? 'name-count' : undefined}
          autoComplete="name"
        />
        {(focused || charCount > 0) && (
          <div 
            id="name-count" 
            className={`absolute right-4 bottom-2 text-xs transition-opacity ${
              showCount ? 'opacity-100' : 'opacity-0'
            } ${error ? 'text-red-500' : 'text-aws-gray'}`}
            aria-live="polite"
          >
            {charCount}/{maxLength}
          </div>
        )}
      </div>
      {error && (
        <p id="name-error" className="mt-2 text-sm text-red-600" role="alert">{error}</p>
      )}
      {!error && charCount > 0 && (
        <p className="mt-2 text-sm text-aws-gray">This name will appear on your personalized event graphic</p>
      )}
    </div>
  );
}