import { EmployeeData } from '../types/badge';

export function encodeBadgeToHash(data: EmployeeData, layout: string): string {
  try {
    const payload = {
      n: data.fullName,
      r: data.role,
      d: data.department,
      c: data.clearanceLevel,
      b: data.badgeId,
      i: data.issueDate,
      e: data.expiryDate,
      t: data.bloodType,
      z: data.accessZones,
      p: data.photoUrl.startsWith('data:') ? '' : data.photoUrl, // Don't put massive base64 in hash
      zx: data.photoZoom,
      px: data.photoPanX,
      py: data.photoPanY,
      ac: data.accentColor,
      l: layout,
    };
    const json = JSON.stringify(payload);
    return encodeURIComponent(btoa(unescape(encodeURIComponent(json))));
  } catch {
    return '';
  }
}

export function decodeBadgeFromHash(hash: string): { data?: Partial<EmployeeData>; layout?: 'vertical' | 'horizontal' } | null {
  try {
    if (!hash || !hash.includes('badge=')) return null;
    const raw = hash.split('badge=')[1]?.split('&')[0];
    if (!raw) return null;
    const json = decodeURIComponent(escape(atob(decodeURIComponent(raw))));
    const parsed = JSON.parse(json);

    return {
      layout: parsed.l === 'horizontal' ? 'horizontal' : 'vertical',
      data: {
        fullName: parsed.n,
        role: parsed.r,
        department: parsed.d,
        clearanceLevel: parsed.c,
        badgeId: parsed.b,
        issueDate: parsed.i,
        expiryDate: parsed.e,
        bloodType: parsed.t,
        accessZones: parsed.z,
        photoUrl: parsed.p || undefined,
        photoZoom: parsed.zx,
        photoPanX: parsed.px,
        photoPanY: parsed.py,
        accentColor: parsed.ac,
        barcodeText: `*${(parsed.b || '').replace(/[^a-zA-Z0-9]/g, '')}*`,
        rfidCode: `99${(parsed.b || '0000').slice(-4)}-HAWS-SEC`,
      },
    };
  } catch {
    return null;
  }
}
