'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import { UserData, GeneratedPoster, ValidationError } from '@/types/template';
import { validateUserData, generateFileName } from '@/lib/validation';
import { generateLinkedInCaption } from '@/lib/linkedin';
import { templateConfig } from '@/config/template';
import PhotoUploader from '@/components/PhotoUploader';
import NameInput from '@/components/NameInput';
import PosterPreview from '@/components/PosterPreview';
import GeneratorControls from '@/components/GeneratorControls';

export default function GeneratorPage() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    photo: null,
    photoPreview: null,
    photoPosition: { x: 0, y: 0, scale: 1 },
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [poster, setPoster] = useState<GeneratedPoster | null>(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = useCallback(() => {
    const result = validateUserData(userData);
    setErrors(result.errors);
    return result.isValid;
  }, [userData]);

  const handleNameChange = (name: string) => {
    setUserData(prev => ({ ...prev, name }));
    if (errors.some(e => e.field === 'name')) {
      setErrors(prev => prev.filter(e => e.field !== 'name'));
    }
  };

  const handlePhotoChange = (file: File | null, preview: string | null) => {
    setUserData(prev => ({ ...prev, photo: file, photoPreview: preview }));
    if (errors.some(e => e.field === 'photo')) {
      setErrors(prev => prev.filter(e => e.field !== 'photo'));
    }
  };

  const handlePositionChange = (position: { x: number; y: number; scale: number }) => {
    setUserData(prev => ({ ...prev, photoPosition: position }));
  };

  const handleCaptionChange = (newCaption: string) => {
    setCaption(newCaption);
  };

  const handleGenerate = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setSubmitted(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleReset = () => {
    setUserData({
      name: '',
      photo: null,
      photoPreview: null,
      photoPosition: { x: 0, y: 0, scale: 1 },
    });
    setErrors([]);
    setPoster(null);
    setCaption('');
    setSubmitted(false);
  };

  const handlePosterGenerated = (generatedPoster: GeneratedPoster) => {
    setPoster(generatedPoster);
  };

  const nameError = errors.find(e => e.field === 'name')?.message;
  const photoError = errors.find(e => e.field === 'photo')?.message;

  return (
    <div className="min-h-screen bg-aws-gray">
      <header className="bg-white border-b border-aws-gray sticky top-0 z-40">
        <div className="container-main flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aws-orange to-aws-teal flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="font-bold text-xl text-aws-blue">AWS MECS</span>
          </Link>
          <div className="flex items-center gap-4">
            <a href="https://www.awsmecs.in/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-aws-gray-dark hover:text-aws-orange transition-colors">
              Official Website
            </a>
            <Link href="/" className="btn-secondary text-sm py-2 px-4">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container-main py-8 md:py-12">
        <div className="mb-8 md:mb-12 animate-in">
          <h1 className="text-3xl md:text-4xl font-bold text-aws-blue mb-2">LinkedIn Post Generator</h1>
          <p className="text-aws-gray-dark max-w-2xl">
            Personalize the official AWS MECS event graphic with your name and photo. Download and share on LinkedIn.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 xl:col-span-4 animate-in" style={{ animationDelay: '100ms' }}>
            <div className="sticky top-24 space-y-6">
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-aws-blue mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-aws-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Your Details
                </h2>
                <div className="space-y-6">
                  <NameInput
                    value={userData.name}
                    onChange={handleNameChange}
                    error={nameError}
                    disabled={loading}
                    maxLength={100}
                  />
                  <PhotoUploader
                    onPhotoChange={handlePhotoChange}
                    onPositionChange={handlePositionChange}
                    initialPhoto={userData.photoPreview}
                    initialPosition={userData.photoPosition}
                    error={photoError}
                    disabled={loading}
                  />
                  <p className="text-xs text-aws-gray text-center">
                    Your photo is used only to create your personalized event graphic.
                  </p>
                </div>
              </div>

              <div className="card p-6">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={loading || !userData.name.trim() || !userData.photoPreview}
                  className="w-full btn-primary py-4 text-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    'Generate Preview'
                  )}
                </button>

                {submitted && poster && (
                  <GeneratorControls
                    poster={poster}
                    caption={caption}
                    onCaptionChange={handleCaptionChange}
                    loading={loading}
                    userName={userData.name}
                  />
                )}

                {!submitted && (
                  <p className="text-center text-sm text-aws-gray mt-4">
                    Fill in your details and click Generate Preview to create your personalized post
                  </p>
                )}

                {submitted && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full mt-4 btn-ghost"
                  >
                    Start Over
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-8 animate-in" style={{ animationDelay: '200ms' }}>
            <div className="card p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-aws-blue">Live Preview</h2>
                <span className="text-xs px-2 py-1 bg-aws-orange/10 text-aws-orange rounded-full font-medium">
                  {templateConfig.width}×{templateConfig.height}
                </span>
              </div>
              <PosterPreview
                userData={userData}
                config={templateConfig}
                onGenerated={handlePosterGenerated}
                className="max-w-full mx-auto"
              />
            </div>

            {submitted && poster && (
              <div className="mt-6 card p-6 animate-in" style={{ animationDelay: '300ms' }}>
                <h3 className="text-lg font-semibold text-aws-blue mb-4">Next Steps</h3>
                <ol className="space-y-3 text-aws-gray-dark">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aws-orange text-white text-xs font-bold flex items-center justify-center">1</span>
                    <span>Click <strong>Download Image</strong> to save your personalized graphic as a high-quality PNG</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aws-orange text-white text-xs font-bold flex items-center justify-center">2</span>
                    <span>Click <strong>Copy Caption</strong> to copy the LinkedIn caption to your clipboard</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aws-orange text-white text-xs font-bold flex items-center justify-center">3</span>
                    <span>Click <strong>Open LinkedIn</strong> to open LinkedIn in a new tab, then create a new post and paste the caption + attach the downloaded image</span>
                  </li>
                </ol>
                <div className="mt-6 p-4 bg-aws-gray rounded-xl">
                  <p className="text-sm text-aws-gray-dark">
                    <strong>Filename:</strong> {generateFileName(userData.name)}
                  </p>
                </div>
              </div>
            )}

            {!submitted && (
              <div className="mt-6 card p-8 text-center animate-in" style={{ animationDelay: '300ms' }}>
                <svg className="mx-auto w-16 h-16 text-aws-orange/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg text-aws-gray-dark mb-2">Your personalized post will appear here</p>
                <p className="text-aws-gray">Fill in your details on the left and click Generate Preview</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-aws-blue text-white py-8 mt-12">
        <div className="container-main text-center text-sm text-aws-gray">
          <p>This is an unofficial community tool. Not affiliated with AWS or the AWS MECS organizers.</p>
          <p className="mt-1">Your photos are processed locally in your browser. We don't upload or store your images.</p>
        </div>
      </footer>
    </div>
  );
}