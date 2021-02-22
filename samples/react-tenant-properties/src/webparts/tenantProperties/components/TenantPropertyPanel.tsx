// João Mendes
// Mar 2019
import * as React from 'react';
import styles from './TenantProperties.module.scss';
import { ITenantPropertyPanelProps, panelMode } from './ITenantPropertyPanelProps';
import { ITenantPropertyPanelSate } from './ITenantPropertyPanelState';
import { escape } from '@microsoft/sp-lodash-subset';
import spservice from '../../../services/spservices';

import * as strings from 'TenantPropertiesWebPartStrings';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';


// Display Tenant Property Panel Component
export default class TenantPropertyPanel extends React.Component<ITenantPropertyPanelProps, ITenantPropertyPanelSate> {
  private spService: spservice;
  public constructor(props) {
    super(props);
    this.state = ({
      showPanel: false,
      readOnly: true,
      visible: true,
      multiline: true,
      primaryButtonLabel: strings.PrimaryButtonLabelSave,
      disableButton: true,
      tenantProperty: null,
      errorMessage: ''
    });
    // Init class services
    this.spService = new spservice(this.props.context);
    this.onGetErrorMessageKey = this.onGetErrorMessageKey.bind(this);
    this.onGetErrorMessageValue = this.onGetErrorMessageValue.bind(this);
    this.onGetErrorMessageDescription = this.onGetErrorMessageDescription.bind(this);
    this.onGetErrorMessageComment = this.onGetErrorMessageComment.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChanged = this.onChanged.bind(this);
  }
  // Cancel Panel
  private onCancel(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    this.props.onDismiss();
  }

  // On Save / Delete
  private async onSave(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    switch (this.props.mode) {
       // add Tenant Property
      case (panelMode.New):
        try{
          const result = await this.spService.setTenantProperty({
            key: this.state.tenantProperty.key,
            Value:this.state.tenantProperty.tenantPropertyValue,
            Description: this.state.tenantProperty.tenantPropertyDescription,
            Comment: this.state.tenantProperty.tenantPropertyComment
          });
          if (result) {
            this.props.onDismiss(null, true);
          }
        }catch(error){
          this.setState({errorMessage:error});
        }
        break;
        //  edit Tenant Property
        case (panelMode.edit):
        try{
          const result = await this.spService.setTenantProperty({
            key: this.state.tenantProperty.key,
            Value:this.state.tenantProperty.tenantPropertyValue,
            Description: this.state.tenantProperty.tenantPropertyDescription,
            Comment: this.state.tenantProperty.tenantPropertyComment
          });
          if (result) {
            this.props.onDismiss(null, true);
          }
        }catch(error){
          this.setState({errorMessage:error});
        }
        break;
        // Remove Tenant Property
        case (panelMode.Delete):
        try{
          const result = await this.spService.removeTenantProperty({
            key: this.state.tenantProperty.key,
            Value:this.state.tenantProperty.tenantPropertyValue,
            Description: this.state.tenantProperty.tenantPropertyDescription,
            Comment: this.state.tenantProperty.tenantPropertyComment
          });
          if (result) {
            this.props.onDismiss(null, true);
          }
        }catch(error){
          this.setState({errorMessage:error});
        }
        break;
      default:
        break;
    }
  }
  // Validate Key
  private async onGetErrorMessageKey(value: string) {
    const _tenantProperty = this.state.tenantProperty;
    let returnvalue: string = '';
    if (value.trim().length > 0) {
      _tenantProperty.key = value;
      const tenantPropertyExist: boolean = await this.spService.checkTenantProperty(_tenantProperty.key);
      if (tenantPropertyExist && this.props.mode === panelMode.New) {
        returnvalue = strings.messageTenantExist;
        this.setState({ disableButton: true, tenantProperty: _tenantProperty });
      } else {
        returnvalue = '';
        this.setState({tenantProperty: _tenantProperty });
      }
    } else {
      _tenantProperty.key = value;
      this.setState({ disableButton: true, tenantProperty: _tenantProperty });
    }
    return returnvalue;
  }

