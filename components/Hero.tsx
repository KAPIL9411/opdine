'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden md:min-h-[700px]">
      {/* Hero Media Container */}
      <div className="absolute inset-0 h-full w-full">
        {/* Poster Image - Always visible initially, fades out when video is ready */}
        <img
          src="/images/opdine-hero-poster-start.jpg"
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out"
          style={{ opacity: videoReady ? 0 : 1 }}
        />

        {/* Video - Initially transparent, fades in when ready */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlayThrough={() => setVideoReady(true)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
          style={{ opacity: videoReady ? 1 : 0 }}
        >
          <source src="/videos/opdine-hero.webm" type="video/webm" />
        </video>

        {/* Gradient Overlay - Darker for premium look */}
        <div 
          className="absolute inset-0 h-full w-full"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.65) 100%)'
          }}
        />
      </div>

      {/* Navbar */}
      <header className="relative z-20 flex items-center justify-between px-5 pt-6 md:px-16 lg:px-20">
        <div className="flex items-center">
          <img 
            src="/images/logo.png" 
            alt="opdine" 
            className="h-8 w-auto md:h-10"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          <a href="#product" className="text-sm font-medium text-white/90 transition-colors hover:text-white">
            Product
          </a>
          <a href="#solutions" className="text-sm font-medium text-white/90 transition-colors hover:text-white">
            Solutions
          </a>
          <a href="#restaurants" className="text-sm font-medium text-white/90 transition-colors hover:text-white">
            For Restaurants
          </a>
          <a href="#resources" className="text-sm font-medium text-white/90 transition-colors hover:text-white">
            Resources
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden text-sm font-medium text-white/90 transition-colors hover:text-white md:block">
            Log in
          </button>
          <button className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-700">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 flex h-full items-center justify-center px-5 pb-20 pt-10">
        <div className="mx-auto max-w-5xl text-center">
          {/* Eyebrow */}
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-white md:text-base">
            The Restaurant Operating System
          </p>

          {/* Headline */}
          <h1 
            className="mb-7 font-extrabold leading-[0.95] tracking-tight text-white"
            style={{ 
              fontSize: 'clamp(48px, 7vw, 96px)',
              letterSpacing: '-0.025em',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)'
            }}
          >
            Run your restaurant.
            <br />
            Smarter.
          </h1>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white md:text-xl md:leading-relaxed">
            Orders, tables, kitchen, billing and growth —<br className="hidden md:block" />
            all connected in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="w-full rounded-full bg-red-600 px-9 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-red-700 hover:shadow-xl sm:w-auto">
              Get Started
            </button>
            <button className="w-full rounded-full border-2 border-white bg-transparent px-9 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 sm:w-auto">
              See how it works
            </button>
          </div>
        </div>
      </main>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
          Scroll down
        </p>
        <ChevronDown 
          className="h-5 w-5 text-white/80 animate-bounce" 
          style={{ 
            animation: 'bounce 2s ease-in-out infinite',
            animationDuration: '2.5s'
          }}
        />
      </div>
    </section>
  );
}
