import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { MSGraphClientV3 } from '@microsoft/sp-http';

import AccordianFaq from './components/AccordianFaq';
import { IAccordianFaqProps } from './components/IAccordianFaqProps';
import { IAccordianFaqWebPartProps } from './IAccordianFaqWebPartProps';
import { IFAQItem } from './components/IFAQItem';

import {
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy
} from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { 
  PropertyPaneTextField, 
  PropertyPaneToggle, 
  PropertyPaneSlider, 
  PropertyPaneChoiceGroup 
} from '@microsoft/sp-property-pane';

interface ISiteData {
  id: string;
}

interface IGraphListResponse {
  value: {
    id: string;
    fields: {
      Title: string;
      Answer: string;
      [key: string]: unknown;
    };
  }[];
}

export default class AccordianFaqWebPart extends BaseClientSideWebPart<IAccordianFaqWebPartProps> {
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected async onInit(): Promise<void> {
    // Set default property values using nullish coalescing (??)
    this.properties.title = this.properties.title ?? 'FAQ';
    this.properties.orderBy = this.properties.orderBy ?? 'Title';
    this.properties.orderAsc = this.properties.orderAsc ?? true;
    this.properties.groupField = this.properties.groupField ?? 'Category';
    this.properties.cacheDuration = this.properties.cacheDuration ?? 5;
    this.properties.headerBgColor = this.properties.headerBgColor ?? '#e0e0e0';
    this.properties.headerTextColor = this.properties.headerTextColor ?? '#333333';
    this.properties.panelBgColor = this.properties.panelBgColor ?? '#ffffff';
    this.properties.expandButtonsPosition = this.properties.expandButtonsPosition ?? 'left';
    return super.onInit();
  }

  public async render(): Promise<void> {
    try {
      const faqItems: IFAQItem[] = await this._fetchFAQItems();
      const element: React.ReactElement<IAccordianFaqProps> = React.createElement(
        AccordianFaq,
        {
          title: this.properties.title,
          faqItems: faqItems,
          groupBy: this.properties.groupBy,
          groupField: this.properties.groupField,
          darkMode: this.properties.darkMode,
          enableMarkdown: this.properties.enableMarkdown,
          headerBgColor: this.properties.headerBgColor,
          headerTextColor: this.properties.headerTextColor,
          panelBgColor: this.properties.panelBgColor,
          hideSearchBar: this.properties.hideSearchBar,
          headerPosition: this.properties.headerPosition,
          expandButtonsPosition: this.properties.expandButtonsPosition,
          hideExpandCollapseButtons: this.properties.hideExpandCollapseButtons
        }
      );
      ReactDom.render(element, this.domElement);
    } catch (error) {
      console.error('Error rendering FAQ WebPart:', error);
      this.domElement.innerHTML = `
        <div class="${this.properties.darkMode ? 'dark' : ''}">
          <div style="color: #a4262c; padding: 16px; background-color: #fde7e9; border: 1px solid #a4262c; border-radius: 4px;">
            Error loading FAQs. Please check your configuration and try again.
          </div>
        </div>`;
    }
  }

