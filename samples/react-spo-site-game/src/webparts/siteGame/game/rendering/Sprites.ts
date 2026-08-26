// All sprites are drawn programmatically via DrawCommand arrays.
// No external images required.

export type DrawCommand =
  | { op: 'fillRect'; color: string; x: number; y: number; w: number; h: number }
  | { op: 'circle'; color: string; cx: number; cy: number; r: number }
  | { op: 'text'; color: string; text: string; x: number; y: number; size: number; font?: string }
  | { op: 'arc'; color: string; cx: number; cy: number; r: number; start: number; end: number };

// T = tile size (scaled); all coordinates are fractions of 1 tile unit
// Actual sizes will be multiplied by TILE_SIZE at render time

// ---- Player: Male (hat + pants) ----
export const PLAYER_MALE: DrawCommand[] = [
  // Hat
  { op: 'fillRect', color: '#2255aa', x: 10, y: 2, w: 12, h: 4 },
  // Head
  { op: 'circle', color: '#f5c29a', cx: 16, cy: 11, r: 7 },
  // Eyes
  { op: 'circle', color: '#222', cx: 13, cy: 10, r: 1.5 },
  { op: 'circle', color: '#222', cx: 19, cy: 10, r: 1.5 },
  // Body
  { op: 'fillRect', color: '#2255aa', x: 9, y: 18, w: 14, h: 8 },
  // Arms
  { op: 'fillRect', color: '#2255aa', x: 4, y: 18, w: 5, h: 6 },
  { op: 'fillRect', color: '#2255aa', x: 23, y: 18, w: 5, h: 6 },
  // Hands
  { op: 'circle', color: '#f5c29a', cx: 6, cy: 25, r: 3 },
  { op: 'circle', color: '#f5c29a', cx: 26, cy: 25, r: 3 },
  // Legs (pants)
  { op: 'fillRect', color: '#334466', x: 9, y: 26, w: 6, h: 6 },
  { op: 'fillRect', color: '#334466', x: 17, y: 26, w: 6, h: 6 },
];

// Male walk animation (legs spread)
export const PLAYER_MALE_WALK1: DrawCommand[] = [
  ...PLAYER_MALE.slice(0, 9),
  { op: 'fillRect', color: '#334466', x: 7, y: 26, w: 6, h: 6 },
  { op: 'fillRect', color: '#334466', x: 19, y: 26, w: 6, h: 6 },
];

// ---- Player: Female (long hair + skirt) ----
export const PLAYER_FEMALE: DrawCommand[] = [
  // Long hair (flowing down sides)
  { op: 'fillRect', color: '#8b5a3c', x: 8, y: 4, w: 4, h: 14 },    // left hair
  { op: 'fillRect', color: '#8b5a3c', x: 20, y: 4, w: 4, h: 14 },   // right hair
  // Head
  { op: 'circle', color: '#f5c29a', cx: 16, cy: 11, r: 7 },
  // Eyes
  { op: 'circle', color: '#222', cx: 13, cy: 10, r: 1.5 },
  { op: 'circle', color: '#222', cx: 19, cy: 10, r: 1.5 },
  // Smile
  { op: 'arc', color: '#c9945d', cx: 16, cy: 14, r: 2, start: 0.1, end: Math.PI - 0.1 },
  // Body (dress/top)
  { op: 'fillRect', color: '#d4416b', x: 9, y: 18, w: 14, h: 5 },
  // Arms (sleeveless top)
  { op: 'fillRect', color: '#d4416b', x: 4, y: 19, w: 5, h: 5 },
  { op: 'fillRect', color: '#d4416b', x: 23, y: 19, w: 5, h: 5 },
  // Hands
  { op: 'circle', color: '#f5c29a', cx: 6, cy: 25, r: 3 },
  { op: 'circle', color: '#f5c29a', cx: 26, cy: 25, r: 3 },
  // Skirt (flared bottom)
  { op: 'fillRect', color: '#b8346b', x: 6, y: 23, w: 20, h: 9 },
];

// Female walk animation (skirt sway)
export const PLAYER_FEMALE_WALK1: DrawCommand[] = [
  // Long hair
  { op: 'fillRect', color: '#8b5a3c', x: 8, y: 4, w: 4, h: 14 },
  { op: 'fillRect', color: '#8b5a3c', x: 20, y: 4, w: 4, h: 14 },
  // Head
  { op: 'circle', color: '#f5c29a', cx: 16, cy: 11, r: 7 },
  // Eyes
  { op: 'circle', color: '#222', cx: 13, cy: 10, r: 1.5 },
  { op: 'circle', color: '#222', cx: 19, cy: 10, r: 1.5 },
  // Smile
  { op: 'arc', color: '#c9945d', cx: 16, cy: 14, r: 2, start: 0.1, end: Math.PI - 0.1 },
  // Body (dress/top)
  { op: 'fillRect', color: '#d4416b', x: 9, y: 18, w: 14, h: 5 },
  // Arms
  { op: 'fillRect', color: '#d4416b', x: 4, y: 19, w: 5, h: 5 },
  { op: 'fillRect', color: '#d4416b', x: 23, y: 19, w: 5, h: 5 },
  // Hands
  { op: 'circle', color: '#f5c29a', cx: 6, cy: 25, r: 3 },
  { op: 'circle', color: '#f5c29a', cx: 26, cy: 25, r: 3 },
  // Skirt (swaying - wider on walk)
  { op: 'fillRect', color: '#b8346b', x: 5, y: 23, w: 22, h: 9 },
];

// ---- Player: Neutral (hoodie) ----
export const PLAYER_NEUTRAL: DrawCommand[] = [
  // Hood (dark gray)
  { op: 'fillRect', color: '#505050', x: 8, y: 1, w: 16, h: 12 },
  // Hood rim/border
  { op: 'circle', color: '#505050', cx: 16, cy: 8, r: 8 },
  // Head (mostly covered, just eyes visible)
  { op: 'circle', color: '#f5c29a', cx: 16, cy: 12, r: 5 },
  // Eyes (prominent, visible from hood)
  { op: 'circle', color: '#fff', cx: 13, cy: 11, r: 1.5 },
  { op: 'circle', color: '#fff', cx: 19, cy: 11, r: 1.5 },
  { op: 'circle', color: '#222', cx: 13, cy: 11, r: 0.8 },
  { op: 'circle', color: '#222', cx: 19, cy: 11, r: 0.8 },
  // Hoodie body (baggy torso)
  { op: 'fillRect', color: '#404040', x: 7, y: 13, w: 18, h: 10 },
  // Pocket on hoodie
  { op: 'fillRect', color: '#303030', x: 12, y: 17, w: 8, h: 5 },
  // Arms (inside hoodie sleeves)
  { op: 'fillRect', color: '#505050', x: 3, y: 18, w: 5, h: 6 },
  { op: 'fillRect', color: '#505050', x: 24, y: 18, w: 5, h: 6 },
  // Hands
  { op: 'circle', color: '#f5c29a', cx: 6, cy: 25, r: 3 },
  { op: 'circle', color: '#f5c29a', cx: 26, cy: 25, r: 3 },
  // Legs (dark pants/jeans)
  { op: 'fillRect', color: '#1a1a3a', x: 9, y: 26, w: 6, h: 6 },
  { op: 'fillRect', color: '#1a1a3a', x: 17, y: 26, w: 6, h: 6 },
];

