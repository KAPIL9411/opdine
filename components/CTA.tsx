'use client';

import { ArrowRight } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-gray-900 px-5 py-24 md:px-16 md:py-32 lg:px-20">
      <div className="mx-auto max-w-4xl text-center">
        <div
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease-out'
          }}
        >
          {/* Headline */}
          <h2 
            className="mb-6 font-extrabold leading-tight tracking-tight text-white"
            style={{ 
              fontSize: 'clamp(36px, 6vw, 64px)',
            }}
          >
            The smarter way to
            <br />
            run dine-in.
          </h2>

          {/* Subtext */}
          <p className="mb-10 text-xl leading-relaxed text-white/80 md:text-2xl">
            opdine is coming soon.
          </p>

          {/* CTA Button */}
          <button className="group inline-flex items-center gap-3 rounded-full bg-red-600 px-10 py-5 text-lg font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:bg-red-700 hover:shadow-red-600/50">
            Join the Waitlist
            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Trust Badge */}
          <p className="mt-8 text-sm text-white/60">
            Early access opening soon for select restaurants
          </p>
        </div>
      </div>
    </section>
  );
}
