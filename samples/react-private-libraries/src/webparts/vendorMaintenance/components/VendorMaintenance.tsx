import * as React from 'react';
import { sp, SPHttpClient } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/sites";

import "@pnp/sp/site-groups";
import "@pnp/sp/lists/web";
import "@pnp/sp/lists/web";
import "@pnp/sp/items";
import "@pnp/sp/security/list";
import "@pnp/sp/security/web";
import "@pnp/sp/folders";
import "@pnp/sp/views";


import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { PrimaryButton, Button } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { ISiteGroupInfo } from '@pnp/sp/site-groups';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IViewInfo } from '@pnp/sp/views';
import { IRoleDefinitionInfo } from '@pnp/sp/security';
import styles from './VendorMaintenance.module.scss';
import { IVendorMaintenanceProps } from './IVendorMaintenanceProps';
import { IVendorMaintenanceState } from './IVendorMaintenanceState';

import { escape } from '@microsoft/sp-lodash-subset';
import { IVendor } from '../../../models/IVendor';
import RFXUtilities from '../../../utilities/RFXUtilities';
export default class VendorMaintenance extends React.Component<IVendorMaintenanceProps, IVendorMaintenanceState> {


  public state = {
    vendors: [],
    showAddNew: false,
    newVendorTitle: null,
    newVendorGroupName: null,
    isUpdating: false,
    invalidCharacters: false
  };
  public componentDidMount() {
    this.fetchVendors();
  }
  /**
   * Fetches the list of vendors (store in a sharepoint list) and updates them in the docLibs State varieble
   *
   * @private
   * @memberof DocLibSecurity
   */
  private fetchVendors() {
    sp.web.lists.getByTitle(this.props.vendorListTitle).items.orderBy("Title").get().then((items) => {
      this.setState((current) => ({
        ...current,
        vendors: items.map((item) => {
          return { title: item.Title, membersGroup: item["SecurityGroup"], id: item.Id };
        })
      })
      );
    });
  }
  /**
   * Validates the data to add a new vendor and adds it if valid
   *
   * @private
   * @returns
   * @memberof DocLibSecurity
   */
  private async validateAndAddVendor() {
    debugger;
    this.setState((current) => ({ ...current, isUpdating: true }));
    //Do validation

    let groupExists = await RFXUtilities.doesGroupExist(this.state.newVendorGroupName);
    if (groupExists) {
      alert("A group with this name already exists");
      this.setState((current) => ({ ...current, isUpdating: false }));
      return;
    }

    // Add the new group
    await sp.web.siteGroups.add({ "Title": this.state.newVendorGroupName })
      .catch((e) => {

        alert("there was an error adding the group");
        this.setState((current) => ({ ...current, isUpdating: false }));
        return;
      });
    const newGroup = await sp.web.siteGroups.getByName(this.state.newVendorGroupName).get();
    // set the groups owner
    await RFXUtilities.setGroupOwner(newGroup.Id, this.props.ownersGroup.Id)
      .catch((e) => {

        alert("there was an setting the owner on the new group");
        this.setState((current) => ({ ...current, isUpdating: false }));
        return;
      });
    // await RFXUtilities.grantNewGroupAccessToSite(this.state.newVendorGroupName, this.props.roleDefinitionForSite,this.props.roleDefinitions).catch((e) => {

    //   alert("there was an error granting access to the site to the new group");
    //   this.setState((current) => ({ ...current, isUpdating: false }));
    //   return;
    // });
debugger;
    // add an entry to the Secured Libraries list to track this entry
    await sp.web.lists.getByTitle(this.props.vendorListTitle).items.add({
      Title: this.state.newVendorTitle,
      SecurityGroup: this.state.newVendorGroupName
    })
      .catch((e) => {

        alert("there was an updating the List of Libraries");
        this.setState((current) => ({ ...current, isUpdating: false }));
        return;
      });


    this.fetchVendors();
    this.setState((current) => ({ ...current, showAddNew: false, isUpdating: false, newVendorGroupName: "", newVendorTitle: "" }));

  }

  private async deleteVendor(item: IVendor) {
    this.setState((current) => ({ ...current, isUpdating: true }));
    //Do validation

    let groupExists = await RFXUtilities.doesGroupExist(item.membersGroup);
    if (!groupExists) {
      alert("A group with this name does not exist ");
      this.setState((current) => ({ ...current, isUpdating: false }));
      return;
    }
    await RFXUtilities.deletegroup(item.membersGroup)
      .catch((e) => {

        alert("there was an error deleting the group");
        this.setState((current) => ({ ...current, isUpdating: false }));
        return;
      });

    // await RFXUtilities.deleterow(item.id,this.props.vendorListTitle)
    //   .catch((e) => {

    //     alert("there was an removing the row from the vendors list");
    //     this.setState((current) => ({ ...current, isUpdating: false }));
    //     return;
    //   });


    this.fetchVendors();
    this.setState((current) => ({ ...current, showAddNew: false, isUpdating: false, newVendorGroupName: "", newVendorTitle: "" }));

  }
  public render(): React.ReactElement<IVendorMaintenanceProps> {

    return (
      <div className={styles.vendorMaintenance}>
        <Panel isOpen={this.state.showAddNew} >
          <TextField label="Vendor Name" placeholder="enter vendor name" value={this.state.newVendorTitle} onChange={(e, value) => {
            this.setState((current) => ({
              ...current,
              newVendorTitle: value.replace(/[&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, ''),
              newVendorGroupName: value.replace(/[&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, '') + " Members"
            }));
          }}></TextField>
          <TextField label="Group Name" placeholder="enter group name" value={this.state.newVendorGroupName}
            default={this.state.newVendorGroupName} onChange={(e, value) => {
              this.setState((current) => ({ ...current, newVendorGroupName: value.replace(/[&\/\\#,+()$~% "`:;*?<>{}|^!@$']/g, '') }));
            }}></TextField>
          <PrimaryButton disabled={this.state.isUpdating || this.state.invalidCharacters} onClick={(e) => {
            this.validateAndAddVendor();
          }}>Add Vendor</PrimaryButton>
        </Panel>
        <DetailsList

          items={this.state.vendors}
          columns={[
            {
              key: 'column1', name: 'Vendor Name', fieldName: 'title', minWidth: 100, maxWidth: 200, isResizable: true,
              onRender: (item: IVendor) => (
                <Label>{item.title}</Label>
              )
            },
            {
              key: 'column3', name: 'Security Group', fieldName: 'membersGroup', minWidth: 100, maxWidth: 200, isResizable: true,
              onRender: (item: IVendor) => (
                <Link onClick={() => {
                  RFXUtilities.linkToGroup(item.membersGroup, this.props.webServerRelativeUrl);
                }}>{item.membersGroup}</Link>
              )
            },
            {
              key: 'edit', name: 'Edit', fieldName: 'edit', minWidth: 100, maxWidth: 200, isResizable: false,
              onRender: (item: IVendor) => (
                <Link onClick={() => {
                  this.deleteVendor(item);
                }}>Delete</Link>
              )
            }


          ]}

        >

        </DetailsList>
        <Button onClick={(e) => this.setState((current) => ({ ...current, showAddNew: true, newVendorGroupName: "", newVendorTitle: "" }))}>Add new Vendor</Button>
      </div>
    );

  }
}
