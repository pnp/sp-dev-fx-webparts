import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { 
  ICustomAction, 
  ICustomActionFormData, 
  ICustomActionOperationResult, 
  CustomActionScope 
} from '../models';
import { SPPermission } from '@microsoft/sp-page-context';

export class CustomActionService {
  private context: WebPartContext;
  private baseUrl: string;

  constructor(context: WebPartContext, targetSiteUrl?: string) {
    this.context = context;
    this.baseUrl = this._normalizeBaseUrl(targetSiteUrl || context.pageContext.web.absoluteUrl);
  }

  public setTargetSite(siteUrl?: string): void {
    this.baseUrl = this._normalizeBaseUrl(siteUrl || this.context.pageContext.web.absoluteUrl);
  }

  private _normalizeBaseUrl(url: string): string {
    return url ? url.replace(/\/$/, '') : this.context.pageContext.web.absoluteUrl.replace(/\/$/, '');
  }

  private get _webEndpoint(): string {
    return `${this.baseUrl}/_api/web/usercustomactions`;
  }

  private get _siteEndpoint(): string {
    return `${this.baseUrl}/_api/site/usercustomactions`;
  }

  private get _webTitle(): string {
    return this.context.pageContext.web.title;
  }

  private get _siteTitle(): string {
    return this.context.pageContext.site.serverRequestPath || this._extractTitleFromUrl(this.context.pageContext.site.absoluteUrl);
  }

  /**
   * Retrieves custom actions from SharePoint
   * @param scope - The scope to search: 'Web', 'Site', or 'All'
   * @returns Promise<ICustomAction[]> - Array of custom actions
   */
  public async getCustomActions(scope: CustomActionScope | 'All' = 'All'): Promise<ICustomAction[]> {
    try {
      const customActions: ICustomAction[] = [];

      if (scope === 'All' || scope === CustomActionScope.Web) {
        const webActions = await this._getWebCustomActions();
        customActions.push(...webActions);
      }

      if (scope === 'All' || scope === CustomActionScope.Site) {
        const siteActions = await this._getSiteCustomActions();
        customActions.push(...siteActions);
      }

      return customActions.sort((a, b) => a.Sequence - b.Sequence);
    } catch (error) {
      console.error('Error retrieving custom actions:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to retrieve custom actions: ${errorMessage}`);
    }
  }

  /**
   * Creates a new custom action in SharePoint
   * @param formData - The custom action data
   * @param scope - The scope to create the action in ('Web' or 'Site')
   * @returns Promise<ICustomActionOperationResult> - Operation result with success status and details
   */
  public async createCustomAction(formData: ICustomActionFormData, scope: CustomActionScope): Promise<ICustomActionOperationResult> {
    try {
      const requestBody = this._buildCustomActionPayload(formData);
      const endpoint = scope === CustomActionScope.Site 
        ? this._siteEndpoint
        : this._webEndpoint;

      const response: SPHttpClientResponse = await this.context.spHttpClient.post(
        endpoint,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose',
            'odata-version': '3.0'
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (response.ok) {
        const data = await response.json();
        const customAction: ICustomAction = data.d || data;
        customAction.Scope = scope;
        return {
          success: true,
          message: 'Custom action created successfully',
          customAction
        };
      } else {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.text();
          console.error('Create custom action failed:', response.status, errorData);

          // Try to parse error data for more specific error messages
          if (errorData.includes('ODataException')) {
            errorMessage = 'SharePoint API error: Please check your custom action configuration and permissions.';
          } else if (response.status === 400) {
            errorMessage = 'Bad Request: The custom action configuration is invalid. Please check all required fields.';
          } else if (response.status === 403) {
            const isCrossSite = this.baseUrl !== this.context.pageContext.web.absoluteUrl;
            if (isCrossSite) {
              errorMessage = 'Access Denied: Unable to create custom actions on the selected site. This may be due to SharePoint Framework context limitations for cross-site operations. Try accessing the target site directly and using the web part there.';
            } else {
              errorMessage = 'Access Denied: Unable to create custom actions on this site. This may be due to SharePoint Framework app permissions or security policies. Even as a SharePoint admin, some operations may require different permission context.';
            }
          } else if (response.status === 404) {
            errorMessage = 'Site Not Found: The target site could not be found or is not accessible.';
          } else if (response.status >= 500) {
            errorMessage = 'Server Error: SharePoint is experiencing issues. Please try again later.';
          }
        } catch (parseError) {
          console.warn('Could not parse error response:', parseError);
        }

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error creating custom action:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: `Failed to create custom action: ${errorMessage}`
      };
    }
  }

  public async updateCustomAction(id: string, formData: ICustomActionFormData, scope: CustomActionScope): Promise<ICustomActionOperationResult> {
    try {
      const requestBody = this._buildCustomActionPayload(formData);
      const endpoint = scope === CustomActionScope.Site 
        ? `${this._siteEndpoint}('${id}')`
        : `${this._webEndpoint}('${id}')`;

      const response: SPHttpClientResponse = await this.context.spHttpClient.post(
        endpoint,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose',
            'X-HTTP-Method': 'MERGE',
            'IF-MATCH': '*'
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (response.ok || response.status === 204) {
        return {
          success: true,
          message: 'Custom action updated successfully'
        };
      } else {
        const errorData = await response.text();
        console.error('Update custom action failed:', response.status, errorData);
        throw new Error(`HTTP ${response.status}: ${response.statusText || errorData}`);
      }
    } catch (error) {
      console.error('Error updating custom action:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: `Failed to update custom action: ${errorMessage}`
      };
    }
  }

  public async deleteCustomAction(id: string, scope: CustomActionScope): Promise<ICustomActionOperationResult> {
    try {
      const endpoint = scope === CustomActionScope.Site 
        ? `${this._siteEndpoint}('${id}')`
        : `${this._webEndpoint}('${id}')`;

      const response: SPHttpClientResponse = await this.context.spHttpClient.post(
        endpoint,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=verbose',
            'X-HTTP-Method': 'DELETE',
            'IF-MATCH': '*'
          }
        }
      );

      if (response.ok || response.status === 204) {
        return {
          success: true,
          message: 'Custom action deleted successfully'
        };
      } else {
        const errorData = await response.text();
        console.error('Delete custom action failed:', response.status, errorData);
        throw new Error(`HTTP ${response.status}: ${response.statusText || errorData}`);
      }
    } catch (error) {
      console.error('Error deleting custom action:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: `Failed to delete custom action: ${errorMessage}`
      };
    }
  }

