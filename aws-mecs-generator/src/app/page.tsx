import Link from 'next/link';
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-aws-gray">
        <nav className="container-main flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aws-orange to-aws-teal flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="font-bold text-xl text-aws-blue">AWS MECS</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.awsmecs.in/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-aws-gray-dark hover:text-aws-orange transition-colors">
              Official Website
            </a>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        <Hero />
      </main>

      <footer className="bg-aws-blue text-white py-12 mt-auto">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-aws-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                AWS MECS LinkedIn Post Generator
              </h3>
              <p className="text-aws-gray text-sm">
                Create personalized LinkedIn posts for the AWS MECS 2026 event using the official template.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-aws-gray">
                <li><a href="/generator" className="hover:text-white transition-colors">Create Your Post</a></li>
                <li><a href="https://www.awsmecs.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Official Event Website</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Privacy</h4>
              <p className="text-sm text-aws-gray">
                Your photos are processed locally in your browser. We don't upload or store your images on any server.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-aws-blue-light text-center text-sm text-aws-gray">
            <p>This is an unofficial community tool. Not affiliated with AWS or the AWS MECS organizers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}