import { Version } from "@microsoft/sp-core-library";
import { AadHttpClient, AadHttpClientConfiguration, HttpClientResponse, IAadHttpClientConfiguration, IAadHttpClientConfigurations, IAadHttpClientOptions } from "@microsoft/sp-http";
import { SPPermission } from "@microsoft/sp-page-context";
import { IPropertyPaneConfiguration, IPropertyPaneDropdownOption, PropertyPaneCheckbox, PropertyPaneDropdown, PropertyPaneSlider, PropertyPaneTextField, PropertyPaneToggle } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import * as React from "react";
import * as ReactDom from "react-dom";

import { ISpSecurityProps } from "./components/ISpSecurityProps";
import SpSecurity from "./components/SpSecurity";
import { PropertyFieldSelectedPermissions } from "./containers/PropertyFieldSelectedPermissions";
import { ISpSecurityWebPartProps } from "./ISpSecurityWebPartProps";

export default class SpSecurityWebPart extends BaseClientSideWebPart<ISpSecurityWebPartProps> {
  private aadHttpClient: AadHttpClient;
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context,
        defaultCachingStore: "session", // or "local"
        defaultCachingTimeoutSeconds: 30,
        globalCacheDisable: true // or true to disable caching in case of debugging/testing
      });
    }).then(_ => {
      this.context.aadHttpClientFactory.getClient(`https://graph.microsoft.com`)
        .then((client: AadHttpClient) => {
          // Search for the users with givenName, surname, or displayName equal to the searchFor value
          this.aadHttpClient = client;
        });

    });
  }

  public render(): void {

    const props: ISpSecurityProps = {
      //permission: this.properties.permission,  // old way
      selectedPermissions: this.properties.selectedPermissions.map((spp) => { return { ...spp, isChecked: true }; }),
      showHiddenLists: this.properties.showHiddenLists,
      showCatalogs: this.properties.showCatalogs,
      showEmail: this.properties.showEmail,
      showSecurityGroups: this.properties.showSecurityGroups,
      showUsers: this.properties.showUsers,
      showOnlyUsersWithPermission: this.properties.showOnlyUsersWithPermission,
      letUserSelectPermission: this.properties.letUserSelectPermission,
      letUserSelectUsers: this.properties.letUserSelectUsers,
      letUserSelectLists: this.properties.letUserSelectLists,
      includeAdminSelectedLists: this.properties.includeAdminSelectedLists,
      adminSelectedLists: this.properties.adminSelectedLists,
      listTitleColumnWidth: this.properties.listTitleColumnWidth,
      users: this.properties.users,
      getPermissionTypes: this.getPermissionTypes,
      aadHttpClient: this.aadHttpClient,
      domElement: this.domElement

    };
    const element: React.ReactElement<ISpSecurityProps> = React.createElement(
      SpSecurity, props
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }
  public getPermissionTypes(): IPropertyPaneDropdownOption[] {
    let perms = new Array();
    for (const perm in SPPermission) {

      if (typeof (SPPermission[perm]) === "object") {
        perms.push({
          text: perm,
          key: perm
        });
      }
    }
    return perms;
  }
  private onPropertyChange(propertyPath: string, oldValue: any, newValue: any) {
    //debugger;
    // does this get oldvalue and new value?
    switch (propertyPath) {
      case "SelectedPermissions":

        this.properties.selectedPermissions = newValue;

        this.context.propertyPane.refresh();
        this.render();
        break;
      default:
        break;
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Permission Configuration"
          },
          groups: [
            {
              groupName: "Permission Settings",
              groupFields: [

                PropertyFieldSelectedPermissions("SelectedPermissions", {
                  label: "Selected Permissions and Colors",
                  onPropertyChange: this.onPropertyChange.bind(this),

                  getSelectedPermissions: () => {
                    return this.properties.selectedPermissions || [];
                  },
                }),
                PropertyPaneCheckbox("letUserSelectPermission", {
                  text: "Let user select Permission"
                }),

              ]
            },
            {
              groupName: "User Settings",
              groupFields: [

                PropertyPaneToggle("showEmail", {
                  label: "Show Email or Name",
                  onText: "Show Email",
                  offText: "Show Name",
                }),
                PropertyPaneCheckbox("showSecurityGroups", {
                  text: "Show Security Groups"
                }),
                PropertyPaneCheckbox("showUsers", {
                  text: "Show Users"
                }),
                PropertyPaneToggle("showOnlyUsersWithPermission", {
                  label: "Only show users with permission",
                  onText: "Show users only if they have permission",
                  offText: "Show all users",
                }),
                PropertyPaneCheckbox("letUserSelectUsers", {
                  text: "Let user select Users"
                })
              ]
            },
            {
              groupName: "Display Settings",
              groupFields: [
                PropertyPaneSlider("listTitleColumnWidth", {
                  label: "Initial title column width",
                  min: 1,
                  max: 1000
                }),
              ]
            }
          ]
        },
        {
          header: {
            description: "Permission Configuration"
          },
          groups: [
            {
              groupName: "Permission Settings",
              groupFields: [

                PropertyFieldSelectedPermissions("SelectedPermissions", {
                  label: "Selected Permissions and Colors",
                  onPropertyChange: this.onPropertyChange.bind(this),

                  getSelectedPermissions: () => {
                    return this.properties.selectedPermissions || [];
                  },
                }),
                PropertyPaneCheckbox("letUserSelectPermission", {
                  text: "Let user select Permission"
                }),

              ]
            },

            {
              groupName: "Display Settings",
              groupFields: [
                PropertyPaneSlider("listTitleColumnWidth", {
                  label: "Initial title column width",
                  min: 1,
                  max: 1000
                }),
              ]
            }
          ]
        },
        {
          header: {
            description: "Configure Lists"
          },
          groups: [
            {
              groupName: "List Settings",
              groupFields: [
                PropertyPaneCheckbox("showHiddenLists", {
                  text: "Show Hidden Lists"
                }),
                PropertyPaneCheckbox("showCatalogs", {
                  text: "Show System Lists"
                }),
                PropertyPaneCheckbox("letUserSelectLists", {
                  text: "Let user select Lists"
                }),

              ]
            },
            {
              groupName: "Select Lists",
              groupFields: [
                PropertyPaneToggle("includeAdminSelectedLists", {
                  label: "Inclued/exclude selected lists",
                  onText: "Include selected lists",
                  offText: "Exclude selected lists",


                }),
                PropertyFieldListPicker("adminSelectedLists", {
                  label: 'Select lists to include/exclude',
                  selectedList: this.properties.adminSelectedLists,
                  includeHidden: this.properties.showHiddenLists,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                  multiSelect: true
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