// Neutral walk animation (hoodie sway)
export const PLAYER_NEUTRAL_WALK1: DrawCommand[] = [
  // Hood
  { op: 'fillRect', color: '#505050', x: 8, y: 1, w: 16, h: 12 },
  // Hood rim
  { op: 'circle', color: '#505050', cx: 16, cy: 8, r: 8 },
  // Head
  { op: 'circle', color: '#f5c29a', cx: 16, cy: 12, r: 5 },
  // Eyes
  { op: 'circle', color: '#fff', cx: 13, cy: 11, r: 1.5 },
  { op: 'circle', color: '#fff', cx: 19, cy: 11, r: 1.5 },
  { op: 'circle', color: '#222', cx: 13, cy: 11, r: 0.8 },
  { op: 'circle', color: '#222', cx: 19, cy: 11, r: 0.8 },
  // Hoodie body (slight sway)
  { op: 'fillRect', color: '#404040', x: 6, y: 13, w: 20, h: 10 },
  // Pocket
  { op: 'fillRect', color: '#303030', x: 11, y: 17, w: 10, h: 5 },
  // Arms
  { op: 'fillRect', color: '#505050', x: 3, y: 18, w: 5, h: 6 },
  { op: 'fillRect', color: '#505050', x: 24, y: 18, w: 5, h: 6 },
  // Hands
  { op: 'circle', color: '#f5c29a', cx: 6, cy: 25, r: 3 },
  { op: 'circle', color: '#f5c29a', cx: 26, cy: 25, r: 3 },
  // Legs (spread for walk)
  { op: 'fillRect', color: '#1a1a3a', x: 7, y: 26, w: 6, h: 6 },
  { op: 'fillRect', color: '#1a1a3a', x: 19, y: 26, w: 6, h: 6 },
];

// Keep backward compatibility
export const PLAYER_SPRITE = PLAYER_MALE;
export const PLAYER_WALK1 = PLAYER_MALE_WALK1;

// ---- User NPC variants ----
function makeUserNPC(bodyColor: string, hatColor: string): DrawCommand[] {
  return [
    { op: 'fillRect', color: hatColor, x: 10, y: 2, w: 12, h: 4 },
    { op: 'circle', color: '#f5c29a', cx: 16, cy: 11, r: 7 },
    { op: 'circle', color: '#222', cx: 13, cy: 10, r: 1.5 },
    { op: 'circle', color: '#222', cx: 19, cy: 10, r: 1.5 },
    { op: 'fillRect', color: bodyColor, x: 9, y: 18, w: 14, h: 8 },
    { op: 'fillRect', color: bodyColor, x: 4, y: 18, w: 5, h: 6 },
    { op: 'fillRect', color: bodyColor, x: 23, y: 18, w: 5, h: 6 },
    { op: 'circle', color: '#f5c29a', cx: 6, cy: 25, r: 3 },
    { op: 'circle', color: '#f5c29a', cx: 26, cy: 25, r: 3 },
    { op: 'fillRect', color: '#334466', x: 9, y: 26, w: 6, h: 6 },
    { op: 'fillRect', color: '#334466', x: 17, y: 26, w: 6, h: 6 },
  ];
}

export const USER_NPC_OWNER: DrawCommand[] = makeUserNPC('#c8960a', '#8b6500');
export const USER_NPC_MEMBER: DrawCommand[] = makeUserNPC('#1a5faa', '#0e3d77');
export const USER_NPC_VISITOR: DrawCommand[] = makeUserNPC('#2a8a3a', '#1a5a24');

// ---- PnP Rabbit (PnPjs mascot) ----
export const PNP_RABBIT: DrawCommand[] = [
  // Ears
  { op: 'fillRect', color: '#fff', x: 10, y: 0, w: 5, h: 12 },
  { op: 'fillRect', color: '#fff', x: 17, y: 0, w: 5, h: 12 },
  { op: 'fillRect', color: '#ffaabb', x: 11, y: 1, w: 3, h: 9 },
  { op: 'fillRect', color: '#ffaabb', x: 18, y: 1, w: 3, h: 9 },
  // Head
  { op: 'circle', color: '#fff', cx: 16, cy: 16, r: 9 },
  // Eyes
  { op: 'circle', color: '#cc3366', cx: 12, cy: 14, r: 2 },
  { op: 'circle', color: '#cc3366', cx: 20, cy: 14, r: 2 },
  // Nose
  { op: 'circle', color: '#ff88aa', cx: 16, cy: 18, r: 1.5 },
  // Body
  { op: 'circle', color: '#fff', cx: 16, cy: 26, r: 6 },
  // PnP text on chest
  { op: 'text', color: '#cc3366', text: 'PnP', x: 11, y: 29, size: 6 },
];

// ---- Vesa NPC ----
export const VESA_NPC: DrawCommand[] = [
  // Hair
  { op: 'fillRect', color: '#7a6040', x: 9, y: 2, w: 14, h: 5 },
  // Head
  { op: 'circle', color: '#f0c898', cx: 16, cy: 11, r: 7 },
  // Beard
  { op: 'fillRect', color: '#8a7050', x: 12, y: 15, w: 8, h: 3 },
  // Eyes
  { op: 'circle', color: '#333', cx: 13, cy: 10, r: 1.5 },
  { op: 'circle', color: '#333', cx: 19, cy: 10, r: 1.5 },
  // Smile
  { op: 'arc', color: '#8a5030', cx: 16, cy: 14, r: 3, start: 0.1, end: Math.PI - 0.1 },
  // Body (Microsoft blue)
  { op: 'fillRect', color: '#0078d4', x: 9, y: 18, w: 14, h: 8 },
  // Arms
  { op: 'fillRect', color: '#0078d4', x: 4, y: 18, w: 5, h: 6 },
  { op: 'fillRect', color: '#0078d4', x: 23, y: 18, w: 5, h: 6 },
  // Hands
  { op: 'circle', color: '#f0c898', cx: 6, cy: 25, r: 3 },
  { op: 'circle', color: '#f0c898', cx: 26, cy: 25, r: 3 },
  // Scroll in right hand
  { op: 'fillRect', color: '#f5e8c0', x: 24, y: 22, w: 4, h: 5 },
  // Star badge
  { op: 'text', color: '#ffd700', text: '★', x: 13, y: 25, size: 8 },
  // Legs
  { op: 'fillRect', color: '#334466', x: 9, y: 26, w: 6, h: 6 },
  { op: 'fillRect', color: '#334466', x: 17, y: 26, w: 6, h: 6 },
];

// ---- Horse (natural bay, no armour) ----
export const WARRIOR_HORSE: DrawCommand[] = [
  // ── Tail (flowing black) ──
  { op: 'fillRect', color: '#1c0e04', x: 25, y: 11, w: 4, h: 17 },
  { op: 'fillRect', color: '#2c1808', x: 26, y: 13, w: 3, h: 13 },
  { op: 'fillRect', color: '#3c2810', x: 27, y: 17, w: 2, h: 7 },
  // ── Body (chestnut bay) ──
  { op: 'circle', color: '#a05020', cx: 20, cy: 18, r: 7 },
  { op: 'circle', color: '#9a4c1c', cx: 10, cy: 19, r: 6 },
  { op: 'fillRect', color: '#a05020', x: 10, y: 11, w: 11, h: 13 },
  // Belly shading
  { op: 'fillRect', color: '#7a3c14', x: 11, y: 21, w: 10, h: 3 },
  // ── Neck ──
  { op: 'fillRect', color: '#9a4c1c', x: 6, y: 8, w: 6, h: 12 },
  { op: 'circle', color: '#9a4c1c', cx: 9, cy: 10, r: 4 },
  // ── Head ──
  { op: 'fillRect', color: '#9a4c1c', x: 1, y: 5, w: 10, h: 9 },
  // Muzzle
  { op: 'fillRect', color: '#7a3c14', x: 0, y: 9, w: 6, h: 7 },
  // Nostril
  { op: 'circle', color: '#2a1408', cx: 2, cy: 14, r: 1.2 },
  // Mouth line
  { op: 'fillRect', color: '#5a2c0a', x: 1, y: 15, w: 4, h: 1 },
  // Eye with glint
  { op: 'circle', color: '#151510', cx: 8, cy: 7, r: 2.5 },
  { op: 'circle', color: '#fff', cx: 9, cy: 6, r: 0.9 },
  // Ear
  { op: 'fillRect', color: '#9a4c1c', x: 9, y: 2, w: 2, h: 5 },
  { op: 'fillRect', color: '#d09090', x: 10, y: 3, w: 1, h: 3 },
  // White star on forehead
  { op: 'circle', color: '#e8e0d8', cx: 5, cy: 7, r: 1.5 },
  // ── Mane (black, flowing) ──
  { op: 'fillRect', color: '#1c0e04', x: 6, y: 4, w: 3, h: 15 },
  { op: 'fillRect', color: '#2c1808', x: 7, y: 6, w: 2, h: 10 },
  // ── Legs ──
  // Front pair
  { op: 'fillRect', color: '#8a3c14', x: 8, y: 24, w: 4, h: 8 },
  { op: 'fillRect', color: '#8a3c14', x: 13, y: 24, w: 4, h: 8 },
  // Back pair
  { op: 'fillRect', color: '#7a3010', x: 19, y: 24, w: 4, h: 7 },
  { op: 'fillRect', color: '#7a3010', x: 23, y: 24, w: 3, h: 6 },
  // Cannon-bone darkening
  { op: 'fillRect', color: '#2c1408', x: 8, y: 27, w: 4, h: 5 },
  { op: 'fillRect', color: '#2c1408', x: 13, y: 27, w: 4, h: 5 },
  { op: 'fillRect', color: '#2c1408', x: 19, y: 27, w: 4, h: 4 },
  { op: 'fillRect', color: '#2c1408', x: 23, y: 27, w: 3, h: 3 },
  // Hooves
  { op: 'fillRect', color: '#0c0804', x: 8, y: 30, w: 4, h: 2 },
  { op: 'fillRect', color: '#0c0804', x: 13, y: 30, w: 4, h: 2 },
  { op: 'fillRect', color: '#0c0804', x: 19, y: 30, w: 4, h: 2 },
  { op: 'fillRect', color: '#0c0804', x: 23, y: 29, w: 3, h: 2 },
];

