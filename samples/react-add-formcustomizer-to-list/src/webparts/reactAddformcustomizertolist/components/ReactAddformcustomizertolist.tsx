import * as React from 'react';
import styles from './ReactAddformcustomizertolist.module.scss';
import { IReactAddformcustomizertolistProps } from './IReactAddformcustomizertolistProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { SPFI, SPFx } from '@pnp/sp';
import { getSP } from '../pnpjsConfig';
import { Logger, LogLevel } from "@pnp/logging";
import { IItemUpdateResult } from "@pnp/sp/items";
import { Label, PrimaryButton } from '@microsoft/office-ui-fabric-react-bundle';
import "@pnp/sp/content-types/list";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration, ISPHttpClientOptions } from '@microsoft/sp-http';


import { SitePicker } from "@pnp/spfx-controls-react/lib/SitePicker";
import { ListPicker } from "@pnp/spfx-controls-react/lib/ListPicker";
import { IReactAddformcustomizertolistState } from './IReactAddformcustomizertolistState';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IContentTypeInfo } from '@pnp/sp/content-types/types';
import { Web } from '@pnp/sp/webs';
import { ITextFieldProps, TextField } from 'office-ui-fabric-react/lib/TextField';
import { IStackStyles, IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { DefaultButton, IButtonStyles, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { FontIcon, IIconStyles } from 'office-ui-fabric-react/lib/Icon';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Image, IImageProps } from 'office-ui-fabric-react/lib/Image';
import Dialog, { DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';

const iconClass = mergeStyles({
  fontSize: 20,
  height: 12,
  width: 12,
  margin: '5px 25px',
});

const stackTokens: IStackTokens = {
  childrenGap: 10,
};

const chkstackTokens: IStackTokens = {
  childrenGap: 6,
};

const labelCalloutStackStyles: Partial<IStackStyles> = { root: { padding: 20 } };
const iconButtonStyles: Partial<IButtonStyles> = { root: { marginBottom: -3 } };
const iconProps = { iconName: 'Info' };

const modelProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 450 } },
};


export default class ReactAddformcustomizertolist extends React.Component<IReactAddformcustomizertolistProps, IReactAddformcustomizertolistState> {

  private LOG_SOURCE = "ReactAddformcustomizertolist";
  private _sp: SPFI;

