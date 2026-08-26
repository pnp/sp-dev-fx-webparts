import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import {
  ICustomActionTemplate,
  ITemplateSearchCriteria,
  ITemplateSearchResult,
  ITemplateFormData,
  ITemplateValidationResult,
  ITemplateCategory,
  TemplateSortField,
  TemplateParameterType
} from '../models/ITemplate';
import { ICustomAction, ICustomActionFormData, CustomActionScope, RegistrationType } from '../models';
import { CustomActionService } from './CustomActionService';

export class TemplateService {
  private context: WebPartContext;
  private customActionService: CustomActionService;
  private builtInTemplates: ICustomActionTemplate[];
  private baseUrl: string;

  constructor(context: WebPartContext, targetSiteUrl?: string) {
    this.context = context;
    this.baseUrl = this._normalizeBaseUrl(targetSiteUrl || context.pageContext.web.absoluteUrl);
    this.customActionService = new CustomActionService(context, this.baseUrl);
    this.builtInTemplates = this._initializeBuiltInTemplates();
  }

  public setTargetSite(siteUrl?: string): void {
    this.baseUrl = this._normalizeBaseUrl(siteUrl || this.context.pageContext.web.absoluteUrl);
    this.customActionService.setTargetSite(this.baseUrl);
  }

  private _normalizeBaseUrl(url: string): string {
    return url ? url.replace(/\/$/, '') : this.context.pageContext.web.absoluteUrl.replace(/\/$/, '');
  }

