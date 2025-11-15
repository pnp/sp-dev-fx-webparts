import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneToggle,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import EnhancedGroupMembers from './components/EnhancedGroupMembers';
import ErrorBoundary from './components/ErrorBoundary';
import { IGroupMembersWebPartProps } from './types/webPartProps';
import {
  WebPartTitle
} from '@pnp/spfx-controls-react/lib/WebPartTitle';
import * as strings from 'GroupMembersWebPartStrings';

// Import the new architecture
import { 
  createServiceContainer, 
  SERVICE_TOKENS,
  ServiceProvider
} from './services/ServiceContainer';
import { ILoggingService } from './services/LoggingService';
import { StateManager, StateManagerProvider } from './state/StateManager';

export default class GroupMembersWebPart extends BaseClientSideWebPart<IGroupMembersWebPartProps> {
  private serviceContainer: ReturnType<typeof createServiceContainer> | undefined;
  private stateManager: StateManager | undefined;

  protected onInit(): Promise<void> {
    // Initialize the service container
    this.serviceContainer = createServiceContainer(this.context);

    // Initialize services
    const loggingService = this.serviceContainer.resolve<ILoggingService>(SERVICE_TOKENS.LOGGING_SERVICE);

    // Log web part initialization
    loggingService.info('WebPart', 'Enhanced GroupMembers WebPart initialized', {
      instanceId: this.context.instanceId,
      siteUrl: this.context.pageContext.web.absoluteUrl,
      userLoginName: this.context.pageContext.user.loginName
    });

    // Set default values for new properties if they're undefined
    if (this.properties.title === undefined) {
      this.properties.title = 'Site Members';
    }
    if (this.properties.itemsPerPage === undefined) {
      this.properties.itemsPerPage = 10;
    }
    if (this.properties.sortField === undefined) {
      this.properties.sortField = 'name';
    }
    if (this.properties.showPresenceIndicator === undefined) {
      this.properties.showPresenceIndicator = false;
    }
    if (this.properties.showSearchBox === undefined) {
      this.properties.showSearchBox = true;
    }
    if (this.properties.showSummaryGrid === undefined) {
      this.properties.showSummaryGrid = false;
    }
    if (this.properties.showRolePivot === undefined) {
      this.properties.showRolePivot = false;
    }
    if (this.properties.showPageHeader === undefined) {
      this.properties.showPageHeader = false;
    }
    if (this.properties.pageHeaderTitle === undefined) {
      this.properties.pageHeaderTitle = 'People directory';
    }
    if (this.properties.pageHeaderSubtitle === undefined) {
      this.properties.pageHeaderSubtitle = 'Your site directory';
    }
    if (this.properties.showRoleLabels === undefined) {
      this.properties.showRoleLabels = false;
    }
    if (this.properties.hideClaimsPrincipals === undefined) {
      this.properties.hideClaimsPrincipals = true;
    }
    if (this.properties.showSectionBorders === undefined) {
      this.properties.showSectionBorders = true;
    }
    if (this.properties.showCommandBar === undefined) {
      this.properties.showCommandBar = true;
    }
    if (this.properties.excludedPrincipals === undefined) {
      this.properties.excludedPrincipals = '';
    }

    // Initialize state manager per instance
    this.stateManager = new StateManager({
      ui: {
        selectedUser: undefined,
        sortField: this.properties.sortField,
        itemsPerPage: this.properties.itemsPerPage,
        presenceEnabled: this.properties.showPresenceIndicator,
        showSearchBox: this.properties.showSearchBox
      }
    });

    this.syncStateWithProperties();

    return super.onInit();
  }

