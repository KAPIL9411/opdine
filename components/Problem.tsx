'use client';

import { Clock, AlertCircle, TrendingDown, Users } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    {
      icon: Clock,
      title: "Customers waiting for the waiter",
      description: "Time wasted on simple tasks like ordering and billing"
    },
    {
      icon: AlertCircle,
      title: "Manual order taking",
      description: "Handwritten orders lead to mistakes and delays"
    },
    {
      icon: TrendingDown,
      title: "Slow table turnover",
      description: "Inefficient service affects revenue per table"
    },
    {
      icon: Users,
      title: "Limited insights",
      description: "No data on customer preferences or ordering patterns"
    }
  ];

  return (
    <section ref={ref} className="bg-gray-50 px-5 py-20 md:px-16 md:py-28 lg:px-20">
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
          Still running your restaurant
          <br />
          the old way?
        </h2>

        {/* Problems Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
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
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-gray-900">
                  {problem.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
