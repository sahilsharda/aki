import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Akinator Game',
  description: 'Play the classic Akinator game - guess the character!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-10" />
        <main className="relative min-h-screen flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
