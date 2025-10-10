import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { 
  IUserPermissions, 
  IPermissionCheck, 
  PermissionLevel, 
  CustomActionRole, 
  IRoleDefinition,
  IPermissionConfig
} from '../models';

export class PermissionService {
  private context: WebPartContext;
  private userPermissions: IUserPermissions | null = null;
  private userGroups: string[] = [];
  private userRole: CustomActionRole = CustomActionRole.Viewer;

  constructor(context: WebPartContext) {
    this.context = context;
  }

  public async initializePermissions(): Promise<void> {
    try {
      await this._loadUserGroups();
      await this._loadUserPermissions();
      this.userRole = this._determineUserRole();
      this.userPermissions = this._buildUserPermissions();
    } catch (error) {
      console.error('Error initializing permissions:', error);
      this.userPermissions = this._getDefaultPermissions();
    }
  }

  public async checkPermission(action: keyof IUserPermissions): Promise<IPermissionCheck> {
    if (!this.userPermissions) {
      await this.initializePermissions();
    }

    const hasPermission = this.userPermissions![action];
    
    return {
      hasPermission,
      reason: hasPermission ? undefined : `User lacks ${action} permission`,
      requiredPermission: action
    };
  }

  public getUserRole(): CustomActionRole {
    return this.userRole;
  }

  public getUserPermissions(): IUserPermissions | null {
    return this.userPermissions;
  }

