import * as React from 'react';
import {
  Stack,
  TextField,
  Dropdown,
  IDropdownOption,
  SpinButton,
  Label,
  PrimaryButton,
  DefaultButton,
  MessageBar,
  MessageBarType,
  Pivot,
  PivotItem
} from '@fluentui/react';
import styles from './styles/CustomActionForm.module.scss';
import { 
  ICustomAction, 
  ICustomActionFormData, 
  RegistrationType 
} from '../../../models';

export interface ICustomActionFormProps {
  customAction?: ICustomAction;
  onSave: (formData: ICustomActionFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  showAdvancedProperties?: boolean;
}

export interface ICustomActionFormState {
  formData: ICustomActionFormData;
  errors: { [key: string]: string };
  selectedTab: string;
  isValid: boolean;
}

export class CustomActionForm extends React.Component<ICustomActionFormProps, ICustomActionFormState> {
  private readonly _locationOptions: IDropdownOption[] = [
    { key: 'ScriptLink', text: 'ScriptLink' },
    { key: 'Microsoft.SharePoint.StandardMenu', text: 'Site Actions Menu' },
    { key: 'Microsoft.SharePoint.SiteSettings', text: 'Site Settings' },
    { key: 'Microsoft.SharePoint.ContentTypeSettings', text: 'Content Type Settings' },
    { key: 'Microsoft.SharePoint.ContentTypeTemplateSettings', text: 'Content Type Template Settings' },
    { key: 'Microsoft.SharePoint.Create', text: 'Create Menu' },
    { key: 'EditControlBlock', text: 'Edit Control Block' },
    { key: 'CommandUI.Ribbon', text: 'Ribbon' },
    { key: 'ClientSideExtension.ApplicationCustomizer', text: 'Application Customizer' },
    { key: 'ClientSideExtension.ListViewCommandSet', text: 'List View Command Set' }
  ];

  private readonly _registrationTypeOptions: IDropdownOption[] = [
    { key: RegistrationType.None, text: 'None' },
    { key: RegistrationType.List, text: 'List' },
    { key: RegistrationType.ContentType, text: 'Content Type' },
    { key: RegistrationType.ProgId, text: 'ProgId' },
    { key: RegistrationType.FileType, text: 'File Type' }
  ];

  constructor(props: ICustomActionFormProps) {
    super(props);

    const { customAction } = props;
    
    this.state = {
      formData: {
        title: customAction?.Title || '',
        description: customAction?.Description || '',
        location: customAction?.Location || 'ScriptLink',
        sequence: customAction?.Sequence || 1000,
        scriptBlock: customAction?.ScriptBlock || '',
        scriptSrc: customAction?.ScriptSrc || '',
        url: customAction?.Url || '',
        commandUIExtension: customAction?.CommandUIExtension || '',
        registrationType: customAction?.RegistrationType || RegistrationType.None,
        registrationId: customAction?.RegistrationId || '',
        rights: customAction?.Rights || '',
        group: customAction?.Group || '',
        hostProperties: customAction?.HostProperties || '',
        clientSideComponentId: customAction?.ClientSideComponentId || '',
        clientSideComponentProperties: customAction?.ClientSideComponentProperties || '',
        name: customAction?.Name || '',
        imageUrl: customAction?.ImageUrl || ''
      },
      errors: {},
      selectedTab: 'basic',
      isValid: false
    };
  }

  public componentDidMount(): void {
    this._validateForm();
  }

  public render(): React.ReactElement<ICustomActionFormProps> {
    const { isLoading, showAdvancedProperties } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { formData, errors, selectedTab, isValid } = this.state;

    return (
      <div className={styles.formContainer}>
        <div className={styles.pivotContainer}>
          <Pivot selectedKey={selectedTab} onLinkClick={this._onTabChange}>
          <PivotItem headerText="Basic" itemKey="basic">
            {this._renderBasicTab()}
          </PivotItem>
          
          <PivotItem headerText="Script" itemKey="script">
            {this._renderScriptTab()}
          </PivotItem>
          
          {showAdvancedProperties && (
            <PivotItem headerText="Advanced" itemKey="advanced">
              {this._renderAdvancedTab()}
            </PivotItem>
          )}
        </Pivot>
        </div>

        <div className={styles.buttonContainer}>
          <Stack horizontal tokens={{ childrenGap: 8 }}>
            <PrimaryButton
              text="Save"
              onClick={this._handleSave}
              disabled={!isValid || isLoading}
            />
            <DefaultButton
              text="Cancel"
              onClick={this.props.onCancel}
              disabled={isLoading}
            />
          </Stack>
        </div>

        {Object.keys(errors).length > 0 && (
          <MessageBar messageBarType={MessageBarType.error} style={{ marginTop: '16px' }}>
            Please correct the errors above before saving.
          </MessageBar>
        )}
      </div>
    );
  }