  // Validate Value
  private onGetErrorMessageValue(value: string) {
    let returnvalue: string = '';
    const _tenantProperty = this.state.tenantProperty;
    if (value.trim().length > 0) {
      _tenantProperty.tenantPropertyValue = value;
      this.setState({ disableButton: false, tenantProperty: _tenantProperty });
    } else {
      _tenantProperty.tenantPropertyValue = value;
      this.setState({ disableButton: true, tenantProperty: _tenantProperty });
    }
    return returnvalue;
  }

  // Validate Description
  private onGetErrorMessageDescription(value: string) {
    let returnvalue: string = '';
    const _tenantProperty = this.state.tenantProperty;
    _tenantProperty.tenantPropertyDescription = value;
    this.setState({ tenantProperty: _tenantProperty });

    return returnvalue;
  }

  // Validate Comment
  private onGetErrorMessageComment(value: string) {
    let returnvalue: string = '';
    const _tenantProperty = this.state.tenantProperty;
    _tenantProperty.tenantPropertyComment = value;
    this.setState({ tenantProperty: _tenantProperty });

    return returnvalue;
  }

  private onChanged(value: string) {
    alert(value);
  }
  // Component DidMount
  public async componentDidMount() {
    this.setState({ tenantProperty: this.props.TenantProperty });
    if (this.props.mode === panelMode.edit || this.props.mode === panelMode.New) {
      this.setState({ readOnly: false });
    }
  }
  // Render
  public render(): React.ReactElement<ITenantPropertyPanelProps> {
    return (
      <div>
        <Panel
          isOpen={this.props.showPanel}
          type={PanelType.smallFixedFar}
          onDismiss={this.props.onDismiss}
          headerText={this.props.mode == panelMode.edit || this.props.mode == panelMode.New ? strings.PanelHeaderTextEdit : strings.PanelHeaderTextDelete}
        >
          <TextField
            label={strings.ListViewColumnKeyLabel}
            readOnly={this.state.readOnly}
            required={true}
            multiline={this.state.multiline}
            value={this.state.tenantProperty ? this.state.tenantProperty.key : ''}
            deferredValidationTime={1500}
            onGetErrorMessage={this.onGetErrorMessageKey} />
          <TextField
            label={strings.ListViewColumnValueLabel}
            multiline={this.state.multiline}
            readOnly={this.state.readOnly}
            required={true}
            deferredValidationTime={1500}
            value={this.state.tenantProperty ? this.state.tenantProperty.tenantPropertyValue : ''}
            onGetErrorMessage={this.onGetErrorMessageValue} />
          <TextField
            label={strings.ListViewColumnDescriptionLabel}
            multiline={this.state.multiline}
            readOnly={this.state.readOnly}
            deferredValidationTime={1500}
            onGetErrorMessage={this.onGetErrorMessageDescription}
            validateOnFocusOut
            defaultValue={this.state.tenantProperty ? this.state.tenantProperty.tenantPropertyDescription : ''}
          />
          <TextField
            label={strings.ListViewColumnCommentLabel}
            multiline={this.state.multiline}
            readOnly={this.state.readOnly}
            validateOnFocusOut
            onGetErrorMessage={this.onGetErrorMessageComment}
            deferredValidationTime={1500}
            defaultValue={this.state.tenantProperty ? this.state.tenantProperty.tenantPropertyComment : ''}
          />
          <div className={styles.messageError}>
            <span>
             {this.state.errorMessage}
            </span>
          </div>
          <DialogFooter>
            <PrimaryButton
              onClick={this.onSave}
              text={this.props.mode == panelMode.edit || this.props.mode == panelMode.New ? strings.PrimaryButtonLabelSave : strings.PrimaryButtonLabelDelete}
              disabled={this.state.disableButton}
            />
            <DefaultButton onClick={this.onCancel} text={strings.DefaultButtonLabel} />
          </DialogFooter>
        </Panel>
      </div>
    );
  }
}

