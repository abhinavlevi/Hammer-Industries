import React, { useRef, useState } from 'react';
import {
  Upload,
  RotateCcw,
  Shield,
  User,
  Building,
  Key,
  Calendar,
  Layers,
  ZoomIn,
  Move,
  Lock,
  Share2,
  Check,
  Sparkles,
} from 'lucide-react';
import { EmployeeData } from '../types/badge';
import { CHARACTER_PRESETS } from '../utils/presets';
import { sounds } from '../utils/audio';

interface EmployeeEditorProps {
  data: EmployeeData;
  onChange: (data: EmployeeData) => void;
  onShare: () => void;
  shareCopied: boolean;
}

export const EmployeeEditor: React.FC<EmployeeEditorProps> = ({
  data,
  onChange,
  onShare,
  shareCopied,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activePreset, setActivePreset] = useState<string>('justin-hammer');

  const handleFieldChange = (field: keyof EmployeeData, value: unknown) => {
    sounds.playClick();
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handlePresetSelect = (presetId: string) => {
    const found = CHARACTER_PRESETS.find((p) => p.id === presetId);
    if (!found) return;
    sounds.playSelect();
    setActivePreset(presetId);
    onChange({ ...found.data });
  };

  // 100% Browser-Local FileReader processing
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      alert('Please upload an image file (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result as string;
      if (result) {
        sounds.playShutter();
        onChange({
          ...data,
          photoUrl: result,
          photoZoom: 1.0,
          photoPanX: 0,
          photoPanY: 0,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const resetPhotoFraming = () => {
    sounds.playClick();
    onChange({
      ...data,
      photoZoom: 1.0,
      photoPanX: 0,
      photoPanY: 0,
    });
  };

  return (
    <div className="flex flex-col gap-6 text-slate-200">
      {/* 1. Curated Employee Presets (3-Column Selector) */}
      <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
              Curated Personnel Presets
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase">3 Authorized Roster Profiles</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {CHARACTER_PRESETS.map((preset) => {
            const isSelected = activePreset === preset.id && data.fullName === preset.data.fullName;
            return (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset.id)}
                className={`flex flex-col items-center p-2.5 rounded-xl border text-center transition-all duration-200 relative group overflow-hidden ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500'
                    : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                {/* Active Checkmark Pill */}
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}

                <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-700 mb-2 group-hover:scale-105 transition-transform">
                  <img
                    src={preset.avatar}
                    alt={preset.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <span className="text-xs font-bold text-slate-100 truncate w-full leading-tight">
                  {preset.name}
                </span>
                <span className="text-[9px] font-mono text-slate-400 truncate w-full mt-0.5">
                  {preset.subtitle}
                </span>
                <span className="inline-block mt-1 px-1.5 py-0.2 text-[8px] font-mono font-bold rounded bg-slate-900 text-emerald-400 border border-slate-700">
                  {preset.data.clearanceLevel === 'A' ? 'LEVEL A' : 'LEVEL B'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Photo Upload & Framing Controls */}
      <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
              Biometric Portrait &amp; Framing
            </h3>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[11px] font-bold transition shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload Photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>

        {/* Framing Sliders: Zoom, Pan X, Pan Y */}
        <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80 space-y-3">
          {/* Zoom Control */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5 text-slate-400" />
                Zoom Level
              </span>
              <span className="text-emerald-400 font-bold">{data.photoZoom.toFixed(2)}×</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.5"
              step="0.05"
              value={data.photoZoom}
              onChange={(e) => handleFieldChange('photoZoom', parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Pan X Control */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5 text-slate-400" />
                Horizontal Pan
              </span>
              <span className="text-emerald-400 font-bold">{data.photoPanX}%</span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              step="1"
              value={data.photoPanX}
              onChange={(e) => handleFieldChange('photoPanX', parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Pan Y Control */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5 text-slate-400" />
                Vertical Pan
              </span>
              <span className="text-emerald-400 font-bold">{data.photoPanY}%</span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              step="1"
              value={data.photoPanY}
              onChange={(e) => handleFieldChange('photoPanY', parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Reset Button */}
          <div className="pt-1 flex justify-end">
            <button
              onClick={resetPhotoFraming}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Position
            </button>
          </div>
        </div>

        {/* Mandatory Privacy Guarantee */}
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-[11px] text-emerald-400">
          <Lock className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
          <span>
            <strong>Privacy:</strong> Your photo stays in this browser and is never uploaded.
          </span>
        </div>
      </div>

      {/* 3. Credential Information Fields */}
      <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
              Employee Credential Records
            </h3>
          </div>
          <button
            onClick={onShare}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition border border-slate-700"
            title="Share configuration via URL"
          >
            {shareCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">LINK COPIED!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Share URL</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-400">
              Full Employee Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={data.fullName}
                onChange={(e) => handleFieldChange('fullName', e.target.value.toUpperCase())}
                placeholder="JUSTIN HAMMER"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-100 uppercase tracking-wider focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {/* Role / Title */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-400">
              Role / Designation
            </label>
            <input
              type="text"
              value={data.role}
              onChange={(e) => handleFieldChange('role', e.target.value.toUpperCase())}
              placeholder="CHIEF EXECUTIVE OFFICER"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-100 uppercase tracking-wider focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Department */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-400">
              Department / Unit
            </label>
            <div className="relative flex items-center">
              <Building className="w-3.5 h-3.5 absolute left-3 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={data.department}
                onChange={(e) => handleFieldChange('department', e.target.value.toUpperCase())}
                placeholder="EXECUTIVE MANAGEMENT"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs font-semibold text-slate-100 uppercase tracking-wider focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {/* Clearance Level */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-400">
              Clearance Level
            </label>
            <div className="relative flex items-center">
              <Key className="w-3.5 h-3.5 absolute left-3 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={data.clearanceLevel}
                onChange={(e) => handleFieldChange('clearanceLevel', e.target.value.toUpperCase())}
                placeholder="A"
                maxLength={8}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs font-bold text-emerald-400 uppercase tracking-wider focus:outline-none focus:border-emerald-500 transition font-mono"
              />
            </div>
          </div>

          {/* Badge Serial ID */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-400">
              Badge Serial Number
            </label>
            <input
              type="text"
              value={data.badgeId}
              onChange={(e) => {
                const val = e.target.value.toUpperCase();
                onChange({
                  ...data,
                  badgeId: val,
                  barcodeText: `*${val.replace(/[^A-Z0-9]/g, '')}*`,
                });
              }}
              placeholder="HI-001-JH-793"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-100 uppercase tracking-wider focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Blood Type */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-400">
              Blood Type (Medical)
            </label>
            <input
              type="text"
              value={data.bloodType}
              onChange={(e) => handleFieldChange('bloodType', e.target.value.toUpperCase())}
              placeholder="O-POS"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Issue Date */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-400">
              Date of Issue
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-3.5 h-3.5 absolute left-3 text-slate-500 pointer-events-none" />
              <input
                type="date"
                value={data.issueDate}
                onChange={(e) => handleFieldChange('issueDate', e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {/* Expiration Date */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-400">
              Expiration Date
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-3.5 h-3.5 absolute left-3 text-slate-500 pointer-events-none" />
              <input
                type="date"
                value={data.expiryDate}
                onChange={(e) => handleFieldChange('expiryDate', e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Access Zones Selector */}
        <div className="space-y-1.5 pt-1">
          <label className="text-[10px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            Authorized Facility Zones (Comma Separated)
          </label>
          <input
            type="text"
            value={data.accessZones.join(', ')}
            onChange={(e) => {
              const zones = e.target.value
                .split(',')
                .map((z) => z.trim().toUpperCase())
                .filter(Boolean);
              handleFieldChange('accessZones', zones);
            }}
            placeholder="HQ-EXEC, R&D-ALPHA, WEAPONS-SYS, FLIGHT-TEST"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 uppercase tracking-wider focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>
    </div>
  );
};
