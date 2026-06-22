export type UfoPhase =
  | 'approaching'
  | 'picking-up'
  | 'carrying'
  | 'dropping'
  | 'departing'
  | 'done';

import { INPC } from './INPC';

export interface IUfo {
  x: number;
  y: number;
  direction: 1 | -1;
  phase: UfoPhase;
  // eslint-disable-next-line @rushstack/no-new-null
  targetNpc: INPC | null;
  pickupX: number;
  dropX: number;
  dropY: number;
  lerpTimer: number;
  npcOriginalY: number;
}
