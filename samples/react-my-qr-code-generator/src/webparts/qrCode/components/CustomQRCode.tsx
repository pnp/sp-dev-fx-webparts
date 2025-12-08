import * as React from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QRDotType, QRCornerSquareType, QRCornerDotType, IQRStyleOptions, IQRFrameOptions } from '../types/QRStyleTypes';
import styles from './CustomQRCode.module.scss';

export interface ICustomQRCodeProps {
  value: string;
  size: number;
  fgColor: string;
  bgColor: string;
  errorLevel: 'L' | 'M' | 'Q' | 'H';
  includeMargin: boolean;
  logoUrl?: string;
  styleOptions: IQRStyleOptions;
  frameOptions: IQRFrameOptions;
}

export const CustomQRCode: React.FunctionComponent<ICustomQRCodeProps> = (props) => {
  const { value, size, fgColor, bgColor, errorLevel, includeMargin, logoUrl, styleOptions, frameOptions } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const qrCodeRef = React.useRef<QRCodeStyling | null>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    const dotTypeMap: Record<QRDotType, string> = {
      [QRDotType.Square]: 'square',
      [QRDotType.Rounded]: 'rounded',
      [QRDotType.Dots]: 'dots',
      [QRDotType.ExtraRounded]: 'extra-rounded'
    };

    const cornerSquareTypeMap: Record<QRCornerSquareType, string> = {
      [QRCornerSquareType.Square]: 'square',
      [QRCornerSquareType.Rounded]: 'rounded',
      [QRCornerSquareType.ExtraRounded]: 'extra-rounded',
      [QRCornerSquareType.Dot]: 'dot'
    };

    const cornerDotTypeMap: Record<QRCornerDotType, string> = {
      [QRCornerDotType.Square]: 'square',
      [QRCornerDotType.Dot]: 'dot'
    };


    const config: Record<string, unknown> = {
      width: size,
      height: size,
      data: value,
      margin: includeMargin ? 10 : 0,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: errorLevel
      },
      dotsOptions: {
        color: fgColor,
        type: dotTypeMap[styleOptions.dotType] as 'square' | 'rounded' | 'dots' | 'extra-rounded'
      },
      backgroundOptions: {
        color: bgColor
      },
      cornersSquareOptions: {
        color: styleOptions.cornerSquareColor || fgColor,
        type: cornerSquareTypeMap[styleOptions.cornerSquareType] as 'square' | 'rounded' | 'extra-rounded' | 'dot'
      },
      cornersDotOptions: {
        color: styleOptions.cornerDotColor || fgColor,
        type: cornerDotTypeMap[styleOptions.cornerDotType] as 'square' | 'dot'
      }
    };

    if (logoUrl) {
      config.image = logoUrl;
      config.imageOptions = {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 0
      };
    }

    const qrCode = new QRCodeStyling(config);

    ref.current.innerHTML = '';
    qrCode.append(ref.current);
    qrCodeRef.current = qrCode;

    return () => {
      if (ref.current) {
        ref.current.innerHTML = '';
      }
    };
  }, [value, size, fgColor, bgColor, errorLevel, includeMargin, logoUrl, styleOptions]);

  if (frameOptions.enabled && frameOptions.style !== 'none') {
    const frameClass = `${styles.frameContainer} ${styles[frameOptions.style] || ''}`;
    
    return (
      <div className={frameClass}>
        <div ref={ref} />
        {frameOptions.text && (
          <div className={styles.frameText}>
            {frameOptions.text}
          </div>
        )}
      </div>
    );
  }

  return <div ref={ref} />;
};
