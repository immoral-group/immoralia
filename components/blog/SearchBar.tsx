'use client';

import { motion } from 'motion/react';
import { Search, X } from 'lucide-react';

type Props = {
  value: string;
  onChange: (next: string) => void;
  resultsCount?: number;
  totalCount?: number;
};

export default function SearchBar({ value, onChange, resultsCount, totalCount }: Props) {
  const hasQuery = value.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="px-6 mb-16"
    >
      <div className="max-w-3xl mx-auto">
        <div className="relative group">
          {/* Animated focus glow */}
          <div
            className={`absolute -inset-px rounded-2xl transition-opacity duration-500 pointer-events-none ${
              hasQuery ? 'opacity-100' : 'opacity-0 group-focus-within:opacity-100'
            }`}
            style={{
              background:
                'linear-gradient(135deg, rgba(59,128,223,0.5), rgba(0,255,255,0.5))',
              filter: 'blur(20px)',
            }}
          />

          <div className="relative flex items-center gap-3 bg-black/60 backdrop-blur-xl border border-white/10 group-focus-within:border-[#00ffff]/50 rounded-2xl px-5 py-4 transition-colors duration-300">
            <Search className="w-5 h-5 text-white/40 group-focus-within:text-[#00ffff] transition-colors duration-300 shrink-0" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Buscar en el archivo…"
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/30 text-base"
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
              aria-label="Buscar artículos"
            />

            {hasQuery && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="shrink-0 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <kbd
              className="hidden md:inline-flex items-center px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/40 text-[10px] tracking-wider uppercase"
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
            >
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Result counter */}
        {hasQuery && typeof resultsCount === 'number' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-white/45"
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
          >
            {resultsCount === 0 ? (
              <span>
                Sin resultados para{' '}
                <span className="text-white/80">«{value}»</span>
              </span>
            ) : (
              <span>
                <span className="text-white">{resultsCount}</span>{' '}
                {resultsCount === 1 ? 'resultado' : 'resultados'}
                {typeof totalCount === 'number' && (
                  <span className="text-white/30"> de {totalCount}</span>
                )}{' '}
                para <span className="text-[#00ffff]">«{value}»</span>
              </span>
            )}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