  private dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Information!',
    subText: "",
  };
  constructor(props: IReactAddformcustomizertolistProps) {
    super(props);
    this.state = {
      sites: [],
      siteUrl: "",
      errors: [],
      contentTypes: [],
      NewForm: false,
      EditForm: false,
      ViewForm: false,
      disabled: false,
      selectedContnetType: "",
      selectedList: "",
      clientComponentID: "",
      isCalloutVisible: false,
      userMessage: "",
      hideDialog: true,
      chkCustomSiteUrl: false,
    };
    this._sp = getSP();
    this.onListPickerChange = this.onListPickerChange.bind(this);
    this.CTTypeChanged = this.CTTypeChanged.bind(this);
    this.onNewFormChange = this.onNewFormChange.bind(this);
    this.onEditFormChange = this.onEditFormChange.bind(this);
    this.onViewFormChange = this.onViewFormChange.bind(this);
    this.addFormCustomizer = this.addFormCustomizer.bind(this);
    this.removeFormCustomizer = this.removeFormCustomizer.bind(this);
    this.handleCCIDChange = this.handleCCIDChange.bind(this);
    this.toggleIsCalloutVisible = this.toggleIsCalloutVisible.bind(this);
    this.toggleHideDialog = this.toggleHideDialog.bind(this);
    this.onCustomSiteUrlChange = this.onCustomSiteUrlChange.bind(this);
  }

  public render(): React.ReactElement<IReactAddformcustomizertolistProps> {
    try {
      const {
        hasTeamsContext
      } = this.props;
      return (
        <section className={`${styles.reactAddformcustomizertolist} ${hasTeamsContext ? styles.teams : ''}`} >
          <h1 className={styles.headeClass}>Add form customizer to list</h1>
          <Stack tokens={stackTokens}>
            {
              !this.state.chkCustomSiteUrl && (
                <SitePicker
                  context={this.props.context}
                  label={'Select the site'}
                  mode={'site'}
                  allowSearch={true}
                  multiSelect={false}
                  onChange={(sites) => {
                    console.log(sites);
                    this.setState({ siteUrl: sites[0].url });
                    this.setState({ sites: sites });
                    this.setState({ contentTypes: [] });
                  }}
                  placeholder={'Select the site'}
                  searchPlaceholder={'Choose the site'}
                  selectedSites={this.state.sites}
                  initialSites={this.state.sites}
                />
              )
            }
            {
              this.state.siteUrl && (<Label>{`Selected site url: ${this.state.siteUrl}`}</Label>)
            }

            <Checkbox label="Custom Site" value={"Custom Site"} checked={this.state.chkCustomSiteUrl} onChange={this.onCustomSiteUrlChange} />
            {
              this.state.chkCustomSiteUrl && (
                <>
                  <Label>Enter site url</Label>
                  <TextField
                    value={this.state.siteUrl}
                    onChange={(e) => { this.handleCustomSiteUrlChange(e) }}
                  />
                </>
              )
            }



            <ListPicker context={this.props.context}
              label="Select the list"
              placeHolder="Select the list"
              baseTemplate={100}
              includeHidden={false}
              multiSelect={false}
              webAbsoluteUrl={this.state.siteUrl}
              onSelectionChanged={this.onListPickerChange}
              selectedList={this.state.selectedList}
              disabled={!(this.state.siteUrl)}
            />

            <Dropdown
              label="Select a content type"
              placeholder="Select a content type..."
              onChange={this.CTTypeChanged}
              options={this.state.contentTypes}
              required={true}
              selectedKey={this.state.selectedContnetType}
            />


            <Stack horizontal tokens={chkstackTokens}>
              <Label required={true}>Client Component ID </Label>
              <IconButton
                id={"iconButtonId"}
                iconProps={iconProps}
                title="Info"
                ariaLabel="Info"
                onClick={this.toggleIsCalloutVisible}
                styles={iconButtonStyles}
              />
              {this.state.isCalloutVisible && (
                <Callout
                  target={'#' + "iconButtonId"}
                  setInitialFocus
                  onDismiss={this.toggleIsCalloutVisible}
                  ariaDescribedBy={"description"}
                  role="alertdialog"
                >
                  <Stack tokens={stackTokens} horizontalAlign="start" styles={labelCalloutStackStyles}>
                    <Image src={require('../assets/ClientComponentID.png')} alt='Client Component ID' height={400} width={500}></Image>
                    <span id={"description"}>Enter the 'Client Component ID' present in form customizer manifest json file.</span>
                    <DefaultButton onClick={this.toggleIsCalloutVisible}>Close</DefaultButton>
                  </Stack>
                </Callout>
              )}
            </Stack>
            <TextField
              value={this.state.clientComponentID}
              onChange={(e) => { this.handleCCIDChange(e) }}
            />

            <Label>Select the required form to associate the customizer</Label>
            <Stack horizontal tokens={chkstackTokens} >
              <Checkbox label="New Form" value={"New Form"} checked={this.state.NewForm} onChange={this.onNewFormChange} />
              <Checkbox label="Edit Form" value={"Edit Form"} checked={this.state.EditForm} onChange={this.onEditFormChange} />
              <Checkbox label="View Form" value={"View Form"} checked={this.state.ViewForm} onChange={this.onViewFormChange} />
            </Stack>


            <Stack horizontal tokens={stackTokens}>
              <DefaultButton text="Associate" onClick={this.addFormCustomizer} allowDisabledFocus disabled={this.state.disabled} />
              <DefaultButton text="Remove Association" onClick={this.removeFormCustomizer} allowDisabledFocus disabled={this.state.disabled} />
            </Stack>
            <Stack>
              <Dialog
                hidden={this.state.hideDialog}
                onDismiss={this.toggleHideDialog}
                dialogContentProps={this.dialogContentProps}
                modalProps={modelProps}
              >
                <Label>{this.state.userMessage}</Label>
                <DialogFooter>
                  <DefaultButton onClick={this.toggleHideDialog} text="Close" />
                </DialogFooter>
              </Dialog>
            </Stack>
          </Stack>
        </section >
      );

    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (render) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
    return null;
  }


  private toggleHideDialog() {
    //this.dialogContentProps.subText = this.state.userMessage;
    this.setState({ hideDialog: !this.state.hideDialog });

  }
  private toggleIsCalloutVisible() {
    this.setState({ isCalloutVisible: !this.state.isCalloutVisible })
  }


  private handleCustomSiteUrlChange(e: any) {
    this.setState({ siteUrl: e.target.value });
  }
  private handleCCIDChange(e: any) {
    this.setState({ clientComponentID: e.target.value });
  }

  private onListPickerChange(list: string) {
    try {
      this.setState({ selectedList: list });
      this.setState({ contentTypes: [] });
      this._getContentTypes(list);
    }
    catch (err) {
      Logger.write(`${this.LOG_SOURCE} (onListPickerChange) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }

  }

  private _getContentTypes = async (listNameorListId: string): Promise<void> => {
    try {

      var ctTypes: { key: string, text: string }[] = [];
      ctTypes.push({ key: '', text: '' });
      const web = Web([this._sp.web, this.state.siteUrl]);
      const list = web.lists.getById(listNameorListId);
      const listCTTypes: IContentTypeInfo[] = await list.contentTypes();

      for await (var currentCTType of listCTTypes) {
        var id = currentCTType.Id.StringValue.toString();
        ctTypes.push({ key: id, text: currentCTType.Name });
      }
      this.setState({ contentTypes: ctTypes });
    }
    catch (err) {
      Logger.write(`${this.LOG_SOURCE} (_getContentTypes) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }

  }

  private CTTypeChanged(ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
    this.setState({ selectedContnetType: item.key ? item.key.toString() : "" })
  }


  private reloadWebpart = (): void => {
    this.setState({
      sites: [],
      siteUrl: "",
      errors: [],
      contentTypes: [],
      NewForm: false,
      EditForm: false,
      ViewForm: false,
      disabled: false,
      selectedContnetType: null,
      selectedList: null,
      clientComponentID: "",
      isCalloutVisible: false,
      chkCustomSiteUrl: false,
      //userMessage: "",
      //hideDialog: true,
    });
  }

  private async addFormCustomizer() {
    var isValid = this.validedFormFields();

    try {

      if (isValid) {

        var result = await this.addremoveFormCustomizer("add");
        if (!result.ok) {
          Logger.write(`Could not update content type - ${this.LOG_SOURCE}`, LogLevel.Error);
          return false;
        }
        else {
          //alert("Associated the form customiser with the selected list");
          //this.dialogContentProps.subText = "Associated the form customiser with the selected list.";
          this.setState({
            hideDialog: false,
            userMessage: "Associated the form customiser with the selected list."
          });
          //Modal dialog
          this.reloadWebpart();
        }

      }
      else {
        //alert("Enter all the required fields");
        // this.dialogContentProps.subText = "Enter all the required fields.";
        this.setState({
          hideDialog: false,
          userMessage: "Enter all the required fields."
        });
      }
    }
    catch (err) {
      Logger.write(`${this.LOG_SOURCE} (addFormCustomizer) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }
  private validedFormFields() {
    var isFormValid = false;

    if ((this.state.siteUrl && this.state.selectedList && this.state.clientComponentID &&
      this.state.selectedContnetType) &&
      (this.state.NewForm || this.state.EditForm || this.state.ViewForm)) {
      isFormValid = true;
    }

    return isFormValid;
  }

  private async removeFormCustomizer() {
    var isValid = this.validedFormFields();
    try {

      if (isValid) {

        var result = await this.addremoveFormCustomizer("remove");
        if (!result.ok) {
          Logger.write(`Could not update content type - ${this.LOG_SOURCE}`, LogLevel.Error);
          return false;
        }
        else {
          //alert("Removed the associated form customiser from the selected list");
          // this.dialogContentProps.subText = "Removed the associated form customiser from the selected list.";
          this.setState({
            hideDialog: false,
            userMessage: "Removed the associated form customiser from the selected list."
          });
          this.reloadWebpart();
        }

      }
      else {
        // alert("Enter all the required fields");
        //this.dialogContentProps.subText = "Enter all the required fields.";
        this.setState({
          hideDialog: false,
          userMessage: "Enter all the required fields."
        });
      }
    }
    catch (err) {
      Logger.write(`${this.LOG_SOURCE} (addFormCustomizer) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }

  private async addremoveFormCustomizer(addorremove: string) {
    const web = Web([this._sp.web, this.state.siteUrl]);
    //conext
    const ctUrl = await web.lists.getById(this.state.selectedList).contentTypes.getById(this.state.selectedContnetType).toUrl();
    let bodyObject = {};

    if (this.state.NewForm) {
      addorremove == "add" ? bodyObject["NewFormClientSideComponentId"] = this.state.clientComponentID : bodyObject["NewFormClientSideComponentId"] = "";
    }
    if (this.state.EditForm) {
      addorremove == "add" ? bodyObject["EditFormClientSideComponentId"] = this.state.clientComponentID : bodyObject["EditFormClientSideComponentId"] = "";
    }
    if (this.state.ViewForm) {
      addorremove == "add" ? bodyObject["DisplayFormClientSideComponentId"] = this.state.clientComponentID : bodyObject["DisplayFormClientSideComponentId"] = "";
    }

    let result: SPHttpClientResponse = null;
    result = await this.props.context.spHttpClient.fetch(`${ctUrl}`, SPHttpClient.configurations.v1, {
      method: "PATCH",
      body: JSON.stringify(bodyObject)
    });
    return result;

  }



  private onCustomSiteUrlChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
    this.setState({ chkCustomSiteUrl: isChecked });
  }

  private onNewFormChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
    this.setState({ NewForm: isChecked });
  }
  private onEditFormChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
    this.setState({ EditForm: isChecked });
  }

  private onViewFormChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
    this.setState({ ViewForm: isChecked });
  }

}





