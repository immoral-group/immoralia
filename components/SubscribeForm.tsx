'use client';

import { useState } from 'react';
import { Check, Send } from 'lucide-react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEstado('loading');

    const response = await fetch('/api/newsletter/welcome', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      setEstado('error');
      return;
    }

    setEstado('ok');
  }

  if (estado === 'ok') {
    return (
      <div
        className="flex items-start gap-4 p-5 rounded-xl bg-[#00ffff]/5 border border-[#00ffff]/30"
        style={{ fontFamily: 'Lexend, sans-serif' }}
      >
        <div className="shrink-0 w-10 h-10 rounded-full bg-[#00ffff]/15 flex items-center justify-center">
          <Check className="w-5 h-5 text-[#00ffff]" />
        </div>
        <div>
          <p className="text-[#00ffff] text-lg" style={{ fontWeight: 700 }}>
            Apuntado. Hasta mañana.
          </p>
          <p className="text-white/55 text-sm mt-1" style={{ fontWeight: 300 }}>
            Revisa tu bandeja — te hemos enviado un email de bienvenida.
          </p>
        </div>
      </div>
    );
  }

  if (estado === 'error') {
    return (
      <div
        className="p-4 rounded-xl bg-red-500/5 border border-red-500/30 text-red-400 text-sm"
        style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
      >
        Algo ha fallado. Inténtalo de nuevo en un momento.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1 min-w-0 group">
        <input
          type="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 px-5 py-3.5 rounded-xl text-sm outline-none focus:border-[#00ffff]/60 focus:bg-white/[0.06] focus:shadow-[0_0_30px_rgba(0,255,255,0.15)] transition-all duration-300"
          style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
        />
      </div>
      <button
        type="submit"
        disabled={estado === 'loading'}
        className="inline-flex items-center justify-center gap-2 bg-[#00ffff] hover:bg-[#00e6e6] text-black px-7 py-3.5 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
        style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 700 }}
      >
        {estado === 'loading' ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
            Enviando…
          </span>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Suscribirme
          </>
        )}
      </button>
    </form>
  );
}
