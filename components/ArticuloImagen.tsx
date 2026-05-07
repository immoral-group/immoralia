'use client';

import { useId } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  fuente?: string;
  fuenteUrl?: string;
}

export default function ArticuloImagen({
  src,
  alt,
  className,
  fuente,
  fuenteUrl,
}: Props) {
  const figId = useId();

  return (
    <figure id={`fig-${figId}`} className="mb-10">
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => {
          const figura = document.getElementById(`fig-${figId}`);
          if (figura) figura.style.display = 'none';
        }}
      />
      {fuente && fuenteUrl && (
        <figcaption
          className="mt-3 text-xs text-white/35 text-right"
          style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
        >
          {'Imagen vía '}
          <a
            href={fuenteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 hover:text-[#00ffff] transition-colors duration-300"
          >
            {fuente}
          </a>
        </figcaption>
      )}
    </figure>
  );
}
