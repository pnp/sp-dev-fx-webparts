export enum QRDotType {
  Square = 'square',
  Rounded = 'rounded',
  Dots = 'dots',
  ExtraRounded = 'extra-rounded'
}

export enum QRCornerSquareType {
  Square = 'square',
  Rounded = 'rounded',
  ExtraRounded = 'extra-rounded',
  Dot = 'dot'
}

export enum QRCornerDotType {
  Square = 'square',
  Dot = 'dot'
}

export interface IQRStyleOptions {
  dotType: QRDotType;
  cornerSquareType: QRCornerSquareType;
  cornerDotType: QRCornerDotType;
  cornerSquareColor?: string;
  cornerDotColor?: string;
}

export interface IQRFrameOptions {
  enabled: boolean;
  style: 'none' | 'simple' | 'rounded' | 'badge';
  text?: string;
  color?: string;
}

export const DEFAULT_STYLE_OPTIONS: IQRStyleOptions = {
  dotType: QRDotType.Square,
  cornerSquareType: QRCornerSquareType.Square,
  cornerDotType: QRCornerDotType.Square
};

export const DEFAULT_FRAME_OPTIONS: IQRFrameOptions = {
  enabled: false,
  style: 'none'
};
