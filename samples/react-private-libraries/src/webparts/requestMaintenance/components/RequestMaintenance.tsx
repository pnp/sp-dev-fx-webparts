import { escape, find, findIndex } from '@microsoft/sp-lodash-subset';
import { Logger, LogLevel } from "@pnp/logging";
import { sp, SPHttpClient } from "@pnp/sp";
import { Folders, IFolder, IFolderInfo, IFolders } from "@pnp/sp/folders";
import { IFiles, IItem, IListInfo, ISiteUser } from "@pnp/sp/presets/all";
import { IRoleDefinitionInfo } from '@pnp/sp/security';
import { ISiteGroup, ISiteGroupInfo } from '@pnp/sp/site-groups';
import { ISiteUsers, SiteUser } from '@pnp/sp/site-users';
import { IViewInfo } from '@pnp/sp/views';
import { format } from "date-fns";
import { ActionButton, Button, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { DetailsList, DetailsListLayoutMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Icon, IIconProps, IIconStyleProps } from 'office-ui-fabric-react/lib/Icon';
import { IconNames } from 'office-ui-fabric-react/lib/Icons';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { autobind, IObjectWithKey, Selection, SelectionMode } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { CSVLink } from "react-csv";
import { roleDefinitionForLibraryMembersGroupOnLibrary } from 'RequestMaintenanceWebPartStrings';

import { IActivity } from '../../../models/IActivity';
import { IDrive } from '../../../models/IDrive';
import { IRFx } from '../../../models/IRFx';
import { IRFxFolder } from '../../../models/IRFxFolder';
import RFXUtilities from '../../../utilities/RFXUtilities';
import { IRequestMaintenanceProps } from './IRequestMaintenanceProps';
import { IRequestMaintenanceState } from './IRequestMaintenanceState';
import styles from './RequestMaintenance.module.scss';

import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/folders/item";
import "@pnp/sp/folders/list";
import "@pnp/sp/items";
import "@pnp/sp/lists/web";
import "@pnp/sp/lists/web";
import "@pnp/sp/security/list";
import "@pnp/sp/security/web";
import "@pnp/sp/site-groups";
import "@pnp/sp/site-users/web";
import "@pnp/sp/sites";
import "@pnp/sp/views";
import "@pnp/sp/webs";

export default class RequestMaintenance extends React.Component<IRequestMaintenanceProps, IRequestMaintenanceState> {
  private _drives: Array<IDrive>;
  private mainSelection: Selection;
  constructor(props: any) {
    super(props);
    this.state = {
      rfxs: [],
      siteGroups: [],
      currentUserId: null,
      currentUserEMail: null,
      currentUserLoginName: null,
      showAddNewLibrary: false,
      newRfxId: null,
      newRfxDescription: null,
      newRFxClosingDate: null,
      newRFxLibraryMembersGroupName: null,
      newRFxLibraryVisitorsGroupName: null,
      newRFxLibraryOwnersGroupName: null,

      newFolderMembersGroupName: null,
      newFolderVisitorsGroupName: null,

      isUpdating: false,
      invalidCharacters: false,
      newFolderName: null,

      rfxFolders: [],
      selectedRfx: null,
      showAddNewFolder: false,
      showFolders: false,
      showActivity: false,
      activities: [],
      mainSelectedItemsCount: 0
    };

    this.mainSelection = new Selection({
      onSelectionChanged: this.onMainSelectionChanged,
      selectionMode: SelectionMode.multiple
    });
  }
  private onMainSelectionChanged = () => {

    const newSelectedItems = this.mainSelection.getSelection();
    this.setState((current) => ({ ...current, mainSelectedItemsCount: newSelectedItems.length }));

  }
  public componentDidMount() {


    this.fetchRFxs();
    this.fetchSiteGroups();
    this.fetchCurrentUser().then(() => {

      Logger.write(`User ${this.state.currentUserEMail} has started the app`, LogLevel.Warning);

    });
  }
  private async fetchCurrentUser() {
    let user = await sp.web.currentUser.get();

    this.setState((current) => ({
      ...current,
      currentUserId: user.Id,
      currentUserEMail: user.Email,
      currentUserLoginName: user.LoginName,
    })
    );

  }

  /**
   * Fetches the list of secured libraries (store in a sharepoint list) and updates them in the docLibs State varieble
   *
   * @private
   * @memberof DocLibSecurity
   */
  private fetchRFxs() {
    sp.web.lists.getByTitle(this.props.rfxListTitle).items.orderBy("Title")
      .expand("rfxContractSpecialist")
      .select("Id,Title,rfxDescription,rfxClosingDate,rfxLibraryMembersGroupId,rfxLibraryVisitorsGroupId,rfxOwnersGroupId,rfxContractSpecialistId,rfxContractSpecialist/EMail")
      .getAll().then((items) => {

        this.setState((current) => ({
          ...current,
          rfxs: items.map((item) => {
            return {
              title: item.Title,
              id: item.ID,
              closingDate: new Date(item["rfxClosingDate"]),
              contractSpecialistId: item["rfxContractSpecialistId"],
              contractSpecialist: item["rfxContractSpecialist"],
              libraryMembersGroupId: item["rfxLibraryMembersGroupId"],
              libraryVisitorsGroupId: item["rfxLibraryVisitorsGroupId"],
              libraryOwnersGroupId: item["rfxOwnersGroupId"],
              description: item["rfxDescription"]
            };
          })
        })
        );
      });
  }
  private fetchSiteGroups() {

    sp.web.siteGroups.get().then((items) => {

      this.setState((current) => ({
        ...current,
        siteGroups: items
      })
      );
    });
  }
  /**
   *  Determinse if a SiteGroup  with the given name exists
   *
   * @private
   * @param {string} groupName The name of the SiteGroup we want to check
   * @returns {Promise<boolean>}  True if SiteGroup exists , otherwise false
   * @memberof DocLibSecurity
   */
  private doesRFxExist(RFXId: string): boolean {

    if (findIndex(this.state.rfxs, (r) => { return r.title === RFXId; }) === -1) {
      return false;
    }
    else {
      return true;
    }

  }

  private getSiteGroupName(siteGroupId: number): string {
    let sg: ISiteGroupInfo = find(this.state.siteGroups as Array<ISiteGroupInfo>, (sgx) => {
      return sgx.Id === siteGroupId;
    });
    if (sg) {
      return sg.Title;
    }
    else { return (`*${siteGroupId}*`); }
  }

  /**
   * Validates the data to add a new library and adds it if valid
   *
   * @private
   * @returns
   * @memberof DocLibSecurity
   */
  private async validateAndAddLibrary() {

    this.setState((current) => ({ ...current, isUpdating: true }));
    if (!this.state.newRfxId || this.state.newRfxId.length === 0) {
      alert("Library/RFx Name is required");
      this.setState((current) => ({ ...current, isUpdating: false }));
      return;

    }
    if (!this.state.newRFxClosingDate) {
      this.setState((current) => ({ ...current, isUpdating: false }));
      alert("Closing Date is required");
      return;
    }

    //Do validation
    if (this.doesRFxExist(this.state.newRfxId)) {
      alert("An entry with this name already exists in the List of Libraries");
      this.setState((current) => ({ ...current, isUpdating: false }));
      return;
    }
    if (await sp.web.lists.getByTitle(this.state.newRfxId).get()
      .then((list) => {
        return true;
      })
      .catch((e) => {
        return false;
      })
    ) {
      alert("A list with this name already exists");
      this.setState((current) => ({ ...current, isUpdating: false }));
      return;
    }

    const membersGroupExists = await RFXUtilities.doesGroupExist(this.state.newRFxLibraryMembersGroupName);
    if (membersGroupExists) {
      alert(`A group named ${this.state.newRFxLibraryMembersGroupName} already exists`);
      this.setState((current) => ({ ...current, isUpdating: false }));
      return;
    }
    const visitorsGroupExists = await RFXUtilities.doesGroupExist(this.state.newRFxLibraryVisitorsGroupName);
    if (visitorsGroupExists) {
      alert(`A group named ${this.state.newRFxLibraryVisitorsGroupName} already exists`);
      this.setState((current) => ({ ...current, isUpdating: false }));
      return;
    }
    const libraryOwnerGroupExists = await RFXUtilities.doesGroupExist(this.state.newRFxLibraryOwnersGroupName);
    if (libraryOwnerGroupExists) {
      alert(`A group named ${this.state.newRFxLibraryOwnersGroupName} already exists`);
      this.setState((current) => ({ ...current, isUpdating: false }));
      return;
    }
    // Add the new library
    let listInfo: IListInfo = await sp.web.lists.add(this.state.newRfxId, "", 101, false, { OnQuickLaunch: true })
      .catch((e) => {
        const message = `there was an error adding the library ${this.state.newRfxId}`;
        this.logError(message, e);
        this.setState((current) => ({ ...current, isUpdating: false }));
        return null;
      });
    if (!listInfo) return;
    //create the ownersGroup
    const libraryOwnersGroup: ISiteGroupInfo = await sp.web.siteGroups.add({ "Title": this.state.newRFxLibraryOwnersGroupName })
      .then((g) => {
        return g.group();
      })
      .catch((e) => {
        const message = `there was an error adding the group ${this.state.newRFxLibraryOwnersGroupName}`;
        this.logError(message, e);
        this.setState((current) => ({ ...current, isUpdating: false }));
        return null;
      });
    if (libraryOwnersGroup === null) return;
    // add the current user to the library owners group
    const owner: ISiteUser = await sp.web.siteGroups.getById(libraryOwnersGroup.Id).users.add(this.state.currentUserLoginName)
      .then((u) => {
        console.log(`added user ${this.state.currentUserLoginName} to group ${libraryOwnersGroup.Title}`);

        return u();
      })
      .catch((e) => {
        const message = `error adding  user ${this.state.currentUserLoginName} to group ${libraryOwnersGroup.Title}`;
        this.logError(message, e);
        this.setState((current) => ({ ...current, isUpdating: false }));
        return null;
      });
    if (!owner) return;
    // add the siteowners to the library owners group
    const siteownwers: ISiteUsers = await sp.web.siteGroups.getById(this.props.siteOwnersGroup.Id).users.get()
      .then((so) => {
        console.log(`fetched ${so.length} people from site owners group`);
        return so;
      })
      .catch((e) => {
        const message = `error fetching siteowners group with id ${this.props.siteOwnersGroup.Id}`;
        this.logError(message, e);
        this.setState((current) => ({ ...current, isUpdating: false }));
        return null;
      });

    if (!siteownwers) return;
    let errorAddingOwnwers = false;
    for (let i = 0; i < siteownwers.length; i++) {
      await sp.web.siteGroups.getById(libraryOwnersGroup.Id).users.add(siteownwers[i]["LoginName"])
        .then((e) => {
          console.log(`added user ${this.state.currentUserLoginName} to group ${libraryOwnersGroup.Title}`);
        })
        .catch((e) => {
          errorAddingOwnwers = true;
          const message = `error adding  user ${this.state.currentUserLoginName} to group ${libraryOwnersGroup.Title}`;
          this.logError(message, e);
        });
    }
    if (errorAddingOwnwers) {
      this.setState((current) => ({ ...current, isUpdating: false }));
      return null;
    }
    // break role inheritance on the new library
    if (! await sp.web.lists.getByTitle(this.state.newRfxId).breakRoleInheritance(false)
      .then(() => {
        return true;
      })
      .catch((e) => {
        let message = `there was an error breaking  inheritance on the library ${this.state.newRfxId}`;
        this.logError(message, e);
        this.setState((current) => ({ ...current, isUpdating: false }));
        return false;
      })
    ) {
      return;
    }
    // give the library  Onwers  group Full Control access to the library
    if (!
      await RFXUtilities.grantGroupAccessToLibrary(this.state.newRfxId, libraryOwnersGroup.Id, "Full Control", this.props.roleDefinitions)
        .then(() => {
          return true;
        })
        .catch((e) => {
          const message = `there was an error granting group ${libraryOwnersGroup.Title} Full Control access to the library`;
          this.logError(message, e);
          this.setState((current) => ({ ...current, isUpdating: false }));
          return false;
        })
    ) {
      return;
    }

    // Add the library members group
    const libraryMembersGroup: ISiteGroupInfo = await sp.web.siteGroups.add({ "Title": this.state.newRFxLibraryMembersGroupName })
      .then((g) => {
        return g.group();
      })
      .catch((e) => {
        const message = `there was an error adding the group ${this.state.newRFxLibraryMembersGroupName}`;
        this.logError(message, e);
        this.setState((current) => ({ ...current, isUpdating: false }));
        return null;
      });
    if (!libraryMembersGroup) return;

    // set the owners of the new group
    if (!
      RFXUtilities.setGroupOwner(libraryMembersGroup.Id, libraryOwnersGroup.Id)
        .then((g) => {
          return true;
        })
        .catch((e) => {
          const message = `there was an error setting the owner of group  ${libraryMembersGroup.Id} to group ${libraryOwnersGroup.Id}`;
          this.logError(message, e);
          this.setState((current) => ({ ...current, isUpdating: false }));
          return false;
        })
    ) {
      return;
    }
    // give the library members  group the specified access to the new library
    if (!
      await RFXUtilities.grantGroupAccessToLibrary(this.state.newRfxId, libraryMembersGroup.Id, this.props.roleDefinitionForLibraryMembersGroupOnLibrary, this.props.roleDefinitions)
        .then((g) => {
          return true;
        })
        .catch((e) => {
          const message = `there was an error granting the group ${libraryMembersGroup.Title} access to the library ${this.state.newRfxId}`;
          this.logError(message, e);
          this.setState((current) => ({ ...current, isUpdating: false }));
          return false;
        })
    ) {
      return;
    }
    // give the library mambers group the specified access to the new Site      
    if (!
      await RFXUtilities.grantGroupIdAccessToSite(libraryMembersGroup.Id, this.props.roleDefinitionForLibraryMembersGroupOnSite, this.props.roleDefinitions)
        .then((g) => {
          return true;
        })
        .catch((e) => {
          const message = `there was an error granting access to the site to the ${this.state.newRFxLibraryMembersGroupName} group`;
          this.logError(message, e);
          this.setState((current) => ({ ...current, isUpdating: false }));
          return false;
        })
    ) {
      return;
    }
    // Add the library visitors group
    const libraryVisitorsGroup: ISiteGroupInfo = await sp.web.siteGroups.add({ "Title": this.state.newRFxLibraryVisitorsGroupName })
      .then((g) => {
        return g.group();
      })
      .catch((e) => {
        const message = `there was an error adding the group ${this.state.newRFxLibraryVisitorsGroupName}`;
        this.logError(message, e);
        this.setState((current) => ({ ...current, isUpdating: false }));
        return null;
      });
    if (!libraryVisitorsGroup) return;
    if (!
      await RFXUtilities.setGroupOwner(libraryVisitorsGroup.Id, libraryOwnersGroup.Id)
        .then((g) => {
          return true;
        })
        .catch((e) => {
          const message = `there was an error setting the owner of group  ${libraryVisitorsGroup.Id} to group ${libraryOwnersGroup.Id}`;
          this.logError(message, e);
          this.setState((current) => ({ ...current, isUpdating: false }));
          return false;
        })
    ) {
      return;
    }
    // give the library visitors group the specified access to the new library
    if (!
      await RFXUtilities.grantGroupAccessToLibrary(this.state.newRfxId, libraryVisitorsGroup.Id, this.props.roleDefinitionForLibraryVisitorsGroupOnLibrary, this.props.roleDefinitions)
        .then((g) => {
          return true;
        })
        .catch((e) => {
          const message = `there was an error granting the group ${libraryVisitorsGroup.Title} access to the library`;
          this.logError(message, e);
          this.setState((current) => ({ ...current, isUpdating: false }));
          return false;
        })
    ) {
      return;
    }
    // give the library visitors group the specified access to the new Site      
    if (!
      await RFXUtilities.grantGroupIdAccessToSite(libraryVisitorsGroup.Id, this.props.roleDefinitionForLibraryVisitorsGroupOnSite, this.props.roleDefinitions)
        .then(() => {
          return true;
        })
        .catch((e) => {
          const message = `there was an error granting access to the site to the ${this.state.newRFxLibraryMembersGroupName} group`;
          this.logError(message, e);
          this.setState((current) => ({ ...current, isUpdating: false }));
          return false;
        })
    ) {
      return;
    }
    // // give the default Members group contribute access to the library
    // await this.grantGroupAccessToLibrary(this.state.newDocLibTitle, this.props.membersGroup.Id, "Contribute")
    //   .catch((e) => {

    //     alert(`there was an error granting group ${this.props.membersGroup.Title} Contribute access to the library`);
    //     this.setState((current) => ({ ...current, isUpdating: false }));
    //     return;
    //   });
    // give the default Visitors group contribute access to the library
    // await this.grantGroupAccessToLibrary(this.state.newDocLibTitle, this.props.visitorsGroup.Id, "Read")
    //   .catch((e) => {

    //     alert(`there was an error granting group ${this.props.visitorsGroup.Title} Read  access to the library`);
    //     this.setState((current) => ({ ...current, isUpdating: false }));
    //     return;
    //   });


    // give the default Onwers  group Full Control access to the library
    if (!
      await RFXUtilities.grantGroupAccessToLibrary(this.state.newRfxId, this.props.siteOwnersGroup.Id, "Full Control", this.props.roleDefinitions)
        .then(() => {
          return true;
        })
        .catch((e) => {
          const message = `there was an error granting group ${this.props.siteOwnersGroup.Title} Full Control access to the library`;
          this.logError(message, e);
          this.setState((current) => ({ ...current, isUpdating: false }));
          return false;
        })
    ) {
      return;
    }

    // 27OCT2020
    //  remove the users direct permission
    if (!
      await RFXUtilities.removeAccessToLibrary(this.state.newRfxId, this.state.currentUserId, "Full Control", this.props.roleDefinitions)
        .then(() => {
          return true;
        })
        .catch((e) => {
          const message = `there was an error removing the current users direct "Full Control" Full Control access to the library`;
          this.logError(message, e);
          this.setState((current) => ({ ...current, isUpdating: false }));
          return false;
        })
    ) {
      return;
    }

    // add an entry to the Secured Libraries list to track this entry
    if (!
      await sp.web.lists.getByTitle(this.props.rfxListTitle).items.add({
        Title: this.state.newRfxId,
        rfxClosingDate: this.state.newRFxClosingDate,
        rfxContractSpecialistId: this.state.currentUserId,
        rfxDescription: this.state.newRfxDescription,
        rfxLibraryVisitorsGroupId: libraryVisitorsGroup.Id,
        rfxLibraryMembersGroupId: libraryMembersGroup.Id,
        rfxOwnersGroupId: libraryOwnersGroup.Id

      })
        .then(() => {
          return true;
        })
        .catch((e) => {
          const message = "there was an updating the list of libraries";
          this.logError(message, e);
          this.setState((current) => ({ ...current, isUpdating: false }));
          return false;
        })
    ) {
      return;
    }


    this.fetchRFxs();
    this.fetchSiteGroups();
    this.fetchCurrentUser();
    this.setState((current) => ({
      ...current,
      showAddNewLibrary: false,
      isUpdating: false,
      newRfxId: null,
      newRfxDescription: null,
      newRFxClosingDate: null,
      newRFxContractSpecialist: null,
      newRFxInternalMembersGroupName: null,
      newRFxExternalMembersGroupName: null,
      newRFxOwnersGroupName: null
    }));
  }
  private logError(message: string, e: any) {
    Logger.write(`${this.state.currentUserEMail}--${message}`, LogLevel.Error);
    Logger.writeJSON(e, LogLevel.Error);
    alert(e);
  }

  private async doesFolderExist(libraryName: string, folderName: string): Promise<boolean> {

    const exists = await sp.web.lists.getByTitle(libraryName).rootFolder
      .folders.getByName(folderName).get()
      .then((e) => {
        return true;
      })
      .catch((e) => {
        return false;
      });

    if (exists) {
      return true;
    }
    else {
      return false;
    }
  }


  private async validateAndAddFolder() {

    this.setState((current) => ({ ...current, isUpdating: true }));
    if (!this.state.newFolderName || this.state.newFolderName.length === 0) {
      alert("Folder Name is required");
      this.setState((current) => ({ ...current, isUpdating: false }));
      return;

    }
    //does folder exist in library
    if (await this.doesFolderExist(this.state.selectedRfx.title, this.state.newFolderName)) {

      alert(`An folder named ${this.state.newFolderName} already exists in library ${this.state.selectedRfx.title}`);
      this.setState((current) => ({ ...current, isUpdating: false }));
      return;
    }
    //does folder exist in list of folders
    if (findIndex(this.state.rfxFolders, (f) => { return f.title === this.state.newFolderName; }) !== -1) {
      alert(`An entry named ${this.state.newFolderName} already exists in the list of folders for  ${this.state.selectedRfx.title}`);
      this.setState((current) => ({ ...current, isUpdating: false }));
      return;
    }

    const membersGroupExists = await RFXUtilities.doesGroupExist(this.state.newFolderMembersGroupName);
    if (membersGroupExists) {
      alert(`A group named ${this.state.newFolderMembersGroupName} already exists`);
      this.setState((current) => ({ ...current, isUpdating: false }));
      return;
    }
    const visitorsGroupExists = await RFXUtilities.doesGroupExist(this.state.newFolderVisitorsGroupName);
    if (visitorsGroupExists) {
      alert(`A group named ${this.state.newFolderVisitorsGroupName} already exists`);
      this.setState((current) => ({ ...current, isUpdating: false }));
      return;
    }

    // good to go, start doing updates
    // Add the new folder
    let folder: IFolder = await sp.web.lists.getByTitle(this.state.selectedRfx.title).rootFolder
      .folders.add(this.state.newFolderName)
      .then((f) => {
        return f.folder();
      })
      .catch((e) => {
        const message = `there was an error adding folder  ${this.state.newFolderName} to  the library ${this.state.selectedRfx.title}`;
        this.logError(message, e);
        this.setState((current) => ({ ...current, isUpdating: false }));
        return null;
      });

    if (!folder) return;
    //create the folder Members group
    const folderMembersGroup: ISiteGroupInfo =
      await sp.web.siteGroups.add({ "Title": this.state.newFolderMembersGroupName })
        .then((g) => {
          return g.group();
        })
        .catch((e) => {
          const message = `there was an error adding the group ${this.state.newFolderMembersGroupName}`;
          this.logError(message, e);
          this.setState((current) => ({ ...current, isUpdating: false }));
          return null;
        });
    if (!folderMembersGroup) return;
    //create the folder Visitors group
    const folderVisitorsGroup: ISiteGroupInfo = await sp.web.siteGroups.add({ "Title": this.state.newFolderVisitorsGroupName })
      .then((g) => {
        return g.group();
      })
      .catch((e) => {
        const message = `there was an error adding the group ${this.state.newFolderVisitorsGroupName}`;
        this.logError(message, e);
        this.setState((current) => ({ ...current, isUpdating: false }));
        return null;
      });
    if (!folderVisitorsGroup) return;
    // set the owners of the new groups

    if (!
      await RFXUtilities.setGroupOwner(folderMembersGroup.Id, this.state.selectedRfx.libraryOwnersGroupId)
        .then(() => {
          return true;
        })
        .catch((e) => {

          const message = `there was an error setting the owner of group  ${folderMembersGroup.Id} to group ${this.state.selectedRfx.libraryOwnersGroupId}`;
          this.logError(message, e);
          this.setState((current) => ({ ...current, isUpdating: false }));
          return false;
        })
    ) {
      return;
    }

    if (!
      await RFXUtilities.setGroupOwner(folderVisitorsGroup.Id, this.state.selectedRfx.libraryOwnersGroupId)
        .then(() => {
          return true;
        })
        .catch((e) => {
          const message = `there was an error setting the owner of group  ${folderVisitorsGroup.Id} to group ${this.state.selectedRfx.libraryOwnersGroupId}`;
          this.logError(message, e);
          this.setState((current) => ({ ...current, isUpdating: false }));
          return false;
        })
    ) {
      return;
    }



    // break role inheritance on the new folder
    const item: IItem = await sp.web.lists.getByTitle(this.state.selectedRfx.title).rootFolder
      .folders.getByName(this.state.newFolderName).getItem()
      .catch((e) => {
        debugger;
        const message = `there was an error the item for folder  ${this.state.newFolderName} in library ${this.state.selectedRfx.title}`;
        this.logError(message, e);
        this.setState((current) => ({ ...current, isUpdating: false }));
        return null;
      });

    if (!item) return;

    await item.breakRoleInheritance(false);



    // give the default Onwers  group Full Control access to the folder
    const fcRoleDefId = await RFXUtilities.getRoledefId("Full Control", this.props.roleDefinitions);
    await item.roleAssignments.add(this.props.siteOwnersGroup.Id, fcRoleDefId)
      .then((e) => {
        console.log(`granted owners full access to the folder`);
      })
      .catch((e) => {
        const message = `error granting owners full access to the folder`;
        this.logError(message, e);

      });

    // give the folder members Group access to the folder
    const folderMembersRoleDefId = await RFXUtilities.getRoledefId(this.props.roleDefinitionForFolderMembersOnFolder, this.props.roleDefinitions);
    await item.roleAssignments.add(folderMembersGroup.Id, folderMembersRoleDefId)
      .then((e) => {
        console.log(`granted folder members access to folder`);
      })
      .catch((e) => {
        const message = `error granting folder members access to folder`;
        this.logError(message, e);

      });

    // give the folder visitors Group access to the folder
    const folderVisitorsRoleDefId = await RFXUtilities.getRoledefId(this.props.roleDefinitionForFolderVisitorsOnFolder, this.props.roleDefinitions);
    await item.roleAssignments.add(folderVisitorsGroup.Id, folderVisitorsRoleDefId)
      .then((e) => {
        console.log(`granted folder visitors access to folder`);
      })
      .catch((e) => {
        const message = `error granting  folder visitors (group id ${folderVisitorsGroup.Id}) access to folder (Role definition id ${folderVisitorsRoleDefId})`;
        this.logError(message, e);

      });

    // give the folderMembersGroup  access to the library

    await RFXUtilities.grantGroupAccessToLibrary(this.state.selectedRfx.title, folderMembersGroup.Id, this.props.roleDefinitionForFolderMembersOnLibrary, this.props.roleDefinitions)
      .catch((e) => {
        const message = `error granting  folder members (group id ${folderMembersGroup.Id}) access to the library ${this.state.selectedRfx.title} (roledef:${this.props.roleDefinitionForFolderMembersOnLibrary})`;
        this.logError(message, e);

      });

    // give the folderVisitorsGroup  access to the library

    await RFXUtilities.grantGroupAccessToLibrary(this.state.selectedRfx.title, folderVisitorsGroup.Id, this.props.roleDefinitionForFolderVisitorsOnLibrary, this.props.roleDefinitions)
      .catch((e) => {
        const message = `error granting  folder vistors (group id ${folderVisitorsGroup.Id}) access to the library ${this.state.selectedRfx.title} (roledef:${this.props.roleDefinitionForFolderVisitorsOnLibrary})`;
        this.logError(message, e);

      });

    // give the folderMembers Group access to the site
    await RFXUtilities.grantGroupIdAccessToSite(folderMembersGroup.Id, this.props.roleDefinitionForFolderMembersOnSite, this.props.roleDefinitions)
      .catch((e) => {
        const message = `there was an error granting access to the site to the ${this.state.newFolderMembersGroupName} group`;
        this.logError(message, e);
        this.setState((current) => ({ ...current, isUpdating: false }));
        return;
      });

    // give the folderVisitors Group access to the site
    await RFXUtilities.grantGroupIdAccessToSite(folderVisitorsGroup.Id, this.props.roleDefinitionForFolderVisitorsOnSite, this.props.roleDefinitions)
      .catch((e) => {
        const message = `there was an error granting access to the site to the ${this.state.newFolderVisitorsGroupName} group`;
        this.logError(message, e);
        this.setState((current) => ({ ...current, isUpdating: false }));
        return;
      });


    // give the folder members  access to the folder
    await item.roleAssignments.add(folderMembersGroup.Id, folderMembersRoleDefId)
      .then((e) => {
        console.log(`granted folder members access to folder`);
      })
      .catch((e) => {
        const message = `error granting  folder members group  access to folder (role def is ${folderMembersRoleDefId}, group id is ${folderMembersGroup.Id})`;
        this.logError(message, e);

      });

    // give the folder Visitors  access to the folder
    await item.roleAssignments.add(folderVisitorsGroup.Id, folderVisitorsRoleDefId)
      .then((e) => {
        console.log(`granted folder visitors access to folder`);
      })
      .catch((e) => {
        const message = `error granting  folder vistors group  access to folder (role def is ${folderVisitorsRoleDefId}, group id is ${folderVisitorsGroup.Id})`;
        this.logError(message, e);

      });

    // give the library members group access to the folder

    const libraryMembersRoleDefId = await RFXUtilities.getRoledefId(this.props.roleDefinitionForLibraryMembersGroupOnFolder, this.props.roleDefinitions);
    await item.roleAssignments.add(this.state.selectedRfx.libraryMembersGroupId, libraryMembersRoleDefId)
      .then((e) => {
        console.log(`granted library members access to folder`);
      })
      .catch((e) => {
        const message = `error granting library members access to folder`;
        this.logError(message, e);

      });



    // give the library Vistors group access to the folder
    const libraryVisitorsRoleDefId = await RFXUtilities.getRoledefId(this.props.roleDefinitionForLibraryVisitorsGroupOnFolder, this.props.roleDefinitions);
    await item.roleAssignments.add(this.state.selectedRfx.libraryVisitorsGroupId, libraryVisitorsRoleDefId)
      .then((e) => {
        console.log(`granted library visitors access to folder`);
      })
      .catch((e) => {
        const message = `error granting library visitors access to folder`;
        this.logError(message, e);

      });
    // 27OCT2020
    //  remove the users direct permission
    await item.roleAssignments.remove(this.state.currentUserId, fcRoleDefId)
      .then((e) => {
        console.log(`removed the current users Full Control access to the folder`);
      })
      .catch((e) => {
        const message = `error removing the current users Full Control access to the folder`;
        this.logError(message, e);

      });


    // add an entry to the folders list to track this entry
    await sp.web.lists.getByTitle(this.props.rfxFoldersListTitle).items.add({
      Title: this.state.newFolderName,
      rfxFolderMembersGroupId: folderMembersGroup.Id,
      rfxFolderVisitorsGroupId: folderVisitorsGroup.Id,
      RFxId: this.state.selectedRfx.id,
    })
      .catch((e) => {
        const message = "there was an error updating the list of folders";
        this.logError(message, e);
        this.setState((current) => ({ ...current, isUpdating: false }));
        return;
      });

    this.fetchRFxFolders(this.state.selectedRfx)
      .then((folders) => {
        this.setState((current) => ({ ...current, rfxFolders: folders }));
      })
      .catch((e) => {
        const message = `there was an fetching folders for library ${this.state.selectedRfx.title}`;
        this.logError(message, e);

      });


    this.fetchSiteGroups();

    this.setState((current) => ({
      ...current,
      showAddNewFolder: false,
      isUpdating: false,
      newFolderName: null,
      newFolderSecurityGroupName: null

    }));

  }
  public async archiveLibrary(rfx: IRFx): Promise<boolean> {
    let duplicatefolder = await sp.web.lists.getByTitle(this.props.archiveLibraryTitle).rootFolder.folders.getByName(rfx.title).get()
      .then(() => {
        return Promise.resolve(true);
      })
      .catch((e) => {
        return Promise.resolve(false);
      });

    if (duplicatefolder) {
      alert(`A folder named ${rfx.title} already exists in the ${this.props.archiveLibraryTitle} library. 
You must either delete or rename that folder before you archive this library.`);
      return Promise.resolve(false);

    }

    let folderadded = await sp.web.folders.add(`${this.props.webServerRelativeUrl}/${this.props.archiveLibraryTitle}/${rfx.title}`)
      .then(() => {
        return Promise.resolve(true);
      })
      .catch((e) => {
        this.logError(`There was an error adding a folder at ${this.props.webServerRelativeUrl}/${this.props.archiveLibraryTitle}/${rfx.title}`, e);
        return Promise.resolve(false);
      });
    if (!folderadded) {
      return Promise.resolve(false);
    }
    let foldersCopied: Promise<boolean>[] = [];
    await sp.web.lists.getByTitle(rfx.title).rootFolder.folders.get()
      .then(async (folders) => {
        for (let folder of folders) {
          if (folder.Name !== 'Forms') {
            debugger;
            foldersCopied.push(sp.web.getFolderByServerRelativePath(folder.ServerRelativeUrl).copyByPath(`${this.props.webServerRelativeUrl}/${this.props.archiveLibraryTitle}/${rfx.title}/${folder.Name}`, true)
              // note that copybypath does not thow an error if you pass it a bad source path (i.e. one that does not exist)

              .then((result) => {

                return true;
              })
              .catch((e) => {
                this.logError(`An error occurred copying folder ${folder.ServerRelativeUrl}. Archive has been canceled.`, e);
                return false;
              }));
          }
        }

      });
    let allfolderscopied: boolean = await Promise.all(foldersCopied)
      .then(() => {
        return Promise.resolve(true);
      })
      .catch(() => {
        return Promise.resolve(false);
      });
    if (!allfolderscopied) {
      return Promise.resolve(false);
    }
    let filesCopied: Promise<boolean>[] = [];
    debugger;
    await sp.web.lists.getByTitle(rfx.title).rootFolder.files.get()
      .then(async (files) => {
        console.log(files);
        for (let file of files) {

          filesCopied.push(sp.web.getFileByServerRelativeUrl(file.ServerRelativeUrl).copyByPath(`${this.props.webServerRelativeUrl}/${this.props.archiveLibraryTitle}/${rfx.title}/${file.Name}`, true)
            .then(() => {
              return Promise.resolve(true);
            })
            .catch((e) => {
              this.logError(`An error occurred copying file ${file.ServerRelativeUrl}. Archive has been canceled.`, e);
              return Promise.resolve(false);
            })
          );
        }

      });
    debugger;
    let allfilescopied: boolean = await Promise.all(filesCopied)
      .then(() => {
        return Promise.resolve(true);
      })
      .catch(() => {
        return Promise.resolve(false);
      });
    if (!allfilescopied) {
      return Promise.resolve(false);
    }
    debugger;
    return Promise.resolve(true);

  }
  public async deleteLibrary(rfx: IRFx) {


    let errorDeletingLibrary = false;
    let folders = await this.fetchRFxFolders(rfx)
      .then((x) => {
        console.log(`fetched ${this.state.rfxFolders.length} folders for the library`);
        return x;
      })
      .catch((e) => {
        const message = `there was an error removing the library`;
        this.logError(message, e);
        errorDeletingLibrary = true;
        return [];
      });
    if (errorDeletingLibrary) return;
    for (const folder of folders) {
      await this.deleteFolder(folder)
        .catch((e) => {
          const message = `there was an error removing the folder ${folder}`;
          this.logError(message, e);
          errorDeletingLibrary = true;
        });

    }
    if (errorDeletingLibrary) return;
    await sp.web.lists.getByTitle(rfx.title).recycle()
      .then((x) => {
        console.log(`deleted the library`);
      })
      .catch((e) => {
        const message = 'there was an error removing the library';
        this.logError(message, e);
        errorDeletingLibrary = true;
        return;
      });
    if (errorDeletingLibrary) return;
    // delete visitors group
    await sp.web.siteGroups.getById(rfx.libraryVisitorsGroupId).get()
      .then(async (grp) => {
        await sp.web.siteGroups.removeById(rfx.libraryVisitorsGroupId)

          .then((x) => {
            console.log(`deleted the externall secrity group`);
          })
          .catch((e) => {
            const message = `there was an error removing the external group ${rfx.libraryVisitorsGroupId}`;
            this.logError(message, e);
            errorDeletingLibrary = true;
            return;
          });

      })
      .catch((e) => {
        const message = `the external users groups with an ID of  ${rfx.libraryVisitorsGroupId} does not exist`;
        this.logError(message, e);
        errorDeletingLibrary = true;
        return;
      });
    if (errorDeletingLibrary) return;
    //delete members group
    await sp.web.siteGroups.getById(rfx.libraryMembersGroupId).get()
      .then(async (grp) => {
        await sp.web.siteGroups.removeById(rfx.libraryMembersGroupId)
          .then((x) => {
            console.log(`deleted the internal secrity group`);
          })
          .catch((e) => {
            const message = `there was an error removing the internal group ${rfx.libraryMembersGroupId}`;
            this.logError(message, e);
            errorDeletingLibrary = true;
            return;
          });

      })
      .catch((e) => {
        const message = `the internal users groups with an ID of  ${rfx.libraryMembersGroupId} does not exist`;
        this.logError(message, e);
        errorDeletingLibrary = true;
        return;
      });
    if (errorDeletingLibrary) return;
    // delete the owners groups
    await sp.web.siteGroups.getById(rfx.libraryOwnersGroupId).get()
      .then(async (grp) => {

        await sp.web.siteGroups.removeById(rfx.libraryOwnersGroupId)

          .then((x) => {
            console.log(`deleted the owners secrity group`);
          })
          .catch((e) => {
            const message = `there was an error removing the owner group ${rfx.libraryOwnersGroupId}`;
            this.logError(message, e);
            errorDeletingLibrary = true;
            return;
          });

      })
      .catch((e) => {
        const message = `the owners group with an ID of  ${rfx.libraryOwnersGroupId} does not exist`;
        this.logError(message, e);
        errorDeletingLibrary = true;
        return;
      });
    if (errorDeletingLibrary) return;
    await sp.web.lists.getByTitle(this.props.rfxListTitle).items.getById(rfx.id).recycle()

      .then((x) => {
        console.log(`deleted item ${rfx.id} from list ${this.props.rfxListTitle}`);
      })
      .catch((e) => {
        const message = `there was an error removing row ${rfx.id} from the list  ${this.props.rfxListTitle}`;
        this.logError(message, e);
        errorDeletingLibrary = true;
        return;
      });
    if (errorDeletingLibrary) return;
    this.fetchRFxs();


  }
  public async deleteFolder(folder: IRFxFolder): Promise<any> {
    let errorDeletingFolder = false;

    const rfx = await sp.web.lists.getByTitle(this.props.rfxListTitle)
      .items.getById(folder.rfxId).get()
      .then((item) => {
        console.log(`fetched row ${folder.rfxId} from the List of Libraries `);
        return item;
      })
      .catch((e) => {

        const message = `there was an error fetching row ${folder.rfxId} from the List of Libraries `;
        this.logError(message, e);
        return null;
      });
    if (!rfx) {
      return Promise.reject(`there was an error fetching row ${folder.rfxId} from the List of Libraries for folder   ${folder.title} `);
    }
    await sp.web.lists.getByTitle(rfx["Title"]).rootFolder
      .folders.getByName(folder.title).recycle()
      .then((x) => {
        console.log(`deleted the folder  ${folder.title}`);
      })
      .catch((e) => {
        debugger;
        const message = `there was an error removing the folder ${folder.title}`;
        this.logError(message, e);
        //errorDeletingFolder = true;  let's not stop the process, continue on to remove the groups
      });
    if (errorDeletingFolder) return Promise.reject(`there was an error removing the folder ${folder.title}`);
    // delete Members group
    await sp.web.siteGroups.getById(folder.folderMembersGroupId).get()
      .then(async (grp) => {
        await sp.web.siteGroups.removeById(folder.folderMembersGroupId)
          .then((x) => {
            console.log(`deleted the Members secrity group`);
          })
          .catch((e) => {
            const message = `there was an error removing the members group ${folder.folderMembersGroupId}`;
            this.logError(message, e);
          });

      })
      .catch((e) => {
        const message = `the members group with an ID of  ${folder.folderMembersGroupId} does not exist`;
        this.logError(message, e);
        errorDeletingFolder = true;
      });
    if (errorDeletingFolder) return Promise.reject(`the external users groups with an ID of  ${folder.folderMembersGroupId} does not exist`);
    // delete Visitors group
    await sp.web.siteGroups.getById(folder.folderVisitorsGroupId).get()

      .then(async (grp) => {
        await sp.web.siteGroups.removeById(folder.folderVisitorsGroupId)

          .then((x) => {
            console.log(`deleted the Visitors security group`);
          })
          .catch((e) => {
            const message = `there was an error removing the visitors group ${folder.folderVisitorsGroupId}`;
            this.logError(message, e);
          });

      })
      .catch((e) => {
        const message = `the visitors group with an ID of  ${folder.folderVisitorsGroupId} does not exist`;
        this.logError(message, e);
        errorDeletingFolder = true;
      });
    if (errorDeletingFolder) return Promise.reject(`the visitors group with an ID of  ${folder.folderVisitorsGroupId} does not exist`);
    await sp.web.lists.getByTitle(this.props.rfxFoldersListTitle).items.getById(folder.id).recycle()
      .then((x) => {
        console.log(`deleted item ${folder.id} from list ${this.props.rfxFoldersListTitle}`);
      })
      .catch((e) => {
        const message = `there was an error removing row ${folder.id} from the list  ${this.props.rfxFoldersListTitle}`;
        this.logError(message, e);
        errorDeletingFolder = true;
      });
    if (errorDeletingFolder) return Promise.reject(`there was an error removing row ${folder.id} from the list  ${this.props.rfxFoldersListTitle}`);

    return Promise.resolve();
  }
  private fetchRFxFolders(rfx: IRFx): Promise<Array<IRFxFolder>> {

    return sp.web.lists.getByTitle(this.props.rfxFoldersListTitle).items.filter(`RFxId eq ${rfx.id}  `)
      .orderBy("Title")
      .getAll()
      .then((items) => {
        console.log(`fetched folders for rfx # ${rfx.id}`);
        return items.map((item) => {
          return {
            title: item.Title,
            id: item.Id, //the id of the listitem that holds the folder
            folderMembersGroupId: item.rfxFolderMembersGroupId,
            folderVisitorsGroupId: item.rfxFolderVisitorsGroupId,
            rfxId: item.RFxId,
          };
        });
      });
  }

  public async showFolders(rfx: IRFx) {
    this.fetchRFxFolders(rfx)
      .then((folders) => {
        this.setState((current) => ({ ...current, rfxFolders: folders, showFolders: true, selectedRfx: rfx }));
      })
      .catch((e) => {
        const message = `there was an fetching folders for library ${rfx.title}`;
        this.logError(message, e);

      });

  }
  public async fetchRFxDrives(): Promise<Array<IDrive> | null> {
    let drives: Array<IDrive> = [];
    const client = new SPHttpClient();

    return client.get(`${document.location.origin}${this.props.webServerRelativeUrl}/_api/v2.0/drives`, {
      headers: {

      }
    }/* as FetchOptions, but this is not required */)
      .then(res => { // (res: Response) Fetch's Response 

        return res.json().then((js) => {

          for (let v of js.value) {
            drives.push({
              description: v.description,
              id: v.id,
              name: v.name,
              webUrl: v.webUrl,
              driveType: v.driveType,

            });
          }
          return drives;
        });
      })
      .catch((e) => {
        const message = `error fetching drives `;
        this.logError(message, e);
        return null;
      });
  }
  public async fetchActivityDetails(driveId: string): Promise<Array<IActivity> | null> {
    let activities: Array<IActivity> = [];
    const client = new SPHttpClient();

    return client.get(`${document.location.origin}${this.props.webServerRelativeUrl}/_api/v2.0/drives/${driveId}/root/activities?%24expand=driveItem(%24select%3Did%2Cname%2CwebUrl%2CparentReference%2Cfile%2Cfolder)&%24top=5000`, {
      headers: {

      }
    }/* as FetchOptions, but this is not required */)
      .then(res => { // (res: Response) Fetch's Response 

        return res.json().then((js) => {
          for (let v of js.value) {
            activities.push({
              userEmail: v.actor.user.email,
              userDisplayName: v.actor.user.displayName,
              driveItemType: v.driveItem ? v.driveItem['@odata.type'] : "",
              driveItemName: v.driveItem ? v.driveItem.name : "",
              driveItemParentReference: v.driveItem ? v.driveItem.parentReference.path : "",
              activityRecordedTime: new Date(v.times.recordedTime),
              action: Object.getOwnPropertyNames(v.action)[0]

            });
          }
          return activities;
        });
      })
      .catch((e) => {

        const message = `error fetching activities `;
        this.logError(message, e);

        return null;
      });
  }
  public async fetchRFxActivity(rfx: IRFx): Promise<Array<IActivity>> {

    if (!this._drives) {
      await this.fetchRFxDrives().then((d) => {
        this._drives = d;
      }).
        catch((e) => {
          alert(`there was an error fetching drives`);
        });
    }
    if (!this._drives) return;
    const drive: IDrive = find(this._drives, d => { return d.name === rfx.title; });
    const a = await this.fetchActivityDetails(drive.id)
      .then((ad) => {
        return ad;
      }).
      catch((e) => {
        alert(`there was an error fetching ACTIVITIES`);
        return null;
      });

    return a;

  }

  public async showActivity(rfx: IRFx) {
    this.fetchRFxActivity(rfx)
      .then((a) => {
        this.setState((current) => ({ ...current, showActivity: true, activities: a, selectedRfx: rfx }));
      })
      .catch((e) => {
        const message = `there was an fetching activities`;
        this.logError(message, e);


      });

  }
  public async ArchiveAndDelete(rfx: IRFx) {
    this.setState((current) => ({ ...current, isUpdating: true }));
    let archiveSuccessful = await this.archiveLibrary(rfx);
    if (archiveSuccessful) {
      await this.deleteLibrary(rfx);
    }
    this.setState((current) => ({ ...current, isUpdating: false }));
  }
  public render(): React.ReactElement<IRequestMaintenanceProps> {
    const farCommandBarItems: Array<ICommandBarItemProps> = [

      {
        key: "Delete",
        text: 'Delete Library',
        disabled: (this.state.mainSelectedItemsCount != 1),
        onClick: () => {
          if (!this.state.isUpdating) {
            const items = this.mainSelection.getSelection();
            if (window.confirm(`Are you sure you want to delete library ${items[0]['title']} instead of archiving it?`)) {
              this.setState((current) => ({ ...current, isUpdating: true }));

              this.deleteLibrary(items[0] as IRFx);
              this.setState((current) => ({ ...current, isUpdating: false }));

            }
          } else {

          }
        },
        iconProps: {
          iconName: 'Delete',
        }
      },
    ];
    const mainCommandBarItems: Array<ICommandBarItemProps> = [];
    mainCommandBarItems.push(
      {
        key: "add",
        text: 'Add a new Library',
        onClick: () => {
          this.setState((current) => ({ ...current, showAddNewLibrary: true, newDocLibGroupName: "", newDocLibTitle: "" }));
        },
        iconProps: {
          iconName: 'Add'
        }
      });
    if (this.props.enablePrivateFolders) {
      mainCommandBarItems.push(
        {
          key: "folders",
          text: 'Manage Folders',

          disabled: (this.state.mainSelectedItemsCount != 1),
          onClick: () => {
            if (!this.state.isUpdating) {
              const items = this.mainSelection.getSelection();
              this.showFolders(items[0] as IRFx);
            }
          },
          iconProps: {
            iconName: 'FolderList',
          }
        });
    }
    if (this.props.archiveLibraryTitle) {
      mainCommandBarItems.push(
        {
          key: "Archive",
          text: 'Archive Library',

          disabled: (this.state.mainSelectedItemsCount != 1),
          onClick: () => {
            if (!this.state.isUpdating) {
              const items = this.mainSelection.getSelection();
              if (window.confirm(`Are you sure you want to archive library ${items[0]['title']}`)) {
                this.ArchiveAndDelete(items[0] as IRFx);
              }
            }
          },
          iconProps: {
            iconName: 'Archive',
          }
        });
    }
    mainCommandBarItems.push(
      {
        key: "Activity",
        text: 'Recent Activity',
        disabled: (this.state.mainSelectedItemsCount != 1),
        onClick: () => {
          if (!this.state.isUpdating) {
            const items = this.mainSelection.getSelection();
            this.showActivity(items[0] as IRFx);
          }
        },
        iconProps: {
          iconName: 'Info',
        }
      });

    return (
      <div className={styles.requestMaintenance}>
        {/* 

          ADD NEW LIBRARY PANEL

        */}
        {this.state.showAddNewLibrary &&
          <Panel isOpen={this.state.showAddNewLibrary}
            onDismiss={(e) => {
              this.setState((current) => ({ ...current, showAddNewLibrary: false }));
            }}
            type={PanelType.medium}
            headerText={`Add a new Library`}
          >
            <TextField required label="Library Name" placeholder="enter library name" value={this.state.newRfxId} onChange={(e, value) => {
              this.setState((current) => ({
                ...current,
                newRfxId: value.replace(/[&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, ''),
                newRFxOwnersGroupName: value.replace(/[&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, '') + " Owners",
                newRFxLibraryMembersGroupName: value.replace(/[&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, '') + " Members",
                newRFxLibraryVisitorsGroupName: value.replace(/[&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, '') + " Visitors",
                newRFxLibraryOwnersGroupName: value.replace(/[&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, '') + " Owners",

              }));
            }} />
            <DatePicker isRequired={true} label="Closing Date" placeholder="enter closing Date" value={this.state.newRFxClosingDate}
              onSelectDate={(date: Date) => {
                this.setState((current) => ({ ...current, newRFxClosingDate: date }));
              }} />
            <TextField multiline rows={3} label="Description" placeholder="enter RFx Description" value={this.state.newRfxDescription}
              onChange={(e, value) => {
                this.setState((current) => ({ ...current, newRfxDescription: value }));
              }} />
            <TextField required label="Contract Specialist" value={this.state.currentUserEMail} disabled={true}
            />
            <TextField label="Owners Group Name" disabled={!this.props.allowGroupNameChanges} placeholder="enter group name" value={this.state.newRFxLibraryOwnersGroupName}
              onChange={(e, value) => {
                this.setState((current) => ({ ...current, newRFxLibraryOwnersGroupName: value.replace(/[&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, '') }));
              }} />
            <TextField label="Members Group Name" disabled={!this.props.allowGroupNameChanges} placeholder="enter group name" value={this.state.newRFxLibraryMembersGroupName}
              onChange={(e, value) => {
                this.setState((current) => ({ ...current, newRFxLibraryMembersGroupName: value.replace(/[&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, '') }));
              }} />
            <TextField label="Visitors Group Name" disabled={!this.props.allowGroupNameChanges} placeholder="enter group name" value={this.state.newRFxLibraryVisitorsGroupName}
              onChange={(e, value) => {
                this.setState((current) => ({ ...current, newRFxLibraryVisitorsGroupName: value.replace(/[&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, '') }));
              }} />
            <br />
            <PrimaryButton disabled={this.state.isUpdating || this.state.invalidCharacters} onClick={(e) => {
              this.validateAndAddLibrary();
            }}>Add Library</PrimaryButton>
          </Panel>
        }
        {/* 

          ADD NEW FOLDER PANEL
          
        */}

        {this.state.showAddNewFolder &&
          <Panel
            isOpen={this.state.showAddNewFolder}
            onDismiss={(e) => {

              this.setState((current) => ({ ...current, showAddNewFolder: false }));
            }}
            type={PanelType.medium}
            headerText={`Add a Folder to Library ${this.state.selectedRfx.title}`}
          >
            <TextField required label="Folder Name" placeholder="enter folder name" value={this.state.newFolderName} onChange={(e, value) => {
              this.setState((current) => ({
                ...current,
                newFolderName: value.replace(/[\x5B&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, ''),
                newFolderMembersGroupName: this.state.selectedRfx.title + " - " + value.replace(/[&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, '') + " Members",
                newFolderVisitorsGroupName: this.state.selectedRfx.title + " - " + value.replace(/[&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, '') + " Visitors",
              }));
            }} />
            <TextField disabled={!this.props.allowGroupNameChanges} label="Members Group" placeholder="enter security group name" value={this.state.newFolderMembersGroupName} onChange={(e, value) => {
              this.setState((current) => ({
                ...current,
                newFolderMembersGroupName: value.replace(/[&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, '')
              }));
            }} />
            <TextField disabled={!this.props.allowGroupNameChanges} label="Visitors Group" placeholder="enter security group name" value={this.state.newFolderVisitorsGroupName} onChange={(e, value) => {
              this.setState((current) => ({
                ...current,
                newFolderVisitorsGroupName: value.replace(/[&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, '')
              }));
            }} />
            <br />
            <PrimaryButton disabled={this.state.isUpdating || this.state.invalidCharacters} onClick={(e) => {
              this.validateAndAddFolder();
            }}>Add Folder</PrimaryButton>
          </Panel>
        }

        {/* 

          Show FOLDERs PANEL
          
        */}
        {(this.state.showFolders && !this.state.showAddNewFolder) &&
          <Panel isOpen={(this.state.showFolders && !this.state.showAddNewFolder)}
            type={PanelType.medium}
            onDismiss={(e) => {
              this.setState((current) => ({ ...current, showFolders: false }));
            }}
            headerText={`Folders for Rfx ${this.state.selectedRfx.title}`}
          >
            <DetailsList

              items={this.state.rfxFolders}
              columns={[
                {
                  key: 'rfx', name: 'Folder Name', fieldName: 'title', minWidth: 75, maxWidth: 200, isResizable: true,
                  onRender: (item: IRFxFolder) => (
                    <Link onClick={() => {
                      RFXUtilities.linkToFolder(item, this.props.rfxListTitle);
                    }}>{item.title}</Link>
                  )
                },

                {
                  key: 'column5', name: 'Members Group', fieldName: 'folderMembersGroupId', minWidth: 100, maxWidth: 200, isResizable: true,
                  onRender: (item: IRFxFolder) => (

                    <Link onClick={() => {
                      RFXUtilities.linkToGroupById(item.folderMembersGroupId, this.props.webServerRelativeUrl);
                    }}>{this.getSiteGroupName(item.folderMembersGroupId)}</Link>
                  )
                },
                {
                  key: 'column5', name: 'Visitors Group', fieldName: 'folderVisitorsGroupId', minWidth: 100, maxWidth: 200, isResizable: true,
                  onRender: (item: IRFxFolder) => (

                    <Link onClick={() => {
                      RFXUtilities.linkToGroupById(item.folderVisitorsGroupId, this.props.webServerRelativeUrl);
                    }}>{this.getSiteGroupName(item.folderVisitorsGroupId)}</Link>
                  )
                },
                {
                  key: 'edit', name: ' ', fieldName: 'edit', minWidth: 50, maxWidth: 50, isResizable: false,
                  onRender: (item: IRFxFolder) => (
                    <Icon iconName={IconNames.Delete} onClick={async () => {
                      if (!this.state.isUpdating) {
                        if (window.confirm(`Are you sure you want to delete folder ${item['title']} ?`)) {
                          this.setState((current) => ({ ...current, isUpdating: true }));
                          await this.deleteFolder(item);
                          await this.fetchRFxFolders(this.state.selectedRfx)
                            .then((folders) => {
                              this.setState((current) => ({ ...current, rfxFolders: folders }));
                            })
                            .catch((e) => {
                              const message = `there was an fetching folders for library ${item.title}`;

                              this.logError(message, e);

                            });
                          this.setState((current) => ({ ...current, isUpdating: false }));
                        }

                      }

                    }} />

                  )
                },
              ]}
            >
            </DetailsList>
            <ActionButton disabled={this.state.isUpdating} iconProps={{ iconName: IconNames.Add }}
              onClick={(e) => {
                this.setState((current) => ({ ...current, showAddNewFolder: true, newFolderName: "", newFolderSecurityGroupName: "" }));
              }
              }>Add a new Folder</ActionButton>
          </Panel>
        }

        {/* 

          Show Activities PANEL
          
        */}
        {(this.state.showActivity) &&
          <Panel isOpen={(this.state.showActivity)}
            type={PanelType.large}
            onDismiss={(e) => {
              this.setState((current) => ({ ...current, showActivity: false }));
            }}
            headerText={`Activity for Rfx ${this.state.selectedRfx.title}`}
          >

            <CSVLink data={this.state.activities} filename={'Reactivitiesquests.csv'}>
              <CommandBarButton iconProps={{ iconName: 'ExcelLogoInverse' }} text='Export to Excel' />
            </CSVLink>

            <DetailsList
              selectionMode={SelectionMode.none}
              items={this.state.activities}
              columns={[
                {
                  key: 'userEmail', name: 'User', fieldName: 'userEmail', minWidth: 175, maxWidth: 175, isResizable: true,
                },
                {
                  key: 'action', name: 'Action', fieldName: 'action', minWidth: 44, maxWidth: 44, isResizable: true,
                },
                {
                  key: 'driveItemName', name: 'Name', fieldName: 'driveItemName', minWidth: 200, maxWidth: 200, isResizable: true,
                },
                {
                  key: 'activityRecordedTime', name: 'Time', fieldName: 'activityRecordedTime', minWidth: 130, maxWidth: 130, isResizable: true,
                  onRender: (item: IActivity) => (
                    format(item.activityRecordedTime, "yyyyMMMd@h:m:sa")
                  )
                },
                {
                  key: 'driveItemParentReference', name: 'Folder', fieldName: 'driveItemParentReference', minWidth: 200, maxWidth: 200, isResizable: true,
                  onRender: (item: IActivity) => (
                    item.driveItemParentReference.substring(item.driveItemParentReference.indexOf("root:") + 6)
                  )
                },
              ]}
            >
            </DetailsList>

          </Panel>
        }


        {/* 

          MAIN DISPLAY
          
        */}
        {this.state.isUpdating &&
          <MessageBar messageBarType={MessageBarType.blocked}>Updating...</MessageBar>
        }
        <CommandBar items={mainCommandBarItems} farItems={farCommandBarItems} className={styles.commandBar}></CommandBar>
        <DetailsList
          selectionMode={SelectionMode.single}

          selection={this.mainSelection}
          items={this.state.rfxs}
          columns={[
            {
              key: 'rfx', name: 'RFX #', fieldName: 'title', minWidth: 100, maxWidth: 100, isResizable: true,
              onRender: (item: IRFx) => (
                <Link onClick={() => {
                  RFXUtilities.linkToLibrary(item.title);
                }}>{item.title}</Link>
              )
            },
            // {
            //   key: 'contractSpecialist', name: 'Contract Specialist', fieldName: 'contractSpecialist.EMail', minWidth: 200, maxWidth: 200, isResizable: true,
            //   onRender: (item: IRFx) => (
            //     item.contractSpecialist.EMail
            //   )
            // },
            {
              key: 'closingDate', name: 'Closing Date', fieldName: 'closingDate', minWidth: 100, maxWidth: 100, isResizable: true,
              onRender: (item: IRFx) => (
                item.closingDate.toDateString()
              )
            },
            {
              key: 'description', name: 'Description', fieldName: 'description', minWidth: 100, maxWidth: 400, isResizable: true,
              onRender: (item: IRFx) => (
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
              )
            },
            {
              key: 'column4', name: 'Owners', fieldName: 'libraryOwnersGroupId', minWidth: 100, maxWidth: 400, isResizable: true,
              onRender: (item: IRFx) => (
                <Link onClick={() => {
                  RFXUtilities.linkToGroupById(item.libraryOwnersGroupId, this.props.webServerRelativeUrl);
                }}>{this.getSiteGroupName(item.libraryOwnersGroupId)}</Link>
              )
            },
            {
              key: 'column4', name: 'Members', fieldName: 'libraryMembersGroupId', minWidth: 100, maxWidth: 400, isResizable: true,
              onRender: (item: IRFx) => (
                <Link onClick={() => {
                  RFXUtilities.linkToGroupById(item.libraryMembersGroupId, this.props.webServerRelativeUrl);
                }}>{this.getSiteGroupName(item.libraryMembersGroupId)}</Link>
              )
            },
            {
              key: 'column4a', name: 'Visitors', fieldName: 'libraryVisitorsGroupId', minWidth: 100, maxWidth: 400, isResizable: true,
              onRender: (item: IRFx) => (
                <Link onClick={() => {
                  RFXUtilities.linkToGroupById(item.libraryVisitorsGroupId, this.props.webServerRelativeUrl);
                }}>{this.getSiteGroupName(item.libraryVisitorsGroupId)}</Link>
              )
            },


          ]}
        >
        </DetailsList>
        {/* <ActionButton disabled={this.state.isUpdating} iconProps={{ iconName: IconNames.Add }}
          onClick={(e) => {
            this.setState((current) => ({ ...current, showAddNewLibrary: true, newDocLibGroupName: "", newDocLibTitle: "" }));
          }
          }>Add a new RFx library</ActionButton> */}

      </div>

    );
  }
}
