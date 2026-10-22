import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { EmployeeEditor } from './components/EmployeeEditor';
import { BadgePreview } from './components/BadgePreview';
import { CardLayout, CardSide, EmployeeData } from './types/badge';
import { CHARACTER_PRESETS } from './utils/presets';
import { encodeBadgeToHash, decodeBadgeFromHash } from './utils/urlSync';
import { sounds } from './utils/audio';
import { ShieldAlert, Cpu, Sparkles, Terminal, FileCode, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const [layout, setLayout] = useState<CardLayout>('vertical');
  const [side, setSide] = useState<CardSide>('front');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  // Initialize from URL hash if available, otherwise default to Justin Hammer
  const [data, setData] = useState<EmployeeData>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const decoded = decodeBadgeFromHash(window.location.hash);
      if (decoded?.data) {
        return {
          ...CHARACTER_PRESETS[0].data,
          ...decoded.data,
        };
      }
    }
    return { ...CHARACTER_PRESETS[0].data };
  });

  // Handle initial layout from hash
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const decoded = decodeBadgeFromHash(window.location.hash);
      if (decoded?.layout) {
        setLayout(decoded.layout);
      }
    }
  }, []);

  // Update URL hash when data or layout changes
  const handleShare = () => {
    sounds.playSelect();
    const hash = encodeBadgeToHash(data, layout);
    const url = `${window.location.origin}${window.location.pathname}#badge=${hash}`;
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* Vercel Analytics */}
      <Analytics />

      {/* Corporate Header */}
      <Header
        layout={layout}
        setLayout={setLayout}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Studio Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Banner Announcement */}
        <div className="mb-8 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 font-mono tracking-wide">
                HAMMER ADVANCED WEAPONS SYSTEMS // CREDENTIAL GENERATOR
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Authorized defense contractor identification studio. Authentic screen-accurate prop replica with 3× print export.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>CR-80 SPECIFICATION READY</span>
          </div>
        </div>

        {/* Studio Workspace: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Editor Controls (5 cols on large screens) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <EmployeeEditor
              data={data}
              onChange={setData}
              onShare={handleShare}
              shareCopied={shareCopied}
            />
          </div>

          {/* Right Column: Live 3D Badge Preview & Exporter (7 cols on large screens) */}
          <div className="lg:col-span-7 order-1 lg:order-2 lg:sticky lg:top-28">
            <BadgePreview
              layout={layout}
              side={side}
              setSide={setSide}
              data={data}
            />
          </div>
        </div>

        {/* Technical Architecture & Prop Specification Section */}
        <section className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <Terminal className="w-5 h-5 text-emerald-700" />
            <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-slate-800">
              Technical Credential Architecture &amp; Physical Specifications
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Spec Card 1 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs font-bold">
                <FileCode className="w-4 h-4 text-emerald-700" />
                <span>CR-80 &amp; ISO 7810 FORM FACTOR</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard CR-80 credit-card dimensions (3.370 × 2.125 inches / 85.6 × 53.98 mm) mapped to 320×490 px vertical and 500×315 px horizontal viewports. Dual-sided registration conforms to standard PVC card sublimation printers.
              </p>
            </div>

            {/* Spec Card 2 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs font-bold">
                <Cpu className="w-4 h-4 text-emerald-700" />
                <span>SMART CHIP &amp; HOLOGRAPHIC FOIL</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Features ISO/IEC 7816 contact pad trace geometries, 13.56 MHz RFID proximity indicator glyphs, and dynamic angle-specular iridescent holographic foil authentication seals.
              </p>
            </div>

            {/* Spec Card 3 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs font-bold">
                <ShieldAlert className="w-4 h-4 text-emerald-700" />
                <span>3× ULTRA-HD RESOLUTION EXPORT</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct rasterization via <code className="text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded font-mono text-[11px]">html-to-image</code> at <code className="text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded font-mono text-[11px]">pixelRatio: 3</code> produces 960×1470 px and 1500×945 px PNGs with zero font distortion or subpixel scaling artifacts.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Corporate Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-8 text-xs text-slate-600 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/presets/logo_dark.png"
              alt="Hammer Logo"
              className="h-5 w-auto opacity-70"
            />
            <span>HAMMER ADVANCED WEAPONS SYSTEMS • QUEENS, NY • CLASSIFIED ASSET</span>
          </div>
          <div>
            <span>100% IN-BROWSER SECURE RENDERING • ZERO REMOTE UPLOADS</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