  private _renderBasicTab = (): React.ReactElement => {
    const { formData, errors } = this.state;

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <div className={styles.section}>
          <Label className={styles.sectionTitle}>
            Basic Information <span className={styles.required}>*</span>
          </Label>
          
          <TextField
            label="Title"
            required
            value={formData.title}
            onChange={this._onFieldChange('title')}
            errorMessage={errors.title}
            placeholder="Enter a descriptive title for this custom action"
          />
          
          <TextField
            label="Name"
            required
            value={formData.name}
            onChange={this._onFieldChange('name')}
            errorMessage={errors.name}
            placeholder="Enter a unique name (no spaces or special characters)"
            description="This is the internal name used to identify the custom action"
          />
          
          <TextField
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={this._onFieldChange('description')}
            placeholder="Enter a description for this custom action"
          />
          
          <Dropdown
            label="Location"
            required
            selectedKey={formData.location}
            options={this._locationOptions}
            onChange={this._onDropdownChange('location')}
            errorMessage={errors.location}
          />
          
          <Stack>
            <Label>Sequence</Label>
            <SpinButton
              value={formData.sequence.toString()}
              onValidate={this._onSequenceChange}
              onIncrement={this._onSequenceIncrement}
              onDecrement={this._onSequenceDecrement}
              min={0}
              max={65536}
              step={100}
            />
            <div className={styles.fieldDescription}>
              Lower numbers appear first in menus and toolbars
            </div>
          </Stack>
        </div>
      </Stack>
    );
  };

