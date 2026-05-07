"use client";

import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';
const superPatchImage = '/assets/2192855eb1ef04aa28c8f650cd9bf6be2966ef52.png';
const imFilmsImage = '/assets/814c9ae74d4bdfc8699a8f4d49d40d4a1e348ff8.png';
const teamderImage = '/assets/c6682bb31a0b6b82b74ab499f101d80ed054c3da.png';
const teamderLogo = '/assets/81ad8b0edbc1706978f64f2561869261d5109d6a.png';
const imFilmsLogo = '/assets/60b4b84bb3d5ff38a91ca0dd373ca677852be9fe.png';
const superPatchLogo = '/assets/2225b9cbefa1a5ea15bbda14c3c074905cb261ba.png';

const cases = [
  {
    name: 'Super Patch',
    description: 'Leadgen de alta conversión',
    metric: '+43% tasa de conversión',
    image: superPatchImage,
    color: '#3B80DF',
    logo: superPatchLogo
  },
  {
    name: 'ImFilms',
    description: 'Landing que acompaña la decisión de compra',
    metric: 'CTR x2',
    image: imFilmsImage,
    color: '#000000',
    logo: imFilmsLogo
  },
  {
    name: 'Teamder',
    description: 'Plataforma de networking profesional optimizada',
    metric: '+65% engagement',
    image: teamderImage,
    color: '#3B80DF',
    logo: teamderLogo
  }
];

export function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="casos-de-exito" ref={ref} className="w-full py-32 px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <h2
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
            className="mb-4 text-5xl"
          >
            Casos de éxito
          </h2>
          <p
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Proyectos reales con resultados medibles
          </p>
        </motion.div>

        {/* Horizontal Stacked Cards Layout */}
        <div className="space-y-6">
          {cases.map((caseItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div className="grid md:grid-cols-2 gap-0 bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-[#3B80DF]/50 transition-all duration-500">
                {/* Image side */}
                <div className="relative h-80 md:h-96 overflow-hidden">
                  <motion.div
                    animate={{ 
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <ImageWithFallback
                      src={caseItem.image}
                      alt={caseItem.name}
                      className="w-full h-80 md:h-96 object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />
                </div>

                {/* Content side */}
                <div className="p-10 md:p-16 flex flex-col justify-center relative">
                  <motion.div
                    animate={{ x: hoveredIndex === index ? 10 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    

                    {caseItem.logo ? (
                      <img
                        src={caseItem.logo}
                        alt={caseItem.name}
                        className={`mb-4 ${caseItem.name === 'Super Patch' ? 'h-16' : 'h-12'} object-contain object-left`}
                      />
                    ) : (
                      <h3
                        style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
                        className="mb-4 text-white text-4xl"
                      >
                        {caseItem.name}
                      </h3>
                    )}

                    <p
                      style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
                      className="text-gray-400 text-sx"
                    >
                      {caseItem.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
