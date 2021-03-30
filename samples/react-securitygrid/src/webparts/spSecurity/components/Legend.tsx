import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Stack, StackItem, Alignment } from 'office-ui-fabric-react/lib/Stack';
import { IconButton, DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ISelectedPermission } from "../ISpSecurityWebPartProps";
export interface ILegendProps {
  selectedPermissions: Array<ISelectedPermission>;
  checkUncheckPermission: (perm: ISelectedPermission) => void;
}
export function Legend(props: ILegendProps): JSX.Element {
  //debugger;

  return (<Stack horizontal verticalFill wrap={true} gap={3}>
    {
      props.selectedPermissions.map((sp) =>
        <div>
          <DefaultButton
            text={sp.freindlyName}
            onClick={(e) => {
              props.checkUncheckPermission(sp);
            }}
            checked={sp.isChecked}
            title={sp.freindlyName}
            iconProps={{ iconName: sp.iconName, style: { color: sp.color } }}>
            {sp.freindlyName}
          </DefaultButton>
          &nbsp;
        </div>
      )
    }
  </Stack>
  );
  // return (<div>
  //   {
  //     props.selectedPermissions.map((sp)=><span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sp.freindlyName}&nbsp;:&nbsp;</span><span><Icon iconName={sp.iconName}  style={{color:sp.color?sp.color:"FFFFFF"}}  /></span></span> )
  //   }
  // </div>
  // );
}
