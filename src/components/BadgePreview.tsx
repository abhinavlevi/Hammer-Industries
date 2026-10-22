import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { RotateCw, Download, Check, Sparkles, AlertCircle } from 'lucide-react';
import { CardLayout, CardSide, EmployeeData } from '../types/badge';
import { VerticalCard } from './VerticalCard';
import { HorizontalCard } from './HorizontalCard';
import { sounds } from '../utils/audio';

interface BadgePreviewProps {
  layout: CardLayout;
  side: CardSide;
  setSide: (side: CardSide) => void;
  data: EmployeeData;
}

export const BadgePreview: React.FC<BadgePreviewProps> = ({
  layout,
  side,
  setSide,
  data,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showLanyard, setShowLanyard] = useState(true);

  // Hidden off-screen capture refs for both front and back
  const captureFrontRef = useRef<HTMLDivElement>(null);
  const captureBackRef = useRef<HTMLDivElement>(null);

  const flipCard = () => {
    sounds.playFlip();
    setSide(side === 'front' ? 'back' : 'front');
  };

  const handleDownloadSide = async (targetSide: 'front' | 'back') => {
    setIsExporting(true);
    sounds.playClick();

    try {
      const node = targetSide === 'front' ? captureFrontRef.current : captureBackRef.current;
      if (!node) throw new Error('Capture node not found');

      const width = layout === 'vertical' ? 320 : 500;
      const height = layout === 'vertical' ? 490 : 315;

      // Clean 3x pixel ratio print-ready PNG
      const dataUrl = await toPng(node, {
        pixelRatio: 3,
        width,
        height,
        cacheBust: true,
        style: {
          transform: 'none',
          boxShadow: 'none',
        },
      });

      const filename = `HAMMER-ID-${data.badgeId || 'CARD'}-${layout.toUpperCase()}-${targetSide.toUpperCase()}-3X.png`;
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();

      sounds.playDownload();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Could not export high-res PNG. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadBoth = async () => {
    setIsExporting(true);
    try {
      await handleDownloadSide('front');
      await new Promise((r) => setTimeout(r, 600));
      await handleDownloadSide('back');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full min-h-[580px] p-6 bg-white rounded-2xl border border-slate-200 shadow-sm backdrop-blur-md relative overflow-hidden">
      {/* Subtle top indicator bar */}
      <div className="w-full flex items-center justify-between pb-4 border-b border-slate-100 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-mono uppercase tracking-wider font-bold text-slate-800">
            {layout === 'vertical' ? 'CR-80 Vertical Credential (320×490)' : 'ID-1 Horizontal Access Card (500×315)'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {layout === 'vertical' && (
            <button
              onClick={() => setShowLanyard(!showLanyard)}
              className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition border border-slate-200"
              title="Toggle Lanyard Clip"
            >
              Lanyard Clip: {showLanyard ? 'ON' : 'OFF'}
            </button>
          )}

          <button
            onClick={flipCard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono text-xs font-bold transition shadow-xs"
          >
            <RotateCw className="w-3.5 h-3.5" />
            FLIP ({side.toUpperCase()})
          </button>
        </div>
      </div>

      {/* 3D Flip Card Scene Container */}
      <div
        className="my-auto py-6 flex flex-col items-center justify-center relative w-full"
        style={{ perspective: '1400px' }}
      >
        {/* Realistic Metal Badge Clip & Clear Vinyl Strap (for Vertical Badge) */}
        {layout === 'vertical' && showLanyard && (
          <div className="flex flex-col items-center pointer-events-none -mb-3 z-30 transition-opacity duration-300">
            {/* Chrome Bulldog Clip */}
            <div className="w-7 h-10 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 rounded-t-sm shadow-md border border-slate-400 flex flex-col items-center justify-between py-1">
              <div className="w-4 h-1.5 bg-slate-600 rounded-sm" />
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-slate-300 to-white border border-slate-400 shadow-inner flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              </div>
            </div>
            {/* Clear Vinyl Strap with metal snap button */}
            <div className="w-4 h-9 bg-white/70 backdrop-blur-sm border-x border-slate-300 shadow-xs flex items-center justify-center relative">
              <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-slate-300 to-white border border-slate-400 shadow-xs" />
            </div>
          </div>
        )}

        {/* Outer 3D Card flipper */}
        <div
          className="relative transition-transform duration-700 ease-in-out cursor-pointer hover:shadow-2xl"
          style={{
            transformStyle: 'preserve-3d',
            transform: side === 'back' ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
          onClick={flipCard}
        >
          {/* FRONT FACE */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {layout === 'vertical' ? (
              <VerticalCard data={data} side="front" showLanyardSlot={showLanyard} />
            ) : (
              <HorizontalCard data={data} side="front" />
            )}
          </div>

          {/* BACK FACE */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {layout === 'vertical' ? (
              <VerticalCard data={data} side="back" showLanyardSlot={showLanyard} />
            ) : (
              <HorizontalCard data={data} side="back" />
            )}
          </div>
        </div>

        {/* Flip hint label */}
        <p className="mt-4 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
          <RotateCw className="w-3 h-3 text-slate-400" />
          Click card or press button to flip between Front and Back
        </p>
      </div>

      {/* Hidden Off-Screen Nodes For 100% Crisp 3× Capture (Never Scaled or Transformed) */}
      <div
        className="fixed top-[-99999px] left-[-99999px] pointer-events-none opacity-100 z-[-1]"
        aria-hidden="true"
      >
        <div ref={captureFrontRef}>
          {layout === 'vertical' ? (
            <VerticalCard data={data} side="front" showLanyardSlot={false} />
          ) : (
            <HorizontalCard data={data} side="front" />
          )}
        </div>
        <div ref={captureBackRef}>
          {layout === 'vertical' ? (
            <VerticalCard data={data} side="back" showLanyardSlot={false} />
          ) : (
            <HorizontalCard data={data} side="back" />
          )}
        </div>
      </div>

      {/* Bottom Action Footer with Export Buttons */}
      <div className="w-full pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownloadSide('front')}
            disabled={isExporting}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition active:scale-95 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export Front (3×)
          </button>

          <button
            onClick={() => handleDownloadSide('back')}
            disabled={isExporting}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition active:scale-95 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export Back (3×)
          </button>
        </div>

        <button
          onClick={handleDownloadBoth}
          disabled={isExporting}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-900/20 border border-emerald-600 transition active:scale-95 disabled:opacity-50"
        >
          {downloadSuccess ? (
            <>
              <Check className="w-4 h-4 text-white" />
              PRINT FILES SAVED!
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-emerald-200" />
              {isExporting ? 'RASTERIZING 3×...' : 'DOWNLOAD DUAL-SIDED 3× PNG'}
            </>
          )}
        </button>
      </div>

      {/* Privacy guarantee badge */}
      <div className="w-full text-center mt-2.5">
        <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
          <AlertCircle className="w-3.5 h-3.5 text-emerald-600" />
          Privacy: Your photo stays in this browser and is never uploaded.
        </span>
      </div>
    </div>
  );
};
