'use client';

import { QrCode, Menu, ShoppingCart, CreditCard, ChefHat } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "01",
      icon: QrCode,
      title: "Scan",
      description: "Customer scans the QR at the table."
    },
    {
      number: "02",
      icon: Menu,
      title: "Browse",
      description: "Digital menu opens instantly."
    },
    {
      number: "03",
      icon: ShoppingCart,
      title: "Order",
      description: "Customer selects dishes and places the order."
    },
    {
      number: "04",
      icon: CreditCard,
      title: "Pay",
      description: "Customer pays digitally."
    },
    {
      number: "05",
      icon: ChefHat,
      title: "Serve",
      description: "Restaurant receives the order and starts preparing it."
    }
  ];

  return (
    <section ref={ref} id="how-it-works" className="bg-white px-5 py-20 md:px-16 md:py-28 lg:px-20">
      <div className="mx-auto max-w-6xl">
        {/* Headline */}
        <div className="mb-20 text-center">
          <h2 
            className="mb-6 font-extrabold leading-tight tracking-tight text-gray-900"
            style={{ 
              fontSize: 'clamp(32px, 5vw, 56px)',
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out'
            }}
          >
            One QR.
            <br />
            A simpler dining experience.
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-12 md:space-y-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`flex flex-col items-center gap-8 md:flex-row ${isEven ? '' : 'md:flex-row-reverse'}`}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.7s ease-out ${index * 0.15}s`
                }}
              >
                {/* Content */}
                <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-center`}>
                  <div className="mb-4 text-sm font-bold tracking-wider text-red-600">
                    {step.number}
                  </div>
                  <h3 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {step.description}
                  </p>
                </div>

                {/* Icon */}
                <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-red-100 md:h-40 md:w-40">
                  <Icon className="h-16 w-16 text-red-600 md:h-20 md:w-20" strokeWidth={1.5} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
