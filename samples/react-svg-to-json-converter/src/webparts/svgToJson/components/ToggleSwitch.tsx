import * as React from 'react';
import { Toggle } from '@fluentui/react';
import styles from './SvgToJson.module.scss';

interface ToggleSwitchProps {
  applyToColumn: boolean;
  setApplyToColumn: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ applyToColumn, setApplyToColumn }) => {
  return (
    <div className={styles.toggleContainer}>
      <span className={styles.toggleLabel}>Do you want to directly apply this SVG format to a column in a list?</span>
      <Toggle
        onText="Yes"
        offText="No"
        aria-label="Apply to column"
        checked={applyToColumn}
        onChange={(e, checked) => setApplyToColumn(!!checked)}
      />
    </div>
  );
};

export default ToggleSwitch;