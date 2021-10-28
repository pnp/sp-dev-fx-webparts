import CustomListener from "../../utilities/CustomListener";
import { IRequestMaintenanceProps } from './components/IRequestMaintenanceProps';
import RequestMaintenance from './components/RequestMaintenance';
import { IPropertyPaneConfiguration,  PropertyPaneDropdown, PropertyPaneTextField, PropertyPaneToggle } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { setup as pnpSetup } from "@pnp/common";
import { ConsoleListener, Logger, LogLevel } from "@pnp/logging";
import { sp } from "@pnp/sp";
import { IRoleDefinitionInfo } from '@pnp/sp/security';
import { ISiteGroupInfo } from '@pnp/sp/site-groups';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'RequestMaintenanceWebPartStrings';

import "@pnp/sp/security";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/site-users";
import "@pnp/sp/webs";

//mport { ISiteUser } from '@pnp/sp/site-users';
export interface IRequestMaintenanceWebPartProps {
  rfxListTitle: string; // the name of the list that holds all the RFX Info
  rfxFoldersListTitle: string;// the name of the list that holds all the RFX folder Info
  instrumentationKey: string; // app insights key
  archiveLibraryTitle: string;
  enablePrivateFolders: boolean;


  roleDefinitionForLibraryMembersGroupOnLibrary: string;// each new RFX library has an group created for internal users. What role should that group have on trghe library (Contribute)
  roleDefinitionForLibraryMembersGroupOnSite: string; // each new RFX library has an group created for internal users. What role should that group have on trghe site (READ)
  roleDefinitionForLibraryMembersGroupOnFolder: string; // each new RFX library has an group created for internal users. What role should that group have on trghe site (READ)

  roleDefinitionForLibraryVisitorsGroupOnLibrary: string;// each new RFX library has an group created for external users. What role should that group have on trghe library (Contribute)
  roleDefinitionForLibraryVisitorsGroupOnSite: string; // each new RFX library has an group created for external users. What role should that group have on trghe site (READ)
  roleDefinitionForLibraryVisitorsGroupOnFolder: string; // each new RFX library has an group created for external users. What role should that group have on trghe site (READ)

  roleDefinitionForFolderMembersOnFolder: string; // each new RFX library has an group created for external users. What role should that group have on trghe site (READ)
  roleDefinitionForFolderMembersOnLibrary: string; // each new RFX library has an group created for external users. What role should that group have on trghe site (READ)
  roleDefinitionForFolderMembersOnSite: string; // each new RFX library has an group created for external users. What role should that group have on trghe site (READ)

  roleDefinitionForFolderVisitorsOnFolder: string; // each new RFX library has an group created for external users. What role should that group have on trghe site (READ)
  roleDefinitionForFolderVisitorsOnLibrary: string; // each new RFX library has an group created for external users. What role should that group have on trghe site (READ)
  roleDefinitionForFolderVisitorsOnSite: string; // each new RFX library has an group created for external users. What role should that group have on trghe site (READ)

  allowGroupNameChanges: boolean;

}

