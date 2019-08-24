import * as React from 'react';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IBasicSectionBackgroundExampleProps {
  themeVariant: IReadonlyTheme | undefined;
}

export default class BasicSectionBackgroundExample extends React.Component<IBasicSectionBackgroundExampleProps, {}> {
  public render(): React.ReactElement<IBasicSectionBackgroundExampleProps> {
    // See https://github.com/OfficeDev/office-ui-fabric-react/wiki/Theming
    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;

    return (
      <div style={{backgroundColor: semanticColors.bodyBackground}}>
        <p>This React web part has support for section backgrounds and will inherit its background from the section</p>
      </div>
    );
  }
}
