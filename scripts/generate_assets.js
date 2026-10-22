import sharp from 'sharp';
import fs from 'fs';

async function generateAssets() {
  console.log('Generating SEO & Favicon assets...');

  // SVG Favicon with Hammer iconic stealth jet / chevron logo
  const svgFavicon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a192f" />
      <stop offset="100%" stop-color="#020c1b" />
    </linearGradient>
    <linearGradient id="emerald" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#34d399" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <rect width="128" height="128" rx="28" fill="url(#bg)" stroke="#10b981" stroke-width="3" stroke-opacity="0.4" />
  
  <!-- Subtle technical grid -->
  <line x1="20" y1="64" x2="108" y2="64" stroke="#10b981" stroke-width="0.5" stroke-opacity="0.2" />
  <line x1="64" y1="20" x2="64" y2="108" stroke="#10b981" stroke-width="0.5" stroke-opacity="0.2" />
  
  <!-- Hammer Jet / Chevron Emblem -->
  <g transform="translate(64, 52) scale(0.68)" filter="url(#glow)">
    <!-- Central Jet Fuselage -->
    <path d="M0 -42 L8 -12 L12 28 L0 34 L-12 28 L-8 -12 Z" fill="#ffffff" />
    <circle cx="0" cy="-42" r="5" fill="#34d399" />
    <!-- Wing Chevrons -->
    <path d="M14 -2 L24 24 L14 26 Z" fill="#ffffff" opacity="0.9" />
    <path d="M-14 -2 L-24 24 L-14 26 Z" fill="#ffffff" opacity="0.9" />
    <path d="M26 6 L36 28 L26 30 Z" fill="#ffffff" opacity="0.8" />
    <path d="M-26 6 L-36 28 L-26 30 Z" fill="#ffffff" opacity="0.8" />
    <path d="M38 14 L46 32 L38 34 Z" fill="#ffffff" opacity="0.7" />
    <path d="M-38 14 L-46 32 L-38 34 Z" fill="#ffffff" opacity="0.7" />
  </g>
  
  <!-- Text 'HAMMER' mini indicator -->
  <text x="64" y="105" text-anchor="middle" fill="#34d399" font-family="monospace, sans-serif" font-weight="900" font-size="13" letter-spacing="3">HAMMER</text>
</svg>
`;

  fs.writeFileSync('public/favicon.svg', svgFavicon.trim());

  // Generate PNG sizes
  const svgBuf = Buffer.from(svgFavicon);
  await sharp(svgBuf).resize(16, 16).png().toFile('public/favicon-16x16.png');
  await sharp(svgBuf).resize(32, 32).png().toFile('public/favicon-32x32.png');
  await sharp(svgBuf).resize(48, 48).png().toFile('public/favicon.ico');
  await sharp(svgBuf).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  await sharp(svgBuf).resize(192, 192).png().toFile('public/android-chrome-192x192.png');
  await sharp(svgBuf).resize(512, 512).png().toFile('public/android-chrome-512x512.png');

  // Generate 1200x630 OpenGraph Image
  const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="ogbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#06101e" />
      <stop offset="50%" stop-color="#0a192f" />
      <stop offset="100%" stop-color="#020813" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e3a5f" stroke-width="0.7" stroke-opacity="0.3" />
    </pattern>
    <linearGradient id="badgeGreen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2d844c" />
      <stop offset="100%" stop-color="#1b5e32" />
    </linearGradient>
  </defs>
  
  <rect width="1200" height="630" fill="url(#ogbg)" />
  <rect width="1200" height="630" fill="url(#grid)" />
  
  <!-- Subtle radar circles in background -->
  <circle cx="950" cy="315" r="260" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.1" />
  <circle cx="950" cy="315" r="180" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.15" stroke-dasharray="6 6" />
  <circle cx="950" cy="315" r="90" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.2" />

  <!-- Left Content -->
  <g transform="translate(100, 160)">
    <!-- Security Classification Tag -->
    <rect x="0" y="0" width="280" height="32" rx="4" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1" />
    <text x="16" y="21" fill="#34d399" font-family="monospace, monospace" font-size="13" font-weight="700" letter-spacing="2">SECURITY CLEARANCE // LEVEL A</text>
    
    <text x="0" y="90" fill="#ffffff" font-family="'Inter', system-ui, sans-serif" font-size="54" font-weight="900" letter-spacing="-1">
      HAMMER INDUSTRIES
    </text>
    <text x="0" y="145" fill="#94a3b8" font-family="'Inter', system-ui, sans-serif" font-size="34" font-weight="500">
      Security ID &amp; Credential Generator
    </text>
    <text x="0" y="200" fill="#64748b" font-family="'Inter', system-ui, sans-serif" font-size="20" font-weight="400">
      High-Fidelity Prop Replica • Dual-Sided Verification • 3× Ultra-Res Print PNG
    </text>

    <!-- Badges info bar -->
    <g transform="translate(0, 260)">
      <rect x="0" y="0" width="160" height="42" rx="6" fill="#0f233d" stroke="#1e3a5f" stroke-width="1" />
      <text x="80" y="26" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="14" font-weight="600">CR-80 FORMAT</text>
      
      <rect x="175" y="0" width="170" height="42" rx="6" fill="#0f233d" stroke="#1e3a5f" stroke-width="1" />
      <text x="260" y="26" text-anchor="middle" fill="#e2e8f0" font-family="monospace" font-size="14" font-weight="600">CODE-128 BARCODE</text>
      
      <rect x="360" y="0" width="150" height="42" rx="6" fill="#0f233d" stroke="#1e3a5f" stroke-width="1" />
      <text x="435" y="26" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="14" font-weight="700">100% PRIVATE</text>
    </g>
  </g>

  <!-- Right: Mockup Badge Card Visual -->
  <g transform="translate(820, 80) rotate(4)">
    <!-- Shadow -->
    <rect x="-8" y="12" width="280" height="440" rx="14" fill="#000000" opacity="0.5" />
    
    <!-- Vertical Badge Card Body -->
    <rect x="0" y="0" width="280" height="440" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
    
    <!-- Lanyard hole slot -->
    <rect x="110" y="10" width="60" height="10" rx="5" fill="#334155" />
    
    <!-- Green header banner -->
    <rect x="14" y="32" width="252" height="60" fill="#2d844c" rx="4" />
    <rect x="24" y="40" width="232" height="44" fill="#ffffff" rx="2" />
    <text x="140" y="62" text-anchor="middle" fill="#091e3a" font-family="sans-serif" font-weight="900" font-size="15" letter-spacing="2">HAMMER</text>
    <text x="140" y="75" text-anchor="middle" fill="#091e3a" font-family="sans-serif" font-weight="700" font-size="8" letter-spacing="1">ADVANCED WEAPONS SYSTEMS</text>

    <!-- Lattice Pattern Area with Portrait Frame -->
    <rect x="14" y="98" width="252" height="250" fill="#2d844c" fill-opacity="0.12" />
    <rect x="55" y="112" width="170" height="175" fill="#cbd5e1" rx="2" stroke="#475569" stroke-width="1" />
    
    <!-- Attached Nameplate -->
    <rect x="55" y="287" width="170" height="40" fill="#ffffff" stroke="#475569" stroke-width="1" />
    <text x="140" y="306" text-anchor="middle" fill="#091e3a" font-family="sans-serif" font-weight="900" font-size="13" letter-spacing="1">JUSTIN HAMMER</text>
    <text x="140" y="320" text-anchor="middle" fill="#475569" font-family="sans-serif" font-weight="600" font-size="8">CHIEF EXECUTIVE OFFICER</text>
    
    <!-- Clearance Big 'A' -->
    <text x="36" y="340" fill="#091e3a" font-family="sans-serif" font-weight="900" font-size="44">A</text>
    
    <!-- Barcode Footer -->
    <g transform="translate(30, 368)">
      <rect x="0" y="0" width="220" height="50" fill="#ffffff" />
      <!-- Barcode lines -->
      <line x1="10" y1="5" x2="10" y2="38" stroke="#000000" stroke-width="3" />
      <line x1="18" y1="5" x2="18" y2="38" stroke="#000000" stroke-width="1.5" />
      <line x1="24" y1="5" x2="24" y2="38" stroke="#000000" stroke-width="4" />
      <line x1="34" y1="5" x2="34" y2="38" stroke="#000000" stroke-width="2" />
      <line x1="42" y1="5" x2="42" y2="38" stroke="#000000" stroke-width="1" />
      <line x1="48" y1="5" x2="48" y2="38" stroke="#000000" stroke-width="3" />
      <line x1="56" y1="5" x2="56" y2="38" stroke="#000000" stroke-width="4.5" />
      <line x1="68" y1="5" x2="68" y2="38" stroke="#000000" stroke-width="1.5" />
      <line x1="75" y1="5" x2="75" y2="38" stroke="#000000" stroke-width="3" />
      <line x1="84" y1="5" x2="84" y2="38" stroke="#000000" stroke-width="1" />
      <line x1="90" y1="5" x2="90" y2="38" stroke="#000000" stroke-width="4" />
      <line x1="102" y1="5" x2="102" y2="38" stroke="#000000" stroke-width="2" />
      <line x1="110" y1="5" x2="110" y2="38" stroke="#000000" stroke-width="1.5" />
      <line x1="118" y1="5" x2="118" y2="38" stroke="#000000" stroke-width="3.5" />
      <line x1="128" y1="5" x2="128" y2="38" stroke="#000000" stroke-width="2" />
      <line x1="136" y1="5" x2="136" y2="38" stroke="#000000" stroke-width="4" />
      <line x1="148" y1="5" x2="148" y2="38" stroke="#000000" stroke-width="1" />
      <line x1="156" y1="5" x2="156" y2="38" stroke="#000000" stroke-width="2.5" />
      <line x1="166" y1="5" x2="166" y2="38" stroke="#000000" stroke-width="4" />
      <line x1="178" y1="5" x2="178" y2="38" stroke="#000000" stroke-width="2" />
      <line x1="188" y1="5" x2="188" y2="38" stroke="#000000" stroke-width="1" />
      <line x1="196" y1="5" x2="196" y2="38" stroke="#000000" stroke-width="3" />
      <line x1="206" y1="5" x2="206" y2="38" stroke="#000000" stroke-width="2" />
      <text x="110" y="46" text-anchor="middle" fill="#000000" font-family="monospace" font-size="9" font-weight="700">HI-001-JH-793</text>
    </g>
  </g>
</svg>
`;

  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png()
    .toFile('public/og-image.png');

  console.log('All icons, manifest, and OG image created!');
}

generateAssets();