// ---- SPFx Toolkit — pixel-art toolbox with wrench + hammer ----
export const SPFX_TOOLKIT: DrawCommand[] = [
  // ── Wrench (left, sticking up) — C-jaw + handle ──
  { op: 'fillRect', color: '#c0c0c0', x: 2, y: 0, w: 6, h: 2 }, // top jaw
  { op: 'fillRect', color: '#c0c0c0', x: 2, y: 3, w: 6, h: 2 }, // bottom jaw
  { op: 'fillRect', color: '#c0c0c0', x: 7, y: 0, w: 2, h: 5 }, // jaw back
  { op: 'fillRect', color: '#a0a0a0', x: 7, y: 5, w: 2, h: 5 }, // handle

  // ── Hammer (right, sticking up) — flat head + wooden handle ──
  { op: 'fillRect', color: '#606060', x: 20, y: 1, w: 10, h: 4 }, // head dark
  { op: 'fillRect', color: '#909090', x: 20, y: 1, w: 10, h: 1 }, // head highlight
  { op: 'fillRect', color: '#a0522d', x: 23, y: 5, w: 3, h: 5 }, // wooden handle

  // ── Carry handle (bar across top of box) ──
  { op: 'fillRect', color: '#333333', x: 11, y: 7, w: 2, h: 4 }, // left post
  { op: 'fillRect', color: '#333333', x: 19, y: 7, w: 2, h: 4 }, // right post
  { op: 'fillRect', color: '#999999', x: 12, y: 7, w: 8, h: 2 }, // bar

  // ── Toolbox outer shell ──
  { op: 'fillRect', color: '#1a1a1a', x: 2, y: 11, w: 28, h: 13 },

  // ── Lid (top portion, brighter red) ──
  { op: 'fillRect', color: '#ef4444', x: 3, y: 12, w: 26, h: 5 },

  // ── Body (lower portion, darker red + slight sheen line) ──
  { op: 'fillRect', color: '#b91c1c', x: 3, y: 17, w: 26, h: 6 },
  { op: 'fillRect', color: '#dc2626', x: 3, y: 17, w: 26, h: 1 }, // sheen at seam

  // ── Gold latch (centered on lid-body seam) ──
  { op: 'fillRect', color: '#fbbf24', x: 13, y: 15, w: 6, h: 4 },
  { op: 'fillRect', color: '#f59e0b', x: 14, y: 16, w: 4, h: 2 }, // latch detail

  // ── Legs ──
  { op: 'fillRect', color: '#555555', x: 8, y: 24, w: 5, h: 5 },
  { op: 'fillRect', color: '#555555', x: 19, y: 24, w: 5, h: 5 },
  // Boots
  { op: 'fillRect', color: '#7c3314', x: 7, y: 28, w: 7, h: 3 },
  { op: 'fillRect', color: '#7c3314', x: 18, y: 28, w: 7, h: 3 },
];

// ---- Power Automate — 3-tone blue chevron logo with legs ----
// Mirrors the PA logo: dark navy / medium blue / light blue diagonal bands
// forming a right-pointing chevron, 11 rows per arm (h=2 each) + apex
export const POWER_AUTOMATE: DrawCommand[] = [
  // Upper arm rows (widen toward apex)
  // w=4
  { op: 'fillRect', color: '#0F2D7F', x: 2, y: 0, w: 1, h: 2 },
  { op: 'fillRect', color: '#2272EB', x: 3, y: 0, w: 2, h: 2 },
  { op: 'fillRect', color: '#74B3FF', x: 5, y: 0, w: 1, h: 2 },
  // w=8
  { op: 'fillRect', color: '#0F2D7F', x: 2, y: 2, w: 3, h: 2 },
  { op: 'fillRect', color: '#2272EB', x: 5, y: 2, w: 3, h: 2 },
  { op: 'fillRect', color: '#74B3FF', x: 8, y: 2, w: 2, h: 2 },
  // w=12
  { op: 'fillRect', color: '#0F2D7F', x: 2, y: 4, w: 4, h: 2 },
  { op: 'fillRect', color: '#2272EB', x: 6, y: 4, w: 4, h: 2 },
  { op: 'fillRect', color: '#74B3FF', x: 10, y: 4, w: 4, h: 2 },
  // w=16
  { op: 'fillRect', color: '#0F2D7F', x: 2, y: 6, w: 6, h: 2 },
  { op: 'fillRect', color: '#2272EB', x: 8, y: 6, w: 5, h: 2 },
  { op: 'fillRect', color: '#74B3FF', x: 13, y: 6, w: 5, h: 2 },
  // w=20
  { op: 'fillRect', color: '#0F2D7F', x: 2, y: 8, w: 7, h: 2 },
  { op: 'fillRect', color: '#2272EB', x: 9, y: 8, w: 7, h: 2 },
  { op: 'fillRect', color: '#74B3FF', x: 16, y: 8, w: 6, h: 2 },
  // apex w=26
  { op: 'fillRect', color: '#0F2D7F', x: 2, y: 10, w: 9, h: 2 },
  { op: 'fillRect', color: '#2272EB', x: 11, y: 10, w: 9, h: 2 },
  { op: 'fillRect', color: '#74B3FF', x: 20, y: 10, w: 8, h: 2 },
  // Lower arm rows (narrow back down — mirror of upper)
  // w=20
  { op: 'fillRect', color: '#0F2D7F', x: 2, y: 12, w: 7, h: 2 },
  { op: 'fillRect', color: '#2272EB', x: 9, y: 12, w: 7, h: 2 },
  { op: 'fillRect', color: '#74B3FF', x: 16, y: 12, w: 6, h: 2 },
  // w=16
  { op: 'fillRect', color: '#0F2D7F', x: 2, y: 14, w: 6, h: 2 },
  { op: 'fillRect', color: '#2272EB', x: 8, y: 14, w: 5, h: 2 },
  { op: 'fillRect', color: '#74B3FF', x: 13, y: 14, w: 5, h: 2 },
  // w=12
  { op: 'fillRect', color: '#0F2D7F', x: 2, y: 16, w: 4, h: 2 },
  { op: 'fillRect', color: '#2272EB', x: 6, y: 16, w: 4, h: 2 },
  { op: 'fillRect', color: '#74B3FF', x: 10, y: 16, w: 4, h: 2 },
  // w=8
  { op: 'fillRect', color: '#0F2D7F', x: 2, y: 18, w: 3, h: 2 },
  { op: 'fillRect', color: '#2272EB', x: 5, y: 18, w: 3, h: 2 },
  { op: 'fillRect', color: '#74B3FF', x: 8, y: 18, w: 2, h: 2 },
  // w=4
  { op: 'fillRect', color: '#0F2D7F', x: 2, y: 20, w: 1, h: 2 },
  { op: 'fillRect', color: '#2272EB', x: 3, y: 20, w: 2, h: 2 },
  { op: 'fillRect', color: '#74B3FF', x: 5, y: 20, w: 1, h: 2 },
  // ── Legs ──
  { op: 'fillRect', color: '#0F2D7F', x: 6, y: 22, w: 5, h: 5 },
  { op: 'fillRect', color: '#0F2D7F', x: 14, y: 22, w: 5, h: 5 },
  { op: 'fillRect', color: '#2272EB', x: 5, y: 26, w: 7, h: 3 },
  { op: 'fillRect', color: '#2272EB', x: 13, y: 26, w: 7, h: 3 },
];

