import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'ReactNewsWebpartStrings';
import ReactNews from './components/ReactNewsWebpart';
import { IReactNewsWebpartProps } from './components/IReactNewsWebpartProps';
import { IPropertyFieldSite, PropertyFieldSitePicker } from '@pnp/spfx-property-controls/lib/PropertyFieldSitePicker';

export interface IReactNewsWebpartWebPartProps {
  description: string;
  StyleToggle: string;
  AuthorToggle: string;
  sites: IPropertyFieldSite[];
  Site: any[];
}

export default class ReactNewsWebpart extends BaseClientSideWebPart <IReactNewsWebpartProps> {
  public render(): void {
    const element: React.ReactElement<IReactNewsWebpartProps> = React.createElement(
      ReactNews,
      {
        description: this.properties.description,
        StyleToggle: this.properties.StyleToggle,
        sites: this.properties.sites,
        context: this.context,
        AuthorToggle: this.properties.AuthorToggle,
        Site: this.properties.Site,
        onChangeProperty: this.onChangeProperty
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  public  async onInit(): Promise<void> {
    return Promise.resolve();
  }
/*
  protected async onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: unknown,
    newValue: unknown
  ):Promise<void> {
   
    if (propertyPath === "sites") {

       const value:IPropertyFieldSite[] = newValue as IPropertyFieldSite[];
       if (value  && !value.length) {
        this.context.propertyPane.refresh();
        
        this.render()
        return;
      } else {
        this.context.propertyPane.refresh();
      
      }
    }
  }*/
  protected async onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: unknown,
    newValue: any
  ):Promise<void> {
    if (propertyPath === "sites") {
       const value: IPropertyFieldSite[] = newValue as IPropertyFieldSite[];
       if (value  && !value.length) {
         this.properties.Site = [];
        this.context.propertyPane.refresh();
        return;
      } else {
        this.properties.Site = newValue;
        this.context.propertyPane.refresh();
        return;
      }
    }
  }
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  public async getSelectedListFields() {
    if (this.properties.Site) {
      this.context.propertyPane.refresh();
    }
  }

  public onChangeProperty = (changeType: string, oldValue: any, newValue: any[]): void => {
        this.getSelectedListFields();
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
              groupFields: [
                PropertyPaneToggle('StyleToggle', {
                  onText: 'Stack',
                  offText: 'Single',
                  label: 'Style'
                }),
                PropertyPaneToggle('AuthorToggle', {
                  onText: 'Hidden',
                  offText: 'Shown',
                  label: 'Author'
                }),
                PropertyFieldSitePicker('sites', {
                  label: 'Select sites',
                  initialSites: this.properties.sites,
                  context: this.context,
                  deferredValidationTime: 200,
                  multiSelect: true,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'sitesFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
