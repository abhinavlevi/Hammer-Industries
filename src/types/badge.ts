export type CardLayout = 'vertical' | 'horizontal';
export type CardSide = 'front' | 'back';

export interface EmployeeData {
  fullName: string;
  role: string;
  department: string;
  clearanceLevel: string; // 'A', 'B', 'C', 'ALPHA', 'LEVEL 10', etc.
  badgeId: string;
  issueDate: string;
  expiryDate: string;
  bloodType: string;
  accessZones: string[]; // e.g. ['ARMORY', 'R&D', 'FLIGHT-TEST', 'COMMAND']
  photoUrl: string;
  photoZoom: number; // 1.0 to 2.5
  photoPanX: number; // -40% to 40%
  photoPanY: number; // -40% to 40%
  accentColor: string; // Hex color for stripes or custom trim
  barcodeText: string;
  rfidCode: string;
}

export interface CharacterPreset {
  id: string;
  name: string;
  subtitle: string;
  avatar: string;
  data: EmployeeData;
}
