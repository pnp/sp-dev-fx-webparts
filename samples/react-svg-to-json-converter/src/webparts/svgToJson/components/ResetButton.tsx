import * as React from 'react';
import { DefaultButton } from '@fluentui/react';
// import styles from './SvgToJson.module.scss';

interface ResetButtonProps {
  resetInputs: () => void;
  className?: string; // Add className prop
}

const ResetButton: React.FC<ResetButtonProps> = ({ resetInputs, className }) => {
  return (
    <DefaultButton
      text="Reset"
      onClick={resetInputs}
      className={className} // Apply className prop
      aria-label="Reset"
    />
  );
};

export default ResetButton;