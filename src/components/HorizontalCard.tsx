import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Wifi } from 'lucide-react';
import { EmployeeData } from '../types/badge';
import { Barcode } from './Barcode';
import { SmartChip } from './SmartChip';
import { HolographicSeal } from './HolographicSeal';
import { SchematicWatermark } from './SchematicWatermark';

interface HorizontalCardProps {
  data: EmployeeData;
  side: 'front' | 'back';
}

export const HorizontalCard: React.FC<HorizontalCardProps> = ({ data, side }) => {
  // Physical dimensions must be exactly 500 x 315 px.
  // Scaling must only occur on an outer preview wrapper.

  if (side === 'front') {
    return (
      <div
        id="badge-capture-node"
        className="relative w-[500px] h-[315px] bg-[#F8FAFC] text-[#091E3A] rounded-[14px] shadow-2xl overflow-hidden flex flex-col justify-between border border-slate-300 select-none box-border"
        style={{
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Subtle schematic watermark */}
        <SchematicWatermark opacity={0.035} />

        {/* Top Header Bar */}
        <div className="pt-3 px-5 pb-2 border-b border-slate-200 bg-white flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <img
              src="/presets/logo_dark.png"
              alt="Hammer Advanced Weapons Systems"
              className="h-9 w-auto object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 bg-emerald-900 text-white rounded text-[9px] font-mono font-bold tracking-widest flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              FACILITY ACCESS // CLASS {data.clearanceLevel || 'A'}
            </div>
            <div className="flex items-center text-slate-500">
              <Wifi className="w-4 h-4 rotate-90 text-emerald-700" />
            </div>
          </div>
        </div>

        {/* Main Content: Side-by-side Layout */}
        <div className="flex-1 px-5 py-2.5 flex items-center gap-4 z-10">
          {/* Left Column: Portrait with attached nameplate */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-[124px] h-[148px] bg-white border border-slate-700 overflow-hidden shadow relative">
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  transform: `scale(${data.photoZoom}) translate(${data.photoPanX}%, ${data.photoPanY}%)`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.05s ease-out',
                }}
              >
                <img
                  src={data.photoUrl}
                  alt={data.fullName}
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
              </div>
              <div className="absolute inset-0 border border-black/15 pointer-events-none" />
            </div>

            {/* Clearance badge banner attached to bottom of portrait */}
            <div className="w-[124px] bg-[#091E3A] text-white text-center py-1 font-mono text-[9px] font-extrabold tracking-wider shadow">
              LEVEL {data.clearanceLevel || 'A'} CLEARANCE
            </div>
          </div>

          {/* Right Column: Employee Identity & Technical Specifications */}
          <div className="flex-1 flex flex-col justify-between h-[170px] py-0.5">
            <div>
              <div className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                PERSONNEL IDENTIFICATION
              </div>
              <h2 className="text-[17px] font-black text-[#091E3A] tracking-tight leading-snug uppercase truncate">
                {data.fullName || 'EMPLOYEE NAME'}
              </h2>
              <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide truncate">
                {data.role || 'TITLE / ASSIGNMENT'}
              </p>
              <p className="text-[8.5px] font-medium text-slate-600 uppercase tracking-tight truncate">
                {data.department || 'OPERATIONS'}
              </p>
            </div>

            {/* Access Matrix Grid */}
            <div className="grid grid-cols-3 gap-2 bg-slate-100 border border-slate-300 rounded p-1.5 text-[8.5px]">
              <div>
                <span className="block text-slate-500 text-[7px] font-semibold">BADGE ID</span>
                <span className="font-mono font-bold text-[#091E3A]">{data.badgeId}</span>
              </div>
              <div>
                <span className="block text-slate-500 text-[7px] font-semibold">EXPIRATION</span>
                <span className="font-mono font-bold text-slate-800">{data.expiryDate}</span>
              </div>
              <div>
                <span className="block text-slate-500 text-[7px] font-semibold">BLOOD TYPE</span>
                <span className="font-mono font-bold text-rose-800">{data.bloodType}</span>
              </div>
            </div>

            {/* Authorized Zones Tags */}
            <div className="flex items-center gap-1 overflow-hidden">
              <span className="text-[7.5px] font-mono text-slate-500 font-bold">ZONES:</span>
              <div className="flex items-center gap-1 truncate">
                {data.accessZones.map((zone, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded font-mono text-[7px] font-semibold"
                  >
                    {zone}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Barcode and Verification */}
        <div className="bg-white border-t border-slate-300 px-5 py-2 flex items-center justify-between z-10">
          <div className="w-[310px]">
            <Barcode
              code={data.barcodeText || `*${data.badgeId.replace(/[^A-Z0-9]/gi, '')}*`}
              height={32}
              textColor="#091E3A"
            />
          </div>
          <div className="flex items-center gap-3">
            <HolographicSeal size={38} />
          </div>
        </div>
      </div>
    );
  }

  // HORIZONTAL CARD BACK (500 x 315 px)
  return (
    <div
      id="badge-capture-node"
      className="relative w-[500px] h-[315px] bg-[#F8FAFC] text-[#091E3A] rounded-[14px] shadow-2xl overflow-hidden flex flex-col justify-between border border-slate-300 select-none box-border"
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <SchematicWatermark opacity={0.04} />

      {/* Top Magnetic Stripe */}
      <div className="w-full h-11 bg-[#1e293b] border-b border-slate-900 shadow-inner flex items-center justify-between px-6">
        <span className="text-[7.5px] font-mono tracking-widest text-slate-400 opacity-60">
          MAGSTRIPE TRACK 1 • HAWS-{data.badgeId.replace(/[^a-zA-Z0-9]/g, '')} • ENCRYPTED PROXIMITY
        </span>
        <span className="text-[7.5px] font-mono text-emerald-400 font-bold">ISO 7810 / ID-1</span>
      </div>

      {/* Main Body */}
      <div className="flex-1 px-6 py-2.5 flex items-center justify-between gap-5 z-10">
        {/* Left Side: Smart Chip + Hologram + Security details */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-4">
            <SmartChip />
            <HolographicSeal size={42} />
            <div className="flex flex-col text-[8px] font-mono">
              <span className="font-bold text-[#091E3A]">CRYPTOGRAPHIC HW SEC</span>
              <span className="text-slate-500">HAWS-CIPHER-256</span>
              <span className="text-emerald-800 font-bold">TAMPER RESISTANT</span>
            </div>
          </div>

          {/* Legal Return Statement */}
          <div className="text-[7.5px] leading-tight text-slate-700 max-w-[270px] border-l-2 border-slate-400 pl-2">
            <strong className="block text-[#091E3A] uppercase">Hammer Corporate Property</strong>
            Confidential DoD contractor identification. If recovered, return to: Hammer Advanced Weapons Systems, Division of Physical Security, Facility 04, Long Island City, NY.
          </div>
        </div>

        {/* Right Side: QR Code Verification + Brandmark */}
        <div className="flex flex-col items-end gap-1.5">
          <img
            src="/presets/logo_dark.png"
            alt="Hammer Advanced Weapons Systems"
            className="h-7 w-auto object-contain opacity-85"
          />
          <div className="p-1.5 bg-white border border-slate-300 rounded shadow-sm">
            <QRCodeSVG
              value={`https://hammer-security.haws.internal/verify?id=${encodeURIComponent(data.badgeId)}&auth=${encodeURIComponent(data.clearanceLevel)}`}
              size={64}
              level="M"
              fgColor="#091E3A"
            />
          </div>
          <span className="text-[7px] font-mono text-slate-500 tracking-wider">
            SCAN FOR DOD CLEARANCE
          </span>
        </div>
      </div>

      {/* Bottom Legal Band */}
      <div className="bg-slate-200/90 border-t border-slate-300 px-6 py-1.5 flex items-center justify-between text-[7px] font-mono text-slate-600 z-10">
        <span>SECURITY HOTLINE: 1-800-555-HAWS</span>
        <span>FEDERAL OFFENSE PUNISHABLE UNDER 18 U.S.C. § 793</span>
        <span>REV. 2010.4</span>
      </div>
    </div>
  );
};
