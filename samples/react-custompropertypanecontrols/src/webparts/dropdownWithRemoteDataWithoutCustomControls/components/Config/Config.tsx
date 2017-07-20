import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react';
import { DisplayMode } from '@microsoft/sp-core-library';
import { Placeholder } from '@microsoft/sp-webpart-base';
import { IConfigProps } from './IConfigProps';

export class Config extends React.Component<IConfigProps, {}> {
  public render(): JSX.Element {
    return (
      <Fabric>
        { this.props.displayMode === DisplayMode.Edit &&
          <Placeholder
            icon="ms-Icon--CheckboxComposite"
            iconText="Custom Properties"
            description="Set custom properties."
            buttonLabel="Configure"
            onAdd={ this.props.configure } />
        }
        { this.props.displayMode === DisplayMode.Read &&
          <Placeholder
            icon="ms-ICon--CheckboxComposite"
            iconText="Custom Properties"
            description="Set custom properties." />
        }
      </Fabric>
    );
  }
}