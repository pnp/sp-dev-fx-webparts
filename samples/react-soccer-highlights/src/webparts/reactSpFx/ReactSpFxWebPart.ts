import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneToggle,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'ReactSpFxWebPartStrings';
import ReactSpFx from './components/ReactSpFx';
import { IReactSpFxProps } from './components/IReactSpFxProps';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IReactSpFxWebPartProps {
  title: string;
  pageSize: number;
  displayMode: DisplayMode;
  showFlatMode: boolean;
  updateProperty: (value: string) => void;
}

export default class ReactSpFxWebPart extends BaseClientSideWebPart<IReactSpFxWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactSpFxProps> = React.createElement(
      ReactSpFx,
      {
        title: this.properties.title,
        displayMode: this.properties.displayMode,
        pageSize: this.properties.pageSize == undefined ? 10 : this.properties.pageSize,
        showFlatMode: this.properties.showFlatMode,
        updateProperty: (value: string) => {this.properties.title = value;},
        onConfigure: () => {
          this.context.propertyPane.open();
        },
      }
    );

    ReactDom.render(element, this.domElement);
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
                PropertyPaneSlider('pageSize',{
                label:"Highlights Per Page",
                min:1,
                max:20,
                value:5,
                showValue:true,
                step:1
                }),
                PropertyPaneToggle('showFlatMode', {
                  label: "Show Videos in Flat Mode",
                  checked: false
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
