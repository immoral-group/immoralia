'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail } from 'lucide-react';
import SubscribeForm from '@/components/SubscribeForm';

const getCookie = (name: string) => {
  if (typeof document === 'undefined') return false;
  return document.cookie.split(';').some((item) => item.trim().startsWith(`${name}=`));
};

export default function SubscribePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(false);
  const [scrollPassed, setScrollPassed] = useState(false);

  // Monitorizar el tiempo mínimo de estancia (8 segundos)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeElapsed(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Monitorizar la profundidad de scroll mínima (300px)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setScrollPassed(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Activar el disparador al cumplirse las condiciones
  useEffect(() => {
    const isSubscribed = getCookie('newsletter_subscribed');
    const isDismissed = getCookie('newsletter_slidein_dismissed');

    if (isSubscribed || isDismissed) {
      return;
    }

    if (timeElapsed && scrollPassed) {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // En móviles, se abre automáticamente tras cumplir scroll y tiempo
        setIsOpen(true);
      } else {
        // En desktop, se abre al detectar intención de salida
        const handleMouseLeave = (e: MouseEvent) => {
          if (e.clientY < 20) {
            setIsOpen(true);
          }
        };
        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
      }
    }
  }, [timeElapsed, scrollPassed]);

  const handleClose = () => {
    setIsOpen(false);
    // Establecer cookie para evitar mostrarlo de nuevo por 5 días (5 * 24 * 60 * 60 segundos)
    const maxAge = 5 * 24 * 60 * 60;
    document.cookie = `newsletter_slidein_dismissed=true; path=/; max-age=${maxAge}; SameSite=Lax`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto z-50 w-full md:max-w-sm bg-white border border-slate-200/60 rounded-t-3xl md:rounded-3xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.12)] md:shadow-2xl overflow-hidden"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          {/* Background design accents */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#001156]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#00ffff]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors z-30"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content */}
          <div className="relative z-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#001156]/10 border border-[#001156]/20 text-[#001156]">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-lg text-black font-black tracking-tight leading-tight">
                  ¿Te interesa la IA de verdad?
                </h3>
                <p className="text-slate-500 text-xs mt-0.5 font-light">
                  Únete gratis y recibe una noticia al día.
                </p>
              </div>
            </div>

            {/* Subscribe Form */}
            <div className="mt-4">
              <SubscribeForm />
            </div>

            {/* Footer note */}
            <p className="text-[10px] text-slate-400 text-center mt-3 font-light">
              Sin spam. Cancela en un clic cuando quieras.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
