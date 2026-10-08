'use client';

import { QrCode, Menu, Users, ChefHat, CreditCard, BarChart3 } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: QrCode,
      title: "QR Ordering",
      description: "Let customers order directly from their table."
    },
    {
      icon: Menu,
      title: "Digital Menu",
      description: "Beautiful, fast and always up to date."
    },
    {
      icon: Users,
      title: "Table Management",
      description: "Know what's happening across every table."
    },
    {
      icon: ChefHat,
      title: "Kitchen Orders",
      description: "Orders reach the right place instantly."
    },
    {
      icon: CreditCard,
      title: "Digital Payments",
      description: "Fast and frictionless payments."
    },
    {
      icon: BarChart3,
      title: "Restaurant Insights",
      description: "Understand orders, customers and performance."
    }
  ];

  return (
    <section ref={ref} id="features" className="bg-gray-50 px-5 py-20 md:px-16 md:py-28 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Headline */}
        <h2 
          className="mb-16 text-center font-extrabold leading-tight tracking-tight text-gray-900 md:mb-20"
          style={{ 
            fontSize: 'clamp(32px, 5vw, 56px)',
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out'
          }}
        >
          Everything you need.
          <br />
          Nothing you don't.
        </h2>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group rounded-2xl bg-white p-8 transition-all duration-300 hover:shadow-xl"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${index * 0.1}s`
                }}
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
