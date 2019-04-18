// João Mendes
import * as React from 'react';
import styles from '../../webparts/siteDesigns/components/SiteDesigns.module.scss';
import { IAddPrincipalProps } from './IAddPrincipalProps';
import { escape } from '@microsoft/sp-lodash-subset';
import spservice from '../../services/spservices';
import * as strings from 'SiteDesignsWebPartStrings';
import { IAddPrincipalState } from './IAddPrincipalState';
import { SiteScriptInfo, SiteScriptUpdateInfo, SiteDesignInfo, SiteDesignPrincipals } from '@pnp/sp';
import {
  Panel,
  PanelType,
  TextField,
  Toggle,
  IPersonaProps,
  DialogFooter,
  PrimaryButton, DefaultButton,
  Spinner, SpinnerSize,
  MessageBar, MessageBarType
} from 'office-ui-fabric-react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

export default class AddPrincipal extends React.Component<IAddPrincipalProps, IAddPrincipalState> {
  private spService: spservice;
  private selectedUsers: IPersonaProps[] = [];
  public constructor(props) {
    super(props);
    // Init class services
    this.spService = new spservice(this.props.context);
    // Register event handlers

    this.onCancel = this.onCancel.bind(this);
    this.getPeoplePickerItems = this.getPeoplePickerItems.bind(this);
    this.onSave = this.onSave.bind(this);

    this.state = ({
      isLoading: false,
      readOnly: true,
      showPanel: false,
      siteDesignInfo: this.props.siteDesignInfo,
      showError: false,
      errorMessage: '',
      disableSaveButton: true,
      saving: false,

    });
  }

  /**
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberofEditSiteDesign
   */
  private onCancel(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    this.props.onDismiss();
  }

  /**
   *   Save SiteDesign Event
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof EditSiteDesign
   */
  private async onSave(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();

    const principals: string[] = [];

    for (const user of this.selectedUsers){
      principals.push(user.secondaryText);
    }
    // read SiteScript
    try {
      this.setState({ saving: true, disableSaveButton: true });
      const result = await this.spService.grantSiteDesignRights(this.props.siteDesignInfo.Id, principals);

      this.props.onDismiss(true);
    } catch (error) {
      console.log(error.message);
      this.setState({ saving: false, disableSaveButton: true, showError: true, errorMessage: error.message });
    }

  }

  private getPeoplePickerItems(items: any[]) {
    this.selectedUsers = items;
    this.setState({ showError:false, errorMessage:'', disableSaveButton: this.selectedUsers.length > 0 ? false : true });

  }
  // Component Did Mount
  /**
   *
   * @memberof EditSiteDesign
   */
  public async  componentDidMount() {
    //
  }

  /**
   * On Render
   *
   * @returns {React.ReactElement<IAddSiteDesignProps>}
   * @memberof EditSiteDesign
   */
  public render(): React.ReactElement<IAddPrincipalProps> {

    return (
      <div className={styles.siteDesigns}>
        <Panel isOpen={this.props.showPanel}
          onDismiss={this.onCancel}
          type={PanelType.custom}
          customWidth={"480px"}
          headerText="Add Principals">
          <TextField
            label={strings.SiteDesignIdLabel}
            readOnly={this.state.readOnly}
            value={this.state.siteDesignInfo ? this.state.siteDesignInfo.Id : ''}
            style={{ backgroundColor: "#f8f8f8" }}
          />

          <TextField
            label={strings.AddSiteDesignTitleLabel}
            readOnly={this.state.readOnly}
            value={this.state.siteDesignInfo ? this.state.siteDesignInfo.Title : ''}
            style={{ backgroundColor: "#f8f8f8" }}
          />
          <TextField
            label={strings.AddSiteDesignDescriptionLabel}
            readOnly={this.state.readOnly}
            value={this.state.siteDesignInfo ? this.state.siteDesignInfo.Description : ''}
            multiline
            style={{ backgroundColor: "#f8f8f8" }}
          />
          <Toggle
            defaultChecked={this.props.siteDesignInfo.IsDefault}
            label={strings.AddSiteDesignIsDefaultLabel}
            onText="On"
            offText="Off"
            disabled
          />
          <br />

          <PeoplePicker
            context={this.props.context}
            titleText="Add Users"
            personSelectionLimit={3}
            groupName={""} // Leave this blank in case you want to filter from all users
            showtooltip={true}
            isRequired={true}
            selectedItems={this.getPeoplePickerItems}
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000} />
          <br />
          <DialogFooter>
            {
              this.state.saving &&
              <div style={{ display: "inline-block", marginRight: '10px', verticalAlign: 'middle' }}>
                <Spinner size={SpinnerSize.small} ariaLive="assertive" />
              </div>
            }
            <PrimaryButton onClick={this.onSave} text={strings.AddPrincipalPanelButtonSaveText} disabled={this.state.disableSaveButton} />
            <DefaultButton onClick={this.onCancel} text={strings.AddPrincipalPanelButtonCancelText} />
          </DialogFooter>
          {
            this.state.showError &&
            <div style={{ marginTop: '15px' }}>
              <MessageBar messageBarType={MessageBarType.error} >
                <span>{this.state.errorMessage}</span>
              </MessageBar>
            </div>
          }
        </Panel>
      </div>
    );
  }

}