// ---- PnP PowerShell — pixel-art PowerShell terminal window ----
export const PNP_POWERSHELL: DrawCommand[] = [
  // ── Window outer shell ──
  { op: 'fillRect', color: '#1a1a2e', x: 1, y: 0, w: 30, h: 22 },

  // ── Title bar (dark charcoal strip) ──
  { op: 'fillRect', color: '#2d2d44', x: 2, y: 1, w: 28, h: 4 },
  // macOS-style traffic light dots
  { op: 'fillRect', color: '#ff5f57', x: 4, y: 2, w: 3, h: 2 }, // red close
  { op: 'fillRect', color: '#febc2e', x: 9, y: 2, w: 3, h: 2 }, // yellow min
  { op: 'fillRect', color: '#28c840', x: 14, y: 2, w: 3, h: 2 }, // green max

  // ── Blue accent line below title ──
  { op: 'fillRect', color: '#4472c4', x: 2, y: 5, w: 28, h: 1 },

  // ── Terminal body (iconic PS dark blue) ──
  { op: 'fillRect', color: '#012456', x: 2, y: 6, w: 28, h: 15 },

  // ── Prompt line — yellow "PS>" block + white command block ──
  // PS> represented as a yellow filled strip
  { op: 'fillRect', color: '#ffff00', x: 3, y: 8, w: 8, h: 2 },
  // command text block (white)
  { op: 'fillRect', color: '#e0e0e0', x: 12, y: 8, w: 16, h: 2 },

  // ── Output line 1 (light steel blue, full width) ──
  { op: 'fillRect', color: '#6ba3d6', x: 3, y: 12, w: 24, h: 2 },

  // ── Output line 2 (shorter, dim) ──
  { op: 'fillRect', color: '#4a7fb5', x: 3, y: 15, w: 18, h: 2 },

  // ── Cursor block (bright white rect at bottom of body) ──
  { op: 'fillRect', color: '#ffffff', x: 3, y: 19, w: 3, h: 2 },

  // ── Legs (deep PS blue) ──
  { op: 'fillRect', color: '#012456', x: 8, y: 23, w: 5, h: 5 },
  { op: 'fillRect', color: '#012456', x: 19, y: 23, w: 5, h: 5 },
  // Boots (bright blue accent)
  { op: 'fillRect', color: '#0050a0', x: 7, y: 27, w: 7, h: 3 },
  { op: 'fillRect', color: '#0050a0', x: 18, y: 27, w: 7, h: 3 },
];

// ---- PnP Core SDK — pixel-art .NET/C# purple hexagon character ----
export const PNP_CORE: DrawCommand[] = [
  // ── Hexagon body (official .NET / C# purple) ──
  // Top cap (narrow)
  { op: 'fillRect', color: '#512BD4', x: 10, y: 0, w: 12, h: 2 },
  // Upper shoulders
  { op: 'fillRect', color: '#512BD4', x: 6, y: 2, w: 20, h: 2 },
  // Wide middle body
  { op: 'fillRect', color: '#512BD4', x: 3, y: 4, w: 26, h: 12 },
  // Lower shoulders
  { op: 'fillRect', color: '#512BD4', x: 6, y: 16, w: 20, h: 2 },
  // Bottom cap (narrow)
  { op: 'fillRect', color: '#512BD4', x: 10, y: 18, w: 12, h: 2 },

  // ── Top highlight stripe (3-D look) ──
  { op: 'fillRect', color: '#7B52E0', x: 4, y: 4, w: 24, h: 2 },

  // ── 'C#' text centred in white ──
  { op: 'text', color: '#FFFFFF', text: 'C#', x: 9, y: 15, size: 10 },

  // ── Legs (deep purple) ──
  { op: 'fillRect', color: '#3D24A0', x: 8, y: 21, w: 5, h: 6 },
  { op: 'fillRect', color: '#3D24A0', x: 19, y: 21, w: 5, h: 6 },

  // ── Boots ──
  { op: 'fillRect', color: '#2D1880', x: 7, y: 26, w: 7, h: 3 },
  { op: 'fillRect', color: '#2D1880', x: 18, y: 26, w: 7, h: 3 },
];

// ---- CLI for Microsoft 365 — walking "CLI" pixel-art letters ----
export const CLI_M365: DrawCommand[] = [
  // ── Stem (dark green) ──
  { op: 'fillRect', color: '#14532d', x: 15, y: 0, w: 3, h: 6 },

  // ── Calyx — three rounded green lobes (not a simple flat cap) ──
  { op: 'circle', color: '#16a34a', cx: 12, cy: 7, r: 3.5 },
  { op: 'circle', color: '#16a34a', cx: 16, cy: 6, r: 3.5 },
  { op: 'circle', color: '#16a34a', cx: 20, cy: 7, r: 3.5 },
  { op: 'fillRect', color: '#16a34a', x: 10, y: 5, w: 12, h: 5 }, // fill between lobes

  // ── Body — large round top (key: chili ≠ carrot triangle) ──
  { op: 'circle', color: '#dc2626', cx: 16, cy: 13, r: 7 },
  { op: 'fillRect', color: '#dc2626', x: 9, y: 8, w: 14, h: 10 },

  // ── Mid — curves 1 px rightward ──
  { op: 'circle', color: '#dc2626', cx: 17, cy: 20, r: 5 },
  { op: 'fillRect', color: '#dc2626', x: 12, y: 16, w: 10, h: 7 },

  // ── Lower taper — continues curving right ──
  { op: 'fillRect', color: '#b91c1c', x: 14, y: 22, w: 7, h: 4 },
  { op: 'fillRect', color: '#991b1b', x: 15, y: 25, w: 5, h: 3 },
  { op: 'fillRect', color: '#7f1d1d', x: 16, y: 27, w: 4, h: 2 },

  // ── Curved tip ──
  { op: 'fillRect', color: '#7f1d1d', x: 17, y: 29, w: 3, h: 2 },
  { op: 'fillRect', color: '#6b1212', x: 18, y: 30, w: 2, h: 1 },

  // ── Sheen highlight (upper-left, gives 3-D pepper look) ──
  { op: 'circle', color: 'rgba(255,180,160,0.55)', cx: 13, cy: 12, r: 4 },
];

