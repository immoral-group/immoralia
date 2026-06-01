"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: 45, suffix: '+', label: 'Marcas confían en nosotros' },
    { value: 200, suffix: '+', label: 'Anuncios 3D creados' },
    { value: 85, suffix: '%', label: 'Mejora en engagement' },
    { value: 3, suffix: 'x', label: 'Incremento en conversión' }
  ];

  function CountUpAnimation({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isInView) return;

      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isInView, end, duration]);

    return (
      <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}>
        {count}{suffix}
      </span>
    );
  }

  return (
    <section ref={ref} className="w-full py-24 px-8 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#001156] rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#00FFFF] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center space-y-2"
            >
              <div className="text-5xl xl:text-6xl text-[#00FFFF] mb-2 font-black">
                <CountUpAnimation end={stat.value} suffix={stat.suffix} />
              </div>
              <p
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                className="text-white/80 text-lg"
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
