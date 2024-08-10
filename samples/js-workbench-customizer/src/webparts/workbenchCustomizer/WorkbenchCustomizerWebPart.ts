import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneToggle,
  PropertyPaneHorizontalRule,
  PropertyPaneLabel,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';

// import styles from './WorkbenchCustomizerWebPart.module.scss';
import * as strings from 'WorkbenchCustomizerWebPartStrings';
// import { delay } from 'lodash';

export interface IWorkbenchCustomizerWebPartProps {
  customWorkbenchStyles: boolean;
  customWorkbenchStylesFullWidth: boolean;
  previewMode: boolean;
}

export default class WorkbenchCustomizerWebPart extends BaseClientSideWebPart<IWorkbenchCustomizerWebPartProps> {

  private _isDarkTheme: boolean = false;
  // private _environmentMessage: string = '';

  public async render(): Promise<void> {

    if (!this.renderedOnce) {

      if (this.properties.customWorkbenchStyles) {
        await import(/* webpackChunkName: 'customWorkbenchStyles' */ './styles/customWorkbenchStyles.module.scss');
      }

      if (this.properties.customWorkbenchStyles && this.properties.customWorkbenchStylesFullWidth) {
        await import(/* webpackChunkName: 'customWorkbenchStylesFullWidth' */ './styles/customWorkbenchStylesFullWidth.module.scss');
      }

      if (this.properties.previewMode && this.displayMode === 2) {
        const previewBtn = document.getElementsByName("Preview")[0];
        if (previewBtn) {
          previewBtn.click();
        }
      }

      this.domElement.innerHTML = `
      <div>
        *** ${strings.TitleLabel} | ${strings.ThemeLabel}: ${this._isDarkTheme ? "Dark" : "Light"} ***
      </div>`;
    }
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
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
