import * as React from 'react';
import { DefaultButton } from '@fluentui/react';
import * as strings from 'SvgToJsonWebPartStrings';
// import styles from './SvgToJson.module.scss';

interface ResetButtonProps {
  resetInputs: () => void;
  className?: string; 
}

const ResetButton: React.FC<ResetButtonProps> = ({ resetInputs, className }) => {
  return (
    <DefaultButton
      text={strings.reset}
      onClick={resetInputs}
      className={className} 
      aria-label={strings.reset}
    />
  );
};

export default ResetButton;