import * as React from 'react';
import styles from './PasswordVault.module.scss';
import { SPFxAppDevWebPartComponent, ISPFxAppDevWebPartComponentProps } from '@spfxappdev/framework';
import PasswordVaultWebPart from '../PasswordVaultWebPart';
import { IPasswordVaultService } from '@src/services/PasswordVaultService';
import { DefaultButton, Icon, Label, MessageBar, MessageBarType, PrimaryButton, TextField } from 'office-ui-fabric-react';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { IVaultData } from '@src/interfaces/IVaultData';
import * as strings from 'PasswordVaultWebPartStrings';

interface IPasswordVaultState {
  isVaultOpen: boolean;
  showWrongMasterInfo: boolean;
  isSaveButtonDisabled: boolean;
}

export interface IPasswordVaultProps extends ISPFxAppDevWebPartComponentProps<PasswordVaultWebPart> {
  passwordVaultService: IPasswordVaultService;
  masterPW?: string;
  username?: string;
  password?: string;
  note?: string;
  onTitleChanged?(value: string): void;
  onVaultDataChanged?(vaultData: IVaultData): void;
}

export default class PasswordVault extends SPFxAppDevWebPartComponent<PasswordVaultWebPart, IPasswordVaultProps, IPasswordVaultState> {
  
  public static defaultProps: IPasswordVaultProps = {
    Title: "",
    WebPart: null,
    passwordVaultService: null
  };
  
  public state: IPasswordVaultState = {
    isVaultOpen: this.isVaultOpen,
    showWrongMasterInfo: false,
    isSaveButtonDisabled: this.helper.functions.isNullOrEmpty(this.props.masterPW)
  };

  private get isVaultOpen(): boolean {

    let showForm: boolean = false;

    if(this.WebPart.IsPageInEditMode) {
      showForm = this.helper.functions.isNullOrEmpty(this.props.masterPW);
    }

    return  showForm || 
    (!this.helper.functions.isNullOrEmpty(this.props.masterPW) &&
    this.props.passwordVaultService.isOpen());
  }

  private enteredMasterPW: string = "";

  private encryptedData: IVaultData = null;

  private decryptedData: IVaultData = null;

  private isNewVault: boolean = true;

  private editModeNote: string;

  private editModePw: string;

  private editModeUsername: string;

  constructor(props: IPasswordVaultProps) {
    super(props);
    this.encryptedData = {
      masterPW: props.masterPW,
      username: props.username,
      password: props.password,
      note: props.note
    };

    this.decryptedData = this.props.passwordVaultService.decryptData(this.encryptedData);
    this.isNewVault = this.helper.functions.isNullOrEmpty(props.masterPW);
  }

  public render(): React.ReactElement<IPasswordVaultProps> {
    return (
      <div className={styles.passwordVault}>
        <WebPartTitle displayMode={this.WebPart.displayMode}
                title={this.props.Title}
                updateProperty={(title: string) => {
                  if(this.helper.functions.isFunction(this.props.onTitleChanged)) {
                    this.props.onTitleChanged(title);
                  }
                }} />
        {this.props.WebPart.IsPageInEditMode && 
        this.renderEditMode()}

        {!this.props.WebPart.IsPageInEditMode && 
        this.renderDisplayMode()}
      </div>
    );
  }

