import * as React from 'react';

import {
  Spinner,
  SpinnerLabelPosition,
  SpinnerSize,
} from 'office-ui-fabric-react/lib/Spinner';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

export interface IShowSpinnerProps {
  size?: SpinnerSize;
  label?: string;
  labelPosition?: SpinnerLabelPosition;
  isShow: boolean;
}

export const ShowSpinner: React.FunctionComponent<IShowSpinnerProps> = (props: React.PropsWithChildren<IShowSpinnerProps>) => {
  const { size, label, labelPosition , isShow} = props;

  return (
    <>
      {isShow ? (
      <Stack horizontal horizontalAlign="center" verticalAlign="center" style={{ height: '100%' }}>
        <Spinner size={size ?? SpinnerSize.medium} label={label ?? ''} labelPosition={labelPosition ?? undefined} />
      </Stack>) : null}
    </>
  );
};
