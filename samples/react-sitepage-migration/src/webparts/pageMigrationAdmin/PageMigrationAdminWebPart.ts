import {
  IPropertyPaneConfiguration,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneDropdown,
  PropertyPaneLabel,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Version } from '@microsoft/sp-core-library';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'PageMigrationAdminWebPartStrings';
import type { AppRenderOptions, MigrationApp } from './appHost';
import { Logger } from '../../services/logging/Logger';
import { CompatibilityOverride } from '../../models/CompatibilityOverride';
import { ConflictMode } from '../../models/OperationalTypes';
import { parseCompatibilityOverrides } from '../../utilities/CompatibilityOverrideParser';
import { toMessage } from '../../utilities/ErrorSerialization';
import { formatString } from '../../utilities/formatString';
import { isSharePointUrl } from '../../utilities/UrlUtilities';

export interface IPageMigrationAdminWebPartProps {
  defaultPublishOnComplete: boolean;
  defaultConflictMode: ConflictMode;
  persistReports: boolean;
  includePageTemplates: boolean;
  reportStorageSiteUrl: string;
  auditListName: string;
  logListName: string;
  compatibilityOverridesJson: string;
}

const isConflictMode = (value: unknown): value is ConflictMode =>
  value === 'Rename' || value === 'Replace' || value === 'Skip' || value === 'Fail';

export default class PageMigrationAdminWebPart extends BaseClientSideWebPart<IPageMigrationAdminWebPartProps> {
  private _themeVariant?: IReadonlyTheme;
  private readonly _logger: Logger = new Logger();
  private _app?: MigrationApp;
  private _appLoadPromise?: Promise<void>;
  private _compatibilityOverridesCache?: string;
  private _provisioningStatus = '';

  protected override get disableReactivePropertyChanges(): boolean {
    return true;
  }

  public override render(): void {
    if (!this._app) {
      void this.loadApp();
      return;
    }

    const overridesJson = this.properties.compatibilityOverridesJson ?? '[]';
    if (overridesJson !== this._compatibilityOverridesCache) {
      this._app.setCompatibilityOverrides(this.readCompatibilityOverrides());
      this._compatibilityOverridesCache = overridesJson;
    }

    this._app.render(this.domElement, this.buildRenderOptions());
  }

  private async loadApp(): Promise<void> {
    if (this._appLoadPromise) {
      return this._appLoadPromise;
    }

    this.renderLoadingState();

    this._appLoadPromise = (async () => {
      try {
        const { createApp } = await import(
           './appHost'
        );

        if (this.isDisposed) {
          return;
        }

        this._compatibilityOverridesCache = this.properties.compatibilityOverridesJson ?? '[]';
        this._app = createApp(this.context, this._logger, this.readCompatibilityOverrides());
        this._app.render(this.domElement, this.buildRenderOptions());
      } catch (error) {
        this._logger.error('Failed to load the page migration console.', { error });
        this.renderLoadFailure(toMessage(error, strings.ErrorBoundaryDescription));
      } finally {
        this._appLoadPromise = undefined;
      }
    })();

    return this._appLoadPromise;
  }

  private buildRenderOptions(): AppRenderOptions {
    return {
      themeVariant: this._themeVariant,
      storageScope: this.resolveStorageScope(),
      defaultPublishOnComplete: this.properties.defaultPublishOnComplete ?? true,
      defaultConflictMode: isConflictMode(this.properties.defaultConflictMode)
        ? this.properties.defaultConflictMode
        : 'Rename',
      persistReports: this.properties.persistReports ?? true,
      includePageTemplates: this.properties.includePageTemplates ?? false,
      reportStorageSiteUrl: this.properties.reportStorageSiteUrl ?? '',
      auditListName: this.properties.auditListName?.trim() || 'Page Migration Audit',
      logListName: this.properties.logListName?.trim() || 'Page Migration Logs'
    };
  }

  private renderLoadingState(): void {
    this.domElement.textContent = '';
    const status = document.createElement('div');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.textContent = strings.ProgressLoadingPages;
    this.domElement.appendChild(status);
  }

  private renderLoadFailure(message: string): void {
    this.domElement.textContent = '';
    const alert = document.createElement('div');
    alert.setAttribute('role', 'alert');
    alert.textContent = `${strings.ErrorBoundaryTitle} — ${message}`;
    this.domElement.appendChild(alert);
  }

  protected override onDispose(): void {
    this._app?.dispose(this.domElement);
    this._app = undefined;
  }

  protected override onThemeChanged(currentTheme?: IReadonlyTheme): void {
    this._themeVariant = currentTheme;
    if (this._app) {
      this.render();
    }
  }

  protected override get dataVersion(): Version {
    return Version.parse('1.1');
  }

  private resolveProvisioningSiteUrl(): string {
    return this.properties.reportStorageSiteUrl?.trim() || this.context.pageContext.web.absoluteUrl;
  }

