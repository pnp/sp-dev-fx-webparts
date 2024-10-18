import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';
import styles from './SvgToJson.module.scss';

interface ConvertButtonProps {
  isConverted: boolean;
  svgContent: string;
  convertSvgToJson: () => Promise<void>;
}

const ConvertButton: React.FC<ConvertButtonProps> = ({ isConverted, svgContent, convertSvgToJson }) => {
  if (isConverted) {
    return null;
  }

  return (
    <PrimaryButton
      text="Convert and copy to clipboard"
      onClick={convertSvgToJson}
      className={styles.button}
      disabled={!svgContent}
      styles={{
        root: {
          backgroundColor: svgContent ? 'var(--primary-color) !important' : 'lightgrey !important',
          borderColor: svgContent ? 'var(--primary-color) !important' : 'lightgrey !important',
          color: svgContent ? 'white !important' : 'grey !important',
          visibility: isConverted ? 'hidden' : 'visible', // Maintain the button's space in the layout
        },
      }}
    />
  );
};

export default ConvertButton;