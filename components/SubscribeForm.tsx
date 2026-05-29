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

    // Guardar cookie por 365 días
    const maxAge = 365 * 24 * 60 * 60;
    document.cookie = `newsletter_subscribed=true; path=/; max-age=${maxAge}; SameSite=Lax`;

    setEstado('ok');
  }

  if (estado === 'ok') {
    return (
      <div
        className="flex items-start gap-4 p-5 rounded-xl bg-emerald-50 border border-emerald-200/60"
        style={{ fontFamily: 'Lexend, sans-serif' }}
      >
        <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
          <Check className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <p className="text-emerald-900 text-lg" style={{ fontWeight: 700 }}>
            Apuntado. Hasta mañana.
          </p>
          <p className="text-slate-600 text-sm mt-1" style={{ fontWeight: 300 }}>
            Revisa tu bandeja — te hemos enviado un email de bienvenida.
          </p>
        </div>
      </div>
    );
  }

  if (estado === 'error') {
    return (
      <div
        className="p-4 rounded-xl bg-rose-50 border border-rose-200/60 text-rose-800 text-sm"
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
          className="w-full bg-white border border-[#3B80DF]/20 text-slate-900 placeholder:text-slate-400 px-5 py-3.5 rounded-xl text-sm outline-none focus:border-[#0077cc]/60 focus:bg-white focus:shadow-[0_0_30px_rgba(0,119,204,0.1)] transition-all duration-300"
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
