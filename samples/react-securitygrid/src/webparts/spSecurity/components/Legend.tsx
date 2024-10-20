import * as React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { ISelectedPermission } from "../ISpSecurityWebPartProps";

export interface ILegendProps {
  selectedPermissions: ISelectedPermission[];
  checkUncheckPermission: (perm: ISelectedPermission) => void;
}

export function Legend(props: ILegendProps): JSX.Element {
  return (
    <Stack horizontal verticalFill wrap={true} tokens={{ childrenGap: 3 }}>
      {props.selectedPermissions.map((sp) => (
        <div key={sp.freindlyName}>
          <DefaultButton
            text={sp.freindlyName}
            onClick={() => props.checkUncheckPermission(sp)}
            checked={sp.isChecked}
            title={sp.freindlyName}
            iconProps={{ iconName: sp.iconName, style: { color: sp.color } }}>
            {sp.freindlyName}
          </DefaultButton>
        </div>
      ))}
    </Stack>
  );
}
