import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
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
                PropertyPaneToggle('showTitle', {
                  label: strings.ShowTitleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
