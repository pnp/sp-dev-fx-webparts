import * as React from 'react';
import { Customizer } from '@uifabric/utilities/lib/Customizer';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IOfficeUIFabricSectionBackgroundExampleProps {
  themeVariant: IReadonlyTheme | undefined;
}

export default class OfficeUIFabricSectionBackgroundExample extends React.Component<IOfficeUIFabricSectionBackgroundExampleProps, {}> {
  public render(): React.ReactElement<IOfficeUIFabricSectionBackgroundExampleProps> {

    // Customizer will set a scoped theme for all OUIFR components that use `customizable` in the subtree
    return (
      <div>
        <p>This web part implements an Office UI Framework component which inherits the background and correct colors</p>
        <Customizer settings={{ theme: this.props.themeVariant }}>
          <PrimaryButton>Click me</PrimaryButton>
        </Customizer>
      </div>
    );
  }
}
