import * as React from 'react';
import * as ReactDom from 'react-dom';

// Needed for base SharePoint stuff
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneLabel,
  PropertyPaneSlider,
  PropertyPaneChoiceGroup,
  IPropertyPaneChoiceGroupOption,
} from '@microsoft/sp-webpart-base';

//
import { PropertyFieldSpinButton } from '@pnp/spfx-property-controls/lib/PropertyFieldSpinButton';

// Localized strings
import * as strings from 'ComparerWebPartStrings';

// Used to load the Comparer component
import Comparer from './components/Comparer';
import { IComparerProps } from './components/Comparer.types';

// Needed to display a custom property pane file picker
import { PropertyPaneFilePicker, ItemType } from '../../controls/PropertyPaneFilePicker';

export interface IComparerWebPartProps {
  afterImg: string;
  afterLabel: string;
  aspectRatio: '1:1' | '3:2' | '4:3' | '16:9';
  beforeImg: string;
  beforeLabel: string;
  startPosition: number;
  title: string;
  beforeAlternateText: string;
  afterAlternateText: string;
}

const aspectRatio1_1: string = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAADeSURBVHhe7dAxCsNAEARBvVP//8fZDgxi6GjBJ4seQSnoS5Y51lp1gdEMoxlGM4xmGM0wmmE0w2iG0QyjGUYzjGYYzTCaYTTDaIbRDKMZxon39/ndJu+ZwjiRB+6W90xhnPgedp7nVo8YJN9+pYOEDhI6SOggoYOEDhI6SOggoYOEDhI6SOggoYOEDhI6SOggoYOEDhI6SOggoYOEDhI6SOggoYOExwyy098Pcpe8ZwrjRB64W94zhdEMoxlGM4xmGM0wmmE0w2iG0QyjGUYzjGYYzTCaYTTDaIbRax0vGYi5boi8iG0AAAAASUVORK5CYII=`;

/**
 * Change the line below to true if you want to hide the Web search tab.
 */
const DISABLE_WEB_SEARCH_TAB: boolean = false;
export default class ComparerWebPart extends BaseClientSideWebPart<IComparerWebPartProps> {

  // protected onInit(): Promise<void> {
  //   return new Promise<void>((resolve, _reject) => {

  //     if (this.properties.aspectRatio === undefined) {
  //       this.properties.aspectRatio = '1:1';
  //     }

  //     resolve(undefined);
  //   });
  // }

  public render(): void {
    // Get the width of this web part, we'll need it to resize the images
    const { clientWidth } = this.domElement;

    // Calculate the aspect ratio
    let ratio: number = undefined;
    switch (this.properties.aspectRatio) {
      case "1:1":
        ratio = 1;
        break;
      case "4:3":
        ratio = 4 / 3;
        break;
      case "3:2":
        ratio = 3 / 2;
        break;
      case "16:9":
      default:
        ratio = 16 / 9;
    }

    // Calculate the height based on the selected aspect ratio
    const calculatedHeight: number = clientWidth / ratio;

    const element: React.ReactElement<IComparerProps> = React.createElement(
      Comparer,
      {
        afterImg: this.properties.afterImg,
        afterLabel: this.properties.afterLabel,
        beforeImg: this.properties.beforeImg,
        beforeLabel: this.properties.beforeLabel,
        displayMode: this.displayMode,
        height: calculatedHeight,
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
                PropertyPaneChoiceGroup('aspectRatio', {
                  label: strings.AspectRatioFieldLabel,
                  options: [
                    {
                      key: '1:1',
                      text: '1:1',
                      selectedImageSrc: require('./assets/AspectRatio1_1.png'),
                      imageSrc: require('./assets/AspectRatio1_1.png'),
                    },
                    {
                      key: '3:2',
                      text: '3:2',
                      selectedImageSrc: require('./assets/AspectRatio3_2.png'),
                      imageSrc: require('./assets/AspectRatio3_2.png'),
                    },
                    {
                      key: '4:3',
                      text: '4:3',
                      selectedImageSrc: require('./assets/AspectRatio4_3.png'),
                      imageSrc: require('./assets/AspectRatio4_3.png'),
                    },
                    {
                      key: '16:9',
                      text: '16:9',
                      selectedImageSrc: require('./assets/AspectRatio16_9.png'),
                      imageSrc: require('./assets/AspectRatio16_9.png'),
                    }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