  public async setCustomActionEnabled(
    id: string,
    scope: CustomActionScope,
    enabled: boolean
  ): Promise<ICustomActionOperationResult> {
    try {
      const existingAction = await this._getCustomActionById(id, scope);

      if (!existingAction) {
        return {
          success: false,
          message: 'The custom action could not be found.'
        };
      }

      if (typeof (existingAction as any).Enabled !== 'boolean') {
        return {
          success: false,
          message: 'This custom action does not expose an Enabled flag. Remove and recreate the action or use SharePoint supported methods to disable it.'
        };
      }

      const endpoint = scope === CustomActionScope.Site 
        ? `${this._siteEndpoint}('${id}')`
        : `${this._webEndpoint}('${id}')`;

      const response: SPHttpClientResponse = await this.context.spHttpClient.post(
        endpoint,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-Type': 'application/json;odata=nometadata',
            'X-HTTP-Method': 'MERGE',
            'IF-MATCH': '*'
          },
          body: JSON.stringify({
            '__metadata': {
              'type': 'SP.UserCustomAction'
            },
            Enabled: enabled
          })
        }
      );

      if (response.ok || response.status === 204) {
        return {
          success: true,
          message: `Custom action ${enabled ? 'enabled' : 'disabled'} successfully`
        };
      }

