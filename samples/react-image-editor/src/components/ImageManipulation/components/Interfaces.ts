import { nodePoition } from './Enums';

export interface IMousePosition {
  x: number;
  y: number;
}

export interface ICropData {
  clientStartX: number;
  clientStartY: number;
  cropStartWidth: number;
  cropStartHeight: number;
  cropStartX: number;
  cropStartY: number;
  xInversed: boolean;
  yInversed: boolean;
  isResize: boolean;
  pos?: nodePoition;
  xDiff: number;
  yDiff: number;
}
