import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'EnhancedListFormattingWebPartStrings';
import EnhancedListFormatting from './components/EnhancedListFormatting';
import { IEnhancedListFormattingProps } from './components/IEnhancedListFormattingProps';

import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
import { PropertyFieldMonacoEditor } from '../../controls/PropertyFieldMonacoEditor';


export interface IEnhancedListFormattingWebPartProps {
  css: string;
  acceptedDisclaimer?: boolean;
}

export default class EnhancedListFormattingWebPart extends BaseClientSideWebPart <IEnhancedListFormattingWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IEnhancedListFormattingProps> = React.createElement(
      EnhancedListFormatting,
      {
        css: this.properties.css,
        acceptedDisclaimer: this.properties.acceptedDisclaimer,
        displayMode: this.displayMode,
        context: this.context,
        onAcceptDisclaimer: ()=>this._handleAcceptDisclaimer()
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
                PropertyFieldMonacoEditor('css', {
                  label: strings.CSSFieldLabel,
                  key: "cssText",
                  value: this.properties.css,
                  defaultValue: this.properties.css,
                  language: "css",
                  theme: "vs-light",
                  showLineNumbers: false,
                  onPropertyChange: (_propertyPath: string, _oldValue: string, value: string) => this._handleSave(value),
                }),
                PropertyPaneWebPartInformation({
                  description: strings.CSSDisclaimer,
                  key: 'cssDisclaimer'
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _handleAcceptDisclaimer = () => {
    this.properties.acceptedDisclaimer = true;
    this.render();
  }

  private _handleSave = (value: string) => {
    this.properties.css = value;
  }
}