  private _buildUrl(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }
    const trimmed = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${trimmed}`;
  }

  /**
   * Searches for custom action templates based on specified criteria
   * @param criteria - Search criteria including text, category, tags, etc.
   * @returns Promise<ITemplateSearchResult> - Search results with matched templates
   */
  public async searchTemplates(criteria: ITemplateSearchCriteria): Promise<ITemplateSearchResult> {
    try {
      let templates = [...this.builtInTemplates];
      
      const userTemplates = await this._getUserTemplates();
      templates.push(...userTemplates);

      // Apply search filters
      if (criteria.searchTerm) {
        const searchTerm = criteria.searchTerm.toLowerCase();
        templates = templates.filter(template => 
          template.name.toLowerCase().includes(searchTerm) ||
          template.description.toLowerCase().includes(searchTerm) ||
          template.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }

      if (criteria.category && criteria.category.length > 0) {
        templates = templates.filter(template => 
          criteria.category.includes(template.category)
        );
      }

      if (criteria.tags && criteria.tags.length > 0) {
        templates = templates.filter(template => 
          criteria.tags.some(tag => template.tags.includes(tag))
        );
      }

      if (criteria.author && criteria.author.length > 0) {
        templates = templates.filter(template => 
          criteria.author.includes(template.author)
        );
      }

      if (criteria.isBuiltIn !== null) {
        templates = templates.filter(template => 
          template.isBuiltIn === criteria.isBuiltIn
        );
      }

      if (criteria.minRating > 0) {
        templates = templates.filter(template => 
          template.rating >= criteria.minRating
        );
      }

      // Apply sorting
      templates = this._sortTemplates(templates, criteria.sortBy, criteria.sortDirection);

      // Get metadata
      const categories = this._getTemplateCategories(templates);
      const tags = this._getTemplateTags(templates);
      const authors = this._getTemplateAuthors(templates);

      return {
        templates,
        totalCount: templates.length,
        categories,
        tags,
        authors
      };

    } catch (error) {
      console.error('Error searching templates:', error);
      return {
        templates: [],
        totalCount: 0,
        categories: [],
        tags: [],
        authors: []
      };
    }
  }

  public async getTemplate(templateId: string): Promise<ICustomActionTemplate | null> {
    try {
      const allTemplates = [...this.builtInTemplates];
      const userTemplates = await this._getUserTemplates();
      allTemplates.push(...userTemplates);

      return allTemplates.find(template => template.id === templateId) || null;
    } catch (error) {
      console.error('Error getting template:', error);
      return null;
    }
  }

  public async validateTemplateData(template: ICustomActionTemplate, formData: ITemplateFormData): Promise<ITemplateValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Validate required parameters
      for (const param of template.requiredParameters) {
        const value = formData[param.name];
        
        if (param.required && (value === undefined || value === null || value === '')) {
          errors.push(`${param.displayName} is required`);
          continue;
        }

        if (value !== undefined && value !== null && value !== '') {
          const paramErrors = this._validateParameter(param, value);
          errors.push(...paramErrors);
        }
      }

      // Validate optional parameters
      for (const param of template.optionalParameters) {
        const value = formData[param.name];
        
        if (value !== undefined && value !== null && value !== '') {
          const paramErrors = this._validateParameter(param, value);
          errors.push(...paramErrors);
        }
      }

      // Validate template-specific rules
      const templateErrors = await this._validateTemplateSpecificRules(template, formData);
      errors.push(...templateErrors);

    } catch (error) {
      errors.push('Validation failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  public async createCustomActionFromTemplate(
    template: ICustomActionTemplate,
    formData: ITemplateFormData,
    targetScope: CustomActionScope
  ): Promise<{ success: boolean; customAction?: ICustomAction; message: string }> {
    try {
      const validation = await this.validateTemplateData(template, formData);
      if (!validation.isValid) {
        return {
          success: false,
          message: `Validation failed: ${validation.errors.join(', ')}`
        };
      }

      const customActionData = this._processTemplate(template, formData);
      const result = await this.customActionService.createCustomAction(customActionData, targetScope);

      if (result.success && template.id) {
        await this._incrementTemplateUsage(template.id);
      }

      return result;

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  public getCustomActionFormData(
    template: ICustomActionTemplate,
    formData: ITemplateFormData
  ): ICustomActionFormData {
    return this._processTemplate(template, formData);
  }

  public async markTemplateUsed(templateId: string): Promise<void> {
    await this._incrementTemplateUsage(templateId);
  }


  private async _getUserTemplates(): Promise<ICustomActionTemplate[]> {
    try {
      const userTemplates: ICustomActionTemplate[] = [];

      // Check if custom templates list exists
      const templatesListExists = await this._checkTemplatesListExists();
      if (!templatesListExists) {
        console.info('Custom templates list not found, skipping user templates');
        return userTemplates;
      }

      // Load user templates from SharePoint list
      const endpoint = this._buildUrl("/_api/web/lists/getbytitle('CustomActionTemplates')/items?$select=*&$orderby=Modified desc");
      
      const response = await this.context.spHttpClient.get(
        endpoint,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        const items = data.d?.results || data.value || [];

        for (const item of items) {
          const template: ICustomActionTemplate = {
            id: `user-template-${item.Id || item.ID}`,
            name: item.Title || item.TemplateName,
            description: item.Description || '',
            category: item.Category || 'User Templates',
            tags: item.Tags ? item.Tags.split(',').map((tag: string) => tag.trim()) : [],
            author: item.Author?.Title || item.AuthorName || 'Unknown',
            version: item.Version || '1.0.0',
            isBuiltIn: false,
            isActive: true,
            defaultScope: CustomActionScope.Web,
            createdDate: new Date(item.Created),
            modifiedDate: new Date(item.Modified),
            rating: item.Rating || 0,
            usageCount: item.UsageCount || 0,
            template: {
              Title: item.ActionTitle || '',
              Description: item.ActionDescription || '',
              Location: item.ActionLocation || 'ScriptLink',
              ScriptBlock: item.ScriptBlock || '',
              ScriptSrc: item.ScriptSrc || '',
              Url: item.ActionUrl || '',
              ImageUrl: item.ImageUrl || '',
              Group: item.ActionGroup || '',
              Sequence: item.Sequence || 1000,
              RegistrationId: item.RegistrationId || '',
              RegistrationType: item.RegistrationType || 0,
              Rights: item.Rights || '',
              CommandUIExtension: item.CommandUIExtension || '',
              ClientSideComponentId: item.ClientSideComponentId || '',
              ClientSideComponentProperties: item.ClientSideComponentProperties || '',
              HostProperties: item.HostProperties || ''
            },
            requiredParameters: this._parseTemplateParameters(item.RequiredParameters),
            optionalParameters: this._parseTemplateParameters(item.OptionalParameters),
            icon: item.Icon || 'CustomList',
            previewUrl: item.PreviewUrl || '',
            documentationUrl: item.DocumentationUrl || ''
          };

          userTemplates.push(template);
        }
      }

      console.info(`Loaded ${userTemplates.length} user templates from SharePoint`);
      return userTemplates;

    } catch (error) {
      console.error('Error loading user templates:', error);
      return [];
    }
  }

  private _validateParameter(param: any, value: any): string[] {
    const errors: string[] = [];

    if (!param.validation) return errors;

    const validation = param.validation;

    // String validations
    if (param.type === TemplateParameterType.Text && typeof value === 'string') {
      if (validation.minLength && value.length < validation.minLength) {
        errors.push(`${param.displayName} must be at least ${validation.minLength} characters long`);
      }
      if (validation.maxLength && value.length > validation.maxLength) {
        errors.push(`${param.displayName} must be no more than ${validation.maxLength} characters long`);
      }
      if (validation.pattern) {
        const regex = new RegExp(validation.pattern);
        if (!regex.test(value)) {
          errors.push(`${param.displayName} format is invalid`);
        }
      }
    }

    // Number validations
    if (param.type === TemplateParameterType.Number && typeof value === 'number') {
      if (validation.min !== undefined && value < validation.min) {
        errors.push(`${param.displayName} must be at least ${validation.min}`);
      }
      if (validation.max !== undefined && value > validation.max) {
        errors.push(`${param.displayName} must be no more than ${validation.max}`);
      }
    }

    // URL validation
    if (param.type === TemplateParameterType.Url && typeof value === 'string') {
      try {
        new URL(value);
      } catch {
        errors.push(`${param.displayName} must be a valid URL`);
      }
    }

    return errors;
  }

  private async _validateTemplateSpecificRules(template: ICustomActionTemplate, formData: ITemplateFormData): Promise<string[]> {
    const errors: string[] = [];

    // Add template-specific validation logic here
    // For example, check for conflicts with existing custom actions
    
    return errors;
  }

  private _processTemplate(template: ICustomActionTemplate, formData: ITemplateFormData): ICustomActionFormData {
    let processedTemplate = { ...template.template };

    // Replace template placeholders with form data
    const templateStr = JSON.stringify(processedTemplate);
    const processedStr = templateStr.replace(/\{\{(\w+)\}\}/g, (match, paramName) => {
      return formData[paramName] !== undefined ? formData[paramName] : match;
    });

    processedTemplate = JSON.parse(processedStr);

    // Apply additional parameters (supports camelCase keys that map directly to form fields)
    for (const param of [...template.requiredParameters, ...template.optionalParameters]) {
      if (formData[param.name] !== undefined) {
        (processedTemplate as any)[param.name] = formData[param.name];
      }
    }

    const sequenceValue = processedTemplate.Sequence !== undefined
      ? Number(processedTemplate.Sequence)
      : (template.template.Sequence !== undefined ? Number(template.template.Sequence) : 1000);

    const registrationTypeValue = processedTemplate.RegistrationType !== undefined
      ? Number(processedTemplate.RegistrationType)
      : (template.template.RegistrationType !== undefined ? Number(template.template.RegistrationType) : RegistrationType.None);

    const validRegistrationTypes: RegistrationType[] = [
      RegistrationType.None,
      RegistrationType.List,
      RegistrationType.ContentType,
      RegistrationType.ProgId,
      RegistrationType.FileType
    ];

    const normalizedRegistrationType = validRegistrationTypes.includes(registrationTypeValue as RegistrationType)
      ? (registrationTypeValue as RegistrationType)
      : RegistrationType.None;

    const formDataResult: ICustomActionFormData = {
      title: processedTemplate.Title || template.template.Title || '',
      description: processedTemplate.Description || template.template.Description || '',
      location: processedTemplate.Location || template.template.Location || 'ScriptLink',
      sequence: isNaN(sequenceValue) ? 1000 : sequenceValue,
      scriptBlock: processedTemplate.ScriptBlock || template.template.ScriptBlock,
      scriptSrc: processedTemplate.ScriptSrc || template.template.ScriptSrc,
      url: processedTemplate.Url || template.template.Url,
      commandUIExtension: processedTemplate.CommandUIExtension || template.template.CommandUIExtension,
      registrationType: normalizedRegistrationType,
      registrationId: processedTemplate.RegistrationId || template.template.RegistrationId,
      rights: processedTemplate.Rights || template.template.Rights,
      group: processedTemplate.Group || template.template.Group,
      hostProperties: processedTemplate.HostProperties || template.template.HostProperties,
      clientSideComponentId: processedTemplate.ClientSideComponentId || template.template.ClientSideComponentId,
      clientSideComponentProperties: processedTemplate.ClientSideComponentProperties || template.template.ClientSideComponentProperties,
      name: processedTemplate.Name || template.template.Name || processedTemplate.Title || template.template.Title || `CustomAction_${Date.now()}`,
      imageUrl: processedTemplate.ImageUrl || template.template.ImageUrl,
      enabled: typeof processedTemplate.Enabled === 'boolean'
        ? processedTemplate.Enabled
        : template.template.Enabled
    };

    return formDataResult;
  }

  private async _incrementTemplateUsage(templateId: string): Promise<void> {
    try {
      // Update built-in template usage in memory
      const builtInTemplate = this.builtInTemplates.find(t => t.id === templateId);
      if (builtInTemplate) {
        builtInTemplate.usageCount++;
        console.info(`Template usage incremented for built-in template: ${templateId}`);
        return;
      }

      // Update user template usage in SharePoint list
      if (templateId.startsWith('user-template-')) {
        const itemId = templateId.replace('user-template-', '');
        const endpoint = this._buildUrl(`/_api/web/lists/getbytitle('CustomActionTemplates')/items(${itemId})`);
        
        // First get current usage count
        const getResponse = await this.context.spHttpClient.get(
          `${endpoint}?$select=UsageCount`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              'Accept': 'application/json;odata=verbose'
            }
          }
        );

        if (getResponse.ok) {
          const data = await getResponse.json();
          const currentUsage = (data.d?.UsageCount || data.UsageCount || 0) + 1;

          // Update usage count
          const updateResponse = await this.context.spHttpClient.post(
            endpoint,
            SPHttpClient.configurations.v1,
            {
              headers: {
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'X-HTTP-Method': 'MERGE',
                'IF-MATCH': '*'
              },
              body: JSON.stringify({
                '__metadata': { 'type': 'SP.Data.CustomActionTemplatesListItem' },
                'UsageCount': currentUsage
              })
            }
          );

          if (updateResponse.ok) {
            console.info(`Template usage incremented for user template: ${templateId}`);
          }
        }
      }
    } catch (error) {
      console.error('Error incrementing template usage:', error);
    }
  }

  private _sortTemplates(templates: ICustomActionTemplate[], sortBy: TemplateSortField, direction: 'asc' | 'desc'): ICustomActionTemplate[] {
    return templates.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case TemplateSortField.Name:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case TemplateSortField.CreatedDate:
          aValue = a.createdDate.getTime();
          bValue = b.createdDate.getTime();
          break;
        case TemplateSortField.ModifiedDate:
          aValue = a.modifiedDate.getTime();
          bValue = b.modifiedDate.getTime();
          break;
        case TemplateSortField.Rating:
          aValue = a.rating;
          bValue = b.rating;
          break;
        case TemplateSortField.UsageCount:
          aValue = a.usageCount;
          bValue = b.usageCount;
          break;
        case TemplateSortField.Category:
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  private _getTemplateCategories(templates: ICustomActionTemplate[]): ITemplateCategory[] {
    const categoryMap = new Map<string, ITemplateCategory>();

    templates.forEach(template => {
      if (!categoryMap.has(template.category)) {
        categoryMap.set(template.category, {
          id: template.category.toLowerCase().replace(/\s+/g, '-'),
          name: template.category,
          description: `Templates in the ${template.category} category`,
          icon: this._getCategoryIcon(template.category),
          color: this._getCategoryColor(template.category),
          templateCount: 0
        });
      }
      
      const category = categoryMap.get(template.category)!;
      category.templateCount++;
    });

    return Array.from(categoryMap.values()).sort((a, b) => b.templateCount - a.templateCount);
  }

  private _getTemplateTags(templates: ICustomActionTemplate[]): string[] {
    const tagSet = new Set<string>();
    templates.forEach(template => {
      template.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }

  private _getTemplateAuthors(templates: ICustomActionTemplate[]): string[] {
    const authorSet = new Set<string>();
    templates.forEach(template => {
      authorSet.add(template.author);
    });
    return Array.from(authorSet).sort();
  }

  private _getCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      'Navigation': 'Nav2DMapView',
      'Content': 'PageList',
      'Branding': 'Color',
      'Integration': 'PlugConnected',
      'Utility': 'Settings',
      'Forms': 'Form',
      'Analytics': 'BarChartVertical',
      'Security': 'Shield'
    };
    return iconMap[category] || 'CustomList';
  }

  private async _checkTemplatesListExists(): Promise<boolean> {
    try {
      const endpoint = this._buildUrl("/_api/web/lists/getbytitle('CustomActionTemplates')?$select=Id");
      const response = await this.context.spHttpClient.get(
        endpoint,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata'
          }
        }
      );
      return response.ok;
    } catch (error) {
      console.warn('Error checking for CustomActionTemplates list:', error);
      return false;
    }
  }

  private _parseTemplateParameters(parameterData: string | null): any[] {
    if (!parameterData) return [];
    
    try {
      return JSON.parse(parameterData);
    } catch (error) {
      console.warn('Error parsing template parameters:', error);
      return [];
    }
  }

  private async _createTemplatesListIfNotExists(): Promise<boolean> {
    try {
      const endpoint = this._buildUrl('/_api/web/lists');

      const listData = {
        '__metadata': { 'type': 'SP.List' },
        'Title': 'CustomActionTemplates',
        'Description': 'Custom Action Templates for the Custom Action Manager',
        'BaseTemplate': 100,
        'Hidden': false
      };

      const response = await this.context.spHttpClient.post(
        endpoint,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-Type': 'application/json;odata=nometadata'
          },
          body: JSON.stringify(listData)
        }
      );

      if (response.ok) {
        console.info('CustomActionTemplates list created successfully');

        // Add custom fields to the list
        await this._addTemplateListFields();
        return true;
      }

      const errorText = await response.text();
      console.error('Failed to create templates list:', response.status, errorText);
      return false;
    } catch (error) {
      console.error('Error creating templates list:', error);
      return false;
    }
  }

  private async _addTemplateListFields(): Promise<void> {
    try {
      const baseEndpoint = this._buildUrl("/_api/web/lists/getbytitle('CustomActionTemplates')/fields");

      const fields = [
        { name: 'TemplateName', type: 'SP.FieldText', displayName: 'Template Name' },
        { name: 'Category', type: 'SP.FieldText', displayName: 'Category' },
        { name: 'Tags', type: 'SP.FieldText', displayName: 'Tags' },
        { name: 'AuthorName', type: 'SP.FieldText', displayName: 'Author Name' },
        { name: 'Version', type: 'SP.FieldText', displayName: 'Version' },
        { name: 'ActionTitle', type: 'SP.FieldText', displayName: 'Action Title' },
        { name: 'ActionDescription', type: 'SP.FieldMultiLineText', displayName: 'Action Description' },
        { name: 'ActionLocation', type: 'SP.FieldText', displayName: 'Action Location' },
        { name: 'ScriptBlock', type: 'SP.FieldMultiLineText', displayName: 'Script Block' },
        { name: 'ScriptSrc', type: 'SP.FieldUrl', displayName: 'Script Source' },
        { name: 'ActionUrl', type: 'SP.FieldUrl', displayName: 'Action URL' },
        { name: 'ImageUrl', type: 'SP.FieldUrl', displayName: 'Image URL' },
        { name: 'ActionGroup', type: 'SP.FieldText', displayName: 'Action Group' },
        { name: 'Sequence', type: 'SP.FieldNumber', displayName: 'Sequence' },
        { name: 'RegistrationId', type: 'SP.FieldText', displayName: 'Registration ID' },
        { name: 'RegistrationType', type: 'SP.FieldNumber', displayName: 'Registration Type' },
        { name: 'Rights', type: 'SP.FieldText', displayName: 'Rights' },
        { name: 'CommandUIExtension', type: 'SP.FieldMultiLineText', displayName: 'Command UI Extension' },
        { name: 'ClientSideComponentId', type: 'SP.FieldText', displayName: 'Client Side Component ID' },
        { name: 'ClientSideComponentProperties', type: 'SP.FieldMultiLineText', displayName: 'Client Side Component Properties' },
        { name: 'HostProperties', type: 'SP.FieldMultiLineText', displayName: 'Host Properties' },
        { name: 'RequiredParameters', type: 'SP.FieldMultiLineText', displayName: 'Required Parameters' },
        { name: 'OptionalParameters', type: 'SP.FieldMultiLineText', displayName: 'Optional Parameters' },
        { name: 'Icon', type: 'SP.FieldText', displayName: 'Icon' },
        { name: 'PreviewUrl', type: 'SP.FieldUrl', displayName: 'Preview URL' },
        { name: 'DocumentationUrl', type: 'SP.FieldUrl', displayName: 'Documentation URL' },
        { name: 'Rating', type: 'SP.FieldNumber', displayName: 'Rating' },
        { name: 'UsageCount', type: 'SP.FieldNumber', displayName: 'Usage Count' }
      ];

      for (const field of fields) {
        try {
          const fieldData = {
            '__metadata': { 'type': 'SP.Field' },
            'FieldTypeKind': this._getFieldTypeKind(field.type),
            'InternalName': field.name,
            'Title': field.displayName,
            'StaticName': field.name
          };

          await this.context.spHttpClient.post(
            baseEndpoint,
            SPHttpClient.configurations.v1,
            {
              headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-Type': 'application/json;odata=nometadata'
              },
              body: JSON.stringify(fieldData)
            }
          );
        } catch (fieldError) {
          console.warn(`Could not create field ${field.name}:`, fieldError);
        }
      }
    } catch (error) {
      console.error('Error adding template list fields:', error);
    }
  }

  private _getFieldTypeKind(fieldType: string): number {
    const typeMap: { [key: string]: number } = {
      'SP.FieldText': 2,
      'SP.FieldMultiLineText': 3,
      'SP.FieldNumber': 9,
      'SP.FieldUrl': 11
    };
    return typeMap[fieldType] || 2;
  }

  private _generateTemplateId(): string {
    return `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private _getCategoryColor(category: string): string {
    const colorMap: { [key: string]: string } = {
      'Navigation': '#0078d4',
      'Content': '#107c10',
      'Branding': '#d13438',
      'Integration': '#8764b8',
      'Utility': '#767676',
      'Forms': '#ca5010',
      'Analytics': '#004578',
      'Security': '#c239b3'
    };
    return colorMap[category] || '#605e5c';
  }

