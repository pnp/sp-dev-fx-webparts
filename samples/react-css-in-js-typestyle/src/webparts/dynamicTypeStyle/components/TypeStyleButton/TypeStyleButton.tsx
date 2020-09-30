import * as React from 'react';

import { createStyles } from "./TypeStyleButton.styles";
import { useThemedStyles } from '../../../../hooks/useThemedStyles';
import AppContext from '../../../../common/AppContext';

export const TypeStyleButton: React.FC = () => {
  const { theme } = React.useContext(AppContext);
  const styles = useThemedStyles(theme, createStyles);

  const [enabled, setEnabled] = React.useState(true);

  const toggleEnable = () => {
    setEnabled(!enabled);
  };

  return (
    <div className={styles.root}>
      <button onClick={toggleEnable} className={styles.myButton}>Hello from a TypeStyle button! The state is {enabled ? "enabled" : "disabled"}</button>
    </div>
  );
};
