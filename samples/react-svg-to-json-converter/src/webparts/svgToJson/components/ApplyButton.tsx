import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';
import styles from './SvgToJson.module.scss'; // Import the styles

interface ApplyButtonProps {
  applyColumnFormatting: () => void;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({ applyColumnFormatting }) => {
  return (
    <PrimaryButton
      text="Apply Column Formatting"
      onClick={applyColumnFormatting}
      className={styles.button}
    />
  );
};

export default ApplyButton;