  private async _fetchFAQItems(): Promise<IFAQItem[]> {
    const listId = this.properties.listName;
    if (!listId) {
      console.warn('No list selected');
      return [];
    }

    const cacheKey = `faqCache_${listId}_${this.context.pageContext.site.id}`;
    const cacheDuration = this.properties.cacheDuration ?? 5;
    
    // Check local cache
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        const age = (Date.now() - parsed.timestamp) / (1000 * 60);
        if (age < cacheDuration) {
          return parsed.data as IFAQItem[];
        }
      }
    } catch (cacheError) {
      console.warn('Cache error:', cacheError);
      localStorage.removeItem(cacheKey);
    }

    try {
      const orderByField = this.properties.orderBy ?? 'Title';
      const orderDirection = this.properties.orderAsc ? 'asc' : 'desc';
      const hostname = window.location.hostname;
      const serverRelativeUrl = this.context.pageContext.site.serverRelativeUrl;
      const sitePath = `${hostname}:${serverRelativeUrl}`;

      const client: MSGraphClientV3 = await this.context.msGraphClientFactory.getClient("3");

      const siteData = await client
        .api(`sites/${sitePath}`)
        .version("v1.0")
        .get() as ISiteData;

      if (!siteData?.id) {
        throw new Error('Failed to get site data');
      }

      const orderQuery = `&$orderby=fields/${orderByField} ${orderDirection}`;
      const graphResponse = await client
        .api(`sites/${siteData.id}/lists/${listId}/items?expand=fields${orderQuery}`)
        .version("v1.0")
        .header("Prefer", "HonorNonIndexedQueriesWarningMayFailRandomly")
        .get() as IGraphListResponse;

      if (!graphResponse || !Array.isArray(graphResponse.value)) {
        throw new Error('Invalid response format');
      }

      const items: IFAQItem[] = graphResponse.value
        .filter(item => item.fields && item.fields.Title && item.fields.Answer)
        .map(item => ({
          ID: parseInt(item.id, 10),
          Title: item.fields.Title.trim(),
          Answer: item.fields.Answer.trim(),
          Category: item.fields[this.properties.groupField] ? String(item.fields[this.properties.groupField]).trim() : ''
        }));

      // Cache items
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ data: items, timestamp: Date.now() }));
      } catch (cacheError) {
        console.warn('Failed to cache results:', cacheError);
        this._cleanupCache();
      }

      return items;
    } catch (error) {
      console.error('Error in _fetchFAQItems:', error);
      return [];
    }
  }

  private _cleanupCache(): void {
    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('faqCache_')) {
          keys.push(key);
        }
      }
      const MAX_CACHE_ENTRIES = 10;
      if (keys.length > MAX_CACHE_ENTRIES) {
        const sortedKeys = keys.sort((a, b) => {
          const aData = JSON.parse(localStorage.getItem(a) || '{"timestamp":0}');
          const bData = JSON.parse(localStorage.getItem(b) || '{"timestamp":0}');
          return bData.timestamp - aData.timestamp;
        });
        sortedKeys.slice(MAX_CACHE_ENTRIES).forEach(key => localStorage.removeItem(key));
      }
    } catch (error) {
      console.warn('Cache cleanup failed:', error);
      localStorage.clear();
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: "Configure FAQ Web Part" },
          groups: [
            {
              groupName: "Data Source",
              groupFields: [
                PropertyFieldListPicker('listName', {
                  key: 'listPickerFieldId',
                  label: 'Select a list',
                  selectedList: this.properties.listName,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  baseTemplate: 100,
                  context: this.context,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  disabled: false
                })
              ]
            },
            {
              groupName: "General Settings",
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Web Part Title'
                }),
                PropertyPaneToggle('darkMode', {
                  label: 'Enable Dark Mode'
                }),
                PropertyPaneToggle('enableMarkdown', {
                  label: 'Enable Markdown Rendering'
                }),
                PropertyPaneSlider('cacheDuration', {
                  label: 'Cache Duration (minutes)',
                  min: 1,
                  max: 60,
                  step: 1,
                  value: 5
                }),
                PropertyPaneToggle('hideSearchBar', {
                  label: 'Hide Search Bar'
                }),
                PropertyPaneToggle('hideExpandCollapseButtons', {
                  label: 'Hide Expand/Collapse Buttons'
                }),
                PropertyPaneChoiceGroup('headerPosition', {
                  label: 'Question Header Position',
                  options: [
                    { key: 'left', text: 'Left Aligned', checked: this.properties.headerPosition !== 'center' },
                    { key: 'center', text: 'Center Aligned', checked: this.properties.headerPosition === 'center' }
                  ]
                }),
                PropertyPaneChoiceGroup('expandButtonsPosition', {
                  label: 'Expand/Collapse Buttons Position',
                  options: [
                    { key: 'left', text: 'Left' },
                    { key: 'right', text: 'Right' }
                  ]
                })
              ]
            },
            {
              groupName: "Ordering & Grouping",
              groupFields: [
                PropertyPaneTextField('orderBy', {
                  label: 'Order By Field'
                }),
                PropertyPaneToggle('orderAsc', {
                  label: 'Order Ascending'
                }),
                PropertyPaneToggle('groupBy', {
                  label: 'Group by Field'
                }),
                PropertyPaneTextField('groupField', {
                  label: 'Group Field (e.g., Category)'
                })
              ]
            },
            {
              groupName: "Custom Styling",
              groupFields: [
                PropertyPaneTextField('headerBgColor', {
                  label: 'Header Background Color'
                }),
                PropertyPaneTextField('headerTextColor', {
                  label: 'Header Text Color'
                }),
                PropertyPaneTextField('panelBgColor', {
                  label: 'Panel Background Color'
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
}
