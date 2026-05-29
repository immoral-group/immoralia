'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail } from 'lucide-react';
import SubscribeForm from '@/components/SubscribeForm';

export default function SubscribePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Solo ejecutar del lado del cliente
    const isSubscribed = document.cookie
      .split(';')
      .some((item) => item.trim().startsWith('newsletter_subscribed='));
    const isDismissed = sessionStorage.getItem('newsletter_popup_dismissed') === 'true';

    if (isSubscribed || isDismissed) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // clientY < 20 detecta si el puntero se sale de la parte superior del viewport
      if (e.clientY < 20) {
        setIsOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('newsletter_popup_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md bg-white border border-slate-200/60 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden z-10"
            style={{ fontFamily: 'Lexend, sans-serif' }}
          >
            {/* Background design accents */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#3B80DF]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#00ffff]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#3B80DF]/10 border border-[#3B80DF]/20 text-[#3B80DF] mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl text-black font-black tracking-tight text-center leading-tight">
                ¿Te vas tan pronto?
              </h3>
              <p className="text-slate-500 text-sm text-center mt-2 max-w-sm font-light">
                No te pierdas nuestra newsletter diaria. Sin hype, sin ruido. Solo la información de IA que cambia tus procesos.
              </p>
            </div>

            {/* Subscribe Form */}
            <div className="relative z-20">
              <SubscribeForm />
            </div>

            {/* Footer note */}
            <p className="text-[11px] text-slate-400 text-center mt-4 font-light">
              Únete gratis. Cancela con un clic cuando quieras.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
