import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { FacetedSearch } from './components/FacetedSearch';
import { IFacetedSearchProps, IFacetedSearchWebPartProps } from './components/IFacetedSearchProps';
import * as strings from 'FacetedSearchWebPartStrings';

export default class FacetedSearchWebPart extends BaseClientSideWebPart<IFacetedSearchWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IFacetedSearchProps> = React.createElement(FacetedSearch, {
      httpClient: this.context.spHttpClient,
      siteUrl: this.context.pageContext.web.absoluteUrl,
      title: this.properties.title || strings.DefaultTitle
    });
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
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', { label: strings.TitleFieldLabel })
              ]
            }
          ]
        }
      ]
    };
  }
}
