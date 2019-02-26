import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
import styles from './WorkbenchCustomizerWebPart.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'WorkbenchCustomizerWebPartStrings';

export interface IWorkbenchCustomizerWebPartProps {
  requiresPageRefresh: boolean;
  maxWidth: boolean;
  centerCanvas: boolean;
  overflow: boolean;
  padding: boolean;
}

export default class WorkbenchCustomizerWebPart extends BaseClientSideWebPart<IWorkbenchCustomizerWebPartProps> {

  public onInit(): Promise<void> {
    this.properties.requiresPageRefresh = false;
    return Promise.resolve();
  }

  public async render(): Promise<void> {

    if (this.properties.maxWidth) {
      await import('./styles/maxWidth.module.scss');
    }
    if (this.properties.centerCanvas) {
      await import('./styles/centerCanvas.module.scss');
    }
    if (this.properties.overflow) {
      await import('./styles/overflow.module.scss');
    }
    if (this.properties.padding) {
      await import('./styles/padding.module.scss');
    }

    this.domElement.innerHTML = `
    <div class="${styles.workbenchCustomizer}">
      ${this.properties.requiresPageRefresh
        ? `<div class="${styles.redMessage}">Please refresh the page to update workbench styles</div>`
        : ''
      }
      <div>Max width enabled: ${this.properties.maxWidth}</div>
      <div>Center canvas zone: ${this.properties.centerCanvas}</div>
      <div>Custom overflow enabled: ${this.properties.overflow}</div>
      <div>Custom padding enabled: ${this.properties.padding}</div>
    </div>`;
  }

  public onPropertyPaneFieldChanged(path: string, oldValue: any, newValue: any): void {
    if (!newValue) {
      // request a page refresh if any of the options was disabled
      // no real smart logic implemented at this point
      this.properties.requiresPageRefresh = true;
    }
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
                PropertyPaneToggle('maxWidth', {
                  label: strings.MaxWidthFieldLabel
                }),
                PropertyPaneToggle('centerCanvas', {
                  label: strings.CenterCanvasFieldLabel
                }),
                PropertyPaneToggle('overflow', {
                  label: strings.OverflowFieldLabel
                }),
                PropertyPaneToggle('padding', {
                  label: strings.PaddingFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
