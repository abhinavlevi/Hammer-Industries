import React from 'react';
import { Volume2, VolumeX, CreditCard, LayoutGrid } from 'lucide-react';
import { CardLayout } from '../types/badge';
import { sounds } from '../utils/audio';

interface HeaderProps {
  layout: CardLayout;
  setLayout: (layout: CardLayout) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  layout,
  setLayout,
  soundEnabled,
  setSoundEnabled,
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    sounds.enabled = next;
    setSoundEnabled(next);
    if (next) sounds.playClick();
  };

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Identity */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
              <img
                src="/presets/logo_dark.png"
                alt="Hammer Advanced Weapons Systems"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black tracking-widest text-emerald-700 uppercase">
                  HAWS // SEC-ID-SYSTEM
                </span>
                <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-800 text-[9px] font-mono font-bold rounded border border-emerald-300">
                  CLASSIFIED
                </span>
              </div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                [Hammer Industries] Security ID Generator
              </h1>
            </div>
          </div>
        </div>

        {/* Layout Switcher & Audio Toggle */}
        <div className="flex items-center gap-3">
          {/* Card Layout Selector: Vertical vs. Horizontal */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
            <button
              onClick={() => {
                sounds.playSelect();
                setLayout('vertical');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                layout === 'vertical'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Vertical Credential</span>
              <span className="text-[9px] opacity-80">320×490</span>
            </button>

            <button
              onClick={() => {
                sounds.playSelect();
                setLayout('horizontal');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                layout === 'horizontal'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Horizontal Keycard</span>
              <span className="text-[9px] opacity-80">500×315</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2.5 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-white border-slate-300 text-emerald-700 hover:bg-slate-50 shadow-sm'
                : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
            }`}
            title={soundEnabled ? 'Mute synthesized UI tones' : 'Enable synthesized UI tones'}
            aria-label="Toggle synthesized sound effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
