import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import ContentBlock from './components/ContentBlock';
import type { LayoutType } from './components/IContentBlockProps';
import { SPService } from './services/SPService';
import type { IListInfo } from './models/IContentBlockItem';

export interface IContentBlockWebPartProps {
  listId: string;
  layout: LayoutType;
}

export default class ContentBlockWebPart
  extends BaseClientSideWebPart<IContentBlockWebPartProps> {

  private listOptions: IPropertyPaneDropdownOption[] = [];
  private listsLoaded: boolean = false;

  public render(): void {
    const element = React.createElement(ContentBlock, {
      context: this.context,
      displayMode: this.displayMode,
      listId: this.properties.listId,
      layout: this.properties.layout,

      onListChange: (id: string) => {
        this.properties.listId = id;
        this.render();
      },

      onLayoutChange: (layout: LayoutType) => {
        this.properties.layout = layout;
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

  protected async onPropertyPaneConfigurationStart(): Promise<void> {
    if (this.listsLoaded) {
      return;
    }

    const spService = new SPService(this.context);

    try {
      const lists: IListInfo[] = await spService.getLists();
      this.listOptions = lists.map(l => ({
        key: l.Id,
        text: l.Title
      }));
      this.listsLoaded = true;
      this.context.propertyPane.refresh();
    } catch (error) {
      console.error('Error loading lists:', error);
    }
  }

  private getLayoutOptions(): IPropertyPaneDropdownOption[] {
    return [
      { key: '50-50', text: '50 / 50' },
      { key: '75-25', text: '75 / 25 (Left large)' },
      { key: '25-75', text: '25 / 75 (Right large)' }
    ];
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Configure Content Block'
          },
          groups: [
            {
              groupName: 'Data',
              groupFields: [
                PropertyPaneDropdown('listId', {
                  label: 'Select list',
                  options: this.listOptions,
                  disabled: !this.listsLoaded
                })
              ]
            },
            {
              groupName: 'Layout',
              groupFields: [
                PropertyPaneDropdown('layout', {
                  label: 'Layout',
                  options: this.getLayoutOptions(),
                  selectedKey: this.properties.layout || '50-50'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
