'use client';

import Link from 'next/link';
import { defaultLinkedInCaption } from '@/config/template';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-aws-gray to-white px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aws-orange/5 via-transparent to-transparent" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aws-orange/10 text-aws-orange-dark text-sm font-medium mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aws-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-aws-orange"></span>
          </span>
          AWS MECS 2026 Official Tool
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-aws-blue tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          Create Your AWS MECS{' '}
          <span className="text-aws-orange">LinkedIn Post</span>
        </h1>

        <p className="text-lg md:text-xl text-aws-gray-dark max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Personalize the official event graphic with your name and photo, then share your excitement on LinkedIn.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <Link
            href="/generator"
            className="group px-8 py-4 bg-aws-orange text-white rounded-xl font-semibold text-lg hover:bg-aws-orange-dark transition-colors shadow-card hover:shadow-elevated focus:outline-none focus:ring-2 focus:ring-aws-orange focus:ring-offset-2"
          >
            Create My Post
            <svg className="ml-2 w-5 h-5 inline-block group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <a
            href="https://www.awsmecs.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-aws-blue text-aws-blue rounded-xl font-semibold text-lg hover:bg-aws-blue hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-aws-blue focus:ring-offset-2"
          >
            Visit AWS MECS
          </a>
        </div>

        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: '01', title: 'Upload Your Photo', desc: 'Choose a clear profile picture from your device' },
              { step: '02', title: 'Add Your Name', desc: 'Enter your full name as you\'d like it displayed' },
              { step: '03', title: 'Download & Share', desc: 'Get your personalized graphic and post to LinkedIn' },
            ].map((item, index) => (
              <div key={item.step} className="text-left p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-aws-gray hover:border-aws-orange/30 transition-colors">
                <div className="text-aws-orange text-sm font-bold tracking-wider mb-2">{item.step}</div>
                <h3 className="text-xl font-semibold text-aws-blue mb-2">{item.title}</h3>
                <p className="text-aws-gray-dark">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <p className="text-sm text-aws-gray-dark">
            Your photo is used only to create your personalized event graphic. We don't store your images.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}