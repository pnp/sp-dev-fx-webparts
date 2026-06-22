export type NPCKind = 'user' | 'easteregg' | 'm365egg';
export type NPCFacing = 'up' | 'down' | 'left' | 'right';

export interface INPC {
  id: string;
  name: string;
  kind: NPCKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  spriteKey: string;
  walkTimer: number;
  pauseTimer: number;
  facing: NPCFacing;
  title: string;
  bio: string;
  /** Optional pool of bios — one is picked at random each time the panel opens. */
  bios?: string[];
  email?: string;
  profileUrl?: string;
  groupColor?: string;
  animFrame: number;
  animTimer: number;
  speedMultiplier: number;
}