  private _initializeBuiltInTemplates(): ICustomActionTemplate[] {
    // No built-in templates - users create their own
    return [];
  }

  public async saveTemplate(template: Omit<ICustomActionTemplate, 'id' | 'createdDate' | 'modifiedDate' | 'usageCount' | 'rating'>): Promise<{ success: boolean; message?: string; templateId?: string }> {
    try {
      // Create the template list if it doesn't exist
      const listExists = await this._checkTemplatesListExists();
      if (!listExists) {
        await this._createTemplatesListSilent();
      }

      // Generate template data for SharePoint list
      const templateData = {
        Title: template.name,
        Description: template.description,
        Category: template.category,
        Tags: template.tags.join(','),
        Author: template.author,
        Version: template.version,
        IsBuiltIn: template.isBuiltIn,
        IsActive: template.isActive,
        DefaultScope: template.defaultScope,
        TemplateData: JSON.stringify(template.template),
        RequiredParameters: JSON.stringify(template.requiredParameters),
        OptionalParameters: JSON.stringify(template.optionalParameters),
        Icon: template.icon,
        PreviewUrl: template.previewUrl,
        DocumentationUrl: template.documentationUrl,
        UsageCount: 0,
        Rating: 0
      };

      // Save to SharePoint list
      const endpoint = `${this.baseUrl}/_api/web/lists/getbytitle('CustomActionTemplates')/items`;
      const response: SPHttpClientResponse = await this.context.spHttpClient.post(
        endpoint,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-Type': 'application/json;odata=nometadata',
            'odata-version': '3.0'
          },
          body: JSON.stringify(templateData)
        }
      );

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          templateId: data.Id?.toString()
        };
      } else {
        const errorText = await response.text();
        console.error('Failed to save template:', response.status, errorText);
        return {
          success: false,
          message: `Failed to save template: ${response.status} ${response.statusText}`
        };
      }

    } catch (error) {
      console.error('Error saving template:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred while saving template'
      };
    }
  }

  private async _createTemplatesListSilent(): Promise<void> {
    try {
      const listData = {
        '__metadata': { type: 'SP.List' },
        Title: 'CustomActionTemplates',
        Description: 'Storage for custom action templates',
        BaseTemplate: 100, // Generic List
        AllowContentTypes: false
      };

      // Create the list
      const endpoint = `${this.baseUrl}/_api/web/lists`;
      const response = await this.context.spHttpClient.post(
        endpoint,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-Type': 'application/json;odata=nometadata',
            'odata-version': '3.0'
          },
          body: JSON.stringify(listData)
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create templates list: ${response.status} ${response.statusText}`);
      }

      // Add necessary fields
      await this._addTemplateListFields();

    } catch (error) {
      console.error('Error creating templates list:', error);
      throw error;
    }
  }

}
