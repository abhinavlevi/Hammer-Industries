import React, { useState } from 'react';

interface HolographicSealProps {
  className?: string;
  size?: number;
}

export const HolographicSeal: React.FC<HolographicSealProps> = ({
  className = '',
  size = 46,
}) => {
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at ${coords.x}% ${coords.y}%, rgba(255,255,255,0.9) 0%, rgba(130,220,255,0.7) 25%, rgba(255,180,240,0.6) 50%, rgba(255,240,150,0.6) 75%, rgba(160,255,200,0.7) 100%)`,
      }}
      className={`relative rounded-full border border-slate-300 shadow-sm flex items-center justify-center overflow-hidden cursor-crosshair select-none group transition-transform ${className}`}
    >
      {/* Dynamic Iridescent Prismatic Overlay */}
      <div
        className="absolute inset-0 mix-blend-color-dodge opacity-80 pointer-events-none"
        style={{
          background: `conic-gradient(from ${coords.x * 3.6}deg at ${coords.x}% ${coords.y}%, #ff0077, #7700ff, #00d4ff, #00ff66, #ffea00, #ff0077)`,
          filter: 'blur(1px)',
        }}
      />

      {/* Holographic Security Guilloche / Seal Stamp */}
      <svg
        viewBox="0 0 64 64"
        className="w-4/5 h-4/5 absolute inset-0 m-auto text-slate-800 opacity-75 mix-blend-multiply"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <circle cx="32" cy="32" r="30" strokeDasharray="3 2" />
        <circle cx="32" cy="32" r="26" />
        <circle cx="32" cy="32" r="22" strokeDasharray="1.5 1.5" />
        
        {/* Jet Silhouette Emblem in center */}
        <path
          d="M 32,15 L 36,25 L 42,38 L 32,41 L 22,38 L 28,25 Z"
          fill="currentColor"
          fillOpacity="0.4"
        />
        <circle cx="32" cy="15" r="2" fill="currentColor" />
        <path d="M 39,28 L 44,39 L 39,40 Z" fill="currentColor" fillOpacity="0.4" />
        <path d="M 25,28 L 20,39 L 25,40 Z" fill="currentColor" fillOpacity="0.4" />
      </svg>

      {/* Gloss Specular Highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
      
      {/* Tiny Holographic Text */}
      <div className="absolute text-[5px] font-mono tracking-tighter text-slate-900/70 uppercase font-black pointer-events-none bottom-1">
        VERIFIED
      </div>
    </div>
  );
};
