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
  PivotItem,
  Toggle,
  Text,
  Icon,
  Link,
  Separator
} from '@fluentui/react';
import styles from './styles/CustomActionForm.module.scss';
import {
  ICustomAction,
  ICustomActionFormData,
  RegistrationType,
  CustomActionScope
} from '../../../models';
import { ValidationUtils, IValidationResult } from '../../../utils/ValidationUtils';
import { ErrorBoundary } from '../../../components/ErrorBoundary';

export interface ICustomActionFormProps {
  customAction?: ICustomAction;
  onSave: (formData: ICustomActionFormData, scope: CustomActionScope) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  showAdvancedProperties: boolean;
}

export interface ICustomActionFormState {
  formData: ICustomActionFormData;
  errors: { [key: string]: string[] };
  selectedTab: string;
  isValid: boolean;
  hasBeenModified: boolean;
  isEasyMode: boolean;
  showPowerShellHelp: boolean;
  selectedScope: CustomActionScope;
}

export class CustomActionForm extends React.Component<ICustomActionFormProps, ICustomActionFormState> {
  private static readonly MIN_SEQUENCE = 0;
  private static readonly MAX_SEQUENCE = 65536;
  private static readonly SEQUENCE_STEP = 100;
  private static readonly MAX_TITLE_LENGTH = 255;
  private static readonly MAX_NAME_LENGTH = 50;
  private static readonly MAX_DESCRIPTION_LENGTH = 500;