export default class RequestMaintenanceWebPart extends BaseClientSideWebPart<IRequestMaintenanceWebPartProps> {
  private vistorsGroup: ISiteGroupInfo;
  private ownersGroup: ISiteGroupInfo;
  private membersGroup: ISiteGroupInfo;
  private roleDefinitions: IRoleDefinitionInfo[];
  private roleDefinitionsDropdownDisabled: boolean;
  // private currentUser:ISiteUser;
  public render(): void {

    const element: React.ReactElement<IRequestMaintenanceProps> = React.createElement(
      RequestMaintenance,
      {
        siteOwnersGroup: this.ownersGroup, // Site owners groupw will be given full contyrol on new libraros
        rfxListTitle: this.properties.rfxListTitle, // the name of the list that holds all the RFX Info
        rfxFoldersListTitle: this.properties.rfxFoldersListTitle, // the name of the list that holds all the RFX Info
        webServerRelativeUrl: this.context.pageContext.web.serverRelativeUrl,
        archiveLibraryTitle: this.properties.archiveLibraryTitle,
        enablePrivateFolders: this.properties.enablePrivateFolders,
        roleDefinitions: this.roleDefinitions,

        roleDefinitionForLibraryMembersGroupOnSite: this.properties.roleDefinitionForLibraryMembersGroupOnSite, // each new RFX library has an group created for internal users. What role should that group have on trghe site (READ)
        roleDefinitionForLibraryMembersGroupOnLibrary: this.properties.roleDefinitionForLibraryMembersGroupOnLibrary,// each new RFX library has an group created for internal users. What role should that group have on trghe library (Contribute)
        roleDefinitionForLibraryMembersGroupOnFolder: this.properties.roleDefinitionForLibraryMembersGroupOnFolder,// each new RFX library has an group created for internal users. What role should that group have on trghe library (Contribute)

        roleDefinitionForLibraryVisitorsGroupOnSite: this.properties.roleDefinitionForLibraryVisitorsGroupOnSite, // each new RFX library has an group created for external users. What role should that group have on trghe site (READ)
        roleDefinitionForLibraryVisitorsGroupOnLibrary: this.properties.roleDefinitionForLibraryVisitorsGroupOnLibrary,// each new RFX library has an group created for external users. What role should that group have on trghe library (Contribute)
        roleDefinitionForLibraryVisitorsGroupOnFolder: this.properties.roleDefinitionForLibraryVisitorsGroupOnFolder,// each new RFX library has an group created for external users. What role should that group have on trghe library (Contribute)

        roleDefinitionForFolderVisitorsOnFolder: this.properties.roleDefinitionForFolderVisitorsOnFolder, // each new RFX library has an group created for external users. What role should that group have on trghe site (READ)
        roleDefinitionForFolderVisitorsOnLibrary: this.properties.roleDefinitionForFolderVisitorsOnLibrary, // each new RFX library has an group created for external users. What role should that group have on trghe site (READ)
        roleDefinitionForFolderVisitorsOnSite: this.properties.roleDefinitionForFolderVisitorsOnSite, // each new RFX library has an group created for external users. What role should that group have on trghe site (READ)


        roleDefinitionForFolderMembersOnFolder: this.properties.roleDefinitionForFolderMembersOnFolder, // each new RFX library has an group created for external users. What role should that group have on trghe site (READ)
        roleDefinitionForFolderMembersOnLibrary: this.properties.roleDefinitionForFolderMembersOnLibrary,
        roleDefinitionForFolderMembersOnSite: this.properties.roleDefinitionForFolderMembersOnSite,


        allowGroupNameChanges: this.properties.allowGroupNameChanges

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  public onInit(): Promise<any> {


    //sessionStorage.setItem("spfx-debug", ""); ////   REMOVE THIS
    return super.onInit().then(_ => {
      pnpSetup({
        spfxContext: this.context
      });
      Logger.activeLogLevel = LogLevel.Warning;
      Logger.subscribe(new ConsoleListener());
      if (this.properties.instrumentationKey) {
        Logger.subscribe(new CustomListener(this.properties.instrumentationKey));
      }
      let groupsPromise = this.getGroups();
      let roledefPromise = this.getRoleDefinitions();


      return Promise.all([groupsPromise, roledefPromise]);

    });
  }

  public getRoleDefinitions(): Promise<void> {
    return sp.site.rootWeb.roleDefinitions.get().then((rds) => {
      this.roleDefinitions = rds;
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

  protected onPropertyPaneConfigurationStart(): void {

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
                PropertyPaneTextField('rfxListTitle', {
                  label: strings.rfxListTitleLabel
                }),
                PropertyPaneTextField('rfxFoldersListTitle', {
                  label: strings.rfxFoldersListTitleLabel
                }),
                PropertyPaneTextField('archiveLibraryTitle', {
                  label: strings.archiveLibraryTitle
                }),
                PropertyPaneDropdown('roleDefinitionForLibraryMembersGroupOnSite', {
                  label: strings.roleDefinitionForLibraryMembersGroupOnSite,
                  options: this.roleDefinitions.map((rd) => {
                    return { key: rd.Name, text: rd.Name };
                  }),
                }),
                PropertyPaneDropdown('roleDefinitionForLibraryMembersGroupOnLibrary', {
                  label: strings.roleDefinitionForLibraryMembersGroupOnLibrary,
                  options: this.roleDefinitions.map((rd) => {
                    return { key: rd.Name, text: rd.Name };
                  }),
                }),
                PropertyPaneDropdown('roleDefinitionForLibraryMembersGroupOnFolder', {
                  label: strings.roleDefinitionForLibraryMembersGroupOnFolder,
                  options: this.roleDefinitions.map((rd) => {

                    return { key: rd.Name, text: rd.Name };
                  }),
                }),


                PropertyPaneDropdown('roleDefinitionForLibraryVisitorsGroupOnSite', {
                  label: strings.roleDefinitionForLibraryVisitorsGroupOnSite,
                  options: this.roleDefinitions.map((rd) => {
                    return { key: rd.Name, text: rd.Name };
                  }),
                }),
                PropertyPaneDropdown('roleDefinitionForLibraryVisitorsGroupOnLibrary', {
                  label: strings.roleDefinitionForLibraryVisitorsGroupOnLibrary,
                  options: this.roleDefinitions.map((rd) => {
                    return { key: rd.Name, text: rd.Name };
                  }),
                }),
                PropertyPaneDropdown('roleDefinitionForLibraryVisitorsGroupOnFolder', {
                  label: strings.roleDefinitionForLibraryVisitorsGroupOnFolder,
                  options: this.roleDefinitions.map((rd) => {
                    return { key: rd.Name, text: rd.Name };
                  }),
                }),


                PropertyPaneDropdown('roleDefinitionForFolderMembersOnSite', {
                  label: strings.roleDefinitionForFolderMembersOnSite,
                  options: this.roleDefinitions.map((rd) => {
                    return { key: rd.Name, text: rd.Name };
                  }),
                }),
                PropertyPaneDropdown('roleDefinitionForFolderMembersOnLibrary', {
                  label: strings.roleDefinitionForFolderMembersOnLibrary,
                  options: this.roleDefinitions.map((rd) => {
                    return { key: rd.Name, text: rd.Name };
                  }),
                }),
                PropertyPaneDropdown('roleDefinitionForFolderMembersOnFolder', {
                  label: strings.roleDefinitionForFolderMembersOnFolder,
                  options: this.roleDefinitions.map((rd) => {
                    return { key: rd.Name, text: rd.Name };
                  }),
                }),


                PropertyPaneDropdown('roleDefinitionForFolderVisitorsOnSite', {
                  label: strings.roleDefinitionForFolderVisitorsOnSite,
                  options: this.roleDefinitions.map((rd) => {
                    return { key: rd.Name, text: rd.Name };
                  }),
                }),
                PropertyPaneDropdown('roleDefinitionForFolderVisitorsOnLibrary', {
                  label: strings.roleDefinitionForFolderVisitorsOnLibrary,
                  options: this.roleDefinitions.map((rd) => {
                    return { key: rd.Name, text: rd.Name };
                  }),
                }),
                PropertyPaneDropdown('roleDefinitionForFolderVisitorsOnFolder', {
                  label: strings.roleDefinitionForFolderVisitorsOnFolder,
                  options: this.roleDefinitions.map((rd) => {
                    return { key: rd.Name, text: rd.Name };
                  }),
                }),

                PropertyPaneToggle('allowGroupNameChanges', {
                  label: strings.allowGroupNameChanges,
                }),

                PropertyPaneToggle('enablePrivateFolders', {
                  label:strings.privateFolders,
                  offText:strings.privateFoldersDisabled,
                  onText: strings.privateFoldersEnabled,
                }),
                PropertyPaneTextField('instrumentationKey', {
                  label: strings.instrumentationKey
                }),

              ]
            }
          ]
        }
      ]
    };
  }
}
