import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
  PropertyPaneCheckbox,
  PropertyPaneCustomField,
  PropertyPaneFieldType,
  PropertyPaneHorizontalRule,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'MetadataNewsWebPartStrings';
import MetadataNews from './components/MetadataNews';
import { IMetadataNewsProps } from '../../interfaces';
import * as pnp from '@pnp/sp';
import { override } from '@microsoft/decorators';

export default class MetadataNewsWebPart extends BaseClientSideWebPart<IMetadataNewsProps> {
  private lookupsFetched: boolean;

  protected onInit(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.properties.ItemLimit === undefined) {
        this.properties.ItemLimit = 5;
        this.properties.ItemHeight = "180";
        this.properties.RefinerInfos = [];
        this.properties.AdditionalFilter = null;
        this.properties.HideRefinerFromItemCard = null;
      }

      if (this.properties.containerWidth === undefined) {
        this.properties.containerWidth = "900";
      }

      if (this.properties.multiColumn === undefined) {
        this.properties.multiColumn = false;
      }

      pnp.sp.setup({
        sp: {
          headers: {
            Accept: 'application/json;odata=verbose'
          },
          baseUrl: this.context.pageContext.web.absoluteUrl
        }
      });
      this.properties.webUrl = this.context.pageContext.web.absoluteUrl;
      resolve();
    });
  }

  @override
  public onDispose() {
    super.onDispose();
  }

  public render(): void {
    const element: React.ReactElement<IMetadataNewsProps> = React.createElement(MetadataNews, this.properties);
    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  // Get the property pane configuration
  // During first opening we will fetch all lookup fields
  // In order for fields to become visible we have to change the value of any of initially visible fields, like Item limit, or Item height
  // Please refer to Chris O'Brien's article http://www.sharepointnutsandbolts.com/2016/09/sharepoint-framework-spfx-web-part-properties-dynamic-dropdown.html
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    if (!this.lookupsFetched) {
      this.lookupsFetched = true;
      pnp.sp.web.lists.getByTitle("Site Pages").fields.filter("ReadOnlyField eq false and Hidden eq false and substringof('Lookup',TypeAsString)").get().then((res: any[]) => {
        for (let f of res) {
          if (!this.properties.RefinerInfos.some(ri => ri.InternalName == f.InternalName)) {
            this.properties.RefinerInfos.push({
              IsSelected: false,
              DisplayName: f.Title,
              InternalName: f.InternalName,
              IsMultiValue: f.TypeAsString == 'Lookup' ? false : true,
              DefaultValues: '',
              List: f.LookupList
            });
          }
        }
        this.onDispose();
      }).catch(error => {
        console.log(error);
      });
    }

    let config = {} as IPropertyPaneConfiguration;
    config.pages = [
      {
        header: {
          description: strings.PropertyPaneDescription
        },
        displayGroupsAsAccordion: true,
        groups: [
          {
            groupName: "General",
            groupFields: [
              PropertyPaneTextField('ItemLimit', {
                label: 'Item limit',
                value: this.properties.ItemLimit.toString(),
                onGetErrorMessage: (text) => this.validateItemLimit(text)
              }),
              PropertyPaneHorizontalRule(),
              PropertyPaneTextField('ItemHeight', {
                label: 'Item height (px)',
                value: this.properties.ItemHeight,
                onGetErrorMessage: (text) => this.validateItemHeight(text)
              }),
              PropertyPaneHorizontalRule(),
              PropertyPaneTextField('AdditionalFilter', {
                label: 'Additional filter',
                value: this.properties.AdditionalFilter,
              }),
              PropertyPaneHorizontalRule(),
              PropertyPaneTextField('HideRefinerFromItemCard', {
                label: 'Hide this refiner (internal name) value from item card',
                value: this.properties.HideRefinerFromItemCard,
              }),
              PropertyPaneHorizontalRule(),
              PropertyPaneTextField('containerWidth', {
                label: 'Width of container in px',
                value: this.properties.containerWidth,
              }),
              PropertyPaneHorizontalRule(),
              PropertyPaneToggle('multiColumn', {
                label: 'Show items in multiple columns'
              })
            ]
          },
          {
            groupName: "Refiner fields",
            groupFields: []
          }
        ]
      }
    ];
    
    if (this.lookupsFetched) {
      for (let infoIndex in this.properties.RefinerInfos) {
        config.pages[0].groups[1].groupFields.push(PropertyPaneCheckbox(`RefinerInfos[${infoIndex}].IsSelected`, { text: this.properties.RefinerInfos[infoIndex].DisplayName}));
        config.pages[0].groups[1].groupFields.push(PropertyPaneTextField(`RefinerInfos[${infoIndex}].DefaultValues`, { description: "; delimited refiner values", value: this.properties.RefinerInfos[infoIndex].DefaultValues}));
        config.pages[0].groups[1].groupFields.push(PropertyPaneHorizontalRule());
      }
    }

    return config;
  }

  private validateItemLimit(text: string) {
    const errMsg = 'Value must be numeric and between 1 and 100';
    if (text == null || text == '') {
      return errMsg;
    } else {
      let number = parseInt(text);
      if (number.toString() != text || number < 1 || number > 100) {
        return errMsg;
      }
    }
    return '';
  }

  private validateItemHeight(text: string) {
    const errMsg = 'Value must be numeric and between 150 and 500';
    if (text == null || text == '') {
      return errMsg;
    } else {
      let number = parseInt(text);
      if (number.toString() != text || number < 150 || number > 500) {
        return errMsg;
      }
    }
    return '';
  }
}
