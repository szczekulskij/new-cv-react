import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Jan Szczekulski - Software Engineer, Distributed Systems & AI',
    template: '%s | Jan Szczekulski',
  },
  description:
    'Software Engineer at Amazon building distributed systems at scale. UCSD M.S. Computer Science, robotics & AI research published at ICRA 2025.',
  metadataBase: new URL('https://jan-cs.com'),
  openGraph: {
    title: 'Jan Szczekulski - Software Engineer, Distributed Systems & AI',
    description:
      'Software Engineer at Amazon building distributed systems at scale. UCSD M.S. Computer Science, robotics & AI research published at ICRA 2025.',
    url: 'https://jan-cs.com',
    siteName: 'Jan Szczekulski',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/profile/jan-headshot.jpg',
        width: 640,
        height: 640,
        alt: 'Jan Szczekulski',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Jan Szczekulski - Software Engineer, Distributed Systems & AI',
    description:
      'Software Engineer at Amazon building distributed systems at scale. UCSD M.S. Computer Science, robotics & AI research published at ICRA 2025.',
    images: ['/images/profile/jan-headshot.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-bg font-sans">
        <div className="h-1.5 bg-accent w-full" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
