import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SearchBoxWebPartStrings';
import SearchBox from './components/SearchBoxContainer';
import { ISearchBoxProps } from './components/ISearchBoxContainerProps';

export interface ISearchBoxWebPartProps {
}

export default class SearchBoxWebPart extends BaseClientSideWebPart<ISearchBoxWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISearchBoxProps > = React.createElement(
      SearchBox, { });

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: []
        }
      ]
    };
  }
}
