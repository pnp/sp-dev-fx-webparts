import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import QuickLinksHierarchy from './components/QuickLinksHierarchy';

export interface IQuickLinksHierarchyWebPartProps {
  listId: string;
  listTitle: string;
  description: string;
}

export default class QuickLinksHierarchyWebPart
  extends BaseClientSideWebPart<IQuickLinksHierarchyWebPartProps> {

  public render(): void {
    const element = React.createElement(QuickLinksHierarchy, {
      context: this.context,
      displayMode: this.displayMode,
      listId: this.properties.listId || '',
      listTitle: this.properties.listTitle || '',
      updateProperty: (v) => {
        this.properties.listId = v.listId;
        this.properties.listTitle = v.listTitle;
        this.render();
      }
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
          header: { description: 'Quick Links Hierarchy' },
          groups: [
            {
              groupName: 'Basic Settings',
              groupFields: [
                PropertyPaneTextField('description', { label: 'Description' }),
                PropertyPaneTextField('listTitle', { label: 'Selected List', disabled: true })
              ]
            }
          ]
        }
      ]
    };
  }
}
