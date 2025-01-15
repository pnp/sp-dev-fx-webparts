import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneLabel,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactImageEditorWebPartStrings';
import ReactImageEditor, { IReactImageEditorBaseProps, IReactImageEditorProps } from './components/ReactImageEditor';
import { IImageManipulationSettings } from '../../components';

export interface IReactImageEditorWebPartProps extends IReactImageEditorBaseProps {

}

export default class ReactImageEditorWebPart extends BaseClientSideWebPart<IReactImageEditorWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactImageEditorProps> = React.createElement(
      ReactImageEditor,
      {
        context: this.context,
        displayMode: this.displayMode,

        showTitle: this.properties.showTitle,
        title: this.properties.title,
        url: this.properties.url,
        settings: this.properties.settings,
        showEditIcon: this.properties.showEditIcon,
        altText: this.properties.altText,
        hideRecentTab: this.properties.hideRecentTab,
        hideWebSearchTab: this.properties.hideWebSearchTab,
        hideStockImages: this.properties.hideStockImages,
        hideOrganisationalAssetTab: this.properties.hideOrganisationalAssetTab,
        hideOneDriveTab: this.properties.hideOneDriveTab,
        hideSiteFilesTab: this.properties.hideSiteFilesTab,
        hideLocalUploadTab: this.properties.hideLocalUploadTab,        
        hideLinkUploadTab: this.properties.hideLinkUploadTab,



        updateTitleProperty: (value: string) => { this.properties.title = value; },
        updateUrlProperty: (value: string) => {
          // tslint:disable-next-line: curly
          if (this.properties.url !== value)
            this.properties.url = value;
          this.properties.settings = [];
          this.render();
        },
        updateManipulationSettingsProperty: (value: IImageManipulationSettings[]) => {
          this.properties.settings = value;
          this.render();
        }

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
                PropertyPaneTextField('altText', { label: strings.AltTextFieldLabel }),
                PropertyPaneToggle('showTitle', {
                  label: strings.ShowTitleFieldLabel
                })
                ,
                PropertyPaneToggle('showEditIcon', {
                  label: strings.ShowEditIconFieldLabel
                }),
                PropertyPaneLabel('urlInfo', { text: `The selected image is at ${this.properties.url ? this.properties.url : 'Not yet selected'} ` }),
                PropertyPaneToggle('hideRecentTab', {
                  label: 'Hide Recent Tab',
                  onText: 'Yes',
                  offText: 'No'
                }),
                PropertyPaneToggle('hideWebSearchTab', {
                  label: 'Hide Web Search Tab',
                  onText: 'Yes',
                  offText: 'No'
                }),
                PropertyPaneToggle('hideStockImages', {
                  label: 'Hide Stock Images Tab',
                  onText: 'Yes',
                  offText: 'No'
                }),
                PropertyPaneToggle('hideOrganisationalAssetTab', {
                  label: 'Hide Organisational Asset Tab',
                  onText: 'Yes',
                  offText: 'No'
                }),
                PropertyPaneToggle('hideOneDriveTab', {
                  label: 'Hide OneDrive Tab',
                  onText: 'Yes',
                  offText: 'No'
                }),
                PropertyPaneToggle('hideSiteFilesTab', {
                  label: 'Hide Site Files Tab',
                  onText: 'Yes',
                  offText: 'No'
                }),
                PropertyPaneToggle('hideLocalUploadTab', {
                  label: 'Hide Local Upload Tab',
                  onText: 'Yes',
                  offText: 'No'
                }),               
                PropertyPaneToggle('hideLinkUploadTab', {
                  label: 'Hide Link Upload Tab',
                  onText: 'Yes',
                  offText: 'No'
                }),

              ]
            }
          ]
        }
      ]
    };
  }
}
