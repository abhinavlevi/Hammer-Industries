import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Wifi } from 'lucide-react';
import { EmployeeData } from '../types/badge';
import { Barcode } from './Barcode';
import { SmartChip } from './SmartChip';
import { HolographicSeal } from './HolographicSeal';
import { GuillochePattern } from './GuillochePattern';
import { SchematicWatermark } from './SchematicWatermark';

interface VerticalCardProps {
  data: EmployeeData;
  side: 'front' | 'back';
  showLanyardSlot?: boolean;
}

export const VerticalCard: React.FC<VerticalCardProps> = ({
  data,
  side,
  showLanyardSlot = true,
}) => {
  // Physical dimensions must be exactly 320 x 490 px.
  // The card container must never be resized via CSS transforms on the capture element itself.

  if (side === 'front') {
    return (
      <div
        id="badge-capture-node"
        className="relative w-[320px] h-[490px] bg-white text-slate-900 rounded-[12px] shadow-2xl overflow-hidden flex flex-col justify-between border border-slate-300 select-none box-border"
        style={{
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top Punch Slot Cutout */}
        {showLanyardSlot && (
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-slate-900/90 rounded-full border border-slate-600/40 z-30 shadow-inner flex items-center justify-center">
            <div className="w-10 h-1 bg-slate-950/80 rounded-full" />
          </div>
        )}

        {/* 1. Top Brand Header */}
        <div className="pt-6 pb-1.5 px-3 bg-[#2d844c] border-b-2 border-[#1e5d34] flex flex-col items-center justify-center z-10">
          <div className="w-full bg-white rounded-[3px] py-1.5 px-2 flex items-center justify-center border border-slate-800 shadow-sm">
            <img
              src="/presets/logo_dark.png"
              alt="Hammer Advanced Weapons Systems"
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

        {/* 2. Middle Section: Guilloche Pattern + Centered Portrait with Attached Nameplate */}
        <div className="relative flex-1 w-full flex flex-col items-center justify-center p-3 overflow-hidden">
          {/* Authentic 8-pointed star rosette tessellation pattern */}
          <GuillochePattern />

          {/* Large Clearance Stamp on Bottom Left */}
          <div className="absolute bottom-2 left-3 z-10 pointer-events-none select-none">
            <span
              className="font-black text-6xl tracking-tighter leading-none"
              style={{
                color: '#091E3A',
                fontFamily: "'Chakra Petch', sans-serif",
                textShadow: '0 1px 2px rgba(255,255,255,0.8)',
              }}
            >
              {data.clearanceLevel || 'A'}
            </span>
          </div>

          {/* Portrait Container with Attached Nameplate */}
          <div className="relative z-10 flex flex-col items-center mt-[-6px]">
            {/* Photo Frame */}
            <div className="w-[146px] h-[178px] bg-white border border-slate-800 overflow-hidden shadow-md relative">
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

              {/* Subtle film grain & inner border */}
              <div className="absolute inset-0 border border-black/20 pointer-events-none" />
            </div>

            {/* Attached Nameplate directly below photo */}
            <div className="w-[146px] bg-white border-x border-b border-slate-800 py-1.5 px-1 text-center shadow-md -mt-[1px]">
              <div
                className="font-black text-[12px] leading-tight tracking-wider text-[#091E3A] uppercase truncate"
                title={data.fullName}
              >
                {data.fullName || 'EMPLOYEE NAME'}
              </div>
              <div
                className="text-[7.5px] font-bold text-slate-600 uppercase tracking-tight truncate mt-0.5"
                title={data.role}
              >
                {data.role || 'TITLE / DIVISION'}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Footer: Barcode on Clean White Panel */}
        <div className="w-full bg-white border-t border-slate-400 py-2 px-3 flex flex-col items-center justify-center z-20">
          <Barcode
            code={data.barcodeText || `*${data.badgeId.replace(/[^A-Z0-9]/gi, '')}*`}
            height={38}
            className="w-full"
            textColor="#091E3A"
          />
        </div>
      </div>
    );
  }

  // CARD BACK (320 x 490 px)
  return (
    <div
      id="badge-capture-node"
      className="relative w-[320px] h-[490px] bg-[#F8FAFC] text-[#091E3A] rounded-[12px] shadow-2xl overflow-hidden flex flex-col justify-between border border-slate-300 select-none box-border"
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Schematic Blueprint Watermark with strict <= 5% opacity */}
      <SchematicWatermark opacity={0.04} />

      {/* Top Punch Slot Cutout */}
      {showLanyardSlot && (
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-slate-900/90 rounded-full border border-slate-600/40 z-30 shadow-inner flex items-center justify-center">
          <div className="w-10 h-1 bg-slate-950/80 rounded-full" />
        </div>
      )}

      {/* Magnetic Stripe */}
      <div className="w-full mt-7 h-9 bg-[#1e293b] border-y border-slate-900 shadow-inner flex items-center px-4">
        <div className="text-[7px] font-mono tracking-widest text-slate-400 opacity-60">
          TRACK 1 • HAWS-SEC-{data.badgeId.replace(/[^a-zA-Z0-9]/g, '')} • ENCRYPTED PROX
        </div>
      </div>

      {/* Header Brandmark */}
      <div className="px-5 pt-3 flex items-center justify-between z-10">
        <img
          src="/presets/logo_dark.png"
          alt="Hammer Advanced Weapons Systems"
          className="h-8 w-auto object-contain"
        />
        <div className="flex items-center gap-1 text-slate-600">
          <Wifi className="w-4 h-4 rotate-90 text-emerald-700" />
          <span className="font-mono text-[8px] font-bold tracking-wider">RFID ACTIVE</span>
        </div>
      </div>

      {/* Security Chip + Hologram Row */}
      <div className="px-5 py-2 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <SmartChip />
          <div className="text-[7.5px] font-mono text-slate-600">
            <div className="font-bold text-slate-800">ISO/IEC 7816</div>
            <div>CRYPTOGRAPHIC CHIP</div>
          </div>
        </div>
        <HolographicSeal size={44} />
      </div>

      {/* Security Clearance Details */}
      <div className="px-5 py-1.5 z-10">
        <div className="bg-slate-100/90 border border-slate-300 rounded p-2 text-[9px] space-y-1 shadow-sm">
          <div className="flex justify-between">
            <span className="text-slate-500 font-semibold">BADGE SERIAL:</span>
            <span className="font-mono font-bold text-[#091E3A]">{data.badgeId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-semibold">CLEARANCE:</span>
            <span className="font-mono font-bold text-emerald-800">CLASS {data.clearanceLevel} // ALPHA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-semibold">VALID PERIOD:</span>
            <span className="font-mono text-slate-700">{data.issueDate} / {data.expiryDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-semibold">AUTHORIZED ZONES:</span>
            <span className="font-mono font-semibold text-slate-800 text-[8px] truncate max-w-[130px]">
              {data.accessZones.join(', ')}
            </span>
          </div>
        </div>
      </div>

      {/* Legal Authorization Notice */}
      <div className="px-5 py-2 z-10">
        <div className="text-[7.5px] leading-tight text-slate-700 font-medium border-t border-b border-slate-300 py-1.5">
          <strong className="text-[#091E3A] uppercase block mb-0.5">
            Property of Hammer Advanced Weapons Systems
          </strong>
          This credential is U.S. DoD and Hammer corporate property. Must be worn conspicuously at all times within secure facilities. If found, surrender immediately to Hammer Security Div., Long Island City, NY, or drop into any U.S. Postal Service mailbox. Unauthorized use or replication is punishable under Title 18, U.S.C. § 793.
        </div>
      </div>

      {/* Bottom Bar: QR Verification + Digital Signature */}
      <div className="px-5 pb-3 flex items-center justify-between z-10 bg-slate-50 border-t border-slate-200 pt-2">
        <div className="flex flex-col">
          <span className="text-[7px] font-mono text-slate-500 tracking-wider">VERIFICATION DIGEST</span>
          <span className="text-[8.5px] font-mono font-bold text-[#091E3A] tracking-wider">
            {data.rfidCode}
          </span>
          <span className="text-[6.5px] text-emerald-800 font-bold mt-0.5 uppercase tracking-wide">
            AUTHENTIC TACTICAL ASSET
          </span>
        </div>
        <div className="p-1 bg-white border border-slate-300 rounded shadow-sm">
          <QRCodeSVG
            value={`https://hammer-security.haws.internal/verify?id=${encodeURIComponent(data.badgeId)}&auth=${encodeURIComponent(data.clearanceLevel)}`}
            size={46}
            level="M"
            fgColor="#091E3A"
          />
        </div>
      </div>
    </div>
  );
};