      const errorData = await response.text();
      throw new Error(`HTTP ${response.status}: ${response.statusText || errorData}`);
    } catch (error) {
      console.error('Error updating custom action enabled state:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: `Failed to ${enabled ? 'enable' : 'disable'} custom action: ${errorMessage}`
      };
    }
  }

  private async _getWebCustomActions(): Promise<ICustomAction[]> {
    try {
      const endpoint = this._webEndpoint;
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        endpoint,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=verbose',
            'odata-version': '3.0'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        const results = data.d?.results || data.value || [];
        return results.map((action: any) => ({
          ...action,
          Scope: CustomActionScope.Web,
          SiteTitle: this._webTitle,
          SiteUrl: this.baseUrl
        }));
      } else {
        console.warn('Failed to get web custom actions:', response.status, response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error getting web custom actions:', error);
      return [];
    }
  }

  private async _getSiteCustomActions(): Promise<ICustomAction[]> {
    try {
      const endpoint = this._siteEndpoint;
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        endpoint,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=verbose',
            'odata-version': '3.0'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        const results = data.d?.results || data.value || [];
        return results.map((action: any) => ({
          ...action,
          Scope: CustomActionScope.Site,
          SiteTitle: this._siteTitle,
          SiteUrl: this.baseUrl
        }));
      } else {
        console.warn('Failed to get site custom actions:', response.status, response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error getting site custom actions:', error);
      return [];
    }
  }

  private _extractTitleFromUrl(url?: string): string {
    if (!url) {
      return 'Site Collection';
    }

    try {
      const urlObj = new URL(url);
      const segments = urlObj.pathname.split('/').filter(Boolean);
      return segments.length > 0 ? segments[segments.length - 1] : urlObj.hostname;
    } catch {
      return url;
    }
  }

  private _buildCustomActionPayload(formData: ICustomActionFormData): any {
    // SharePoint REST API requires proper type metadata
    const payload: any = {
      '__metadata': {
        'type': 'SP.UserCustomAction'
      },
      Title: formData.title || '',
      Description: formData.description || '',
      Location: formData.location,
      Sequence: formData.sequence,
      Name: formData.name,
      RegistrationType: formData.registrationType
    };

    if (typeof formData.enabled === 'boolean') {
      payload.Enabled = formData.enabled;
    }

    // Only add properties that have values to avoid null/undefined issues
    if (formData.scriptBlock && formData.scriptBlock.trim()) {
      payload.ScriptBlock = formData.scriptBlock.trim();
    }
    if (formData.scriptSrc && formData.scriptSrc.trim()) {
      payload.ScriptSrc = formData.scriptSrc.trim();
    }
    if (formData.url && formData.url.trim()) {
      payload.Url = formData.url.trim();
    }
    if (formData.commandUIExtension && formData.commandUIExtension.trim()) {
      payload.CommandUIExtension = formData.commandUIExtension.trim();
    }
    if (formData.registrationId && formData.registrationId.trim()) {
      payload.RegistrationId = formData.registrationId.trim();
    }
    if (formData.rights && formData.rights.trim()) {
      const rightsInput = formData.rights.trim();
      let basePermissions: { High: number; Low: number } | null = null;

      try {
        const parsed = JSON.parse(rightsInput);
        const parsedHigh = Number(parsed?.High ?? parsed?.high);
        const parsedLow = Number(parsed?.Low ?? parsed?.low);
        if (!isNaN(parsedHigh) && !isNaN(parsedLow)) {
          basePermissions = { High: parsedHigh, Low: parsedLow };
        }
      } catch {
        // Not JSON, fall back to named permissions
      }

      if (!basePermissions) {
        const tokens = rightsInput.split(/[,;]+/).map(token => token.trim()).filter(token => token.length > 0);
        if (tokens.length > 0) {
          let combinedHigh = 0;
          let combinedLow = 0;

          for (const token of tokens) {
            const normalized = token.charAt(0).toLowerCase() + token.slice(1);
            const permission: SPPermission | undefined =
              (SPPermission as unknown as Record<string, SPPermission>)[token] ||
              (SPPermission as unknown as Record<string, SPPermission>)[normalized];

            if (permission?.value) {
              combinedHigh |= permission.value.High;
              combinedLow |= permission.value.Low;
            } else {
              console.warn(`Unknown permission '${token}' specified for custom action rights.`, token);
            }
          }

          if (combinedHigh !== 0 || combinedLow !== 0) {
            basePermissions = { High: combinedHigh, Low: combinedLow };
          }
        }
      }

      if (basePermissions) {
        payload.Rights = basePermissions;
      } else {
        console.warn('Unable to parse custom action rights value; omitting Rights property.');
      }
    }
    if (formData.group && formData.group.trim()) {
      payload.Group = formData.group.trim();
    }
    if (formData.hostProperties && formData.hostProperties.trim()) {
      payload.HostProperties = formData.hostProperties.trim();
    }
    if (formData.clientSideComponentId && formData.clientSideComponentId.trim()) {
      payload.ClientSideComponentId = formData.clientSideComponentId.trim();
    }
    if (formData.clientSideComponentProperties && formData.clientSideComponentProperties.trim()) {
      payload.ClientSideComponentProperties = formData.clientSideComponentProperties.trim();
    }
    if (formData.imageUrl && formData.imageUrl.trim()) {
      payload.ImageUrl = formData.imageUrl.trim();
    }

    return payload;
  }

  // Note: SPFx HttpClient handles request digest automatically
  // This method is kept for debugging purposes only
  private async _getRequestDigest(): Promise<string> {
    // Try to get from SPFx page context for debugging
    if (this.context.pageContext?.legacyPageContext?.formDigestValue) {
      return this.context.pageContext.legacyPageContext.formDigestValue;
    }

    // Try to get from window context for debugging
    const windowDigest = (window as any)?.__REQUESTDIGEST || (window as any)?._spPageContextInfo?.formDigestValue;
    if (windowDigest) {
      return windowDigest;
    }

    throw new Error('No digest found, but SPHttpClient should handle this automatically');
  }

  private async _getCustomActionById(id: string, scope: CustomActionScope): Promise<ICustomAction | null> {
    const endpoint = scope === CustomActionScope.Site
      ? `${this._siteEndpoint}('${id}')`
      : `${this._webEndpoint}('${id}')`;

    const response = await this.context.spHttpClient.get(
      endpoint,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata'
        }
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (!data) {
      return null;
    }

    return { ...data, Scope: scope } as ICustomAction;
  }
}
