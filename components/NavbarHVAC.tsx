'use client';

import Link from 'next/link';
import { Button } from './ui/button';

export default function NavbarHVAC() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  CoolBreeze
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Climate Solutions
                </span>
              </div>
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
