"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';

export function PortfolioGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const portfolioItems = [
    {
      title: "Product Launch 3D",
      category: "E-commerce",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
      video: "https://cdn.prod.website-files.com/64d6e85d7af2845d55fedb21/672dcef14a4a21e28c1e3990_5-transcode.mp4"
    },
    {
      title: "Tech Brand Campaign",
      category: "Social Media",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
      video: "https://cdn.prod.website-files.com/64d6e85d7af2845d55fedb21/672dcef14a4a21e28c1e3990_5-transcode.mp4"
    },
    {
      title: "Fashion Collection",
      category: "Meta Ads",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      video: "https://cdn.prod.website-files.com/64d6e85d7af2845d55fedb21/672dcef14a4a21e28c1e3990_5-transcode.mp4"
    },
    {
      title: "Sports Equipment",
      category: "TikTok",
      thumbnail: "https://images.unsplash.com/photo-1587828072617-f06e98f49bfe?w=800&h=600&fit=crop",
      video: "https://cdn.prod.website-files.com/64d6e85d7af2845d55fedb21/672dcef14a4a21e28c1e3990_5-transcode.mp4"
    }
  ];

  return (
    <section id="portfolio" ref={ref} className="w-full py-12 xl:py-32 px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          
          <h2
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
            className="text-4xl xl:text-5xl xl:max-w-3xl text-black mb-6 mx-auto"
          >
            Algunos de nuestros trabajos
          </h2>
          <p
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
            className="text-gray-600 text-xl max-w-3xl mx-auto"
          >
            Anuncios 3D que han generado resultados reales para marcas de diferentes industrias
          </p>
        </motion.div>

        {/* Gallery Grid - 4 videos verticales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item, index) => {
            const videoEmbeds = [
              "https://kinescope.io/embed/qgqKqbXCfjxEaPB9LJHSaB",
              "https://kinescope.io/embed/pHssHrxrNLh5ZysiDw7tA5",
              "https://kinescope.io/embed/bNfCbyR1S3HPuEp3J7sLcq",
              "https://kinescope.io/embed/dhtFvZA4B7MnNUPSd6ERi7"
            ];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                <div className="relative bg-black rounded-3xl overflow-hidden shadow-xl border border-gray-200" style={{ aspectRatio: '9/16' }}>
                  {/* Kinescope Video Embed */}
                  <iframe 
                    src={videoEmbeds[index]} 
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" 
                    frameBorder="0" 
                    allowFullScreen
                    className="w-full h-full"
                    title={item.title}
                  />

                  {/* Category badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 bg-black/50 backdrop-blur-xl border border-white/20 rounded-full z-10">
                    <span style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }} className="text-white text-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        
      </div>
    </section>
  );
}
