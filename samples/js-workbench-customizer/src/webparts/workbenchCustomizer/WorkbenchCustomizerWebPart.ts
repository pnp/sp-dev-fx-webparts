import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneToggle, PropertyPaneHorizontalRule, PropertyPaneLabel } from "@microsoft/sp-property-pane";
// import styles from './WorkbenchCustomizerWebPart.module.scss';

import * as strings from 'WorkbenchCustomizerWebPartStrings';

export interface IWorkbenchCustomizerWebPartProps {
  customWorkbenchStyles: boolean;
  customWorkbenchStylesFullWidth: boolean;
  previewMode: boolean;
}

export default class WorkbenchCustomizerWebPart extends BaseClientSideWebPart<IWorkbenchCustomizerWebPartProps> {

  public async render(): Promise<void> {

    if (!this.renderedOnce) {

      if (this.properties.customWorkbenchStyles) {
        await import('./styles/customWorkbenchStyles.module.scss');
      }

      if (this.properties.customWorkbenchStyles && this.properties.customWorkbenchStylesFullWidth) {
        await import('./styles/customWorkbenchStylesFullWidth.module.scss');
      }

      if (this.properties.previewMode) {
        const previewBtn = document.getElementsByName("Preview")[0];
        previewBtn.click();
      }

      this.domElement.innerHTML = `
    <div>
      *** ${strings.TitleLabel} ***
    </div>`;
    }
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('customWorkbenchStyles', {
                  label: strings.CustomWorkbenchStylesFieldLabel,
                }),
                PropertyPaneToggle('customWorkbenchStylesFullWidth', {
                  label: strings.customWorkbenchStylesFullWidthFieldLabel,
                  disabled: !this.properties.customWorkbenchStyles,
                }),
                PropertyPaneToggle('previewMode', {
                  label: strings.PreviewModeFieldLabel,
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneLabel('', {
                  text: strings.RequestPageRefresh,
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
