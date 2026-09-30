import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'AWS MECS LinkedIn Post Generator',
  description: 'Create your personalized AWS MECS 2026 LinkedIn post with the official event template.',
  openGraph: {
    title: 'AWS MECS LinkedIn Post Generator',
    description: 'Create your personalized AWS MECS 2026 LinkedIn post with the official event template.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-aws-blue`}>
        {children}
      </body>
    </html>
  );
}