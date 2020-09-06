import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import * as strings from 'webpackExampleStrings';
import { IWebpackExampleWebPartProps } from './IWebpackExampleWebPartProps';

const markdownString: string = require<string>('../../my-markdown.md');

export default class WebpackExampleWebPart extends BaseClientSideWebPart<IWebpackExampleWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = markdownString;
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
                PropertyPaneTextField(
                  'description',
                  {
                    label: strings.DescriptionFieldLabel
                  }
                )
              ]
            }
          ]
        }
      ]
    };
  }
}
