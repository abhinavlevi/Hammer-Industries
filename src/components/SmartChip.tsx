import React from 'react';

interface SmartChipProps {
  className?: string;
}

export const SmartChip: React.FC<SmartChipProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-12 h-9 rounded-md overflow-hidden shadow-inner border border-amber-600/60 select-none ${className}`}
      style={{
        background: 'linear-gradient(135deg, #d4af37 0%, #f9e29c 35%, #aa771c 65%, #ffd700 100%)',
      }}
    >
      {/* Contact isolation grooves */}
      <svg
        viewBox="0 0 48 36"
        className="w-full h-full absolute inset-0 opacity-80"
        stroke="#78350f"
        strokeWidth="0.8"
        fill="none"
      >
        {/* Central horizontal line */}
        <line x1="0" y1="18" x2="48" y2="18" strokeDasharray="14 4 14" />
        
        {/* Left contacts */}
        <path d="M 14,0 L 14,12 L 8,18 L 14,24 L 14,36" />
        
        {/* Right contacts */}
        <path d="M 34,0 L 34,12 L 40,18 L 34,24 L 34,36" />

        {/* Center core */}
        <rect x="18" y="10" width="12" height="16" rx="2" strokeWidth="0.9" />
        <circle cx="24" cy="18" r="3" fill="#78350f" fillOpacity="0.15" />
      </svg>

      {/* Surface metallic highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none" />
    </div>
  );
};
