'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

export default function NavbarHVAC() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
            <div className="flex flex-col items-center gap-0.1">
              {/* Black logo for light mode (white navbar) */}
              <Image
                src="/nuclieos-logo-1-Black.png"
                alt="Nuclieos logo"
                width={120}
                height={48}
                className="h-11 md:h-12 w-auto dark:hidden"
                unoptimized
              />
              {/* White logo for dark mode (dark navbar) */}
              <Image
                src="/nuclieos-logo-1-White.png"
                alt="Nuclieos logo"
                width={120}
                height={48}
                className="h-11 md:h-12 w-auto hidden dark:block"
                unoptimized
              />
              <span className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase">
                AI Receptionist
              </span>
            </div>
          </Link>

          {/* CTA Button */}
          <div className="flex items-center">
            <Button
              asChild
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition-all"
            >
              <Link href="/chat">Try Agent</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
