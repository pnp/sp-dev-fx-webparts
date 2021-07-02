import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,

  PropertyPaneTextField, PropertyPaneDropdown, IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'VendorMaintenanceWebPartStrings';
import VendorMaintenance from './components/VendorMaintenance';
import { IVendorMaintenanceProps } from './components/IVendorMaintenanceProps';
import { ISiteGroupInfo } from '@pnp/sp/site-groups';
export interface IVendorMaintenanceWebPartProps {
  ownersGroup: string;
  roleDefinitionForSite: string;
}
import { setup as pnpSetup } from "@pnp/common";
import { sp } from "@pnp/sp";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";

import "@pnp/sp/security";
import { IRoleDefinitionInfo } from '@pnp/sp/security';

import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';  

export default class VendorMaintenanceWebPart extends BaseClientSideWebPart<IVendorMaintenanceWebPartProps> {
  private vistorsGroup: ISiteGroupInfo;
  private ownersGroup: ISiteGroupInfo;
  private membersGroup: ISiteGroupInfo;
  private roleDefinitions: IRoleDefinitionInfo[];
  private roleDefinitionsDropdownDisabled: boolean = true;
  public onInit(): Promise<any> {

    debugger;
    //sessionStorage.setItem("spfx-debug", ""); ////   REMOVE THIS
    return super.onInit().then(_ => {
      pnpSetup({
        spfxContext: this.context
      });
      let groupsPromise = this.getGroups();
      let roledefPromise = this.getRoleDefinitions();


      return Promise.all([groupsPromise, roledefPromise]);

    });
  }
  public getGroups(): Promise<any> {
    let promises: Array<Promise<any>> = [];
    promises.push(sp.web.associatedVisitorGroup()
      .then((g) => {
        this.vistorsGroup = g;
      })
      .catch((e) => {
        debugger;
      }));

    // Gets the associated members group of a web
    promises.push(sp.web.associatedMemberGroup()
      .then((g) => {
        this.membersGroup = g;
      })
      .catch((e) => {
        debugger;
      }));


    // Gets the associated owners group of a web
    promises.push(sp.web.associatedOwnerGroup()
      .then((g) => {
        this.ownersGroup = g;
      })
      .catch((e) => {
        debugger;
      }));

    return Promise.all(promises);

  }
  public getRoleDefinitions(): Promise<void> {

    return sp.site.rootWeb.roleDefinitions.get().then((rds) => {
      this.roleDefinitions = rds;
    });


  }
  public render(): void {
    const element: React.ReactElement<IVendorMaintenanceProps> = React.createElement(
      VendorMaintenance,
      {
        roleDefinitionForSite: this.properties.roleDefinitionForSite,
        ownersGroup: this.ownersGroup,
        webServerRelativeUrl: this.context.pageContext.web.serverRelativeUrl,
        vendorListTitle: "Vendors",
        roleDefinitions: this.roleDefinitions
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected onPropertyPaneConfigurationStart(): void {
    debugger;
    if (this.roleDefinitions) { return; }
    this.getRoleDefinitions().then((e) => {
      this.roleDefinitionsDropdownDisabled = false;
      this.context.propertyPane.refresh();

    });
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

                PropertyPaneDropdown('roleDefinitionForSite', {
                  label: strings.roleDefinitionForSiteLabel,
                  options: this.roleDefinitions.map((rd) => {
                    debugger;
                    return { key: rd.Name, text: rd.Name };
                  }),
           
                }),
                PropertyPaneTextField('ownersGroup', {
                  label: strings.ownersGroupLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
