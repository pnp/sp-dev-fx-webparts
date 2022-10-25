import * as React from 'react';

import {
  ISpinnerStyles,
  Spinner as SpinnerFUI,
  SpinnerSize,
  Stack,
} from 'office-ui-fabric-react';

export interface ISpinnerProps {
  showSpinner: boolean;
  size: SpinnerSize;
  styles?: ISpinnerStyles;
}

export const Spinner: React.FunctionComponent<ISpinnerProps> = (props: React.PropsWithChildren<ISpinnerProps>) => {
  const { showSpinner, size, styles } = props;

  if (showSpinner) {
    return (
      <Stack horizontal verticalAlign="center" horizontalAlign="center" style={{ width: "100%" }}>
        <SpinnerFUI size={size} styles={styles} />
      </Stack>
    );
  }

  return null;
};
