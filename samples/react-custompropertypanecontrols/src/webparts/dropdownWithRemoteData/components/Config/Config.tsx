import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react';
import { DisplayMode } from '@microsoft/sp-core-library';
import { Placeholder } from "@pnp/spfx-controls-react/lib/PlaceHolder";
import { IConfigProps } from './IConfigProps';

export class Config extends React.Component<IConfigProps, {}> {
  public render(): JSX.Element {
    return (
      <Fabric>
        { this.props.displayMode === DisplayMode.Edit &&
          <Placeholder
            iconName="CheckboxComposite"
            iconText="Custom Properties"
            description="Set custom properties."
            buttonLabel="Configure"
            onConfigure={ this.props.configure } />
        }
        { this.props.displayMode === DisplayMode.Read &&
          <Placeholder
            iconName="CheckboxComposite"
            iconText="Custom Properties"
            description="Set custom properties." />
        }
      </Fabric>
    );
  }
}