  private renderDisplayMode(): JSX.Element {
    const props: IPasswordVaultProps = this.props;
    const showCopyToClipboard: boolean = this.helper.functions.issetDeep(window, "navigator.clipboard.writeText");

    return (
      <>
        {this.helper.functions.isNullOrEmpty(props.masterPW) && 
        <MessageBar messageBarType={MessageBarType.info}>
          {strings.NoMasterPasswordSetLabel}
        </MessageBar>
        }

        {this.renderOpenVaultForm()}

        {this.state.isVaultOpen &&
        <div className='spfxappdev-grid'>
            {!this.helper.functions.isNullOrEmpty(this.decryptedData.username) &&
              <div className="spfxappdev-grid-row">
                <div className="spfxappdev-grid-col spfxappdev-sm12">
                  <TextField
                    label={strings.UsernameLabel}
                    disabled={true}
                    defaultValue={this.decryptedData.username}
                    onRenderSuffix={() => {

                      if(!showCopyToClipboard) {
                        return <></>;
                      }

                      return <Icon iconName={"Copy"} className="copy-icon" onClick={() => { this.copyToClipboard(this.decryptedData.username); }} /> 
                    }}
                  />
                </div>
              </div>
            }

            {!this.helper.functions.isNullOrEmpty(this.decryptedData.password) && 
            <div className="spfxappdev-grid-row">
              <div className="spfxappdev-grid-col spfxappdev-sm12">
                <TextField
                  label={strings.PasswordLabel}
                  type="password"
                  disabled={true}
                  canRevealPassword={true}
                  defaultValue={this.decryptedData.password}
                  onRenderSuffix={() => {
                    
                    if(!showCopyToClipboard) {
                      return <></>;
                    }

                    return <Icon iconName={"Copy"} className="copy-icon" onClick={() => { this.copyToClipboard(this.decryptedData.password); }} /> 
                  }}
                />
              </div>
            </div>
            }

            {!this.helper.functions.isNullOrEmpty(this.decryptedData.note) && 
            <>
            <Label>{strings.NoteLabel}</Label>
            <RichText
              isEditMode={false}
              value={this.decryptedData.note}
            />
            </>
            }

          <div className="spfxappdev-grid-row grid-footer">
            <div className="spfxappdev-grid-col spfxappdev-sm12">
            {!this.helper.functions.isNullOrEmpty(this.props.masterPW) &&
              <DefaultButton onClick={() => {
                  this.closeVault();
                }}>
                {strings.CloseVaultLabel}
              </DefaultButton>
              }
            </div>
          </div>
        </div>
        }
      </>
    );
  }

  private renderEditMode(): JSX.Element {
    const wp: PasswordVaultWebPart = this.WebPart;

    const showForm: boolean = this.state.isVaultOpen;

    return (
      <>
        {this.renderOpenVaultForm()}

        {showForm &&
        <div className='spfxappdev-grid'>
          <div className="spfxappdev-grid-row">
            <div className="spfxappdev-grid-col spfxappdev-sm12">
              <TextField
                label={this.isNewVault ? strings.SetMasterPasswordLabel : strings.ChangeMasterPasswordLabel}
                type="password"
                required={this.isNewVault}
                canRevealPassword={true}
                onChange={(ev: any, newValue: string) => {
                  this.enteredMasterPW = newValue;
                  this.setState({
                    isSaveButtonDisabled: this.isSaveButtonDisabled()
                  })
                }}
              />
            </div>
          </div>

          <div className="spfxappdev-grid-row">
            <div className="spfxappdev-grid-col spfxappdev-sm12">
              <TextField
                label={strings.UsernameLabel}
                type="text"
                onChange={(ev: any, newValue: string) => {
                  this.editModeUsername = newValue;
                  this.setState({
                    isSaveButtonDisabled: this.isSaveButtonDisabled()
                  });
                }}
                defaultValue={this.decryptedData.username}
              />
            </div>
          </div>

          <div className="spfxappdev-grid-row">
            <div className="spfxappdev-grid-col spfxappdev-sm12">
              <TextField
                label={strings.PasswordLabel}
                type="password"
                canRevealPassword={true}
                onChange={(ev: any, newValue: string) => {
                  this.editModePw = newValue;
                  this.setState({
                    isSaveButtonDisabled: this.isSaveButtonDisabled()
                  });
                }}
                defaultValue={this.decryptedData.password}
              />
            </div>
          </div>

          <div className="spfxappdev-grid-row">
            <div className="spfxappdev-grid-col spfxappdev-sm12">
              <Label>{strings.NoteLabel}</Label>
              <RichText
                isEditMode={wp.IsPageInEditMode}
                value={this.decryptedData.note}
                onChange={(note: string): string => {
                  this.editModeNote = note;
                  this.decryptedData.note = note;
                  this.setState({
                    isSaveButtonDisabled: this.isSaveButtonDisabled()
                  });

                  return note;
                }}
              />
            </div>
          </div>

           
          <div className="spfxappdev-grid-row grid-footer">
            <div className="spfxappdev-grid-col spfxappdev-sm12">
              <PrimaryButton disabled={this.state.isSaveButtonDisabled} onClick={() => {
                  this.isNewVault = false;
                  let encryptedMaster = this.props.masterPW;
                  if(!this.enteredMasterPW.IsEmpty()) {
                    encryptedMaster = this.props.passwordVaultService.setMasterPassword(this.enteredMasterPW);
                  }

                  this.encryptedData = this.props.passwordVaultService.encryptData({
                    masterPW: encryptedMaster,
                    note: this.editModeNote,
                    password: this.editModePw,
                    username: this.editModeUsername
                  });

                  this.decryptedData = this.props.passwordVaultService.decryptData(this.encryptedData);

                  this.props.onVaultDataChanged(this.encryptedData);
                  
                }}>
                  {strings.SaveLabel}
              </PrimaryButton>

              {!this.helper.functions.isNullOrEmpty(this.props.masterPW) &&
              <DefaultButton onClick={() => {
                  this.closeVault();
                }}>
                {strings.CloseVaultLabel}
              </DefaultButton>
              }
            </div>
          </div>
        </div>
        }
      </>
    );
  }