  public render(): void {
    if (!this.serviceContainer || !this.stateManager) {
      return;
    }

    const loggingService = this.serviceContainer.resolve<ILoggingService>(SERVICE_TOKENS.LOGGING_SERVICE);
    
    let elementToRender: React.ReactElement | null = null;

    try {
      // Convert toggle states to array of roles
      const roles = [
        this.properties.showOwners && 'owner',
        this.properties.showAdmins && 'admin',
        this.properties.showMembers && 'member',
        this.properties.showVisitors && 'visitor'
      ].filter(Boolean) as string[];

      if (roles.length === 0) {
        loggingService.warn('WebPart', 'No roles selected for display');
      }

      const webPartTitleElement = React.createElement(
        WebPartTitle,
        {
          displayMode: this.displayMode,
          title: this.properties.title,
          updateProperty: (value: string) => {
            this.properties.title = value;
          }
        }
      );

      const groupMembersElement = React.createElement(
        EnhancedGroupMembers,
        {
          context: this.context,
          roles,
          itemsPerPage: this.properties.itemsPerPage,
          sortField: this.properties.sortField,
          showSearchBox: this.properties.showSearchBox,
          showPresenceIndicator: this.properties.showPresenceIndicator,
          ownerLabel: this.properties.ownerLabel,
          adminLabel: this.properties.adminLabel,
          memberLabel: this.properties.memberLabel,
          visitorLabel: this.properties.visitorLabel,
          showSummaryGrid: this.properties.showSummaryGrid,
          showRolePivot: this.properties.showRolePivot,
          showPageHeader: this.properties.showPageHeader,
          pageHeaderTitle: this.properties.pageHeaderTitle,
          pageHeaderSubtitle: this.properties.pageHeaderSubtitle,
          showRoleLabels: this.properties.showRoleLabels,
          hideClaimsPrincipals: this.properties.hideClaimsPrincipals,
          showSectionBorders: this.properties.showSectionBorders,
          showCommandBar: this.properties.showCommandBar,
          excludedPrincipals: this.properties.excludedPrincipals
        }
      );

      const contentElement = React.createElement(
        'div',
        {},
        webPartTitleElement,
        groupMembersElement
      );

      const wrappedElement = React.createElement(
        ErrorBoundary,
        {
          level: 'critical' as const,
          context: 'GroupMembersWebPart',
          onError: (error, errorInfo) => {
            loggingService.critical('WebPart', 'Critical error in web part', error, {
              errorInfo,
              properties: this.properties
            });
          }
        },
        contentElement
      );

      elementToRender = React.createElement(
        ServiceProvider,
        { container: this.serviceContainer },
        React.createElement(
          StateManagerProvider,
          { stateManager: this.stateManager },
          wrappedElement
        )
      );

      loggingService.debug('WebPart', 'Web part rendered successfully', {
        roles,
        itemsPerPage: this.properties.itemsPerPage,
        showSearchBox: this.properties.showSearchBox
      });

    } catch (error) {
      loggingService.critical('WebPart', 'Failed to render web part', error as Error);
      
      // Render error fallback
      const errorContent = React.createElement('div', { style: { padding: '20px' } }, 
        strings.UnexpectedErrorText
      );

      const errorElement = React.createElement(
        ErrorBoundary,
        {
          level: 'critical' as const,
          context: 'WebPartRenderError'
        },
        errorContent
      );
      
      elementToRender = React.createElement(
        ServiceProvider,
        { container: this.serviceContainer },
        React.createElement(
          StateManagerProvider,
          { stateManager: this.stateManager },
          errorElement
        )
      );
    }

    if (elementToRender) {
      ReactDom.render(elementToRender, this.domElement);
    }
  }

  protected onDispose(): void {
    try {
      const loggingService = this.serviceContainer?.resolve<ILoggingService>(SERVICE_TOKENS.LOGGING_SERVICE);
      
      if (loggingService) {
        loggingService.info('WebPart', 'Disposing GroupMembers WebPart');
      }

      // Clean up React
      ReactDom.unmountComponentAtNode(this.domElement);

      // Dispose services
      if (this.serviceContainer) {
        this.serviceContainer.dispose();
        this.serviceContainer = undefined;
      }

    } catch (error) {
      console.error('Error during web part disposal:', error);
    }

    super.onDispose();
  }