// ---- Julie — Microsoft MVP & PnP Core Team ----
export const JULIE: DrawCommand[] = [
  // Hair (professional style)
  { op: 'fillRect', color: '#5d4037', x: 10, y: 3, w: 12, h: 7 },
  { op: 'fillRect', color: '#6d4c41', x: 9, y: 10, w: 3, h: 8 },
  { op: 'fillRect', color: '#6d4c41', x: 20, y: 10, w: 3, h: 8 },
  // Head
  { op: 'circle', color: '#f5c29a', cx: 16, cy: 10, r: 6 },
  // Eyes
  { op: 'circle', color: '#222', cx: 14, cy: 9, r: 1.5 },
  { op: 'circle', color: '#222', cx: 18, cy: 9, r: 1.5 },
  // Smile
  { op: 'arc', color: '#d84315', cx: 16, cy: 12, r: 2.5, start: 0.1, end: Math.PI - 0.1 },
  // Body (professional blue)
  { op: 'fillRect', color: '#1976d2', x: 10, y: 17, w: 12, h: 9 },
  // Blazer/jacket highlight
  { op: 'fillRect', color: '#2196f3', x: 11, y: 18, w: 5, h: 7 },
  { op: 'fillRect', color: '#2196f3', x: 16, y: 18, w: 5, h: 7 },
  // Arms (blue)
  { op: 'fillRect', color: '#1976d2', x: 6, y: 18, w: 4, h: 5 },
  { op: 'fillRect', color: '#1976d2', x: 22, y: 18, w: 4, h: 5 },
  // Hands
  { op: 'circle', color: '#f5c29a', cx: 8, cy: 24, r: 2.5 },
  { op: 'circle', color: '#f5c29a', cx: 24, cy: 24, r: 2.5 },
  // Microphone badge on chest (podcast host)
  { op: 'text', color: '#fff', text: '🎙', x: 13, y: 24, size: 7 },
  // Skirt/pants (dark professional)
  { op: 'fillRect', color: '#0d47a1', x: 10, y: 26, w: 12, h: 4 },
];

// ---- Campfire ----
export const CAMPFIRE: DrawCommand[] = [
  // Logs
  { op: 'fillRect', color: '#6b4020', x: 8, y: 22, w: 16, h: 4 },
  { op: 'fillRect', color: '#5a3010', x: 6, y: 24, w: 20, h: 3 },
  // Inner flame (orange/yellow)
  { op: 'circle', color: 'rgba(255,180,0,0.9)', cx: 16, cy: 20, r: 8 },
  { op: 'circle', color: 'rgba(255,100,0,0.8)', cx: 16, cy: 18, r: 6 },
  { op: 'circle', color: 'rgba(255,240,0,0.95)', cx: 16, cy: 16, r: 4 },
  { op: 'circle', color: '#fff', cx: 16, cy: 15, r: 2 },
  // Ember sparks
  { op: 'circle', color: '#ff8800', cx: 11, cy: 12, r: 1 },
  { op: 'circle', color: '#ffcc00', cx: 21, cy: 10, r: 1 },
  { op: 'circle', color: '#ff4400', cx: 14, cy: 8, r: 1 },
];

// ---- Hugo — World's Laziest Developer ----
export const HUGO: DrawCommand[] = [
  // Bald head (no hair — just the dome)
  { op: 'circle', color: '#f0c898', cx: 16, cy: 10, r: 7 },
  // Subtle bald shine
  { op: 'circle', color: '#f8ddb0', cx: 14, cy: 6, r: 3 },
  // Eyes
  { op: 'circle', color: '#333', cx: 13, cy: 9, r: 1.5 },
  { op: 'circle', color: '#333', cx: 19, cy: 9, r: 1.5 },
  // Smile
  { op: 'arc', color: '#8a5030', cx: 16, cy: 13, r: 3, start: 0.1, end: Math.PI - 0.1 },
  // Body (blue T-shirt)
  { op: 'fillRect', color: '#2196f3', x: 9, y: 17, w: 14, h: 9 },
  // T-shirt collar
  { op: 'fillRect', color: '#1976d2', x: 13, y: 17, w: 6, h: 2 },
  // Arms (blue T-shirt)
  { op: 'fillRect', color: '#2196f3', x: 5, y: 18, w: 4, h: 5 },
  { op: 'fillRect', color: '#2196f3', x: 23, y: 18, w: 4, h: 5 },
  // Hands
  { op: 'circle', color: '#f0c898', cx: 7, cy: 24, r: 2.5 },
  { op: 'circle', color: '#f0c898', cx: 25, cy: 24, r: 2.5 },
  // Coffee cup in right hand
  { op: 'fillRect', color: '#ffffff', x: 23, y: 21, w: 4, h: 4 },
  { op: 'fillRect', color: '#6d4c41', x: 24, y: 22, w: 2, h: 2 },
  // Coffee steam
  { op: 'circle', color: 'rgba(200,200,200,0.6)', cx: 25, cy: 19, r: 1 },
  // MVP star badge
  { op: 'text', color: '#ffd700', text: '★', x: 13, y: 24, size: 7 },
  // Legs (jeans)
  { op: 'fillRect', color: '#37474f', x: 9, y: 26, w: 6, h: 6 },
  { op: 'fillRect', color: '#37474f', x: 17, y: 26, w: 6, h: 6 },
];

// ---- Luise — M365 Princess ----
export const LUISE: DrawCommand[] = [
  // Crown (golden)
  { op: 'fillRect', color: '#ffd700', x: 11, y: 1, w: 10, h: 2 },
  { op: 'fillRect', color: '#ffd700', x: 11, y: 1, w: 2, h: 4 },
  { op: 'fillRect', color: '#ffd700', x: 15, y: 1, w: 2, h: 4 },
  { op: 'fillRect', color: '#ffd700', x: 19, y: 1, w: 2, h: 4 },
  { op: 'circle', color: '#ff69b4', cx: 12, cy: 1, r: 1 },
  { op: 'circle', color: '#ff69b4', cx: 16, cy: 1, r: 1 },
  { op: 'circle', color: '#ff69b4', cx: 20, cy: 1, r: 1 },
  // Hair (flowing)
  { op: 'fillRect', color: '#8b4513', x: 10, y: 4, w: 12, h: 6 },
  { op: 'fillRect', color: '#a0522d', x: 10, y: 10, w: 3, h: 8 },
  { op: 'fillRect', color: '#a0522d', x: 19, y: 10, w: 3, h: 8 },
  // Head
  { op: 'circle', color: '#f5c29a', cx: 16, cy: 10, r: 6 },
  // Eyes
  { op: 'circle', color: '#222', cx: 14, cy: 9, r: 1.5 },
  { op: 'circle', color: '#222', cx: 18, cy: 9, r: 1.5 },
  // Smile
  { op: 'arc', color: '#ff69b4', cx: 16, cy: 12, r: 2.5, start: 0.1, end: Math.PI - 0.1 },
  // Body (pink dress #ff69b4)
  { op: 'fillRect', color: '#ff69b4', x: 10, y: 17, w: 12, h: 9 },
  // Dress highlight
  { op: 'fillRect', color: '#ffb6d9', x: 11, y: 18, w: 10, h: 2 },
  // Arms (pink)
  { op: 'fillRect', color: '#ff69b4', x: 6, y: 18, w: 4, h: 5 },
  { op: 'fillRect', color: '#ff69b4', x: 22, y: 18, w: 4, h: 5 },
  // Hands
  { op: 'circle', color: '#f5c29a', cx: 8, cy: 24, r: 2.5 },
  { op: 'circle', color: '#f5c29a', cx: 24, cy: 24, r: 2.5 },
  // Heart badge on chest
  { op: 'text', color: '#fff', text: '♥', x: 13, y: 24, size: 7 },
  // Dress bottom (flowing)
  { op: 'fillRect', color: '#ff1493', x: 9, y: 26, w: 14, h: 4 },
  { op: 'fillRect', color: '#ff69b4', x: 10, y: 27, w: 12, h: 3 },
];

