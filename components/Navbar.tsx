"use client";

const image_670488ee96b1db32aac78994e494876f5d2bfc92 = '/assets/670488ee96b1db32aac78994e494876f5d2bfc92.png';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, MousePointerClick } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-xl border-b border-[#001156]/30 shadow-2xl shadow-[#001156]/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="cursor-pointer flex items-center gap-2"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img 
                src={image_670488ee96b1db32aac78994e494876f5d2bfc92}
                alt="Immoralia"
                className="h-8 w-auto"
              />
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              <motion.a
                href="/blog"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                className="relative px-5 py-2.5 rounded-lg border border-white/20 text-white hover:border-[#00ffff]/60 hover:text-[#00ffff] transition-all duration-300 text-sm no-underline"
              >
                Blog
              </motion.a>
              <motion.a
                href="https://procesos.immoralia.es/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 100 }}
                className="relative px-6 py-2.5 rounded-lg bg-[#00ffff] hover:bg-[#00e6e6] text-black transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.3)] flex items-center gap-2 text-sm no-underline"
              >
                <MousePointerClick className="w-4 h-4" />
                <span>Abrir selector de procesos</span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-[70px] left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-[#001156]/30 md:hidden shadow-2xl"
        >
          <div className="p-6 space-y-4">
            <a
              href="/blog"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
              className="w-full px-6 py-3 border border-white/20 text-white rounded-lg flex items-center justify-center gap-2 no-underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </a>
            <a
              href="https://procesos.immoralia.es/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700 }}
              className="w-full px-6 py-3 bg-[#00ffff] text-black rounded-lg flex items-center justify-center gap-2 no-underline shadow-[0_0_20px_rgba(0,255,255,0.3)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MousePointerClick className="w-5 h-5" />
              Abrir selector de procesos
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}
