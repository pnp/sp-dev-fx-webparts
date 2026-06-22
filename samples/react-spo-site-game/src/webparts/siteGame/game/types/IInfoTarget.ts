import { IBuilding } from './IBuilding';
import { INPC } from './INPC';

export type IInfoTarget =
  | { kind: 'building'; data: IBuilding }
  | { kind: 'npc'; data: INPC };
