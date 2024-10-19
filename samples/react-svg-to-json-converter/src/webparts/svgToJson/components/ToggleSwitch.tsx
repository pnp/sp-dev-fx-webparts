// ToggleSwitch.tsx
import * as React from 'react';
import { Toggle } from '@fluentui/react';

interface ToggleSwitchProps {
  applyToColumn: boolean;
  setApplyToColumn: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ applyToColumn, setApplyToColumn }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '10px' }}>Do you want to directly apply this SVG format to a column in a list?</span>
      <Toggle
        onText="Yes"
        offText="No"
        aria-label="Apply to column"
        checked={applyToColumn}
        onChange={(e, checked) => setApplyToColumn(!!checked)}
        styles={{
          root: { marginBottom: 10 },
          pill: {
            backgroundColor: applyToColumn ? '#ff69b4 !important' : 'white !important',
            borderColor: applyToColumn ? '#ff69b4 !important' : 'black !important',
          },
          thumb: {
            backgroundColor: applyToColumn ? 'white !important' : 'black !important',
          },
        }}
      />
    </div>
  );
};

export default ToggleSwitch;