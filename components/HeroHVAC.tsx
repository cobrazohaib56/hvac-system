'use client';

import Link from 'next/link';
import { Button } from './ui/button';

export default function HeroHVAC() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-16 px-4 md:px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Main Heading */}
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white">
            Never miss an{' '}
            <span className="text-teal-400">Inbound Lead</span>{' '}
            Again
          </h1>
        </div>

        {/* Sub-text */}
        <div className="animate-fade-in-up-delay">
          <p className="text-lg md:text-xl lg:text-2xl text-gray-100 font-medium">
            24/7, no sick leaves, no mood swings.
          </p>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in-up-delay-2 pt-4">
          <Button
            asChild
            size="lg"
            className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-7 text-lg md:text-xl font-semibold rounded-xl shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105"
          >
            <Link href="/chat">Try Agent</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
