import * as React from 'react';
import * as ReactDom from 'react-dom';
import {DisplayMode, Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  PropertyPaneToggle

} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'SitecontentsWebPartStrings';
import Sitecontents from './components/Sitecontents';
import { ISitecontentsProps } from './components/ISitecontentsProps';
import { INavLinkGroup, MessageBar, MessageBarType} from 'office-ui-fabric-react';


export interface ISitecontentsWebPartProps {
  description: string;
  filterSiteContentBy: string;
  orderBy: string;
  showModifiedDate: boolean;
  showCreatedDate: boolean;
  showItemsCount: boolean;
}
let getSortOrder : IPropertyPaneDropdownOption [] = [
  { key: "TitleDesc", text: "Title Descending" },
  { key: "TitleAsc", text: "Title Ascending" },


]
export default class SitecontentsWebPart extends BaseClientSideWebPart<ISitecontentsWebPartProps> {


  public render(): void {
    let element;
    if(Environment.type == EnvironmentType.Local) {
      element = React.createElement(MessageBar, {
        messageBarType: MessageBarType.blocked },
        "Local environment not supported"
      )
    }
    else {
      element= React.createElement(
        Sitecontents,
        {
          description: this.properties.description,
          filterSiteContentBy: this.properties.filterSiteContentBy,
          orderBy: this.properties.orderBy,
          showModifiedDate: this.properties.showModifiedDate,
          showCreatedDate: this.properties.showCreatedDate,
          showItemsCount: this.properties.showItemsCount,
          context: this.context
        }
      );
    }
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

 public getSiteContentFilterOptions : IPropertyPaneDropdownOption[] =
    [
      {key: "lists", text: "Lists"},
      {key: "libraries", text: "Libraries"},
      {key: "all", text: "All"}
    ]


protected onPropertyPaneConfigurationStart(): void {
  if(this.properties.showCreatedDate!=undefined && this.properties.showCreatedDate!=false) {
    getSortOrder.push(  { key: "CreatedDesc", text: "Created Date Descending" },
                        { key: "CreatedAsc", text: "Created Date Ascending" } )
  }
  if(this.properties.showModifiedDate!=undefined && this.properties.showModifiedDate!=false) {
    getSortOrder.push(  {key: "ModifiedDesc", text: "Modified Date Descending" },
                        { key: "ModifiedAsc", text: "Modified Date Ascending" } )
  }
  if(this.properties.showItemsCount!=undefined && this.properties.showItemsCount!=false) {
    getSortOrder.push(  { key: "ItemsCountAsc", text: "Items Count Ascending" },
                        { key: "ItemsCountDesc", text: "Items Count Descending" } )
  }
  this.context.propertyPane.refresh()
}
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any){
    if(propertyPath =='showModifiedDate' && oldValue!=newValue) {
      if(newValue==false){
        if(this.properties.orderBy=='ModifiedDesc' || this.properties.orderBy=='ModifiedAsc' || this.properties.orderBy ==undefined) {
          this.properties.orderBy='TitleDesc';
        }
       getSortOrder= getSortOrder.filter((order) => {
          return(order.key!='ModifiedDesc' && order.key!='ModifiedAsc')
        })
      }
      else {
        getSortOrder.push({ key: "ModifiedDesc", text: "Modified Date Descending" },
                               { key: "ModifiedAsc", text: "Modified Date Ascending" })
      }
    }

    else if(propertyPath =='showCreatedDate' && oldValue!=newValue) {
      if(newValue==false) {
        if(this.properties.orderBy=='CreatedDesc' || this.properties.orderBy=='CreatedAsc' || this.properties.orderBy ==undefined) {
          this.properties.orderBy='TitleDesc';
        }
        getSortOrder = getSortOrder.filter((order)=>{
          return(order.key!='CreatedDesc' && order.key!='CreatedAsc')
        })
      }
      else {
        getSortOrder.push( { key: "CreatedDesc", text: "Created Date Descending" },
                                { key: "CreatedAsc", text: "Created Date Ascending" })
      }
    }
    else if(propertyPath =='showItemsCount' && oldValue!=newValue) {
      if(newValue==false) {
        if(this.properties.orderBy=='ItemsCountDesc' || this.properties.orderBy=='ItemsCountAsc' || this.properties.orderBy ==undefined) {
          this.properties.orderBy='TitleDesc';
        }
        getSortOrder = getSortOrder.filter((order)=>{
          return(order.key!='ItemsCountDesc' && order.key!='ItemsCountAsc')
        })
      }
      else {
        getSortOrder.push( { key: "ItemsCountAsc", text: "Items Count Ascending" },
                                { key: "ItemsCountDesc", text: "Items Count Descending" })
      }
    }
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
                PropertyPaneDropdown('filterSiteContentBy', {
                  label: strings.FilterSiteContentLabel,
                  options: this.getSiteContentFilterOptions,
                  selectedKey: "all"
                }),
                PropertyPaneToggle('showModifiedDate', {
                  label: strings.ShowModifiedDateFieldLabel,
                }),
                PropertyPaneToggle('showCreatedDate', {
                  label: strings.ShowCreateDateFieldLabel,
                }),
                PropertyPaneToggle('showItemsCount', {
                  label: strings.ShowItemsCountFieldLabel,
                }),
                PropertyPaneDropdown('orderBy', {
                  label: strings.ShowOrderByFieldLabel,
                  options: getSortOrder,
                  selectedKey:'TitleDesc'
                }),

              ]
            }
          ]
        }
      ]
    };
  }
}
