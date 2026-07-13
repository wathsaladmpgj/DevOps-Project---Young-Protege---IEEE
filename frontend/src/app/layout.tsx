import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import '../styles/globals.css';
import SiteHeader from '../components/SiteHeader';

const headingFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading'
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'A microservice-based task management system built with Next.js, Node.js, Express, and MySQL.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} bg-background text-slate-100`}>
        <SiteHeader />
        <main className="relative isolate mx-auto min-h-[calc(100vh-5rem)] w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}