import React, { useMemo } from 'react';

interface BarcodeProps {
  code: string;
  className?: string;
  height?: number;
  showText?: boolean;
  textColor?: string;
}

// Pseudo-Code128 / Code39 deterministic SVG generator for crisp scannable rendering
export const Barcode: React.FC<BarcodeProps> = ({
  code,
  className = '',
  height = 42,
  showText = true,
  textColor = '#091E3A',
}) => {
  const bars = useMemo(() => {
    // Generate deterministic bar widths based on input string
    const normalized = code.toUpperCase().replace(/[^A-Z0-9-]/g, '') || 'HAMMER793';
    const pattern: number[] = [2, 1, 1, 2]; // Start guard

    for (let i = 0; i < normalized.length; i++) {
      const charCode = normalized.charCodeAt(i);
      const b1 = (charCode % 3) + 1;
      const s1 = ((charCode >> 1) % 2) + 1;
      const b2 = ((charCode >> 2) % 3) + 1;
      const s2 = ((charCode >> 3) % 2) + 1;
      pattern.push(b1, s1, b2, s2);
    }

    pattern.push(2, 1, 2, 2); // Stop guard
    return pattern;
  }, [code]);

  let totalWidth = 0;
  const elements = bars.map((w, idx) => {
    const isBar = idx % 2 === 0;
    const x = totalWidth;
    totalWidth += w * 1.6;
    if (!isBar) return null;
    return (
      <rect
        key={idx}
        x={x}
        y={0}
        width={w * 1.55}
        height={height}
        fill="#000000"
      />
    );
  });

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox={`0 0 ${Math.ceil(totalWidth)} ${height}`}
        className="w-full h-full block"
        preserveAspectRatio="none"
      >
        {elements}
      </svg>
      {showText && (
        <span
          className="font-mono text-[9px] tracking-[0.2em] font-bold mt-0.5 leading-none"
          style={{ color: textColor }}
        >
          {code}
        </span>
      )}
    </div>
  );
};