// ---- Power Pages — two overlapping tilted cards matching the official logo ----
// Logo: lighter lavender card (upper-left) + darker blue-purple card (lower-right),
// both rotated ~12° CCW, simulated via staggered row offsets.
export const POWER_PAGES: DrawCommand[] = [
  // ── Card 1: lighter lavender-purple (#A294ED), upper-left ──
  // Each 2-row band shifts the left edge 1 px leftward as y increases (≈12° tilt)
  { op: 'fillRect', color: '#A294ED', x: 5, y: 0, w: 12, h: 2 }, // top — narrow (rounded corner)
  { op: 'fillRect', color: '#A294ED', x: 4, y: 2, w: 14, h: 2 },
  { op: 'fillRect', color: '#A294ED', x: 3, y: 4, w: 15, h: 2 }, // widest
  { op: 'fillRect', color: '#A294ED', x: 2, y: 6, w: 15, h: 2 },
  { op: 'fillRect', color: '#A294ED', x: 1, y: 8, w: 15, h: 2 },
  { op: 'fillRect', color: '#A294ED', x: 1, y: 10, w: 14, h: 2 }, // narrowing
  { op: 'fillRect', color: '#A294ED', x: 1, y: 12, w: 12, h: 2 },
  { op: 'fillRect', color: '#A294ED', x: 2, y: 14, w: 9, h: 2 },
  { op: 'fillRect', color: '#A294ED', x: 3, y: 16, w: 6, h: 2 }, // bottom — narrow

  // ── Card 2: darker blue-purple (#3B31B5), lower-right ──
  // Same tilt; positioned lower-right, overlapping card 1 in the middle band
  { op: 'fillRect', color: '#3B31B5', x: 15, y: 5, w: 11, h: 2 }, // top — narrow
  { op: 'fillRect', color: '#3B31B5', x: 13, y: 7, w: 13, h: 2 },
  { op: 'fillRect', color: '#3B31B5', x: 12, y: 9, w: 15, h: 2 },
  { op: 'fillRect', color: '#3B31B5', x: 11, y: 11, w: 16, h: 2 }, // widest
  { op: 'fillRect', color: '#3B31B5', x: 10, y: 13, w: 16, h: 2 },
  { op: 'fillRect', color: '#3B31B5', x: 9, y: 15, w: 15, h: 2 }, // narrowing
  { op: 'fillRect', color: '#3B31B5', x: 9, y: 17, w: 13, h: 2 },
  { op: 'fillRect', color: '#3B31B5', x: 10, y: 19, w: 10, h: 2 }, // bottom — narrow

  // ── Legs (deep royal blue) ──
  { op: 'fillRect', color: '#2B24A0', x: 8, y: 22, w: 5, h: 5 },
  { op: 'fillRect', color: '#2B24A0', x: 19, y: 22, w: 5, h: 5 },

  // ── Boots ──
  { op: 'fillRect', color: '#1F1B78', x: 7, y: 27, w: 7, h: 3 },
  { op: 'fillRect', color: '#1F1B78', x: 18, y: 27, w: 7, h: 3 },
];

// ---- PnP SPFx Samples — Match official PnP Samples logo badge ----

// ---- PnP SPFx Samples — Match official PnP Samples logo badge ----
export const PNP_SPFX_SAMPLES: DrawCommand[] = [

  // ── Outer teal border/frame ──
  { op: 'fillRect', color: '#2D8B8A', x: 2, y: 0, w: 28, h: 22 },

  // ── Top section: teal background for "PnP" ──
  { op: 'fillRect', color: '#2D8B8A', x: 3, y: 1, w: 26, h: 9 },

  // ── "PnP" text in white on teal ──
  { op: 'text', color: '#ffffff', text: 'PnP', x: 9, y: 8, size: 8 },

  // ── Bottom section: white background for "SAMPLES" ──
  { op: 'fillRect', color: '#ffffff', x: 3, y: 10, w: 26, h: 11 },

  // ── "SAMPLES" text in teal on white ──
  { op: 'text', color: '#2D8B8A', text: 'SAMPLES', x: 4, y: 18, size: 5 },

  // ── Legs (teal matching the badge) ──
  { op: 'fillRect', color: '#2D8B8A', x: 8, y: 23, w: 5, h: 5 },
  { op: 'fillRect', color: '#2D8B8A', x: 19, y: 23, w: 5, h: 5 },

  // ── Boots (darker teal shade) ──
  { op: 'fillRect', color: '#1e6766', x: 7, y: 27, w: 7, h: 3 },
  { op: 'fillRect', color: '#1e6766', x: 18, y: 27, w: 7, h: 3 },

];

// ---- Power BI — three ascending bar-chart columns matching the official logo ----
// Left bar = lightest yellow (short), middle = golden (medium), right = dark amber (tallest).
// Each bar uses two colour bands to suggest the top-light, bottom-dark gradient.
export const POWER_BI: DrawCommand[] = [
  // ── Right bar (tallest, cols 20-27, rows 0-20) ──
  { op: 'fillRect', color: '#F5C200', x: 21, y: 0, w: 6, h: 1 }, // rounded top cap
  { op: 'fillRect', color: '#F5C200', x: 20, y: 1, w: 8, h: 5 }, // upper — light amber
  { op: 'fillRect', color: '#C47A00', x: 20, y: 6, w: 8, h: 7 }, // mid — deep amber
  { op: 'fillRect', color: '#7B3A00', x: 20, y: 13, w: 8, h: 8 }, // lower — dark brown

  // ── Middle bar (medium, cols 11-18, rows 6-20) ──
  { op: 'fillRect', color: '#FFF9C4', x: 12, y: 6, w: 6, h: 1 }, // rounded top cap
  { op: 'fillRect', color: '#F2C811', x: 11, y: 7, w: 8, h: 7 }, // upper — golden
  { op: 'fillRect', color: '#CC9B00', x: 11, y: 14, w: 8, h: 7 }, // lower — deep gold

  // ── Left bar (shortest, cols 1-8, rows 13-20) ──
  { op: 'fillRect', color: '#FFFDE7', x: 2, y: 13, w: 6, h: 1 }, // rounded top cap
  { op: 'fillRect', color: '#FFF176', x: 1, y: 14, w: 8, h: 4 }, // upper — pale yellow
  { op: 'fillRect', color: '#F2C811', x: 1, y: 18, w: 8, h: 3 }, // lower — golden

  // ── Legs (dark amber) ──
  { op: 'fillRect', color: '#7B3A00', x: 8, y: 22, w: 5, h: 5 },
  { op: 'fillRect', color: '#7B3A00', x: 18, y: 22, w: 5, h: 5 },

  // ── Boots ──
  { op: 'fillRect', color: '#5A2A00', x: 7, y: 27, w: 7, h: 3 },
  { op: 'fillRect', color: '#5A2A00', x: 17, y: 27, w: 7, h: 3 },
];

// ---- Microsoft Lists — List master with clipboard & checkmarks ----
export const MS_LISTS: DrawCommand[] = [
  // ── Clipboard board (warm beige) ──
  { op: 'fillRect', color: '#d4a574', x: 6, y: 4, w: 20, h: 18 },
  // Clipboard border/frame
  { op: 'fillRect', color: '#8b6f47', x: 5, y: 3, w: 22, h: 1 },
  { op: 'fillRect', color: '#8b6f47', x: 5, y: 22, w: 22, h: 1 },
  { op: 'fillRect', color: '#8b6f47', x: 5, y: 4, w: 1, h: 18 },
  { op: 'fillRect', color: '#8b6f47', x: 26, y: 4, w: 1, h: 18 },

  // ── Clipboard clip (silver) ──
  { op: 'fillRect', color: '#999999', x: 13, y: 0, w: 6, h: 5 },
  { op: 'fillRect', color: '#666666', x: 14, y: 1, w: 4, h: 3 },

  // ── List header strip (Microsoft Lists teal) ──
  { op: 'fillRect', color: '#008080', x: 7, y: 5, w: 18, h: 3 },
  // List text on teal header
  { op: 'text', color: '#ffffff', text: 'LISTS', x: 9, y: 7, size: 3 },

  // ── List line 1 (green check + line) ──
  { op: 'text', color: '#0b6a0b', text: '✓', x: 8, y: 12, size: 5 },
  { op: 'fillRect', color: '#555', x: 13, y: 10, w: 10, h: 1 },

  // ── List line 2 (green check + line) ──
  { op: 'text', color: '#0b6a0b', text: '✓', x: 8, y: 17, size: 5 },
  { op: 'fillRect', color: '#555', x: 13, y: 15, w: 10, h: 1 },

  // ── List line 3 (empty box + line for pending item) ──
  { op: 'fillRect', color: '#888', x: 8, y: 19, w: 3, h: 3 },
  { op: 'fillRect', color: '#d4a574', x: 9, y: 20, w: 1, h: 1 },
  { op: 'fillRect', color: '#555', x: 13, y: 20, w: 10, h: 1 },

  // ── Legs (teal, matching Lists brand) ──
  { op: 'fillRect', color: '#008080', x: 8, y: 24, w: 5, h: 4 },
  { op: 'fillRect', color: '#008080', x: 19, y: 24, w: 5, h: 4 },
  // Boots (darker teal)
  { op: 'fillRect', color: '#005555', x: 7, y: 27, w: 7, h: 3 },
  { op: 'fillRect', color: '#005555', x: 18, y: 27, w: 7, h: 3 },
];

