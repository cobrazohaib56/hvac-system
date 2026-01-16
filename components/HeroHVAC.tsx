'use client';

import Link from 'next/link';
import { Button } from './ui/button';

export default function HeroHVAC() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-16 px-4 md:px-8 bg-cover bg-center bg-no-repeat animate-fade-in"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <div className="mb-6 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white mb-4">
            HVAC Services
            <br />
            <span className="text-teal-400">in Your Area</span>
          </h1>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto animate-fade-in-up-delay">
          Whenever you need any HVAC services like installation, replacement, repair, or maintenance, you can count on us. You&apos;re getting a local expert that fixes any problem really quickly.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up-delay-2">
          <Button
            asChild
            size="lg"
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg transition-all"
          >
            <Link href="/chat">Try Agent</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
