import React from 'react';

interface BlackPantherIconProps {
  className?: string;
  size?: number;
}

export const BlackPantherIcon: React.FC<BlackPantherIconProps> = ({ className = "w-6 h-6", size }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
    >
      <defs>
        {/* Obsidian Base Gradient */}
        <linearGradient id="pantherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="50%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Metallic Gold Highlights */}
        <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        {/* Feline Eye Glow */}
        <filter id="eyeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Head Outer Contour (Panther Head Shape) */}
      <path 
        d="M50 12 L32 20 L20 38 L25 58 L38 85 L50 94 L62 85 L75 58 L80 38 L68 20 Z" 
        fill="url(#pantherGradient)" 
        stroke="#D4AF37" 
        strokeWidth="2.5" 
        strokeLinejoin="round"
      />

      {/* Left Ear */}
      <path 
        d="M32 20 L16 8 L24 32 Z" 
        fill="#0F172A" 
        stroke="#D4AF37" 
        strokeWidth="2" 
      />
      <path d="M28 20 L20 13 L23 27 Z" fill="#D4AF37" opacity="0.4" />

      {/* Right Ear */}
      <path 
        d="M68 20 L84 8 L76 32 Z" 
        fill="#0F172A" 
        stroke="#D4AF37" 
        strokeWidth="2" 
      />
      <path d="M72 20 L80 13 L77 27 Z" fill="#D4AF37" opacity="0.4" />

      {/* Brow & Cheeks Facets */}
      <path d="M50 12 L50 42 L32 20 Z" fill="#334155" opacity="0.3" />
      <path d="M50 12 L50 42 L68 20 Z" fill="#1E293B" opacity="0.3" />
      
      {/* Cheek lines */}
      <path d="M20 38 L36 48 L25 58 Z" fill="#1E293B" opacity="0.5" />
      <path d="M80 38 L64 48 L75 58 Z" fill="#334155" opacity="0.5" />

      {/* Nose Bridge & Snout */}
      <path d="M50 38 L43 58 L50 64 L57 58 Z" fill="#020617" stroke="#D4AF37" strokeWidth="1.5" />
      <path d="M46 64 L50 70 L54 64 Z" fill="#D4AF37" />

      {/* Glowing Feline Eyes (Gold Panther Eyes) */}
      <g filter="url(#eyeGlow)">
        {/* Left Eye */}
        <path d="M30 42 Q38 39 44 44 Q37 49 30 42 Z" fill="#F59E0B" stroke="#FDE047" strokeWidth="1" />
        <ellipse cx="37" cy="43.5" rx="1.5" ry="3" fill="#020617" />

        {/* Right Eye */}
        <path d="M70 42 Q62 39 56 44 Q63 49 70 42 Z" fill="#F59E0B" stroke="#FDE047" strokeWidth="1" />
        <ellipse cx="63" cy="43.5" rx="1.5" ry="3" fill="#020617" />
      </g>

      {/* Whisker Markings / Tactical Lines */}
      <path d="M35 68 L20 72" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M36 73 L23 80" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M65 68 L80 72" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M64 73 L77 80" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* Chin line */}
      <path d="M38 85 L50 94 L62 85" stroke="#D4AF37" strokeWidth="2" fill="none" />
    </svg>
  );
};
