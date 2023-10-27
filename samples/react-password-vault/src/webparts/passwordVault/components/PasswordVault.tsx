import * as React from 'react';
import styles from './PasswordVault.module.scss';
import { SPFxAppDevWebPartComponent, ISPFxAppDevWebPartComponentProps } from '@spfxappdev/framework';
import PasswordVaultWebPart from '../PasswordVaultWebPart';
import { IPasswordVaultService } from '@src/services/PasswordVaultService';
import { Dialog, DefaultButton, IconButton, MessageBar, MessageBarType, PrimaryButton, TextField, CommandBar, ICommandBarItemProps, DialogFooter, DialogType } from 'office-ui-fabric-react';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import * as strings from 'PasswordVaultWebPartStrings';
import AddNewModule from './AddNewModule';
import { IModule, ModuleType } from '@src/models';
import { Guid } from '@microsoft/sp-core-library';
import UserField from './UserField';
import PasswordField from './PasswordField';
import NoteField from './NoteField';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import '@spfxappdev/utility/lib/extensions/ArrayExtensions';

interface IPasswordVaultState {
  isVaultOpen: boolean;
  showWrongMasterInfo: boolean;
  isSaveButtonDisabled: boolean;
  modules: IModule[];
  showChangePasswordDialog: boolean;
}

export interface IPasswordVaultProps extends ISPFxAppDevWebPartComponentProps<PasswordVaultWebPart> {
  passwordVaultService: IPasswordVaultService;
  masterPW?: string;
  onTitleChanged?(value: string): void;
  onVaultDataChanged?(encryptedMaster: string, modules: IModule[]): void;
  onVaultPasswordChanged?(encryptedMaster: string): void;
  modules?: IModule[];
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
    isSaveButtonDisabled: this.helper.functions.isNullOrEmpty(this.props.masterPW),
    modules: cloneDeep(this.props.modules),
    showChangePasswordDialog: false
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

  private repeatedEnteredMasterPW: string = "";

  private encryptedModuleData: Record<string, string> = {};

  private decryptedModuleData: Record<string, string> = {};

  private isNewVault: boolean = true;

  private currentMasterPW: string = "";

  constructor(props: IPasswordVaultProps) {
    super(props);

    props.modules.forEach((module: IModule) => {
      this.encryptedModuleData[module.id] = module.data;
      this.decryptedModuleData[module.id] = this.props.passwordVaultService.decryptModuleData(module.type, module.data);
    });

    this.currentMasterPW = props.masterPW;
    this.isNewVault = this.helper.functions.isNullOrEmpty(props.masterPW);
  }

