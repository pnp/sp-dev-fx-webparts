import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Version } from '@microsoft/sp-core-library';
import {
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneLabel
} from '@microsoft/sp-property-pane';
import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  type IReadonlyTheme
} from '@microsoft/sp-component-base';
import * as strings from 'ProvisioningCenterWebPartStrings';
import { App } from '../../components/App';
import type { IAppProps } from '../../components/App';
import { createServices } from '../../services/createServices';
import type { IServices } from '../../services/createServices';
import { createAppTheme, type TeamsAppTheme } from '../../theme/createAppTheme';
import { ListProvisioningService } from '../../services/provisioning/ListProvisioningService';

export interface IProvisioningCenterWebPartProps {}

export default class ProvisioningCenterWebPart extends BaseClientSideWebPart<IProvisioningCenterWebPartProps> {
  private _services: IServices | undefined;
  private _themeProvider: ThemeProvider | undefined;
  private _themeVariant: IReadonlyTheme | undefined;
  private _provisioning: boolean = false;
  private _provisionStatus: string = '';
  private _root: Root | undefined;
  private _disposed: boolean = false;

  protected async onInit(): Promise<void> {
    await super.onInit();
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this._themeVariant = this._themeProvider.tryGetTheme();
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChanged);
    try {
      this._services = await createServices(this.context);
      this._provisionStatus = strings.ProvisionStatusIdle;
      this._exposeDiagnostics(this._services);
    } catch (err) {
      const message: string = err instanceof Error ? err.message : String(err);
      this._provisionStatus = `${strings.ProvisionStatusError} ${message}`.trim();
      console.error('[UPC] service composition failed', err);
    }
  }

  private _exposeDiagnostics(services: IServices): void {
    const handle = {
      events: () => services.telemetry.events.slice(),
      dump: (): void => {
        const rows = services.telemetry.events.map((e) => ({
          time: e.timestamp,
          level: e.level,
          name: e.name,
          ...(e.properties ?? {})
        }));
        if (rows.length === 0) {
          console.log('[UPC] no telemetry recorded yet');
          return;
        }
        console.table(rows);
      },
      probeJobs: async (): Promise<unknown> => {
        const started: number = Date.now();
        try {
          const page = await services.data.getJobSummariesPaged();
          return { ok: true, ms: Date.now() - started, count: page.items.length, truncated: page.truncated };
        } catch (err) {
          return {
            ok: false,
            ms: Date.now() - started,
            name: err instanceof Error ? err.name : 'unknown',
            message: err instanceof Error ? err.message : String(err),
            status: typeof err === 'object' && err !== null && 'status' in err ? (err as { status: unknown }).status : undefined
          };
        }
      },
      schema: () => services.data.validateSchema(),
      operatorUpn: services.operatorUpn
    };
    (window as unknown as Record<string, unknown>).__UPC = handle;
    console.info('[UPC] diagnostics ready: __UPC.dump(), __UPC.probeJobs(), __UPC.schema()');
  }

  private _handleThemeChanged = (args: ThemeChangedEventArgs): void => {
    this._themeVariant = args.theme;
    this.render();
  };

  private _getTeamsTheme(): TeamsAppTheme | undefined {
    const teams = this.context.sdks.microsoftTeams;
    if (!teams) {
      return undefined;
    }
    const ctx = teams.context as { theme?: string; app?: { theme?: string } } | undefined;
    const theme: string | undefined = ctx?.app?.theme ?? ctx?.theme;
    if (theme === 'dark' || theme === 'contrast') {
      return theme;
    }
    return theme ? 'default' : undefined;
  }

  public render(): void {
    if (this._disposed || !this._services) {
      return;
    }
    const element: React.ReactElement<IAppProps> = React.createElement(App, {
      services: this._services,
      theme: createAppTheme(this._themeVariant, this._getTeamsTheme()),
      dir: document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr',
      instanceId: this.context.instanceId
    });
    if (!this._root) {
      this._root = createRoot(this.domElement);
    }
    this._root.render(element);
  }

  protected onDispose(): void {
    this._disposed = true;
    this._themeProvider?.themeChangedEvent.remove(this, this._handleThemeChanged);
    this._root?.unmount();
    this._root = undefined;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private _onProvisionListsClick = (): void => {
    void this._provisionLists();
  };

  private async _provisionLists(): Promise<void> {
    if (this._provisioning) {
      return;
    }
    this._provisioning = true;
    this._provisionStatus = strings.ProvisionStatusRunning;
    this.context.propertyPane.refresh();
    try {
      const service: ListProvisioningService = new ListProvisioningService(this.context);
      const result = await service.ensureAllLists((progress) => {
        this._provisionStatus = `${strings.ProvisionStatusRunning} ${progress.message}`;
        this.context.propertyPane.refresh();
      });
      this._provisionStatus =
        `${strings.ProvisionStatusDone} ` +
        `${strings.ProvisionCreatedLabel}: ${result.createdLists.length}, ` +
        `${strings.ProvisionExistingLabel}: ${result.existingLists.length}, ` +
        `${strings.ProvisionFieldsLabel}: ${result.createdFields}, ` +
        `${strings.ProvisionItemsLabel}: ${result.createdItems}, ` +
        `${strings.ProvisionIndexesLabel}: ${result.createdIndexes}` +
        (result.warnings.length > 0
          ? ` | ${strings.ProvisionWarningsLabel}: ${result.warnings.length} — ${result.warnings.join('; ')}`
          : '');
      if (result.warnings.length > 0) {
        console.warn('[UPC] provisioning warnings', result.warnings);
      }
      this.render();
    } catch (err) {
      const message: string = err instanceof Error ? err.message : '';
      this._provisionStatus = `${strings.ProvisionStatusError} ${message}`.trim();
    } finally {
      this._provisioning = false;
      this.context.propertyPane.refresh();
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.ProvisionGroupName,
              groupFields: [
                PropertyPaneLabel('provisionIntro', {
                  text: strings.ProvisionIntro
                }),
                PropertyPaneButton('provisionLists', {
                  text: strings.ProvisionButtonLabel,
                  buttonType: PropertyPaneButtonType.Primary,
                  disabled: this._provisioning,
                  onClick: this._onProvisionListsClick
                }),
                PropertyPaneLabel('provisionStatus', {
                  text: this._provisionStatus
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
