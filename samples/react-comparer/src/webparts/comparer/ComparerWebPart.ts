import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneHorizontalRule,
  PropertyPaneLabel,
  PropertyPaneLink,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';
import { PropertyFieldSpinButton } from '@pnp/spfx-property-controls/lib/PropertyFieldSpinButton';

import * as strings from 'ComparerWebPartStrings';
import Comparer from './components/Comparer';
import { IComparerProps } from './components/Comparer.types';

export interface IComparerWebPartProps {
  afterImg: string;
  afterLabel: string;
  beforeImg: string;
  beforeLabel: string;
  height: number;
  startPosition: number;
  title: string;
  beforeAlternateText: string;
  afterAlternateText: string;
}

import { PropertyPaneFilePicker, ItemType } from '../../controls/PropertyPaneFilePicker';

/**
 * Change this to true if you want to hide the Web search tab.
 */
const DISABLE_WEB_SEARCH_TAB: boolean = false;
export default class ComparerWebPart extends BaseClientSideWebPart<IComparerWebPartProps> {

  protected onInit(): Promise<void> {
    return new Promise<void>((resolve, _reject) => {

      if (this.properties.startPosition === undefined) {
        this.properties.startPosition = 50;
      }

      if (this.properties.height === undefined) {
        this.properties.height = 400;
      }

      resolve(undefined);
    });
  }

  public render(): void {
    const { clientWidth } = this.domElement;

    const element: React.ReactElement<IComparerProps> = React.createElement(
      Comparer,
      {
        afterImg: this.properties.afterImg,
        afterLabel: this.properties.afterLabel,
        beforeImg: this.properties.beforeImg,
        beforeLabel: this.properties.beforeLabel,
        displayMode: this.displayMode,
        height: this.properties.height,
        onConfigure: this.context.propertyPane.open,
        startPosition: this.properties.startPosition,
        title: this.properties.title,
        width: clientWidth,
        beforeAlternateText: this.properties.beforeAlternateText,
        afterAlternateText: this.properties.afterAlternateText,
        onUpdateTitle: (value: string) => {
          // when title is changed, store the new title
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * Redraws the web part when resized
   * @param _newWidth
   */
  protected onAfterResize(_newWidth: number): void {
    // redraw the web part
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
          displayGroupsAsAccordion: true,
          groups: [
            {

              groupName: strings.BeforeImageGroupName,
              groupFields: [
                PropertyPaneLabel('beforeImg', {
                  text: strings.BeforeImageGroupDescription
                }),
                PropertyPaneFilePicker('beforeImg', {
                  key: 'beforeImgId',
                  label: strings.BeforeImageFieldLabel,
                  buttonLabel: this.properties.beforeImg ? strings.BeforeImageChangeButtonLabel : strings.BeforeImageButtonLabel,
                  value: this.properties.beforeImg,
                  webPartContext: this.context,
                  itemType: ItemType.Images,
                  required: true,
                  disableWebSearchTab: DISABLE_WEB_SEARCH_TAB,
                  onSave: (value: string) => { this.properties.beforeImg = value; }
                }),
                PropertyPaneTextField('beforeLabel', {
                  label: strings.BeforeImageLabelFieldLabel
                }),
                PropertyPaneTextField('beforeAlternateText', {
                  label: strings.BeforeImageAlternateTextFieldLabel,
                  multiline: true,
                  rows: 3,
                  description: strings.AlternateTextFieldDescription
                })
              ]
            },
            {
              groupName: strings.AfterImageGroupName,
              groupFields: [
                PropertyPaneLabel('afterImg', {
                  text: strings.AfterImageGroupDescription
                }),
                PropertyPaneFilePicker('afterImg', {
                  key: 'afterImgId',
                  label: strings.AfterImageFieldLabel,
                  buttonLabel: this.properties.afterImg ? strings.AfterImageChangeButtonLabel : strings.AfterImageButtonLabel,
                  value: this.properties.afterImg,
                  webPartContext: this.context,
                  itemType: ItemType.Images,
                  required: true,
                  disableWebSearchTab: DISABLE_WEB_SEARCH_TAB,
                  onSave: (value: string) => { this.properties.afterImg = value; }
                }),
                PropertyPaneTextField('afterLabel', {
                  label: strings.AfterImageLabelFieldLabel,
                }),
                PropertyPaneTextField('afterAlternateText', {
                  label: strings.AfterImageAlternateTextFieldLabel,
                  multiline: true,
                  rows: 3,
                  description: strings.AlternateTextFieldDescription
                })
              ]
            },
            {
              groupName: strings.OptionsGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneSlider('startPosition', {
                  label: strings.StartPositionFieldLabel,
                  min: 0,
                  max: 100,
                  showValue: true,
                  step: 1
                }),
                PropertyFieldSpinButton('height', {
                  label: strings.HeightFieldLabel,
                  step: 1,
                  min: 0,
                  key: 'heightId',
                  suffix: 'px',
                  decimalPlaces: 0,
                  initialValue: this.properties.height,
                  properties: this.properties,
                  onPropertyChange: (propertyPath: string, newValue: any) => this._handlePropertyChange(propertyPath, newValue),
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _handlePropertyChange(propertyPath: string, newValue: any): void {
    this.properties[propertyPath] = newValue;

    this.render();
  }
}
