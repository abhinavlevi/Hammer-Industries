import React from 'react';

interface SchematicWatermarkProps {
  className?: string;
  opacity?: number;
}

export const SchematicWatermark: React.FC<SchematicWatermarkProps> = ({
  className = '',
  opacity = 0.04, // Strict <= 5% opacity
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full text-slate-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        {/* Arc Reactor / Drone Core Concentric Target Grids */}
        <circle cx="250" cy="250" r="220" strokeDasharray="8 8" />
        <circle cx="250" cy="250" r="180" />
        <circle cx="250" cy="250" r="140" strokeDasharray="4 4" />
        <circle cx="250" cy="250" r="100" />
        <circle cx="250" cy="250" r="60" strokeDasharray="12 4" />
        <circle cx="250" cy="250" r="20" fill="currentColor" fillOpacity="0.1" />

        {/* 10 Arc Reactor segments */}
        {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 250 250)`}>
            <rect x="242" y="150" width="16" height="30" rx="3" strokeWidth="1" />
            <line x1="250" y1="20" x2="250" y2="480" strokeDasharray="2 6" strokeWidth="0.8" />
          </g>
        ))}

        {/* Crosshair calibrations */}
        <line x1="10" y1="250" x2="490" y2="250" strokeWidth="0.8" />
        <line x1="250" y1="10" x2="250" y2="490" strokeWidth="0.8" />

        {/* Diagonal calibrations */}
        <line x1="60" y1="60" x2="440" y2="440" strokeDasharray="6 6" strokeWidth="0.8" />
        <line x1="440" y1="60" x2="60" y2="440" strokeDasharray="6 6" strokeWidth="0.8" />

        {/* Technical Callouts */}
        <text x="260" y="70" fill="currentColor" fontSize="10" fontFamily="monospace" letterSpacing="2">
          HAWS-SEC-CHASSIS // MK-IV-ARC
        </text>
        <text x="30" y="470" fill="currentColor" fontSize="9" fontFamily="monospace">
          TOLERANCE: +/- 0.002mm • SYSTEM: EX-WIFE BALLISTIC CORE
        </text>
      </svg>
    </div>
  );
};
