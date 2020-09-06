import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { ThemeProvider, IReadonlyTheme, ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import * as strings from 'DynamicTypeStyleWebPartStrings';

import { StylesDemo } from './components/StylesDemo';
import AppContext from '../../common/AppContext';

export interface IDynamicTypeStyleWebPartProps {
  description: string;
}

export default class DynamicTypeStyleWebPart extends BaseClientSideWebPart<IDynamicTypeStyleWebPartProps> {

  private themeProvider: ThemeProvider;
  private theme: IReadonlyTheme;

  protected onInit(): Promise<void> {
    this.themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this.theme = this.themeProvider.tryGetTheme();
    this.themeProvider.themeChangedEvent.add(this, this.onThemeChanged);

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement = React.createElement(
      AppContext.Provider,
      {
        value: {
          theme: { ...this.theme }
        }
      },
      React.createElement(StylesDemo)
    );

    ReactDom.render(element, this.domElement);
  }

  private onThemeChanged(args: ThemeChangedEventArgs) {
    this.theme = args.theme;
    this.render();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
