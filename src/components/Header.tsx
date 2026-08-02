'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/blog', label: 'WRITING' },
  { href: '/readings', label: 'READINGS' },
  { href: '/series', label: 'INTRO SERIES' },
  { href: '/about', label: 'ABOUT' },
  { href: '/cv', label: 'CV' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-bg border-b border-border/50">
      <nav className="max-w-xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-bold text-text">
          Jan Szczekulski
        </Link>

        <ul className="flex items-center gap-5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[10px] tracking-widest font-mono transition-colors ${
                  pathname === link.href || pathname?.startsWith(link.href + '/')
                    ? 'text-text border-b border-text pb-0.5'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
