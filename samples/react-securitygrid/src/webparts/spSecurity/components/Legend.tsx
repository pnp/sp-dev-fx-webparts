import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import * as Fabric from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import {ISelectedPermission} from "../ISpSecurityWebPartProps";
export interface ILegendProps{
    selectedPermissions:Array<ISelectedPermission>
}
export  function Legend(props: ILegendProps ):JSX.Element {
    debugger;
 
 
  return (<div>
    {
      props.selectedPermissions.map((sp)=><span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sp.permission}:</span><span><Icon iconName="CircleFill"  style={{color:sp.color.str}}  /></span></span> )
    }
  </div>
  );
}