  public async hasSharePointPermission(permissionKind: string): Promise<boolean> {
    try {
      const endpoint = `${this.context.pageContext.web.absoluteUrl}/_api/web/doesuserhavepermissions(@v)?@v=${encodeURIComponent("'" + permissionKind + "'")}`;
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        endpoint,
        SPHttpClient.configurations.v1
      );

      if (response.ok) {
        const data = await response.json();
        return data.value || false;
      }
      return false;
    } catch (error) {
      console.error('Error checking SharePoint permission:', error);
      return false;
    }
  }

  public async getUserGroups(): Promise<string[]> {
    if (this.userGroups.length === 0) {
      await this._loadUserGroups();
    }
    return this.userGroups;
  }

  public isInAdminGroup(): boolean {
    const adminGroups = this._getPermissionConfig().adminGroups;
    return this.userGroups.some(group => 
      adminGroups.some(adminGroup => 
        group.toLowerCase().includes(adminGroup.toLowerCase())
      )
    );
  }

  public canPerformBulkOperations(): boolean {
    return this.userPermissions?.canBulkOperations || false;
  }

  private async _loadUserGroups(): Promise<void> {
    try {
      const endpoint = `${this.context.pageContext.web.absoluteUrl}/_api/web/currentuser/groups`;
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        endpoint,
        SPHttpClient.configurations.v1
      );

      if (response.ok) {
        const data = await response.json();
        this.userGroups = (data.d?.results || data.value || []).map((group: any) => group.Title);
      }
    } catch (error) {
      console.error('Error loading user groups:', error);
      this.userGroups = [];
    }
  }

  private async _loadUserPermissions(): Promise<void> {
    try {
      // Check various SharePoint permissions
      const permissions = await Promise.all([
        this.hasSharePointPermission('ManageWeb'),
        this.hasSharePointPermission('ManageLists'), 
        this.hasSharePointPermission('AddAndCustomizePages'),
        this.hasSharePointPermission('ApplyThemeAndBorder'),
        this.hasSharePointPermission('ViewPages'),
        this.hasSharePointPermission('EditListItems'),
        this.hasSharePointPermission('DeleteListItems')
      ]);

      // Store permissions in private property since legacyPageContext is readonly
      (this as any)._userSharePointPermissions = {
        manageWeb: permissions[0],
        manageLists: permissions[1],
        addAndCustomizePages: permissions[2],
        applyThemeAndBorder: permissions[3],
        viewPages: permissions[4],
        editListItems: permissions[5],
        deleteListItems: permissions[6]
      };
    } catch (error) {
      console.error('Error loading user permissions:', error);
    }
  }

  private _determineUserRole(): CustomActionRole {
    // Check if user is in admin groups
    if (this.isInAdminGroup()) {
      return CustomActionRole.Administrator;
    }

    // Check SharePoint permissions to determine role
    const userPermissions = (this as any)._userSharePointPermissions;
    if (userPermissions?.manageWeb) {
      return CustomActionRole.Administrator;
    }
    
    if (userPermissions?.manageLists || userPermissions?.addAndCustomizePages) {
      return CustomActionRole.Designer;
    }
    
    if (userPermissions?.editListItems) {
      return CustomActionRole.Contributor;
    }

    return CustomActionRole.Viewer;
  }

  private _buildUserPermissions(): IUserPermissions {
    const roleDefinitions = this._getPermissionConfig().roles;
    const userRoleDef = roleDefinitions.find(r => r.role === this.userRole);
    
    if (userRoleDef) {
      return userRoleDef.permissions;
    }

    // Fallback to default permissions based on role
    return this._getDefaultPermissionsForRole(this.userRole);
  }

  private _getDefaultPermissionsForRole(role: CustomActionRole): IUserPermissions {
    switch (role) {
      case CustomActionRole.Administrator:
        return {
          canView: true,
          canCreate: true,
          canEdit: true,
          canDelete: true,
          canBulkOperations: true,
          canExport: true,
          canImport: true,
          canManageTemplates: true,
          canAccessAdvancedFeatures: true,
          isAdmin: true
        };
      
      case CustomActionRole.Designer:
        return {
          canView: true,
          canCreate: true,
          canEdit: true,
          canDelete: true,
          canBulkOperations: false,
          canExport: true,
          canImport: false,
          canManageTemplates: true,
          canAccessAdvancedFeatures: true,
          isAdmin: false
        };
      
      case CustomActionRole.Contributor:
        return {
          canView: true,
          canCreate: true,
          canEdit: true,
          canDelete: false,
          canBulkOperations: false,
          canExport: true,
          canImport: false,
          canManageTemplates: false,
          canAccessAdvancedFeatures: false,
          isAdmin: false
        };
      
      case CustomActionRole.Viewer:
      default:
        return {
          canView: true,
          canCreate: false,
          canEdit: false,
          canDelete: false,
          canBulkOperations: false,
          canExport: true,
          canImport: false,
          canManageTemplates: false,
          canAccessAdvancedFeatures: false,
          isAdmin: false
        };
    }
  }

  private _getDefaultPermissions(): IUserPermissions {
    return this._getDefaultPermissionsForRole(CustomActionRole.Viewer);
  }

  private _getPermissionConfig(): IPermissionConfig {
    // This would typically come from web part properties or a config service
    return {
      enableRBAC: true,
      defaultRole: CustomActionRole.Viewer,
      roles: [
        {
          role: CustomActionRole.Administrator,
          description: 'Full access to all custom action management features',
          requiredSPPermissions: ['ManageWeb'],
          permissions: this._getDefaultPermissionsForRole(CustomActionRole.Administrator)
        },
        {
          role: CustomActionRole.Designer,
          description: 'Can create and modify custom actions',
          requiredSPPermissions: ['ManageLists', 'AddAndCustomizePages'],
          permissions: this._getDefaultPermissionsForRole(CustomActionRole.Designer)
        },
        {
          role: CustomActionRole.Contributor,
          description: 'Can create basic custom actions',
          requiredSPPermissions: ['EditListItems'],
          permissions: this._getDefaultPermissionsForRole(CustomActionRole.Contributor)
        },
        {
          role: CustomActionRole.Viewer,
          description: 'Read-only access to custom actions',
          requiredSPPermissions: ['ViewPages'],
          permissions: this._getDefaultPermissionsForRole(CustomActionRole.Viewer)
        }
      ],
      adminGroups: ['Site Owners', 'Site Collection Administrators', 'SharePoint Admins'],
      bypassGroups: ['System Account', 'SharePoint App']
    };
  }
}