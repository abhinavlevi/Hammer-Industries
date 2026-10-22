import React from 'react';

interface GuillochePatternProps {
  className?: string;
  opacity?: number;
}

export const GuillochePattern: React.FC<GuillochePatternProps> = ({
  className = '',
  opacity = 1.0,
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
      >
        <defs>
          {/* Exact 8-pointed rosette tessellation as seen on Justin Hammer's screen-used badge */}
          <pattern
            id="hammer-tessellation"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            {/* Background base green */}
            <rect width="32" height="32" fill="#358e55" />

            {/* Subdivided diamond facets: Horizontal/Vertical 4-point cross facets */}
            <polygon points="16,0 16,16 0,16" fill="#46a367" />
            <polygon points="16,0 16,16 32,16" fill="#58b67a" />
            <polygon points="16,32 16,16 0,16" fill="#3d975e" />
            <polygon points="16,32 16,16 32,16" fill="#4ea96f" />

            {/* Diagonal 4-point star facets */}
            <polygon points="0,0 16,16 8,0" fill="#6bc88c" />
            <polygon points="32,0 16,16 24,0" fill="#75d396" />
            <polygon points="0,32 16,16 8,32" fill="#50ab71" />
            <polygon points="32,32 16,16 24,32" fill="#62bd83" />

            {/* Central 8-pointed star diamond overlay */}
            <polygon
              points="16,4 20,12 28,16 20,20 16,28 12,20 4,16 12,12"
              fill="#86dfa6"
              fillOpacity="0.45"
            />
            
            {/* Center diamond core */}
            <polygon
              points="16,10 22,16 16,22 10,16"
              fill="#ffffff"
              fillOpacity="0.35"
            />

            {/* Fine security gridlines */}
            <line x1="0" y1="0" x2="32" y2="32" stroke="#22643a" strokeWidth="0.5" strokeOpacity="0.4" />
            <line x1="32" y1="0" x2="0" y2="32" stroke="#22643a" strokeWidth="0.5" strokeOpacity="0.4" />
            <line x1="16" y1="0" x2="16" y2="32" stroke="#22643a" strokeWidth="0.5" strokeOpacity="0.4" />
            <line x1="0" y1="16" x2="32" y2="16" stroke="#22643a" strokeWidth="0.5" strokeOpacity="0.4" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#hammer-tessellation)" />
      </svg>
    </div>
  );
};