  public componentDidUpdate(prevProps: Readonly<IPasswordVaultProps>, prevState: Readonly<IPasswordVaultState>, snapshot?: any): void {
    if(prevProps.masterPW !== this.props.masterPW) {
      this.currentMasterPW = this.props.masterPW;
    }
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
    

    return (
      <>
        {this.helper.functions.isNullOrEmpty(this.currentMasterPW) && 
        <MessageBar messageBarType={MessageBarType.info}>
          {strings.NoMasterPasswordSetLabel}
        </MessageBar>
        }

        {this.renderOpenVaultForm()}

        {this.state.isVaultOpen &&
        <div className='spfxappdev-grid'>

          {this.state.modules.map((module: IModule, index: number): JSX.Element => {
            return this.renderModuleDisplayMode(module, index);
          })}

          <div className="spfxappdev-grid-row grid-footer">
            <div className="spfxappdev-grid-col spfxappdev-sm12">
            {!this.helper.functions.isNullOrEmpty(this.currentMasterPW) &&
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
    const showForm: boolean = this.state.isVaultOpen;

    return (
      <>
        {this.renderOpenVaultForm()}

        {showForm &&
        <>

        {this.renderCommandBarButtons()}
        {this.renderChangePasswordDialog()}

        {this.isNewVault &&
          <MessageBar messageBarType={MessageBarType.warning}>
            {strings.DontLoseMasterpasswordLabel}
          </MessageBar>
        }
        <div className='spfxappdev-grid'>
          {this.isNewVault && this.renderMasterPasswordControls()}

          {this.state.modules.map((module: IModule, index: number): JSX.Element => {
              return this.renderModuleEditMode(module, index);
          })}

          <div className={"spfxappdev-grid-row"}>
            <AddNewModule onModuleSelected={(module: ModuleType) => {
              this.onAddNewModule(module, this.state.modules.length + 1);
            }} />
          </div>

           
          <div className="spfxappdev-grid-row grid-footer">
            <div className="spfxappdev-grid-col spfxappdev-sm12">
              <PrimaryButton disabled={this.state.isSaveButtonDisabled} onClick={() => {
                  this.onSaveButtonClick();
                }}>
                  {strings.SaveLabel}
              </PrimaryButton>

              {!this.helper.functions.isNullOrEmpty(this.currentMasterPW) &&
              <DefaultButton onClick={() => {
                  this.closeVault();
                }}>
                {strings.CloseVaultLabel}
              </DefaultButton>
              }
            </div>
          </div>
        </div>
        </>
        }
      </>
    );
  }

  private renderModuleEditMode(module: IModule, index: number): JSX.Element {
    return(
      <>
      <div className={"spfxappdev-grid-row"} key={module.id + '_addNewModuleContainer'}>
            <AddNewModule onModuleSelected={(module: ModuleType) => {
              this.onAddNewModule(module, index);
            }} />
      </div>
      <div className="spfxappdev-grid-row" key={module.id}>
      <div className="spfxappdev-grid-col spfxappdev-sm12">
        <div className={styles["edit-container"]}>
            <div className={styles["edit-container--header"]}>
              <IconButton 
                className={styles["delete-btn"]} 
                iconProps={{ iconName: "Delete"}} 
                title={strings.DeleteModuleLabel}
                onClick={() => {
                  this.onDeleteModule(index);
                }}
               />

              <IconButton 
                iconProps={{ iconName: "Up"}} 
                title={strings.MoveUpLabel} 
                disabled={this.state.modules.length === 1 || index === 0} 
                onClick={() => {
                  this.onMoveUp(index);
                }}
              />

              <IconButton 
                iconProps={{ iconName: "Down"}} 
                title={strings.MoveDownLabel} 
                disabled={this.state.modules.length === 1 || this.state.modules.length - 1 === index} 
                onClick={() => {
                  this.onMoveDown(index);
                }}
              />
            </div>

            <div className={styles["edit-container--content"]}>
          
              {module.type === ModuleType.UserField && 
                <UserField defaultValue={this.decryptedModuleData[module.id]} tabIndex={index} onChange={(newVal: string) => {
                  this.decryptedModuleData[module.id] = newVal;
                }} isDisplayMode={false} />
              }

              {module.type === ModuleType.PasswordField &&
                <PasswordField defaultValue={this.decryptedModuleData[module.id]} tabIndex={index} onChange={(newVal: string) => {
                  this.decryptedModuleData[module.id] = newVal;
                }} isDisplayMode={false} />
              }

              {module.type === ModuleType.NoteField &&
                <NoteField defaultValue={this.decryptedModuleData[module.id]} onChange={(newVal: string) => {

                    this.decryptedModuleData[module.id] = newVal;

                    return newVal;
                }} isDisplayMode={false} />
              }
            </div>
        </div>
      </div>
      </div>
      </>
      );
  }

  private renderModuleDisplayMode(module: IModule, index: number): JSX.Element {
    return(
      <>
      <div className="spfxappdev-grid-row" key={module.id}>
      <div className="spfxappdev-grid-col spfxappdev-sm12">
        {module.type === ModuleType.UserField && 
          <UserField defaultValue={this.decryptedModuleData[module.id]} isDisplayMode={true} tabIndex={index} />
        }

        {module.type === ModuleType.PasswordField &&
          <PasswordField defaultValue={this.decryptedModuleData[module.id]} isDisplayMode={true} tabIndex={index} />
        }

        {module.type === ModuleType.NoteField &&
          <NoteField defaultValue={this.decryptedModuleData[module.id]} isDisplayMode={true} />
        }
      </div>
      </div>
      </>
      );
  }

  private renderOpenVaultForm(): JSX.Element {

    if(this.helper.functions.isNullOrEmpty(this.currentMasterPW)) {
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
                  onKeyUp={(ev: React.KeyboardEvent<HTMLInputElement>) => {
                    if(ev.keyCode === 13) {
                      this.onOpenVault();
                    }
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

  private renderMasterPasswordControls(): JSX.Element {
    return (
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
            });
          }}
        />
      </div>

      <div className="spfxappdev-grid-col spfxappdev-sm12">
        <TextField
          label={strings.RepeatMasterPasswordLabel}
          type="password"
          required={this.isNewVault}
          canRevealPassword={true}
          onChange={(ev: any, newValue: string) => {
            this.repeatedEnteredMasterPW = newValue;
            this.setState({
              isSaveButtonDisabled: this.isSaveButtonDisabled()
            });
          }}
        />
      </div>
    </div>);
  }

  private renderChangePasswordDialog(): JSX.Element {
    return (
      <Dialog 
        hidden={!this.state.showChangePasswordDialog}
        dialogContentProps={{
          title: strings.ChangeMasterPasswordDialogTitle,
          type: DialogType.normal,
        }}
        onDismiss={() => { this.toggleChangePasswordDialogVisibility(); }}
        >

        <MessageBar messageBarType={MessageBarType.warning}>
            {strings.DontLoseMasterpasswordLabel}
        </MessageBar>

        {this.renderMasterPasswordControls()}

        <DialogFooter>
          <PrimaryButton 
            disabled={this.state.isSaveButtonDisabled}
            onClick={() => { this.onChangePasswordClick(); }} 
            text={strings.SaveLabel} />
          <DefaultButton onClick={() => { this.toggleChangePasswordDialogVisibility(); }} text={strings.CancelLabel} />
        </DialogFooter>
      </Dialog>
    );
  }

  private renderCommandBarButtons(): JSX.Element {
    const buttons: ICommandBarItemProps[] = [];

    const saveButton: ICommandBarItemProps = {
      key: 'saveSettings',
      text: strings.SaveLabel,
      disabled: this.isSaveButtonDisabled(),
      iconProps: { iconName: 'Save' },
      onClick: () => {
        this.onSaveButtonClick();
      }
    }

    buttons.push(saveButton);

    if(!this.isNewVault) {
      const changeMasterPwButton: ICommandBarItemProps = {
        key: 'changeMasterPassword',
        text: strings.ChangeMasterPasswordButtonText,
        iconProps: { iconName: 'PasswordField' },
        onClick: () => {
          this.toggleChangePasswordDialogVisibility();
        },
      }

      buttons.push(changeMasterPwButton);
    }

    if(!this.helper.functions.isNullOrEmpty(this.currentMasterPW)) {
      const closeButton: ICommandBarItemProps = {
        key: 'closeVault',
        text: strings.CloseVaultLabel,
        iconProps: { iconName: 'Lock' },
        onClick: () => {
          this.closeVault();
        }
      }
  
      buttons.push(closeButton);
    }

    return (
      <CommandBar
        items={buttons}
      />
    );
  }

  private isSaveButtonDisabled(): boolean {
    if((this.isNewVault || this.state.showChangePasswordDialog) && this.helper.functions.isNullOrEmpty(this.enteredMasterPW)) {
      return true;
    }

    if(!this.enteredMasterPW.Equals(this.repeatedEnteredMasterPW, false)) {
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
    const isCorrectPW = props.passwordVaultService.open(this.enteredMasterPW, this.currentMasterPW);
    this.enteredMasterPW = "";

    if(isCorrectPW) {
      this.state.modules.forEach((module: IModule) => {
        this.decryptedModuleData[module.id] = this.props.passwordVaultService.decryptModuleData(module.type, module.data);
      });
    }

    this.setState({
      isVaultOpen: isCorrectPW,
      showWrongMasterInfo: !isCorrectPW
    });
  }

  private onAddNewModule(moduleType: ModuleType, index: number): void {

    const module: IModule = {
      id: Guid.newGuid().toString(),
      type: moduleType,
      data: ''
    };

    this.state.modules.AddAt(index, module);
    this.decryptedModuleData[module.id] = module.data;
    this.encryptedModuleData[module.id] = module.data;


    // this.state.modules.push(module);

    this.setState({
      modules: this.state.modules
    });
  }

  private onDeleteModule(index: number): void {

    this.state.modules.RemoveAt(index);

    this.setState({
      modules: this.state.modules
    });
  }

  private onMoveUp(index: number): void {

    const prevModule: IModule = this.state.modules[index-1];
    this.state.modules[index-1] = this.state.modules[index];
    this.state.modules[index] = prevModule;


    this.setState({
      modules: this.state.modules
    });
  }

  private onMoveDown(index: number): void {

    this.state.modules.RemoveAt(index);

    this.setState({
      modules: this.state.modules
    });
  }

  private onSaveButtonClick(): void {
    this.isNewVault = false;
    let encryptedMaster = this.currentMasterPW;

    if(!this.enteredMasterPW.IsEmpty()) {
      encryptedMaster = this.props.passwordVaultService.setMasterPassword(this.enteredMasterPW);
      this.currentMasterPW = encryptedMaster;
    }

    const encryptedModules: IModule[] = [];
    this.state.modules.forEach((module: IModule) => {
        const encryptedValue: string = this.props.passwordVaultService.encryptModuleData(module.type, this.decryptedModuleData[module.id]);

        encryptedModules.push({
          id: module.id,
          data: encryptedValue,
          type: module.type
        });
    });

    this.props.onVaultDataChanged(encryptedMaster, encryptedModules);

    this.setState({
      modules: encryptedModules
    });

    this.enteredMasterPW = '';
    this.repeatedEnteredMasterPW = '';
  }

  private onChangePasswordClick(): void {
    let encryptedMaster = this.currentMasterPW;

    if(!this.enteredMasterPW.IsEmpty()) {
      encryptedMaster = this.props.passwordVaultService.setMasterPassword(this.enteredMasterPW);
      this.currentMasterPW = encryptedMaster;
      this.props.onVaultPasswordChanged(encryptedMaster);
    }

    this.enteredMasterPW = '';
    this.repeatedEnteredMasterPW = '';
    this.toggleChangePasswordDialogVisibility();
  }

  private toggleChangePasswordDialogVisibility(): void {
    this.setState({
      showChangePasswordDialog: !this.state.showChangePasswordDialog,
      isSaveButtonDisabled: !this.state.showChangePasswordDialog
    });
  } 
}