  private _isMounted = false;
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
      isValid: false,
      hasBeenModified: false,
      isEasyMode: true,
      showPowerShellHelp: false,
      selectedScope: CustomActionScope.Web
    };
  }

  public componentDidMount(): void {
    this._isMounted = true;
    this._validateForm();
  }

  public componentWillUnmount(): void {
    this._isMounted = false;
  }

  public render(): React.ReactElement<ICustomActionFormProps> {
    const { isLoading, showAdvancedProperties } = this.props;
    const { formData, errors, selectedTab, isValid, hasBeenModified, isEasyMode, showPowerShellHelp } = this.state;

    const hasErrors = Object.keys(errors).length > 0;
    const allErrorMessages = Object.values(errors).flat();

    return (
      <ErrorBoundary>
        <div className={styles.formContainer}>
          <div className={styles.modeToggleContainer}>
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center" tokens={{ childrenGap: 16 }}>
              <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 12 }}>
                <Icon iconName={isEasyMode ? "LightningBolt" : "DeveloperTools"} />
                <Text variant="mediumPlus" style={{ fontWeight: '600' }}>
                  {isEasyMode ? "Easy Mode" : "Advanced Mode"}
                </Text>
                <Toggle
                  label=""
                  checked={!isEasyMode}
                  onText="Advanced"
                  offText="Easy"
                  onChange={this._onModeToggle}
                />
              </Stack>
              <Stack horizontal tokens={{ childrenGap: 8 }}>
                <Link onClick={this._togglePowerShellHelp}>
                  <Icon iconName="Info" style={{ marginRight: '4px' }} />
                  PowerShell Reference
                </Link>
              </Stack>
            </Stack>
            <Text variant="small" style={{ color: '#666', marginTop: '4px' }}>
              {isEasyMode
                ? "Simplified interface for common custom actions with PowerShell-like experience"
                : "Full control over all custom action properties and advanced settings"
              }
            </Text>
          </div>

          <Separator />

          {showPowerShellHelp && this._renderPowerShellHelp()}

          <div className={styles.pivotContainer}>
            {isEasyMode ? this._renderEasyMode() : this._renderAdvancedMode()}
          </div>

          <div className={styles.buttonContainer}>
            <Stack horizontal tokens={{ childrenGap: 8 }}>
              <PrimaryButton
                text="Save"
                onClick={this._handleSave}
                disabled={!isValid || isLoading || !hasBeenModified}
              />
              <DefaultButton
                text="Cancel"
                onClick={this.props.onCancel}
                disabled={isLoading}
              />
            </Stack>
          </div>

          {hasErrors && (
            <MessageBar messageBarType={MessageBarType.error} style={{ marginTop: '16px' }}>
              <div>
                <strong>Please correct the following errors:</strong>
                <ul style={{ margin: '8px 0 0 16px', padding: 0 }}>
                  {allErrorMessages.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </MessageBar>
          )}
        </div>
      </ErrorBoundary>
    );
  }

  private _renderEasyMode = (): React.ReactElement => {
    const { formData, errors } = this.state;

    const commonActions = [
      {
        key: 'script',
        text: 'Add JavaScript to Pages',
        description: 'Inject custom JavaScript code into pages',
        icon: 'JavaScriptLanguage',
        defaultLocation: 'ScriptLink'
      },
      {
        key: 'redirect',
        text: 'Navigation Link',
        description: 'Add a navigation link to site actions or settings',
        icon: 'NavigateExternalInline',
        defaultLocation: 'Microsoft.SharePoint.StandardMenu'
      },
      {
        key: 'ribbon',
        text: 'Ribbon Button',
        description: 'Add a custom button to the SharePoint ribbon',
        icon: 'Ribbon',
        defaultLocation: 'CommandUI.Ribbon'
      },
      {
        key: 'spfx',
        text: 'SPFx Extension',
        description: 'Deploy a SharePoint Framework extension',
        icon: 'AppIconDefault',
        defaultLocation: 'ClientSideExtension.ApplicationCustomizer'
      }
    ];

    return (
      <Stack tokens={{ childrenGap: 24 }}>
        <div className={styles.section}>
          <Label className={styles.sectionTitle}>
            <Icon iconName="Lightbulb" style={{ marginRight: '8px' }} />
            What do you want to create?
          </Label>
          <Text variant="small" style={{ color: '#666', marginBottom: '16px' }}>
            Choose a common scenario to get started quickly
          </Text>

          <Stack tokens={{ childrenGap: 12 }}>
            {commonActions.map(action => (
              <div
                key={action.key}
                className={`${styles.actionCard} ${formData.location === action.defaultLocation ? styles.selected : ''}`}
                onClick={() => this._selectQuickAction(action)}
              >
                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 12 }}>
                  <Icon iconName={action.icon} style={{ fontSize: '20px', color: '#0078d4' }} />
                  <Stack>
                    <Text variant="medium" style={{ fontWeight: '600' }}>{action.text}</Text>
                    <Text variant="small" style={{ color: '#666' }}>{action.description}</Text>
                  </Stack>
                </Stack>
              </div>
            ))}
          </Stack>
        </div>

        <div className={styles.section}>
          <Label className={styles.sectionTitle}>
            <Icon iconName="Edit" style={{ marginRight: '8px' }} />
            Basic Information
          </Label>

          <Stack tokens={{ childrenGap: 16 }}>
            <TextField
              label="Title"
              required
              value={formData.title}
              onChange={this._onFieldChange('title')}
              errorMessage={errors.title ? errors.title.join(', ') : undefined}
              placeholder="My Custom Action"
              description="Display name for your custom action"
            />

            <TextField
              label="Internal Name"
              required
              value={formData.name}
              onChange={this._onFieldChange('name')}
              errorMessage={errors.name ? errors.name.join(', ') : undefined}
              placeholder="MyCustomAction"
              description="Unique identifier (no spaces, like PowerShell parameter names)"
            />

            <TextField
              label="Description"
              multiline
              rows={2}
              value={formData.description}
              onChange={this._onFieldChange('description')}
              placeholder="What does this custom action do?"
              description="Optional description for documentation"
            />

            <Dropdown
              label="Scope"
              required
              selectedKey={this.state.selectedScope}
              options={[
                { key: CustomActionScope.Web, text: 'Web (Current Site)', data: { description: 'Available on this site only' } },
                { key: CustomActionScope.Site, text: 'Site Collection', data: { description: 'Available on all sites in this collection' } }
              ]}
              onChange={this._onScopeChange}
            />
          </Stack>
        </div>

        {this._renderEasyModeContent()}

        {this._renderPowerShellEquivalent()}
      </Stack>
    );
  };

  private _renderAdvancedMode = (): React.ReactElement => {
    const { showAdvancedProperties } = this.props;
    const { selectedTab } = this.state;

    return (
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
    );
  };

  private _renderPowerShellHelp = (): React.ReactElement => {
    return (
      <MessageBar messageBarType={MessageBarType.info} onDismiss={this._togglePowerShellHelp}>
        <Stack tokens={{ childrenGap: 12 }}>
          <Text variant="medium" style={{ fontWeight: '600' }}>
            <Icon iconName="CommandPrompt" style={{ marginRight: '8px' }} />
            PowerShell Equivalent
          </Text>
          <Text variant="small">
            This web part provides a user-friendly interface for operations you might do with PowerShell commands like:
          </Text>
          <div style={{ fontFamily: 'Monaco, Consolas, monospace', fontSize: '12px', background: '#f8f8f8', padding: '8px', borderRadius: '4px' }}>
            <div>Add-PnPCustomAction -Name "MyAction" -Title "My Title" -Location "ScriptLink" -ScriptBlock "&lt;script&gt;...&lt;/script&gt;"</div>
            <div>Get-PnPCustomAction</div>
            <div>Remove-PnPCustomAction -Identity "MyAction"</div>
          </div>
          <Link href="https://pnp.github.io/powershell/cmdlets/Add-PnPCustomAction.html" target="_blank">
            View full PnP PowerShell documentation →
          </Link>
        </Stack>
      </MessageBar>
    );
  };

  private _renderEasyModeContent = (): React.ReactElement => {
    const { formData } = this.state;

    if (formData.location === 'ScriptLink') {
      return this._renderScriptQuickSetup();
    } else if (formData.location.includes('Menu') || formData.location.includes('Settings')) {
      return this._renderNavigationQuickSetup();
    } else if (formData.location === 'CommandUI.Ribbon') {
      return this._renderRibbonQuickSetup();
    } else if (formData.location.includes('ClientSideExtension')) {
      return this._renderSPFxQuickSetup();
    }

    return <div />;
  };

  private _renderScriptQuickSetup = (): React.ReactElement => {
    const { formData } = this.state;

    return (
      <div className={styles.section}>
        <Label className={styles.sectionTitle}>
          <Icon iconName="JavaScriptLanguage" style={{ marginRight: '8px' }} />
          JavaScript Configuration
        </Label>
        <Text variant="small" style={{ color: '#666', marginBottom: '16px' }}>
          Add custom JavaScript that will run on every page
        </Text>

        <Stack tokens={{ childrenGap: 16 }}>
          <TextField
            label="JavaScript Code"
            multiline
            rows={8}
            value={formData.scriptBlock}
            onChange={this._onFieldChange('scriptBlock')}
            placeholder={`<script>
// Your JavaScript code here
console.log('Custom action loaded');

// Example: Add custom CSS
var style = document.createElement('style');
style.textContent = '.ms-core-pageTitle { color: blue; }';
document.head.appendChild(style);
</script>`}
            description="JavaScript code to execute (wrapped in &lt;script&gt; tags)"
          />

          <Text variant="small" style={{ fontStyle: 'italic', color: '#666' }}>
            <Icon iconName="Info" style={{ marginRight: '4px' }} />
            This is equivalent to: Add-PnPCustomAction -Location "ScriptLink" -ScriptBlock "your-script"
          </Text>
        </Stack>
      </div>
    );
  };

  private _renderNavigationQuickSetup = (): React.ReactElement => {
    const { formData } = this.state;

    return (
      <div className={styles.section}>
        <Label className={styles.sectionTitle}>
          <Icon iconName="NavigateExternalInline" style={{ marginRight: '8px' }} />
          Navigation Link Configuration
        </Label>
        <Text variant="small" style={{ color: '#666', marginBottom: '16px' }}>
          Create a navigation link in SharePoint menus
        </Text>

        <Stack tokens={{ childrenGap: 16 }}>
          <TextField
            label="Target URL"
            value={formData.url}
            onChange={this._onFieldChange('url')}
            placeholder="https://example.com or /_layouts/15/settings.aspx"
            description="Where should the link navigate to?"
          />

          <TextField
            label="Icon URL (Optional)"
            value={formData.imageUrl}
            onChange={this._onFieldChange('imageUrl')}
            placeholder="https://example.com/icon.png"
            description="Icon to display next to the link"
          />

          <Text variant="small" style={{ fontStyle: 'italic', color: '#666' }}>
            <Icon iconName="Info" style={{ marginRight: '4px' }} />
            This is equivalent to: Add-PnPCustomAction -Location "Microsoft.SharePoint.StandardMenu" -Url "your-url"
          </Text>
        </Stack>
      </div>
    );
  };

  private _renderRibbonQuickSetup = (): React.ReactElement => {
    const { formData } = this.state;

    return (
      <div className={styles.section}>
        <Label className={styles.sectionTitle}>
          <Icon iconName="Ribbon" style={{ marginRight: '8px' }} />
          Ribbon Button Configuration
        </Label>
        <Text variant="small" style={{ color: '#666', marginBottom: '16px' }}>
          Add a custom button to the SharePoint ribbon
        </Text>

        <Stack tokens={{ childrenGap: 16 }}>
          <TextField
            label="Command UI Extension"
            multiline
            rows={6}
            value={formData.commandUIExtension}
            onChange={this._onFieldChange('commandUIExtension')}
            placeholder={`<CommandUIExtension>
  <CommandUIDefinitions>
    <CommandUIDefinition Location="Ribbon.Documents.Copies.Controls._children">
      <Button Id="MyCustomButton"
              Command="MyCustomCommand"
              Sequence="15"
              Image32by32="/_layouts/15/images/placeholder32x32.png"
              LabelText="My Button"
              ToolTipTitle="My Custom Button"
              ToolTipDescription="Click to execute custom action" />
    </CommandUIDefinition>
  </CommandUIDefinitions>
  <CommandUIHandlers>
    <CommandUIHandler Command="MyCustomCommand"
                      CommandAction="javascript:alert('Button clicked!');" />
  </CommandUIHandlers>
</CommandUIExtension>`}
            description="XML configuration for the ribbon button"
          />

          <Text variant="small" style={{ fontStyle: 'italic', color: '#666' }}>
            <Icon iconName="Info" style={{ marginRight: '4px' }} />
            This is equivalent to: Add-PnPCustomAction -Location "CommandUI.Ribbon" -CommandUIExtension "your-xml"
          </Text>
        </Stack>
      </div>
    );
  };

  private _renderSPFxQuickSetup = (): React.ReactElement => {
    const { formData } = this.state;

    return (
      <div className={styles.section}>
        <Label className={styles.sectionTitle}>
          <Icon iconName="AppIconDefault" style={{ marginRight: '8px' }} />
          SPFx Extension Configuration
        </Label>
        <Text variant="small" style={{ color: '#666', marginBottom: '16px' }}>
          Deploy a SharePoint Framework extension
        </Text>

        <Stack tokens={{ childrenGap: 16 }}>
          <TextField
            label="Client Side Component ID"
            value={formData.clientSideComponentId}
            onChange={this._onFieldChange('clientSideComponentId')}
            placeholder="12345678-1234-1234-1234-123456789abc"
            description="GUID of your SPFx extension (from manifest.json)"
          />

          <TextField
            label="Component Properties (JSON)"
            multiline
            rows={4}
            value={formData.clientSideComponentProperties}
            onChange={this._onFieldChange('clientSideComponentProperties')}
            placeholder='{"property1": "value1", "property2": "value2"}'
            description="Configuration properties for your extension"
          />

          <Text variant="small" style={{ fontStyle: 'italic', color: '#666' }}>
            <Icon iconName="Info" style={{ marginRight: '4px' }} />
            This is equivalent to: Add-PnPCustomAction -Location "ClientSideExtension.ApplicationCustomizer" -ClientSideComponentId "guid"
          </Text>
        </Stack>
      </div>
    );
  };

  private _renderPowerShellEquivalent = (): React.ReactElement => {
    const { formData } = this.state;

    const buildPowerShellCommand = (): string => {
      let cmd = 'Add-PnPCustomAction';

      if (formData.name) cmd += ` -Name "${formData.name}"`;
      if (formData.title) cmd += ` -Title "${formData.title}"`;
      if (formData.description) cmd += ` -Description "${formData.description}"`;
      if (formData.location) cmd += ` -Location "${formData.location}"`;
      if (formData.sequence !== 1000) cmd += ` -Sequence ${formData.sequence}`;
      if (formData.scriptBlock) cmd += ` -ScriptBlock "${formData.scriptBlock.replace(/"/g, '\\"')}"`;
      if (formData.scriptSrc) cmd += ` -ScriptSrc "${formData.scriptSrc}"`;
      if (formData.url) cmd += ` -Url "${formData.url}"`;
      if (formData.imageUrl) cmd += ` -ImageUrl "${formData.imageUrl}"`;
      if (formData.clientSideComponentId) cmd += ` -ClientSideComponentId "${formData.clientSideComponentId}"`;
      if (formData.clientSideComponentProperties) cmd += ` -ClientSideComponentProperties "${formData.clientSideComponentProperties.replace(/"/g, '\\"')}"`;

      return cmd;
    };

    return (
      <div className={styles.section}>
        <Label className={styles.sectionTitle}>
          <Icon iconName="CommandPrompt" style={{ marginRight: '8px' }} />
          PowerShell Equivalent
        </Label>
        <Text variant="small" style={{ color: '#666', marginBottom: '16px' }}>
          This is the PnP PowerShell command that would create the same custom action
        </Text>

        <div style={{
          fontFamily: 'Monaco, Consolas, monospace',
          fontSize: '12px',
          background: '#f8f8f8',
          padding: '12px',
          borderRadius: '4px',
          border: '1px solid #ddd',
          wordBreak: 'break-all',
          whiteSpace: 'pre-wrap'
        }}>
          {buildPowerShellCommand()}
        </div>
      </div>
    );
  };

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
            errorMessage={errors.title ? errors.title.join(', ') : undefined}
            placeholder="Enter a descriptive title for this custom action"
            maxLength={255}
            onBlur={() => this._validateField('title')}
          />
          
          <TextField
            label="Name"
            required
            value={formData.name}
            onChange={this._onFieldChange('name')}
            errorMessage={errors.name ? errors.name.join(', ') : undefined}
            placeholder="Enter a unique name (no spaces or special characters)"
            description="This is the internal name used to identify the custom action"
            maxLength={50}
            onBlur={() => this._validateField('name')}
          />
          
          <TextField
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={this._onFieldChange('description')}
            placeholder="Enter a description for this custom action"
            maxLength={500}
          />
          
          <Dropdown
            label="Location"
            required
            selectedKey={formData.location}
            options={this._locationOptions}
            onChange={this._onDropdownChange('location')}
            errorMessage={errors.location ? errors.location.join(', ') : undefined}
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
    const { formData, errors } = this.state;

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
            errorMessage={errors.scriptSrc ? errors.scriptSrc.join(', ') : undefined}
            placeholder="https://example.com/script.js"
            description="URL to an external JavaScript file"
            onBlur={() => this._validateField('scriptSrc')}
          />
          
          <TextField
            label="URL"
            value={formData.url}
            onChange={this._onFieldChange('url')}
            errorMessage={errors.url ? errors.url.join(', ') : undefined}
            placeholder="https://example.com/page.aspx"
            description="URL to navigate to when the action is clicked"
            onBlur={() => this._validateField('url')}
          />
          
          <TextField
            label="Image URL"
            value={formData.imageUrl}
            onChange={this._onFieldChange('imageUrl')}
            errorMessage={errors.imageUrl ? errors.imageUrl.join(', ') : undefined}
            placeholder="https://example.com/icon.png"
            description="URL to an icon image for the action"
            onBlur={() => this._validateField('imageUrl')}
          />
        </div>
      </Stack>
    );
  };

  private _renderAdvancedTab = (): React.ReactElement => {
    const { formData, errors } = this.state;

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
            errorMessage={errors.commandUIExtension ? errors.commandUIExtension.join(', ') : undefined}
            placeholder="<CommandUIExtension>...</CommandUIExtension>"
            description="XML markup for ribbon customization"
            onBlur={() => this._validateField('commandUIExtension')}
          />
          
          <TextField
            label="Client Side Component ID"
            value={formData.clientSideComponentId}
            onChange={this._onFieldChange('clientSideComponentId')}
            errorMessage={errors.clientSideComponentId ? errors.clientSideComponentId.join(', ') : undefined}
            placeholder="12345678-1234-1234-1234-123456789abc"
            description="GUID of the SPFx extension component"
            onBlur={() => this._validateField('clientSideComponentId')}
          />
          
          <TextField
            label="Client Side Component Properties"
            multiline
            rows={4}
            value={formData.clientSideComponentProperties}
            onChange={this._onFieldChange('clientSideComponentProperties')}
            errorMessage={errors.clientSideComponentProperties ? errors.clientSideComponentProperties.join(', ') : undefined}
            placeholder='{"property": "value"}'
            description="JSON properties for the SPFx component"
            onBlur={() => this._validateField('clientSideComponentProperties')}
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
    if (!this._isMounted) return;

    this.setState({
      formData: {
        ...this.state.formData,
        [fieldName]: newValue ?? ''
      },
      hasBeenModified: true
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
    if (!this._isMounted) return;

    const { formData, errors } = this.state;
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'title': {
        const validationResult = ValidationUtils.combineValidations(
          formData.title,
          (value) => ValidationUtils.validateRequired(value, 'Title')
        );
        if (validationResult.isValid) {
          delete newErrors.title;
        } else {
          newErrors.title = validationResult.errors;
        }
        break;
      }

      case 'name': {
        const validationResult = ValidationUtils.combineValidations(
          formData.name,
          (value) => ValidationUtils.validateRequired(value, 'Name'),
          (value) => ValidationUtils.validateCustomActionName(value)
        );
        if (validationResult.isValid) {
          delete newErrors.name;
        } else {
          newErrors.name = validationResult.errors;
        }
        break;
      }

      case 'location': {
        const validationResult = ValidationUtils.combineValidations(
          formData.location,
          (value) => ValidationUtils.validateRequired(value, 'Location')
        );
        if (validationResult.isValid) {
          delete newErrors.location;
        } else {
          newErrors.location = validationResult.errors;
        }
        break;
      }

      case 'scriptSrc': {
        if (formData.scriptSrc && formData.scriptSrc.trim()) {
          const urlError = ValidationUtils.validateUrl(formData.scriptSrc);
          if (urlError) {
            newErrors.scriptSrc = [urlError];
          } else {
            delete newErrors.scriptSrc;
          }
        } else {
          delete newErrors.scriptSrc;
        }
        break;
      }

      case 'url': {
        if (formData.url && formData.url.trim()) {
          const urlError = ValidationUtils.validateUrl(formData.url);
          if (urlError) {
            newErrors.url = [urlError];
          } else {
            delete newErrors.url;
          }
        } else {
          delete newErrors.url;
        }
        break;
      }

      case 'imageUrl': {
        if (formData.imageUrl && formData.imageUrl.trim()) {
          const urlError = ValidationUtils.validateUrl(formData.imageUrl);
          if (urlError) {
            newErrors.imageUrl = [urlError];
          } else {
            delete newErrors.imageUrl;
          }
        } else {
          delete newErrors.imageUrl;
        }
        break;
      }

      case 'clientSideComponentId': {
        if (formData.clientSideComponentId && formData.clientSideComponentId.trim()) {
          const guidError = ValidationUtils.validateGuid(formData.clientSideComponentId);
          if (guidError) {
            newErrors.clientSideComponentId = [guidError];
          } else {
            delete newErrors.clientSideComponentId;
          }
        } else {
          delete newErrors.clientSideComponentId;
        }
        break;
      }

      case 'clientSideComponentProperties': {
        if (formData.clientSideComponentProperties && formData.clientSideComponentProperties.trim()) {
          const jsonError = ValidationUtils.validateJson(formData.clientSideComponentProperties);
          if (jsonError) {
            newErrors.clientSideComponentProperties = [jsonError];
          } else {
            delete newErrors.clientSideComponentProperties;
          }
        } else {
          delete newErrors.clientSideComponentProperties;
        }
        break;
      }

      case 'commandUIExtension': {
        if (formData.commandUIExtension && formData.commandUIExtension.trim()) {
          const xmlError = ValidationUtils.validateXml(formData.commandUIExtension);
          if (xmlError) {
            newErrors.commandUIExtension = [xmlError];
          } else {
            delete newErrors.commandUIExtension;
          }
        } else {
          delete newErrors.commandUIExtension;
        }
        break;
      }

      case 'sequence': {
        const sequenceError = ValidationUtils.validateSequence(formData.sequence);
        if (sequenceError) {
          newErrors.sequence = [sequenceError];
        } else {
          delete newErrors.sequence;
        }
        break;
      }
    }

    this.setState({ errors: newErrors });
  };

  private _validateForm = (): void => {
    if (!this._isMounted) return;

    const { formData, errors } = this.state;
    const requiredFields: (keyof ICustomActionFormData)[] = ['title', 'name', 'location'];

    const requiredFieldsValid = requiredFields.every(field => {
      if (typeof formData[field] === 'string') {
        return (formData[field] as string).trim().length > 0;
      }
      return formData[field] !== undefined && formData[field] !== null;
    });

    const hasErrors = Object.keys(errors).length > 0;

    const isValid = requiredFieldsValid && !hasErrors;

    this.setState({ isValid });
  };

  private _onModeToggle = (_: any, checked?: boolean): void => {
    this.setState({ isEasyMode: !checked });
  };

  private _togglePowerShellHelp = (): void => {
    this.setState({ showPowerShellHelp: !this.state.showPowerShellHelp });
  };

  private _selectQuickAction = (action: any): void => {
    this.setState({
      formData: {
        ...this.state.formData,
        location: action.defaultLocation
      },
      hasBeenModified: true
    }, () => {
      this._validateField('location');
      this._validateForm();
    });
  };

  private _onScopeChange = (_: any, option?: IDropdownOption): void => {
    if (option) {
      this.setState({
        selectedScope: option.key as CustomActionScope,
        hasBeenModified: true
      });
    }
  };

  private _handleSave = async (): Promise<void> => {
    if (!this._isMounted) return;

    const fieldsToValidate: (keyof ICustomActionFormData)[] = [
      'title', 'name', 'location', 'scriptSrc', 'url', 'imageUrl',
      'clientSideComponentId', 'clientSideComponentProperties',
      'commandUIExtension', 'sequence'
    ];

    fieldsToValidate.forEach(field => this._validateField(field));

    setTimeout(() => {
      if (this._isMounted && this.state.isValid) {
        this.props.onSave(this.state.formData, this.state.selectedScope).catch(console.error);
      }
    }, 0);
  };
}
