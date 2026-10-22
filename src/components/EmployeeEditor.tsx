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
    <div className="flex flex-col gap-6 text-slate-800">
      {/* 1. Curated Employee Presets (3-Column Selector) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-800">
              Curated Personnel Presets
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">3 Authorized Profiles</span>
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
                    ? 'bg-emerald-50/80 border-emerald-600 shadow-sm ring-1 ring-emerald-500'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                {/* Active Checkmark Pill */}
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}

                <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shadow-xs mb-2 group-hover:scale-105 transition-transform bg-white">
                  <img
                    src={preset.avatar}
                    alt={preset.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <span className="text-xs font-bold text-slate-900 truncate w-full leading-tight">
                  {preset.name}
                </span>
                <span className="text-[9px] font-mono text-slate-600 truncate w-full mt-0.5">
                  {preset.subtitle}
                </span>
                <span className="inline-block mt-1 px-1.5 py-0.5 text-[8px] font-mono font-bold rounded bg-slate-200/80 text-emerald-800 border border-slate-300/80">
                  {preset.data.clearanceLevel === 'A' ? 'CLASS A' : 'CLASS B'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Photo Upload & Framing Controls */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-800">
              Biometric Portrait &amp; Framing
            </h3>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-[11px] font-bold transition shadow-xs"
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
        <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200 space-y-3">
          {/* Zoom Control */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-slate-600">
              <span className="flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5 text-slate-500" />
                Zoom Level
              </span>
              <span className="text-emerald-700 font-bold">{data.photoZoom.toFixed(2)}×</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.5"
              step="0.05"
              value={data.photoZoom}
              onChange={(e) => handleFieldChange('photoZoom', parseFloat(e.target.value))}
              className="w-full accent-emerald-600 bg-slate-200 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Pan X Control */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-slate-600">
              <span className="flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5 text-slate-500" />
                Horizontal Pan
              </span>
              <span className="text-emerald-700 font-bold">{data.photoPanX}%</span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              step="1"
              value={data.photoPanX}
              onChange={(e) => handleFieldChange('photoPanX', parseInt(e.target.value))}
              className="w-full accent-emerald-600 bg-slate-200 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Pan Y Control */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-slate-600">
              <span className="flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5 text-slate-500" />
                Vertical Pan
              </span>
              <span className="text-emerald-700 font-bold">{data.photoPanY}%</span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              step="1"
              value={data.photoPanY}
              onChange={(e) => handleFieldChange('photoPanY', parseInt(e.target.value))}
              className="w-full accent-emerald-600 bg-slate-200 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Reset Button */}
          <div className="pt-1 flex justify-end">
            <button
              onClick={resetPhotoFraming}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Position
            </button>
          </div>
        </div>

        {/* Mandatory Privacy Guarantee */}
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900">
          <Lock className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-700" />
          <span>
            <strong>Privacy:</strong> Your photo stays in this browser and is never uploaded.
          </span>
        </div>
      </div>

      {/* 3. Credential Information Fields */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-800">
              Employee Credential Records
            </h3>
          </div>
          <button
            onClick={onShare}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs transition border border-slate-300"
            title="Share configuration via URL"
          >
            {shareCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-emerald-700 font-bold">LINK COPIED!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share URL</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-600">
              Full Employee Name
            </label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleFieldChange('fullName', e.target.value.toUpperCase())}
              placeholder="JUSTIN HAMMER"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 uppercase tracking-wider focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 transition shadow-2xs"
            />
          </div>

          {/* Role / Title */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-600">
              Role / Designation
            </label>
            <input
              type="text"
              value={data.role}
              onChange={(e) => handleFieldChange('role', e.target.value.toUpperCase())}
              placeholder="CHIEF EXECUTIVE OFFICER"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 uppercase tracking-wider focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 transition shadow-2xs"
            />
          </div>

          {/* Department */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-600">
              Department / Unit
            </label>
            <div className="relative flex items-center">
              <Building className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={data.department}
                onChange={(e) => handleFieldChange('department', e.target.value.toUpperCase())}
                placeholder="EXECUTIVE MANAGEMENT"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-xs font-semibold text-slate-900 uppercase tracking-wider focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 transition shadow-2xs"
              />
            </div>
          </div>

          {/* Clearance Level */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-600">
              Clearance Level
            </label>
            <div className="relative flex items-center">
              <Key className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={data.clearanceLevel}
                onChange={(e) => handleFieldChange('clearanceLevel', e.target.value.toUpperCase())}
                placeholder="A"
                maxLength={8}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-xs font-bold text-emerald-800 uppercase tracking-wider focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 transition font-mono shadow-2xs"
              />
            </div>
          </div>

          {/* Badge Serial ID */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-600">
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
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-900 uppercase tracking-wider focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 transition shadow-2xs"
            />
          </div>

          {/* Blood Type */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-600">
              Blood Type (Medical)
            </label>
            <input
              type="text"
              value={data.bloodType}
              onChange={(e) => handleFieldChange('bloodType', e.target.value.toUpperCase())}
              placeholder="O-POS"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono font-semibold text-rose-700 uppercase tracking-wider focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 transition shadow-2xs"
            />
          </div>

          {/* Issue Date */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-600">
              Date of Issue
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type="date"
                value={data.issueDate}
                onChange={(e) => handleFieldChange('issueDate', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 transition shadow-2xs"
              />
            </div>
          </div>

          {/* Expiration Date */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-slate-600">
              Expiration Date
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
              <input
                type="date"
                value={data.expiryDate}
                onChange={(e) => handleFieldChange('expiryDate', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 transition shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Access Zones Selector */}
        <div className="space-y-1.5 pt-1">
          <label className="text-[10px] font-mono font-bold uppercase text-slate-600 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
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
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800 uppercase tracking-wider focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500 transition shadow-2xs"
          />
        </div>
      </div>
    </div>
  );
};
