import * as React from 'react';

import { IIconProps } from 'office-ui-fabric-react';

export interface IAttribute{
    attributeName: string;
    attributeValue: string | React.ReactNode;
    iconProps?: IIconProps
}