  protected get dataVersion(): Version {
    return Version.parse('2.0');
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: unknown, newValue: unknown): void {
    const loggingService = this.serviceContainer?.resolve<ILoggingService>(SERVICE_TOKENS.LOGGING_SERVICE);
    
    if (loggingService) {
      loggingService.debug('WebPart', 'Property pane field changed', {
        propertyPath,
        oldValue,
        newValue
      });
    }

    this.syncStateWithProperties(propertyPath, newValue);

    // Property changes are handled by the parent class
    // Configuration updates could be added here if needed

    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.CoreSettingsDescription },
          groups: [
            {
              groupName: strings.CoreSettingsGroupName,
              groupFields: [
                PropertyPaneTextField('title', { label: strings.WebPartTitleLabel, placeholder: strings.WebPartTitlePlaceholder }),
                PropertyPaneToggle('showOwners', { label: strings.ShowOwnersLabel, onText: strings.YesText, offText: strings.NoText }),
                PropertyPaneToggle('showAdmins', { label: strings.ShowAdminsLabel, onText: strings.YesText, offText: strings.NoText }),
                PropertyPaneToggle('showMembers', { label: strings.ShowMembersLabel, onText: strings.YesText, offText: strings.NoText }),
                PropertyPaneToggle('showVisitors', { label: strings.ShowVisitorsLabel, onText: strings.YesText, offText: strings.NoText }),
                PropertyPaneSlider('itemsPerPage', { label: strings.ItemsPerPageLabel, min: 5, max: 50, step: 5, showValue: true }),
                PropertyPaneChoiceGroup('sortField', {
                  label: strings.DefaultSortFieldLabel,
                  options: [
                    { key: 'name', text: strings.NameSortOption },
                    { key: 'jobTitle', text: strings.JobTitleSortOption }
                  ]
                })
              ]
            }
          ]
        },
        {
          header: { description: strings.LayoutSettingsDescription },
          groups: [
            {
              groupName: strings.LayoutSettingsGroupName,
              groupFields: [
                PropertyPaneToggle('showSearchBox', { label: strings.ShowSearchBoxLabel, onText: strings.ShowText, offText: strings.HideText }),
                PropertyPaneToggle('showPresenceIndicator', { label: strings.ShowPresenceLabel, onText: strings.ShowText, offText: strings.HideText }),
                PropertyPaneToggle('showCommandBar', { label: strings.ShowCommandBarLabel, onText: strings.VisibleText, offText: strings.HiddenText }),
                PropertyPaneToggle('showPageHeader', { label: strings.ShowPageHeaderLabel, onText: strings.VisibleText, offText: strings.HiddenText }),
                PropertyPaneToggle('showSummaryGrid', { label: strings.ShowSummaryGridLabel, onText: strings.VisibleText, offText: strings.HiddenText }),
                PropertyPaneToggle('showRolePivot', { label: strings.ShowRolePivotLabel, onText: strings.VisibleText, offText: strings.HiddenText }),
                PropertyPaneToggle('showSectionBorders', { label: strings.ShowSectionBordersLabel, onText: strings.BorderedText, offText: strings.BorderlessText }),
                PropertyPaneToggle('showRoleLabels', { label: strings.ShowRoleLabelsLabel, onText: strings.ShowText, offText: strings.HideText })
              ]
            }
          ]
        },
        {
          header: { description: strings.HeaderSettingsDescription },
          groups: [
            {
              groupName: strings.HeaderSettingsGroupName,
              groupFields: [
                PropertyPaneTextField('pageHeaderTitle', { label: strings.PageHeaderTitleLabel, placeholder: strings.PageHeaderTitlePlaceholder }),
                PropertyPaneTextField('pageHeaderSubtitle', { label: strings.PageHeaderSubtitleLabel, placeholder: strings.PageHeaderSubtitlePlaceholder })
              ]
            }
          ]
        },
        {
          header: { description: strings.RoleLabelsDescription },
          groups: [
            {
              groupName: strings.RoleLabelsGroupName,
              groupFields: [
                PropertyPaneTextField('ownerLabel', { label: strings.OwnersLabelField, placeholder: strings.OwnersPlaceholder }),
                PropertyPaneTextField('adminLabel', { label: strings.AdminsLabelField, placeholder: strings.AdminsPlaceholder }),
                PropertyPaneTextField('memberLabel', { label: strings.MembersLabelField, placeholder: strings.MembersPlaceholder }),
                PropertyPaneTextField('visitorLabel', { label: strings.VisitorsLabelField, placeholder: strings.VisitorsPlaceholder })
              ]
            }
          ]
        },
        {
          header: { description: strings.FilteringSettingsDescription },
          groups: [
            {
              groupName: strings.FilteringGroupName,
              groupFields: [
                PropertyPaneToggle('hideClaimsPrincipals', { label: strings.HideClaimsPrincipalsLabel, onText: strings.HideText, offText: strings.ShowText }),
                PropertyPaneTextField('excludedPrincipals', {
                  label: strings.ExcludedPrincipalsLabel,
                  multiline: true,
                  resizable: true,
                  placeholder: strings.ExcludedPrincipalsPlaceholder,
                  description: strings.ExcludedPrincipalsDescription
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private syncStateWithProperties(propertyPath?: string, newValue?: unknown): void {
    if (!this.stateManager) {
      return;
    }

    const applyAll = !propertyPath;

    if (applyAll || propertyPath === 'itemsPerPage') {
      const itemsPerPage = (applyAll ? this.properties.itemsPerPage : newValue) as number;
      if (typeof itemsPerPage === 'number' && itemsPerPage > 0) {
        this.stateManager.setItemsPerPage(itemsPerPage);
      }
    }

    if (applyAll || propertyPath === 'sortField') {
      const sortField = (applyAll ? this.properties.sortField : newValue) as string;
      if (sortField) {
        this.stateManager.setSortField(sortField);
      }
    }

    if (applyAll || propertyPath === 'showPresenceIndicator') {
      const presence = (applyAll ? this.properties.showPresenceIndicator : newValue) as boolean;
      this.stateManager.togglePresence(!!presence);
    }

    if (applyAll || propertyPath === 'showSearchBox') {
      const showSearch = (applyAll ? this.properties.showSearchBox : newValue) as boolean;
      this.stateManager.setShowSearchBox(showSearch !== false);
    }
  }
}