// ---- Power Apps — 3-tone purple chevron logo with legs ----
// Similar to Power Automate but with Power Apps purple/magenta color scheme
// Dark purple / medium magenta / light purple diagonal bands
export const POWER_APPS: DrawCommand[] = [
  // ── Back diamond (dark purple #742774, center ≈ x10 y11, half-diag 8px) ──
  // Drawn first so the front diamond overwrites the overlapping region
  { op: 'fillRect', color: '#742774', x: 9,  y: 2,  w: 2,  h: 2 },  // tip
  { op: 'fillRect', color: '#742774', x: 7,  y: 4,  w: 6,  h: 2 },
  { op: 'fillRect', color: '#742774', x: 5,  y: 6,  w: 10, h: 2 },
  { op: 'fillRect', color: '#742774', x: 3,  y: 8,  w: 14, h: 2 },
  { op: 'fillRect', color: '#742774', x: 1,  y: 10, w: 18, h: 2 },  // widest
  { op: 'fillRect', color: '#742774', x: 3,  y: 12, w: 14, h: 2 },
  { op: 'fillRect', color: '#742774', x: 5,  y: 14, w: 10, h: 2 },
  { op: 'fillRect', color: '#742774', x: 7,  y: 16, w: 6,  h: 2 },
  { op: 'fillRect', color: '#742774', x: 9,  y: 18, w: 2,  h: 2 },  // tip

  // ── Front diamond (offset upper-right, center ≈ x14 y9, half-diag 8px) ──
  // Split at x=14 (centre): left half = medium pink #C44CC4, right = light pink #E8A8E8
  { op: 'fillRect', color: '#C44CC4', x: 13, y: 0,  w: 1,  h: 2 },  // tip
  { op: 'fillRect', color: '#E8A8E8', x: 14, y: 0,  w: 1,  h: 2 },
  { op: 'fillRect', color: '#C44CC4', x: 11, y: 2,  w: 3,  h: 2 },
  { op: 'fillRect', color: '#E8A8E8', x: 14, y: 2,  w: 3,  h: 2 },
  { op: 'fillRect', color: '#C44CC4', x: 9,  y: 4,  w: 5,  h: 2 },
  { op: 'fillRect', color: '#E8A8E8', x: 14, y: 4,  w: 5,  h: 2 },
  { op: 'fillRect', color: '#C44CC4', x: 7,  y: 6,  w: 7,  h: 2 },
  { op: 'fillRect', color: '#E8A8E8', x: 14, y: 6,  w: 7,  h: 2 },
  { op: 'fillRect', color: '#C44CC4', x: 5,  y: 8,  w: 9,  h: 2 },  // widest
  { op: 'fillRect', color: '#E8A8E8', x: 14, y: 8,  w: 9,  h: 2 },
  { op: 'fillRect', color: '#C44CC4', x: 7,  y: 10, w: 7,  h: 2 },
  { op: 'fillRect', color: '#E8A8E8', x: 14, y: 10, w: 7,  h: 2 },
  { op: 'fillRect', color: '#C44CC4', x: 9,  y: 12, w: 5,  h: 2 },
  { op: 'fillRect', color: '#E8A8E8', x: 14, y: 12, w: 5,  h: 2 },
  { op: 'fillRect', color: '#C44CC4', x: 11, y: 14, w: 3,  h: 2 },
  { op: 'fillRect', color: '#E8A8E8', x: 14, y: 14, w: 3,  h: 2 },
  { op: 'fillRect', color: '#C44CC4', x: 13, y: 16, w: 1,  h: 2 },  // tip
  { op: 'fillRect', color: '#E8A8E8', x: 14, y: 16, w: 1,  h: 2 },

  // ── Legs ──
  { op: 'fillRect', color: '#742774', x: 5,  y: 22, w: 5,  h: 5 },
  { op: 'fillRect', color: '#742774', x: 13, y: 22, w: 5,  h: 5 },
  { op: 'fillRect', color: '#C44CC4', x: 4,  y: 26, w: 7,  h: 3 },
  { op: 'fillRect', color: '#C44CC4', x: 12, y: 26, w: 7,  h: 3 },
];

// ---- Microsoft Teams — two-person silhouette with T badge ----
export const MS_TEAMS: DrawCommand[] = [
  // ── Back person silhouette (smaller, right) ──
  // Head
  { op: 'circle', color: '#7B83EB', cx: 22, cy: 5, r: 4 },
  // Body
  { op: 'fillRect', color: '#7B83EB', x: 17, y: 9, w: 10, h: 10 },
  { op: 'circle', color: '#7B83EB', cx: 22, cy: 19, r: 5 },

  // ── Front person silhouette (larger, left-center) ──
  // Head
  { op: 'circle', color: '#5B5FC7', cx: 14, cy: 6, r: 5 },
  // Body
  { op: 'circle', color: '#5B5FC7', cx: 14, cy: 22, r: 7 },
  { op: 'fillRect', color: '#5B5FC7', x: 7, y: 12, w: 14, h: 10 },

  // ── T badge (purple rounded square, left) ──
  { op: 'fillRect', color: '#464EB8', x: 1, y: 8, w: 13, h: 12 },
  // T letter
  { op: 'fillRect', color: '#ffffff', x: 4, y: 10, w: 7, h: 2 },
  { op: 'fillRect', color: '#ffffff', x: 6, y: 10, w: 3, h: 8 },

  // ── Legs ──
  { op: 'fillRect', color: '#5B5FC7', x: 7, y: 24, w: 5, h: 5 },
  { op: 'fillRect', color: '#5B5FC7', x: 16, y: 24, w: 5, h: 5 },
  { op: 'fillRect', color: '#464EB8', x: 6, y: 28, w: 7, h: 3 },
  { op: 'fillRect', color: '#464EB8', x: 15, y: 28, w: 7, h: 3 },
];

