import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { 
  ICustomAction, 
  ICustomActionFormData, 
  ICustomActionOperationResult, 
  CustomActionScope 
} from '../models';

export class CustomActionService {
  private context: WebPartContext;

  constructor(context: WebPartContext) {
    this.context = context;
  }

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

  public async createCustomAction(formData: ICustomActionFormData, scope: CustomActionScope): Promise<ICustomActionOperationResult> {
    try {
      const requestBody = this._buildCustomActionPayload(formData);
      const endpoint = scope === CustomActionScope.Site 
        ? `${this.context.pageContext.web.absoluteUrl}/_api/site/usercustomactions`
        : `${this.context.pageContext.web.absoluteUrl}/_api/web/usercustomactions`;

      console.log('Creating custom action with payload:', requestBody);

      const response: SPHttpClientResponse = await this.context.spHttpClient.post(
        endpoint,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose'
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
        const errorData = await response.text();
        console.error('Create custom action failed:', response.status, errorData);
        throw new Error(`HTTP ${response.status}: ${response.statusText || errorData}`);
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
        ? `${this.context.pageContext.web.absoluteUrl}/_api/site/usercustomactions('${id}')`
        : `${this.context.pageContext.web.absoluteUrl}/_api/web/usercustomactions('${id}')`;

      console.log('Updating custom action with payload:', requestBody);

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
        ? `${this.context.pageContext.web.absoluteUrl}/_api/site/usercustomactions('${id}')`
        : `${this.context.pageContext.web.absoluteUrl}/_api/web/usercustomactions('${id}')`;

      console.log('Deleting custom action:', id, 'from scope:', scope);

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

  private async _getWebCustomActions(): Promise<ICustomAction[]> {
    try {
      const endpoint = `${this.context.pageContext.web.absoluteUrl}/_api/web/usercustomactions`;
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
        return results.map((action: any) => ({ ...action, Scope: CustomActionScope.Web }));
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
      const endpoint = `${this.context.pageContext.web.absoluteUrl}/_api/site/usercustomactions`;
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
        return results.map((action: any) => ({ ...action, Scope: CustomActionScope.Site }));
      } else {
        console.warn('Failed to get site custom actions:', response.status, response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error getting site custom actions:', error);
      return [];
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
      payload.Rights = formData.rights.trim();
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
    console.log('Note: Request digest is handled automatically by SPFx HttpClient');
    
    // Try to get from SPFx page context for debugging
    if (this.context.pageContext?.legacyPageContext?.formDigestValue) {
      console.log('Found digest in page context');
      return this.context.pageContext.legacyPageContext.formDigestValue;
    }

    // Try to get from window context for debugging
    const windowDigest = (window as any)?.__REQUESTDIGEST || (window as any)?._spPageContextInfo?.formDigestValue;
    if (windowDigest) {
      console.log('Found digest in window context');
      return windowDigest;
    }

    throw new Error('No digest found, but SPHttpClient should handle this automatically');
  }
}