  private _renderScriptTab = (): React.ReactElement => {
    const { formData } = this.state;

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <div className={styles.section}>
          <Label className={styles.sectionTitle}>Script Configuration</Label>
          
          <TextField
            label="Script Block"
            multiline
            rows={8}
            value={formData.scriptBlock}
            onChange={this._onFieldChange('scriptBlock')}
            placeholder="Enter JavaScript code to execute..."
            description="JavaScript code that will be executed when the action is triggered"
          />
          
          <TextField
            label="Script Source URL"
            value={formData.scriptSrc}
            onChange={this._onFieldChange('scriptSrc')}
            placeholder="https://example.com/script.js"
            description="URL to an external JavaScript file"
          />
          
          <TextField
            label="URL"
            value={formData.url}
            onChange={this._onFieldChange('url')}
            placeholder="https://example.com/page.aspx"
            description="URL to navigate to when the action is clicked"
          />
          
          <TextField
            label="Image URL"
            value={formData.imageUrl}
            onChange={this._onFieldChange('imageUrl')}
            placeholder="https://example.com/icon.png"
            description="URL to an icon image for the action"
          />
        </div>
      </Stack>
    );
  };

  private _renderAdvancedTab = (): React.ReactElement => {
    const { formData } = this.state;

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <div className={styles.section}>
          <Label className={styles.sectionTitle}>Advanced Settings</Label>
          
          <Stack>
            <Dropdown
              label="Registration Type"
              selectedKey={formData.registrationType}
              options={this._registrationTypeOptions}
              onChange={this._onDropdownChange('registrationType')}
            />
            <div className={styles.fieldDescription}>
              Specifies the type of object the custom action is registered with
            </div>
          </Stack>
          
          <TextField
            label="Registration ID"
            value={formData.registrationId}
            onChange={this._onFieldChange('registrationId')}
            placeholder="Enter registration ID..."
            description="ID of the object this action is registered with"
          />
          
          <TextField
            label="Rights"
            value={formData.rights}
            onChange={this._onFieldChange('rights')}
            placeholder="Enter required permissions..."
            description="Base permissions required to display this action"
          />
          
          <TextField
            label="Group"
            value={formData.group}
            onChange={this._onFieldChange('group')}
            placeholder="Enter group name..."
            description="Group this action belongs to"
          />
          
          <TextField
            label="Host Properties"
            multiline
            rows={4}
            value={formData.hostProperties}
            onChange={this._onFieldChange('hostProperties')}
            placeholder="Enter host properties..."
            description="Additional properties for the host application"
          />
          
          <TextField
            label="Command UI Extension"
            multiline
            rows={8}
            value={formData.commandUIExtension}
            onChange={this._onFieldChange('commandUIExtension')}
            placeholder="<CommandUIExtension>...</CommandUIExtension>"
            description="XML markup for ribbon customization"
          />
          
          <TextField
            label="Client Side Component ID"
            value={formData.clientSideComponentId}
            onChange={this._onFieldChange('clientSideComponentId')}
            placeholder="12345678-1234-1234-1234-123456789abc"
            description="GUID of the SPFx extension component"
          />
          
          <TextField
            label="Client Side Component Properties"
            multiline
            rows={4}
            value={formData.clientSideComponentProperties}
            onChange={this._onFieldChange('clientSideComponentProperties')}
            placeholder='{"property": "value"}'
            description="JSON properties for the SPFx component"
          />
        </div>
      </Stack>
    );
  };

  private _onTabChange = (item?: PivotItem): void => {
    if (item?.props.itemKey) {
      this.setState({ selectedTab: item.props.itemKey });
    }
  };

  private _onFieldChange = (fieldName: keyof ICustomActionFormData) => (
    _: any, 
    newValue?: string
  ): void => {
    this.setState({
      formData: {
        ...this.state.formData,
        [fieldName]: newValue || ''
      }
    }, () => {
      this._validateField(fieldName);
      this._validateForm();
    });
  };

  private _onDropdownChange = (fieldName: keyof ICustomActionFormData) => (
    _: any,
    option?: IDropdownOption
  ): void => {
    if (option) {
      this.setState({
        formData: {
          ...this.state.formData,
          [fieldName]: option.key
        }
      }, () => {
        this._validateField(fieldName);
        this._validateForm();
      });
    }
  };

  private _onSequenceChange = (value: string): string => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return this.state.formData.sequence.toString();
    
    const clampedValue = Math.max(0, Math.min(65536, numValue));
    this.setState({
      formData: {
        ...this.state.formData,
        sequence: clampedValue
      }
    }, this._validateForm);
    
    return clampedValue.toString();
  };

  private _onSequenceIncrement = (value: string): string => {
    const numValue = parseInt(value, 10) + 100;
    return this._onSequenceChange(numValue.toString());
  };

  private _onSequenceDecrement = (value: string): string => {
    const numValue = parseInt(value, 10) - 100;
    return this._onSequenceChange(numValue.toString());
  };

  private _validateField = (fieldName: keyof ICustomActionFormData): void => {
    const { formData, errors } = this.state;
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'title':
        if (!formData.title.trim()) {
          newErrors.title = 'Title is required';
        } else {
          delete newErrors.title;
        }
        break;
      
      case 'name':
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required';
        } else if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(formData.name)) {
          newErrors.name = 'Name must start with a letter and contain only letters, numbers, and underscores';
        } else {
          delete newErrors.name;
        }
        break;
      
      case 'location':
        if (!formData.location) {
          newErrors.location = 'Location is required';
        } else {
          delete newErrors.location;
        }
        break;
      
      case 'clientSideComponentId':
        if (formData.clientSideComponentId && 
            !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(formData.clientSideComponentId)) {
          newErrors.clientSideComponentId = 'Invalid GUID format';
        } else {
          delete newErrors.clientSideComponentId;
        }
        break;
    }

    this.setState({ errors: newErrors });
  };

  private _validateForm = (): void => {
    const { formData } = this.state;
    const requiredFields: (keyof ICustomActionFormData)[] = ['title', 'name', 'location'];
    
    const isValid = requiredFields.every(field => {
      if (typeof formData[field] === 'string') {
        return (formData[field] as string).trim().length > 0;
      }
      return formData[field] !== undefined && formData[field] !== null;
    }) && Object.keys(this.state.errors).length === 0;

    this.setState({ isValid });
  };

  private _handleSave = async (): Promise<void> => {
    if (this.state.isValid) {
      await this.props.onSave(this.state.formData);
    }
  };
}