  private renderOpenVaultForm(): JSX.Element {

    if(this.helper.functions.isNullOrEmpty(this.props.masterPW)) {
      return (<></>);
    }

    return (<>
    {!this.state.isVaultOpen &&
          <>

        {this.state.showWrongMasterInfo && 
        <MessageBar messageBarType={MessageBarType.error}>
          {strings.WrongPasswordLabel}
        </MessageBar>
        }
          <div className='spfxappdev-grid'>
            <div className="spfxappdev-grid-row">
              <div className="spfxappdev-grid-col spfxappdev-sm12">
                <TextField
                  label={strings.MasterPasswordLabel}
                  type="password"
                  canRevealPassword={true}
                  onChange={(ev: any, newValue: string) => {
                    this.enteredMasterPW = newValue;
                  }}
                />
              </div>
            </div>

            <div className="spfxappdev-grid-row grid-footer">
              <div className="spfxappdev-grid-col spfxappdev-sm12">
                <PrimaryButton onClick={() => {
                  
                  this.onOpenVault();
                  
                }}>
                  {strings.OpenVaultLabel}
                </PrimaryButton>
              </div>
            </div>
          </div>
          </>
        }
    </>);
  }

  private isSaveButtonDisabled(): boolean {
    if(this.isNewVault && this.helper.functions.isNullOrEmpty(this.enteredMasterPW)) {
      return true;
    }

    return false;
  }

  private closeVault(): void {
    this.props.passwordVaultService.close();
    this.setState({
      isVaultOpen: false,
      showWrongMasterInfo: false
    });
    
  }

  private onOpenVault(): void {
    const props: IPasswordVaultProps = this.props;
    const isCorrectPW = props.passwordVaultService.open(this.enteredMasterPW, props.masterPW);
    this.enteredMasterPW = "";

    if(isCorrectPW) {
      this.decryptedData = props.passwordVaultService.decryptData(this.encryptedData);
    }

    this.editModeNote = this.decryptedData.note;
    this.editModePw = this.decryptedData.password;
    this.editModeUsername = this.decryptedData.username;

    this.setState({
      isVaultOpen: isCorrectPW,
      showWrongMasterInfo: !isCorrectPW
    });
  }

  private copyToClipboard(text: string): void {
    window.navigator.clipboard.writeText(text);
  }
}