  private async provisionReportingLists(): Promise<void> {
    const siteUrl = this.resolveProvisioningSiteUrl();

    this._provisioningStatus = strings.ProvisionListsWorking;
    this.context.propertyPane.refresh();

    try {
      await this.loadApp();
      if (!this._app) {
        throw new Error(strings.ErrorBoundaryDescription);
      }

      await this._app.provisionReportingLists({
        siteUrl,
        auditListName: this.properties.auditListName?.trim() || 'Page Migration Audit',
        logListName: this.properties.logListName?.trim() || 'Page Migration Logs'
      });

      this._provisioningStatus = formatString(strings.ProvisionListsSuccess, siteUrl);
    } catch (error) {
      this._logger.error('Provisioning the reporting lists failed.', { siteUrl, error });
      this._provisioningStatus = formatString(
        strings.ProvisionListsFailed,
        toMessage(error, strings.ErrorBoundaryDescription)
      );
    } finally {
      this.context.propertyPane.refresh();
    }
  }

  private resolveStorageScope(): string {
    const aadUserId = this.context.pageContext.aadInfo?.userId?.toString();
    return aadUserId ?? this.context.pageContext.user.loginName ?? 'anonymous';
  }

  private readCompatibilityOverrides(): ReadonlyArray<CompatibilityOverride> {
    try {
      return parseCompatibilityOverrides(this.properties.compatibilityOverridesJson ?? '[]');
    } catch (error) {
      this._logger.error('Failed to parse compatibility overrides; using the built-in registry.', { error });
      return [];
    }
  }

  private validateStorageSiteUrl(value: string): string {
    const trimmed = (value ?? '').trim();
    if (!trimmed) {
      return '';
    }

    if (!isSharePointUrl(trimmed)) {
      return strings.ValidationStorageUrlNotSharePoint;
    }

    const tenantHost = new URL(this.context.pageContext.web.absoluteUrl).hostname.toLowerCase();
    if (new URL(trimmed).hostname.toLowerCase() !== tenantHost) {
      return strings.ValidationStorageUrlDifferentTenant;
    }

    return '';
  }

  private validateOverridesJson(value: string): string {
    const trimmed = (value ?? '').trim();
    if (!trimmed) {
      return '';
    }

    try {
      parseCompatibilityOverrides(trimmed);
      return '';
    } catch (error) {
      return toMessage(error, strings.ValidationOverridesInvalid);
    }
  }

  private validateListName(value: string): string {
    const trimmed = (value ?? '').trim();
    if (!trimmed) {
      return strings.ValidationListNameRequired;
    }
    if (/["#%*:<>?\\/|]/.test(trimmed)) {
      return strings.ValidationListNameInvalidCharacters;
    }
    return '';
  }

  protected override getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.PropertyPaneDefaultsGroup,
              groupFields: [
                PropertyPaneToggle('defaultPublishOnComplete', {
                  label: strings.DefaultPublishLabel,
                  checked: this.properties.defaultPublishOnComplete
                }),
                PropertyPaneDropdown('defaultConflictMode', {
                  label: strings.ConflictModeLabel,
                  selectedKey: this.properties.defaultConflictMode,
                  options: [
                    { key: 'Rename', text: strings.ConflictRenameOption },
                    { key: 'Replace', text: strings.ConflictReplaceOption },
                    { key: 'Skip', text: strings.ConflictSkipOption },
                    { key: 'Fail', text: strings.ConflictFailOption }
                  ]
                })
              ]
            },
            {
              groupName: strings.PropertyPaneReportingGroup,
              groupFields: [
                PropertyPaneToggle('includePageTemplates', {
                  label: strings.IncludeTemplatesLabel,
                  checked: this.properties.includePageTemplates
                }),
                PropertyPaneToggle('persistReports', {
                  label: strings.PersistReportsLabel,
                  checked: this.properties.persistReports
                }),
                PropertyPaneTextField('reportStorageSiteUrl', {
                  label: strings.ReportStorageSiteUrlLabel,
                  description: strings.ReportStorageSiteUrlDescription,
                  onGetErrorMessage: (value: string) => this.validateStorageSiteUrl(value)
                }),
                PropertyPaneTextField('auditListName', {
                  label: strings.AuditListNameLabel,
                  onGetErrorMessage: (value: string) => this.validateListName(value)
                }),
                PropertyPaneTextField('logListName', {
                  label: strings.LogListNameLabel,
                  onGetErrorMessage: (value: string) => this.validateListName(value)
                }),
                PropertyPaneLabel('storageLocationLabel', {
                  text: formatString(strings.StorageLocationDescription, this.resolveProvisioningSiteUrl())
                }),
                PropertyPaneButton('provisionLists', {
                  text: strings.ProvisionListsButton,
                  buttonType: PropertyPaneButtonType.Normal,
                  onClick: () => {
                    void this.provisionReportingLists();
                    return this.properties.logListName;
                  }
                }),
                ...(this._provisioningStatus
                  ? [PropertyPaneLabel('provisioningStatus', { text: this._provisioningStatus })]
                  : [])
              ]
            },
            {
              groupName: strings.PropertyPaneCompatibilityGroup,
              groupFields: [
                PropertyPaneTextField('compatibilityOverridesJson', {
                  label: strings.CompatibilityOverridesLabel,
                  description: strings.CompatibilityOverridesDescription,
                  multiline: true,
                  rows: 8,
                  onGetErrorMessage: (value: string) => this.validateOverridesJson(value)
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
