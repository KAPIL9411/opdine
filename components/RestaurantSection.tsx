'use client';

import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function RestaurantSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    "Faster ordering",
    "Fewer mistakes",
    "Better table efficiency",
    "Less operational friction",
    "More customer data",
    "Smarter decisions"
  ];

  return (
    <section ref={ref} id="restaurants" className="bg-white px-5 py-20 md:px-16 md:py-28 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.7s ease-out'
            }}
          >
            <h2 
              className="mb-6 font-extrabold leading-tight tracking-tight text-gray-900"
              style={{ 
                fontSize: 'clamp(32px, 5vw, 48px)',
              }}
            >
              Built for people who
              <br />
              run restaurants.
            </h2>
            
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              opdine brings together everything you need to run a modern dine-in restaurant — 
              from QR ordering to kitchen management to customer insights.
            </p>

            {/* Benefits List */}
            <div className="mb-10 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.5s ease-out ${0.3 + index * 0.1}s`
                  }}
                >
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-red-600" />
                  <span className="font-medium text-gray-900">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="group inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-red-700 hover:shadow-xl">
              Get Early Access
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Dashboard Visual */}
          <div
            className="relative"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.7s ease-out 0.2s'
            }}
          >
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-2xl">
              {/* Mock Dashboard */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Restaurant Dashboard</h3>
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-white p-4 shadow-sm">
                    <div className="text-2xl font-bold text-gray-900">24</div>
                    <div className="text-xs text-gray-600">Active Orders</div>
                  </div>
                  <div className="rounded-lg bg-white p-4 shadow-sm">
                    <div className="text-2xl font-bold text-gray-900">12</div>
                    <div className="text-xs text-gray-600">Tables</div>
                  </div>
                  <div className="rounded-lg bg-white p-4 shadow-sm">
                    <div className="text-2xl font-bold text-gray-900">₹45k</div>
                    <div className="text-xs text-gray-600">Today</div>
                  </div>
                </div>

                {/* Orders List */}
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-sm font-bold text-red-600">
                          T{i}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">Table {i}</div>
                          <div className="text-xs text-gray-500">Order #{1240 + i}</div>
                        </div>
                      </div>
                      <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Preparing
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
