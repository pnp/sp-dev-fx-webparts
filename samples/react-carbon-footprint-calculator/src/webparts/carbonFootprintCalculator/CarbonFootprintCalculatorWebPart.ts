import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme
} from '@microsoft/sp-component-base';

import * as strings from 'CarbonFootprintCalculatorWebPartStrings';
import CarbonFootprintCalculator from './components/CarbonFootprintCalculator';
import { ICarbonFootprintCalculatorProps } from './components/ICarbonFootprintCalculatorProps';

export interface ICarbonFootprintCalculatorWebPartProps {
  description: string;
  defaultResidents: number;
}

export default class CarbonFootprintCalculatorWebPart extends BaseClientSideWebPart<ICarbonFootprintCalculatorWebPartProps> {

  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  public render(): void {
    const element: React.ReactElement<ICarbonFootprintCalculatorProps> = React.createElement(
      CarbonFootprintCalculator,
      {
        description: this.properties.description,
        defaultResidents: this.properties.defaultResidents,
        themeVariant: this._themeVariant
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this._themeVariant = this._themeProvider.tryGetTheme();
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    return super.onInit();
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
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
                }),
                PropertyPaneSlider('defaultResidents', {
                  label: strings.ResidentsLabel,
                  min: 1,
                  max: 10,
                  step: 1,
                  value: this.properties.defaultResidents || 2,
                  showValue: true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