// ---- Microsoft Copilot — colorful ribbon/infinity logo ----
export const MS_COPILOT: DrawCommand[] = [
  // ── Left ribbon (blue → green → yellow gradient, top-left to bottom-left) ──
  // Top curve (blue)
  { op: 'fillRect', color: '#1B9CFC', x: 4, y: 2, w: 8, h: 2 },
  { op: 'fillRect', color: '#0D8BF0', x: 2, y: 4, w: 6, h: 2 },
  { op: 'fillRect', color: '#10A5C8', x: 1, y: 6, w: 5, h: 2 },
  // Middle (teal → green)
  { op: 'fillRect', color: '#20B890', x: 1, y: 8, w: 5, h: 2 },
  { op: 'fillRect', color: '#3DC070', x: 1, y: 10, w: 6, h: 2 },
  { op: 'fillRect', color: '#70C850', x: 2, y: 12, w: 6, h: 2 },
  // Bottom curve (yellow → orange)
  { op: 'fillRect', color: '#C8C020', x: 3, y: 14, w: 6, h: 2 },
  { op: 'fillRect', color: '#E8A020', x: 5, y: 16, w: 6, h: 2 },
  { op: 'fillRect', color: '#F08020', x: 8, y: 18, w: 6, h: 2 },

  // ── Center bridge (white gap between ribbons) ──
  { op: 'fillRect', color: '#ffffff', x: 11, y: 8, w: 6, h: 6 },

  // ── Right ribbon (blue → purple → pink, top-right to bottom-right) ──
  // Top curve (blue)
  { op: 'fillRect', color: '#2060E0', x: 16, y: 2, w: 8, h: 2 },
  { op: 'fillRect', color: '#4050D8', x: 20, y: 4, w: 6, h: 2 },
  // Middle (purple)
  { op: 'fillRect', color: '#7040C8', x: 22, y: 6, w: 5, h: 2 },
  { op: 'fillRect', color: '#9040B8', x: 22, y: 8, w: 5, h: 2 },
  { op: 'fillRect', color: '#B040A0', x: 21, y: 10, w: 6, h: 2 },
  // Bottom curve (pink → salmon)
  { op: 'fillRect', color: '#D04888', x: 19, y: 12, w: 6, h: 2 },
  { op: 'fillRect', color: '#E86070', x: 17, y: 14, w: 6, h: 2 },
  { op: 'fillRect', color: '#F08060', x: 14, y: 16, w: 6, h: 2 },
  { op: 'fillRect', color: '#F09058', x: 11, y: 18, w: 5, h: 2 },

  // ── Legs ──
  { op: 'fillRect', color: '#7040C8', x: 7, y: 22, w: 5, h: 5 },
  { op: 'fillRect', color: '#D04888', x: 16, y: 22, w: 5, h: 5 },
  { op: 'fillRect', color: '#4050D8', x: 6, y: 26, w: 7, h: 3 },
  { op: 'fillRect', color: '#E86070', x: 15, y: 26, w: 7, h: 3 },
];

// ---- UFO (flying saucer) ----
export const UFO_SPRITE: DrawCommand[] = [
  // Dome (glass bubble on top)
  { op: 'circle', color: 'rgba(180,220,255,0.7)', cx: 24, cy: 6, r: 7 },
  { op: 'circle', color: 'rgba(220,240,255,0.5)', cx: 22, cy: 4, r: 3 },

  // Body (metallic oval)
  { op: 'fillRect', color: '#b0b0b0', x: 4,  y: 10, w: 40, h: 6 },
  { op: 'fillRect', color: '#d0d0d0', x: 8,  y: 9,  w: 32, h: 2 },
  { op: 'fillRect', color: '#888888', x: 8,  y: 16, w: 32, h: 2 },
  { op: 'fillRect', color: '#909090', x: 2,  y: 11, w: 4,  h: 4 },
  { op: 'fillRect', color: '#909090', x: 42, y: 11, w: 4,  h: 4 },

  // Rim lights
  { op: 'circle', color: '#ff4444', cx: 10, cy: 13, r: 1.5 },
  { op: 'circle', color: '#44ff44', cx: 18, cy: 13, r: 1.5 },
  { op: 'circle', color: '#4488ff', cx: 26, cy: 13, r: 1.5 },
  { op: 'circle', color: '#ffff44', cx: 34, cy: 13, r: 1.5 },
  { op: 'circle', color: '#ff44ff', cx: 42, cy: 13, r: 1.5 },

  // Bottom disc
  { op: 'fillRect', color: '#707070', x: 14, y: 18, w: 20, h: 3 },
];

export type SpriteKey =
  | 'player'
  | 'player_walk1'
  | 'player_male'
  | 'player_male_walk1'
  | 'player_female'
  | 'player_female_walk1'
  | 'player_neutral'
  | 'player_neutral_walk1'
  | 'user_npc_owner'
  | 'user_npc_member'
  | 'user_npc_visitor'
  | 'pnp_rabbit'
  | 'vesa_npc'
  | 'luise'
  | 'warrior_horse'
  | 'm365_chilli'
  | 'spfx_toolkit'
  | 'pnp_powershell'
  | 'power_automate'
  | 'power_pages'
  | 'julie'
  | 'campfire'
  | 'pnp_spfx_samples'
  | 'power_bi'
  | 'pnp_core'
  | 'power_apps'
  | 'ms_lists'
  | 'hugo'
  | 'ms_teams'
  | 'ms_copilot'
  | 'ufo';

export const SPRITES: Record<SpriteKey, DrawCommand[]> = {
  player: PLAYER_SPRITE,
  player_walk1: PLAYER_WALK1,
  player_male: PLAYER_MALE,
  player_male_walk1: PLAYER_MALE_WALK1,
  player_female: PLAYER_FEMALE,
  player_female_walk1: PLAYER_FEMALE_WALK1,
  player_neutral: PLAYER_NEUTRAL,
  player_neutral_walk1: PLAYER_NEUTRAL_WALK1,
  user_npc_owner: USER_NPC_OWNER,
  user_npc_member: USER_NPC_MEMBER,
  user_npc_visitor: USER_NPC_VISITOR,
  pnp_rabbit: PNP_RABBIT,
  vesa_npc: VESA_NPC,
  luise: LUISE,
  warrior_horse: WARRIOR_HORSE,
  m365_chilli: CLI_M365,
  spfx_toolkit: SPFX_TOOLKIT,
  pnp_powershell: PNP_POWERSHELL,
  power_automate: POWER_AUTOMATE,
  power_pages: POWER_PAGES,
  julie: JULIE,
  campfire: CAMPFIRE,
  pnp_spfx_samples: PNP_SPFX_SAMPLES,
  power_bi: POWER_BI,
  pnp_core: PNP_CORE,
  power_apps: POWER_APPS,
  ms_lists: MS_LISTS,
  hugo: HUGO,
  ms_teams: MS_TEAMS,
  ms_copilot: MS_COPILOT,
  ufo: UFO_SPRITE,
};

export function renderSprite(
  ctx: CanvasRenderingContext2D,
  key: string,
  worldX: number,
  worldY: number,
  flip = false,
  scale = 1
): void {
  const commands = SPRITES[key as SpriteKey];
  if (!commands) return;

  ctx.save();
  ctx.translate(Math.round(worldX), Math.round(worldY));
  if (flip) {
    ctx.scale(-1, 1);
    ctx.translate(-32 * scale, 0);
  }
  if (scale !== 1) ctx.scale(scale, scale);

  for (const cmd of commands) {
    if (cmd.op === 'fillRect') {
      ctx.fillStyle = cmd.color;
      ctx.fillRect(cmd.x, cmd.y, cmd.w, cmd.h);
    } else if (cmd.op === 'circle') {
      ctx.beginPath();
      ctx.arc(cmd.cx, cmd.cy, cmd.r, 0, Math.PI * 2);
      ctx.fillStyle = cmd.color;
      ctx.fill();
    } else if (cmd.op === 'text') {
      if (flip) {
        // Un-flip text so it remains readable when sprite is flipped
        ctx.save();
        ctx.scale(-1, 1);
        ctx.fillStyle = cmd.color;
        ctx.font = `bold ${cmd.size}px monospace`;
        ctx.fillText(cmd.text, -cmd.x - (cmd.text.length * cmd.size * 0.6), cmd.y);
        ctx.restore();
      } else {
        ctx.fillStyle = cmd.color;
        ctx.font = `bold ${cmd.size}px monospace`;
        ctx.fillText(cmd.text, cmd.x, cmd.y);
      }
    } else if (cmd.op === 'arc') {
      ctx.beginPath();
      ctx.arc(cmd.cx, cmd.cy, cmd.r, cmd.start, cmd.end);
      ctx.strokeStyle = cmd.color;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
  ctx.restore();
}
