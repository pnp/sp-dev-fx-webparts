import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react';
import { DisplayMode } from '@microsoft/sp-client-base';
import { Placeholder } from '@microsoft/sp-client-preview';
import { IConfigProps } from './IConfigProps';

export class Config extends React.Component<IConfigProps, {}> {
  public render(): JSX.Element {
    return (
      <Fabric>
        { this.props.displayMode === DisplayMode.Edit &&
          <Placeholder
            icon="ms-Icon--CheckboxComposite"
            iconText="Poll"
            description="Find out what others think."
            buttonLabel="Configure"
            onAdd={ this.props.configure } />
        }
        { this.props.displayMode === DisplayMode.Read &&
          <Placeholder
            icon="ms-ICon--CheckboxComposite"
            iconText="Poll"
            description="Find out what others think." />
        }
      </Fabric>
    );
  }
}