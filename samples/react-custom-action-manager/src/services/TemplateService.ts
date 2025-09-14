import { WebPartContext } from '@microsoft/sp-webpart-base';
import { HttpClient } from '@microsoft/sp-http';
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
import { ICustomAction, CustomActionScope } from '../models';
import { CustomActionService } from './CustomActionService';

export class TemplateService {
  private context: WebPartContext;
  private customActionService: CustomActionService;
  private builtInTemplates: ICustomActionTemplate[];

  constructor(context: WebPartContext) {
    this.context = context;
    this.customActionService = new CustomActionService(context);
    this.builtInTemplates = this._initializeBuiltInTemplates();
  }

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
      // Validate the form data first
      const validation = await this.validateTemplateData(template, formData);
      if (!validation.isValid) {
        return {
          success: false,
          message: `Validation failed: ${validation.errors.join(', ')}`
        };
      }

      // Process the template with form data
      const customActionData = this._processTemplate(template, formData);

      // Create the custom action
      const result = await this.customActionService.createCustomAction(customActionData, targetScope);

      if (result.success && template.id) {
        // Update template usage count
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

  public async saveTemplate(template: Omit<ICustomActionTemplate, 'id' | 'createdDate' | 'modifiedDate' | 'usageCount' | 'rating'>): Promise<{ success: boolean; template?: ICustomActionTemplate; message: string }> {
    try {
      const newTemplate: ICustomActionTemplate = {
        ...template,
        id: this._generateTemplateId(),
        createdDate: new Date(),
        modifiedDate: new Date(),
        usageCount: 0,
        rating: 0,
        author: this.context.pageContext.user.displayName
      };

      // Ensure the CustomActionTemplates list exists
      const listExists = await this._checkTemplatesListExists();
      if (!listExists) {
        const listCreated = await this._createTemplatesListIfNotExists();
        if (!listCreated) {
          return {
            success: false,
            message: 'Failed to create templates list in SharePoint'
          };
        }
      }

      // Save template to SharePoint list
      const endpoint = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('CustomActionTemplates')/items`;
      
      const templateData = {
        '__metadata': { 'type': 'SP.Data.CustomActionTemplatesListItem' },
        'Title': newTemplate.name,
        'TemplateName': newTemplate.name,
        'Description': newTemplate.description,
        'Category': newTemplate.category,
        'Tags': newTemplate.tags.join(', '),
        'AuthorName': newTemplate.author,
        'Version': newTemplate.version,
        'ActionTitle': newTemplate.template.Title || '',
        'ActionDescription': newTemplate.template.Description || '',
        'ActionLocation': newTemplate.template.Location || 'ScriptLink',
        'ScriptBlock': newTemplate.template.ScriptBlock || '',
        'ScriptSrc': newTemplate.template.ScriptSrc || '',
        'ActionUrl': newTemplate.template.Url || '',
        'ImageUrl': newTemplate.template.ImageUrl || '',
        'ActionGroup': newTemplate.template.Group || '',
        'Sequence': newTemplate.template.Sequence || 1000,
        'RegistrationId': newTemplate.template.RegistrationId || '',
        'RegistrationType': newTemplate.template.RegistrationType || 0,
        'Rights': newTemplate.template.Rights || '',
        'CommandUIExtension': newTemplate.template.CommandUIExtension || '',
        'ClientSideComponentId': newTemplate.template.ClientSideComponentId || '',
        'ClientSideComponentProperties': newTemplate.template.ClientSideComponentProperties || '',
        'HostProperties': newTemplate.template.HostProperties || '',
        'RequiredParameters': JSON.stringify(newTemplate.requiredParameters || []),
        'OptionalParameters': JSON.stringify(newTemplate.optionalParameters || []),
        'Icon': newTemplate.icon || 'CustomList',
        'PreviewUrl': newTemplate.previewUrl || '',
        'DocumentationUrl': newTemplate.documentationUrl || '',
        'Rating': 0,
        'UsageCount': 0
      };

      const response = await this.context.httpClient.post(endpoint, HttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose'
        },
        body: JSON.stringify(templateData)
      });

      if (response.ok) {
        const data = await response.json();
        const itemId = data.d?.Id || data.Id;
        
        // Update the template ID with the actual SharePoint item ID
        newTemplate.id = `user-template-${itemId}`;

        return {
          success: true,
          template: newTemplate,
          message: 'Template saved successfully to SharePoint'
        };
      } else {
        const errorData = await response.text();
        return {
          success: false,
          message: `Failed to save template to SharePoint: ${response.status} ${response.statusText} - ${errorData}`
        };
      }

    } catch (error) {
      console.error('Error saving template:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to save template'
      };
    }
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
      const endpoint = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('CustomActionTemplates')/items?$select=*&$orderby=Modified desc`;
      
      const response = await this.context.httpClient.get(endpoint, HttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose'
        }
      });

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

  private _processTemplate(template: ICustomActionTemplate, formData: ITemplateFormData): any {
    let processedTemplate = { ...template.template };

    // Replace template placeholders with form data
    const templateStr = JSON.stringify(processedTemplate);
    const processedStr = templateStr.replace(/\{\{(\w+)\}\}/g, (match, paramName) => {
      return formData[paramName] !== undefined ? formData[paramName] : match;
    });

    processedTemplate = JSON.parse(processedStr);

    // Set additional properties from form data
    for (const param of [...template.requiredParameters, ...template.optionalParameters]) {
      if (formData[param.name] !== undefined) {
        (processedTemplate as any)[param.name] = formData[param.name];
      }
    }

    return processedTemplate;
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
        const endpoint = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('CustomActionTemplates')/items(${itemId})`;
        
        // First get current usage count
        const getResponse = await this.context.httpClient.get(endpoint + '?$select=UsageCount', HttpClient.configurations.v1, {
          headers: {
            'Accept': 'application/json;odata=verbose'
          }
        });

        if (getResponse.ok) {
          const data = await getResponse.json();
          const currentUsage = (data.d?.UsageCount || data.UsageCount || 0) + 1;

          // Update usage count
          const updateResponse = await this.context.httpClient.post(endpoint, HttpClient.configurations.v1, {
            headers: {
              'Accept': 'application/json;odata=verbose',
              'Content-Type': 'application/json;odata=verbose',
              'X-HTTP-Method': 'MERGE',
              'If-Match': '*'
            },
            body: JSON.stringify({
              '__metadata': { 'type': 'SP.Data.CustomActionTemplatesListItem' },
              'UsageCount': currentUsage
            })
          });

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
      const endpoint = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('CustomActionTemplates')`;
      const response = await this.context.httpClient.get(endpoint, HttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata=verbose'
        }
      });
      return response.ok;
    } catch (error) {
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
      const endpoint = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists`;
      
      const listData = {
        '__metadata': { 'type': 'SP.List' },
        'Title': 'CustomActionTemplates',
        'Description': 'Custom Action Templates for the Custom Action Manager',
        'BaseTemplate': 100,
        'Hidden': false
      };

      const response = await this.context.httpClient.post(endpoint, HttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose'
        },
        body: JSON.stringify(listData)
      });

      if (response.ok) {
        console.info('CustomActionTemplates list created successfully');
        
        // Add custom fields to the list
        await this._addTemplateListFields();
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error creating templates list:', error);
      return false;
    }
  }

  private async _addTemplateListFields(): Promise<void> {
    try {
      const baseEndpoint = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('CustomActionTemplates')/fields`;
      
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
            '__metadata': { 'type': field.type },
            'FieldTypeKind': this._getFieldTypeKind(field.type),
            'InternalName': field.name,
            'Title': field.displayName,
            'StaticName': field.name
          };

          await this.context.httpClient.post(baseEndpoint, HttpClient.configurations.v1, {
            headers: {
              'Accept': 'application/json;odata=verbose',
              'Content-Type': 'application/json;odata=verbose'
            },
            body: JSON.stringify(fieldData)
          });
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
    return [
      // NAVIGATION TEMPLATES
      {
        id: 'advanced-breadcrumb-navigation',
        name: 'Advanced Breadcrumb Navigation',
        description: 'Dynamic breadcrumb navigation with SharePoint site hierarchy integration and custom styling options',
        category: 'Navigation',
        tags: ['navigation', 'breadcrumb', 'hierarchy', 'responsive'],
        author: 'Microsoft',
        version: '2.1.0',
        createdDate: new Date('2024-01-01'),
        modifiedDate: new Date('2024-03-01'),
        isBuiltIn: true,
        isActive: true,
        usageCount: 156,
        rating: 4.8,
        defaultScope: CustomActionScope.Web,
        template: {
          Title: 'Advanced Breadcrumb Navigation',
          Location: 'ScriptLink',
          Sequence: 100,
          ScriptBlock: `
            (function() {
              'use strict';
              
              // Configuration
              var config = {
                containerId: 'sp-breadcrumb-{{uniqueId}}',
                showHome: {{showHome}},
                showCurrent: {{showCurrent}},
                maxItems: {{maxItems}},
                separator: '{{separator}}',
                homeText: '{{homeText}}',
                animation: {{enableAnimation}},
                responsive: {{enableResponsive}}
              };
              
              // Breadcrumb Builder Class
              function BreadcrumbBuilder() {
                this.items = [];
                this.container = null;
              }
              
              BreadcrumbBuilder.prototype.init = function() {
                this.createContainer();
                this.buildBreadcrumbs();
                this.attachEvents();
              };
              
              BreadcrumbBuilder.prototype.createContainer = function() {
                var container = document.createElement('nav');
                container.id = config.containerId;
                container.className = 'sp-custom-breadcrumb';
                container.setAttribute('aria-label', 'Breadcrumb navigation');
                
                var styles = document.createElement('style');
                styles.textContent = \`
                  .sp-custom-breadcrumb {
                    {{customCSS}}
                    font-family: "Segoe UI", "Segoe UI Web", -apple-system, sans-serif;
                    font-size: 12px;
                    padding: 8px 0;
                    margin: 0 0 16px 0;
                    overflow: hidden;
                    white-space: nowrap;
                  }
                  
                  .sp-custom-breadcrumb ol {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                  }
                  
                  .sp-custom-breadcrumb li {
                    display: inline-flex;
                    align-items: center;
                  }
                  
                  .sp-custom-breadcrumb a {
                    color: #0078d4;
                    text-decoration: none;
                    padding: 4px 8px;
                    border-radius: 2px;
                    transition: all 0.2s ease;
                  }
                  
                  .sp-custom-breadcrumb a:hover {
                    background-color: #f3f2f1;
                    text-decoration: underline;
                  }
                  
                  .sp-custom-breadcrumb a:focus {
                    outline: 2px solid #0078d4;
                    outline-offset: 2px;
                  }
                  
                  .sp-custom-breadcrumb .separator {
                    margin: 0 4px;
                    color: #605e5c;
                    user-select: none;
                  }
                  
                  .sp-custom-breadcrumb .current {
                    color: #323130;
                    font-weight: 600;
                    padding: 4px 8px;
                  }
                  
                  .sp-custom-breadcrumb .home-icon {
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                  }
                  
                  @media (max-width: 768px) {
                    .sp-custom-breadcrumb {
                      font-size: 11px;
                    }
                    .sp-custom-breadcrumb.responsive .breadcrumb-item:not(:first-child):not(:last-child) {
                      display: none;
                    }
                    .sp-custom-breadcrumb.responsive .breadcrumb-item:nth-last-child(2)::before {
                      content: "... ";
                      color: #605e5c;
                    }
                  }
                \`;
                
                document.head.appendChild(styles);
                
                // Insert at the top of the page content
                var targetElement = document.querySelector('#contentBox') || 
                                   document.querySelector('[data-automation-id="contentScrollRegion"]') ||
                                   document.querySelector('.ms-compositeHeader-topWrapper') ||
                                   document.body;
                
                if (targetElement === document.body) {
                  targetElement.insertBefore(container, targetElement.firstChild);
                } else {
                  targetElement.parentNode.insertBefore(container, targetElement);
                }
                
                this.container = container;
              };
              
              BreadcrumbBuilder.prototype.buildBreadcrumbs = function() {
                try {
                  // Get SharePoint context
                  var ctx = _spPageContextInfo || window._spPageContextInfo;
                  if (!ctx) return;
                  
                  var items = [];
                  
                  // Add home if enabled
                  if (config.showHome) {
                    items.push({
                      text: config.homeText,
                      url: ctx.siteAbsoluteUrl,
                      isHome: true
                    });
                  }
                  
                  // Build hierarchy from URL
                  var currentUrl = window.location.pathname;
                  var sitePath = ctx.siteServerRelativeUrl;
                  var relativePath = currentUrl.replace(sitePath, '');
                  
                  if (relativePath && relativePath !== '/') {
                    var pathSegments = relativePath.split('/').filter(function(segment) {
                      return segment && segment !== 'Pages' && !segment.includes('.aspx');
                    });
                    
                    var buildUrl = sitePath;
                    pathSegments.forEach(function(segment, index) {
                      buildUrl += '/' + segment;
                      items.push({
                        text: this.formatSegmentName(segment),
                        url: buildUrl,
                        isHome: false
                      });
                    }.bind(this));
                  }
                  
                  // Add current page if enabled
                  if (config.showCurrent) {
                    var pageTitle = document.title.split(' - ')[0] || 'Current Page';
                    items.push({
                      text: pageTitle,
                      url: window.location.href,
                      isCurrent: true
                    });
                  }
                  
                  // Limit items if specified
                  if (config.maxItems && items.length > config.maxItems) {
                    items = [items[0]].concat(items.slice(-config.maxItems + 1));
                  }
                  
                  this.renderItems(items);
                  
                } catch (error) {
                  console.warn('Breadcrumb navigation error:', error);
                }
              };
              
              BreadcrumbBuilder.prototype.formatSegmentName = function(segment) {
                return decodeURIComponent(segment)
                  .replace(/[-_]/g, ' ')
                  .replace(/\\b\\w/g, function(l) { return l.toUpperCase(); });
              };
              
              BreadcrumbBuilder.prototype.renderItems = function(items) {
                var ol = document.createElement('ol');
                ol.setAttribute('role', 'list');
                
                if (config.responsive) {
                  this.container.classList.add('responsive');
                }
                
                items.forEach(function(item, index) {
                  var li = document.createElement('li');
                  li.className = 'breadcrumb-item';
                  li.setAttribute('role', 'listitem');
                  
                  if (item.isCurrent) {
                    var span = document.createElement('span');
                    span.className = 'current';
                    span.textContent = item.text;
                    span.setAttribute('aria-current', 'page');
                    li.appendChild(span);
                  } else {
                    var link = document.createElement('a');
                    link.href = item.url;
                    link.textContent = item.text;
                    link.setAttribute('aria-label', 'Navigate to ' + item.text);
                    
                    if (item.isHome) {
                      link.innerHTML = '<svg class="home-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5z"/></svg> ' + item.text;
                    }
                    
                    li.appendChild(link);
                  }
                  
                  // Add separator
                  if (index < items.length - 1) {
                    var separator = document.createElement('span');
                    separator.className = 'separator';
                    separator.textContent = config.separator;
                    separator.setAttribute('aria-hidden', 'true');
                    li.appendChild(separator);
                  }
                  
                  ol.appendChild(li);
                });
                
                this.container.appendChild(ol);
              };
              
              BreadcrumbBuilder.prototype.attachEvents = function() {
                if (config.animation) {
                  this.container.style.opacity = '0';
                  this.container.style.transform = 'translateY(-10px)';
                  this.container.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                  
                  setTimeout(function() {
                    this.container.style.opacity = '1';
                    this.container.style.transform = 'translateY(0)';
                  }.bind(this), 100);
                }
              };
              
              // Initialize when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                  new BreadcrumbBuilder().init();
                });
              } else {
                new BreadcrumbBuilder().init();
              }
              
            })();
          `
        },
        requiredParameters: [
          {
            name: 'uniqueId',
            displayName: 'Unique Identifier',
            description: 'Unique ID to prevent conflicts (auto-generated)',
            type: TemplateParameterType.Text,
            required: true,
            defaultValue: Date.now().toString(36),
            helpText: 'Leave default value unless you need a specific ID'
          }
        ],
        optionalParameters: [
          {
            name: 'showHome',
            displayName: 'Show Home Link',
            description: 'Display home/root site link in breadcrumb',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'showCurrent',
            displayName: 'Show Current Page',
            description: 'Display current page in breadcrumb',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'maxItems',
            displayName: 'Maximum Items',
            description: 'Maximum number of breadcrumb items to show',
            type: TemplateParameterType.Number,
            required: false,
            defaultValue: 5,
            validation: { min: 2, max: 10 }
          },
          {
            name: 'separator',
            displayName: 'Separator Character',
            description: 'Character used to separate breadcrumb items',
            type: TemplateParameterType.Text,
            required: false,
            defaultValue: '/',
            validation: { maxLength: 3 }
          },
          {
            name: 'homeText',
            displayName: 'Home Link Text',
            description: 'Text displayed for the home link',
            type: TemplateParameterType.Text,
            required: false,
            defaultValue: 'Home',
            validation: { maxLength: 20 }
          },
          {
            name: 'enableAnimation',
            displayName: 'Enable Animation',
            description: 'Animate breadcrumb appearance',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'enableResponsive',
            displayName: 'Responsive Design',
            description: 'Enable responsive behavior on mobile devices',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'customCSS',
            displayName: 'Custom CSS Styles',
            description: 'Additional CSS styles for customization',
            type: TemplateParameterType.Code,
            required: false,
            defaultValue: 'background: #f8f9fa; border-bottom: 1px solid #e1dfdd; padding: 12px 20px;',
          }
        ],
        icon: 'Nav2DMapView',
        previewUrl: 'https://example.com/breadcrumb-preview.png',
        documentationUrl: 'https://docs.microsoft.com/sharepoint/custom-actions'
      },

      // CONTENT TEMPLATES
      {
        id: 'emergency-notification-banner',
        name: 'Emergency Notification Banner',
        description: 'High-priority emergency notification banner with dismissal, scheduling, and multi-language support',
        category: 'Content',
        tags: ['emergency', 'notification', 'banner', 'alert', 'priority'],
        author: 'Microsoft',
        version: '1.5.0',
        createdDate: new Date('2024-01-15'),
        modifiedDate: new Date('2024-03-10'),
        isBuiltIn: true,
        isActive: true,
        usageCount: 89,
        rating: 4.9,
        defaultScope: CustomActionScope.Site,
        template: {
          Title: 'Emergency Notification Banner',
          Location: 'ScriptLink',
          Sequence: 50,
          ScriptBlock: `
            (function() {
              'use strict';
              
              // Configuration
              var config = {
                bannerId: 'emergency-banner-{{uniqueId}}',
                message: \`{{notificationMessage}}\`,
                type: '{{alertType}}',
                dismissible: {{allowDismissal}},
                autoHide: {{autoHide}},
                autoHideDelay: {{autoHideDelay}} * 1000,
                showIcon: {{showIcon}},
                actionButton: {{showActionButton}},
                actionText: '{{actionButtonText}}',
                actionUrl: '{{actionButtonUrl}}',
                position: '{{bannerPosition}}',
                animation: '{{animationType}}',
                persistDismissal: {{persistDismissal}},
                startDate: '{{startDate}}',
                endDate: '{{endDate}}'
              };
              
              // Emergency Banner Class
              function EmergencyBanner() {
                this.banner = null;
                this.isVisible = false;
                this.isDismissed = false;
              }
              
              EmergencyBanner.prototype.init = function() {
                // Check if banner should be shown based on date range
                if (!this.shouldShowBanner()) return;
                
                // Check if banner was previously dismissed
                if (this.wasPreviouslyDismissed()) return;
                
                this.createBanner();
                this.showBanner();
                this.attachEvents();
                
                // Auto-hide if configured
                if (config.autoHide && config.autoHideDelay > 0) {
                  setTimeout(this.hideBanner.bind(this), config.autoHideDelay);
                }
              };
              
              EmergencyBanner.prototype.shouldShowBanner = function() {
                if (!config.startDate && !config.endDate) return true;
                
                var now = new Date();
                var start = config.startDate ? new Date(config.startDate) : null;
                var end = config.endDate ? new Date(config.endDate) : null;
                
                if (start && now < start) return false;
                if (end && now > end) return false;
                
                return true;
              };
              
              EmergencyBanner.prototype.wasPreviouslyDismissed = function() {
                if (!config.persistDismissal || !config.dismissible) return false;
                
                var dismissalKey = 'emergencyBanner_dismissed_' + config.bannerId;
                return localStorage.getItem(dismissalKey) === 'true';
              };
              
              EmergencyBanner.prototype.createBanner = function() {
                // Create banner element
                var banner = document.createElement('div');
                banner.id = config.bannerId;
                banner.className = 'emergency-banner emergency-banner-' + config.type;
                banner.setAttribute('role', 'alert');
                banner.setAttribute('aria-live', 'assertive');
                
                // Create banner content
                var content = document.createElement('div');
                content.className = 'emergency-banner-content';
                
                // Icon
                if (config.showIcon) {
                  var icon = document.createElement('div');
                  icon.className = 'emergency-banner-icon';
                  icon.innerHTML = this.getIconSvg(config.type);
                  content.appendChild(icon);
                }
                
                // Message
                var message = document.createElement('div');
                message.className = 'emergency-banner-message';
                message.innerHTML = config.message;
                content.appendChild(message);
                
                // Action button
                if (config.actionButton && config.actionText && config.actionUrl) {
                  var actionContainer = document.createElement('div');
                  actionContainer.className = 'emergency-banner-action';
                  
                  var actionBtn = document.createElement('a');
                  actionBtn.href = config.actionUrl;
                  actionBtn.className = 'emergency-banner-button';
                  actionBtn.textContent = config.actionText;
                  actionBtn.setAttribute('role', 'button');
                  
                  actionContainer.appendChild(actionBtn);
                  content.appendChild(actionContainer);
                }
                
                banner.appendChild(content);
                
                // Dismiss button
                if (config.dismissible) {
                  var dismissBtn = document.createElement('button');
                  dismissBtn.className = 'emergency-banner-dismiss';
                  dismissBtn.setAttribute('aria-label', 'Dismiss notification');
                  dismissBtn.innerHTML = '×';
                  banner.appendChild(dismissBtn);
                }
                
                // Add styles
                this.addStyles();
                
                this.banner = banner;
              };
              
              EmergencyBanner.prototype.getIconSvg = function(type) {
                var icons = {
                  'error': '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>',
                  'warning': '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>',
                  'info': '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>',
                  'success': '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm3.5-9L8 9.5l-1.5-1.5L5 9.5 8 12.5 13 7.5 11.5 6z"/></svg>'
                };
                return icons[type] || icons['info'];
              };
              
              EmergencyBanner.prototype.addStyles = function() {
                if (document.getElementById('emergency-banner-styles')) return;
                
                var styles = document.createElement('style');
                styles.id = 'emergency-banner-styles';
                styles.textContent = \`
                  .emergency-banner {
                    position: fixed;
                    left: 0;
                    right: 0;
                    z-index: 10000;
                    font-family: "Segoe UI", "Segoe UI Web", -apple-system, sans-serif;
                    font-size: 14px;
                    line-height: 1.4;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    transform: translateY(-100%);
                    transition: transform 0.3s ease, opacity 0.3s ease;
                    opacity: 0;
                  }
                  
                  .emergency-banner.top {
                    top: 0;
                  }
                  
                  .emergency-banner.bottom {
                    bottom: 0;
                    transform: translateY(100%);
                  }
                  
                  .emergency-banner.visible {
                    transform: translateY(0);
                    opacity: 1;
                  }
                  
                  .emergency-banner-error {
                    background: linear-gradient(90deg, #d13438, #a4262c);
                    color: white;
                  }
                  
                  .emergency-banner-warning {
                    background: linear-gradient(90deg, #ffb900, #d39300);
                    color: #323130;
                  }
                  
                  .emergency-banner-info {
                    background: linear-gradient(90deg, #0078d4, #106ebe);
                    color: white;
                  }
                  
                  .emergency-banner-success {
                    background: linear-gradient(90deg, #107c10, #0e6e0e);
                    color: white;
                  }
                  
                  .emergency-banner-content {
                    display: flex;
                    align-items: center;
                    padding: 12px 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                    gap: 12px;
                  }
                  
                  .emergency-banner-icon {
                    flex-shrink: 0;
                    width: 20px;
                    height: 20px;
                  }
                  
                  .emergency-banner-icon svg {
                    width: 100%;
                    height: 100%;
                  }
                  
                  .emergency-banner-message {
                    flex: 1;
                    font-weight: 500;
                  }
                  
                  .emergency-banner-message a {
                    color: inherit;
                    text-decoration: underline;
                  }
                  
                  .emergency-banner-action {
                    flex-shrink: 0;
                  }
                  
                  .emergency-banner-button {
                    background: rgba(255, 255, 255, 0.2);
                    color: inherit;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    padding: 8px 16px;
                    border-radius: 4px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    transition: all 0.2s ease;
                  }
                  
                  .emergency-banner-button:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-1px);
                  }
                  
                  .emergency-banner-dismiss {
                    position: absolute;
                    top: 50%;
                    right: 16px;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: inherit;
                    font-size: 20px;
                    width: 32px;
                    height: 32px;
                    cursor: pointer;
                    opacity: 0.8;
                    transition: opacity 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                  
                  .emergency-banner-dismiss:hover {
                    opacity: 1;
                  }
                  
                  @media (max-width: 768px) {
                    .emergency-banner-content {
                      padding: 10px 50px 10px 16px;
                      font-size: 13px;
                    }
                    
                    .emergency-banner-button {
                      padding: 6px 12px;
                      font-size: 11px;
                    }
                    
                    .emergency-banner-dismiss {
                      right: 12px;
                    }
                  }
                  
                  /* Animation variants */
                  .emergency-banner.slide-down {
                    animation: slideDown 0.5s ease;
                  }
                  
                  .emergency-banner.fade-in {
                    animation: fadeIn 0.5s ease;
                  }
                  
                  @keyframes slideDown {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                  }
                  
                  @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                  }
                \`;
                
                document.head.appendChild(styles);
              };
              
              EmergencyBanner.prototype.showBanner = function() {
                var targetElement = document.body;
                
                // Set position class
                this.banner.classList.add(config.position);
                
                // Add animation class if specified
                if (config.animation && config.animation !== 'none') {
                  this.banner.classList.add(config.animation);
                }
                
                targetElement.appendChild(this.banner);
                
                // Trigger visibility with slight delay for animation
                setTimeout(function() {
                  this.banner.classList.add('visible');
                  this.isVisible = true;
                }.bind(this), 100);
                
                // Adjust body padding to account for fixed banner
                this.adjustPageLayout();
              };
              
              EmergencyBanner.prototype.hideBanner = function() {
                if (!this.banner || !this.isVisible) return;
                
                this.banner.classList.remove('visible');
                this.isVisible = false;
                
                setTimeout(function() {
                  if (this.banner && this.banner.parentNode) {
                    this.banner.parentNode.removeChild(this.banner);
                  }
                  this.resetPageLayout();
                }.bind(this), 300);
              };
              
              EmergencyBanner.prototype.adjustPageLayout = function() {
                var bannerHeight = this.banner.offsetHeight;
                var body = document.body;
                
                if (config.position === 'top') {
                  body.style.paddingTop = bannerHeight + 'px';
                } else if (config.position === 'bottom') {
                  body.style.paddingBottom = bannerHeight + 'px';
                }
              };
              
              EmergencyBanner.prototype.resetPageLayout = function() {
                var body = document.body;
                body.style.paddingTop = '';
                body.style.paddingBottom = '';
              };
              
              EmergencyBanner.prototype.attachEvents = function() {
                if (config.dismissible) {
                  var dismissBtn = this.banner.querySelector('.emergency-banner-dismiss');
                  if (dismissBtn) {
                    dismissBtn.addEventListener('click', this.handleDismiss.bind(this));
                  }
                }
                
                // Keyboard accessibility
                document.addEventListener('keydown', function(e) {
                  if (e.key === 'Escape' && config.dismissible && this.isVisible) {
                    this.handleDismiss();
                  }
                }.bind(this));
              };
              
              EmergencyBanner.prototype.handleDismiss = function() {
                this.isDismissed = true;
                
                // Store dismissal in localStorage if persistent
                if (config.persistDismissal) {
                  var dismissalKey = 'emergencyBanner_dismissed_' + config.bannerId;
                  localStorage.setItem(dismissalKey, 'true');
                }
                
                this.hideBanner();
              };
              
              // Initialize when DOM is ready
              function initBanner() {
                new EmergencyBanner().init();
              }
              
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initBanner);
              } else {
                initBanner();
              }
              
            })();
          `
        },
        requiredParameters: [
          {
            name: 'uniqueId',
            displayName: 'Unique Identifier',
            description: 'Unique ID to prevent conflicts',
            type: TemplateParameterType.Text,
            required: true,
            defaultValue: Date.now().toString(36)
          },
          {
            name: 'notificationMessage',
            displayName: 'Notification Message',
            description: 'Emergency message to display (HTML supported)',
            type: TemplateParameterType.Code,
            required: true,
            helpText: 'Use HTML tags for formatting. Keep message concise but informative.'
          },
          {
            name: 'alertType',
            displayName: 'Alert Type',
            description: 'Visual style and urgency level of the alert',
            type: TemplateParameterType.Dropdown,
            required: true,
            options: [
              { key: 'error', text: 'Error (Critical)', value: 'error' },
              { key: 'warning', text: 'Warning (Important)', value: 'warning' },
              { key: 'info', text: 'Information', value: 'info' },
              { key: 'success', text: 'Success', value: 'success' }
            ]
          }
        ],
        optionalParameters: [
          {
            name: 'allowDismissal',
            displayName: 'Allow Dismissal',
            description: 'Users can dismiss the notification',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'persistDismissal',
            displayName: 'Remember Dismissal',
            description: 'Don\'t show again after user dismisses',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: false
          },
          {
            name: 'autoHide',
            displayName: 'Auto Hide',
            description: 'Automatically hide notification after delay',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: false
          },
          {
            name: 'autoHideDelay',
            displayName: 'Auto Hide Delay (seconds)',
            description: 'Seconds before auto-hiding',
            type: TemplateParameterType.Number,
            required: false,
            defaultValue: 10,
            validation: { min: 5, max: 300 }
          },
          {
            name: 'showIcon',
            displayName: 'Show Icon',
            description: 'Display type-appropriate icon',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'bannerPosition',
            displayName: 'Banner Position',
            description: 'Where to display the banner',
            type: TemplateParameterType.Dropdown,
            required: false,
            defaultValue: 'top',
            options: [
              { key: 'top', text: 'Top of page', value: 'top' },
              { key: 'bottom', text: 'Bottom of page', value: 'bottom' }
            ]
          },
          {
            name: 'animationType',
            displayName: 'Animation Type',
            description: 'Entrance animation style',
            type: TemplateParameterType.Dropdown,
            required: false,
            defaultValue: 'slide-down',
            options: [
              { key: 'none', text: 'No animation', value: 'none' },
              { key: 'slide-down', text: 'Slide down', value: 'slide-down' },
              { key: 'fade-in', text: 'Fade in', value: 'fade-in' }
            ]
          },
          {
            name: 'showActionButton',
            displayName: 'Show Action Button',
            description: 'Display action button in banner',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: false
          },
          {
            name: 'actionButtonText',
            displayName: 'Action Button Text',
            description: 'Text for the action button',
            type: TemplateParameterType.Text,
            required: false,
            defaultValue: 'Learn More',
            validation: { maxLength: 20 }
          },
          {
            name: 'actionButtonUrl',
            displayName: 'Action Button URL',
            description: 'URL for the action button',
            type: TemplateParameterType.Url,
            required: false,
          },
          {
            name: 'startDate',
            displayName: 'Start Date',
            description: 'When to start showing the banner (optional)',
            type: TemplateParameterType.Date,
            required: false
          },
          {
            name: 'endDate',
            displayName: 'End Date',
            description: 'When to stop showing the banner (optional)',
            type: TemplateParameterType.Date,
            required: false
          }
        ],
        icon: 'WarningSolid',
        previewUrl: 'https://example.com/emergency-banner-preview.png'
      },

      // ANALYTICS TEMPLATES
      {
        id: 'comprehensive-analytics-tracker',
        name: 'Comprehensive Analytics Tracker',
        description: 'Advanced analytics integration with Google Analytics 4, Azure Application Insights, and custom event tracking',
        category: 'Analytics',
        tags: ['analytics', 'tracking', 'metrics', 'google-analytics', 'application-insights', 'events'],
        author: 'Microsoft',
        version: '3.0.0',
        createdDate: new Date('2024-02-01'),
        modifiedDate: new Date('2024-03-15'),
        isBuiltIn: true,
        isActive: true,
        usageCount: 234,
        rating: 4.7,
        defaultScope: CustomActionScope.Site,
        template: {
          Title: 'Comprehensive Analytics Tracker',
          Location: 'ScriptLink',
          Sequence: 1000,
          ScriptBlock: `
            (function() {
              'use strict';
              
              // Configuration
              var config = {
                // Google Analytics 4
                enableGA4: {{enableGA4}},
                ga4MeasurementId: '{{ga4MeasurementId}}',
                
                // Azure Application Insights
                enableAppInsights: {{enableAppInsights}},
                appInsightsConnectionString: '{{appInsightsConnectionString}}',
                
                // Custom tracking
                trackPageViews: {{trackPageViews}},
                trackClicks: {{trackClicks}},
                trackFormSubmissions: {{trackFormSubmissions}},
                trackFileDownloads: {{trackFileDownloads}},
                trackScrollDepth: {{trackScrollDepth}},
                trackTimeOnPage: {{trackTimeOnPage}},
                
                // Privacy and compliance
                respectDoNotTrack: {{respectDoNotTrack}},
                enableConsentManagement: {{enableConsentManagement}},
                cookieDomain: '{{cookieDomain}}' || 'auto',
                
                // Advanced options
                debugMode: {{debugMode}},
                customDimensions: {{customDimensions}} ? JSON.parse('{{customDimensions}}') : {},
                excludeAdmins: {{excludeAdmins}}
              };
              
              // Analytics Manager Class
              function AnalyticsManager() {
                this.isInitialized = false;
                this.userConsent = false;
                this.pageLoadTime = Date.now();
                this.scrollDepthMarkers = [25, 50, 75, 90, 100];
                this.scrollDepthReached = [];
                this.timeOnPageInterval = null;
                this.engagementStartTime = Date.now();
              }
              
              AnalyticsManager.prototype.init = function() {
                // Check if tracking should be disabled
                if (!this.shouldTrack()) {
                  this.log('Tracking disabled due to user preferences or admin exclusion');
                  return;
                }
                
                // Handle consent if enabled
                if (config.enableConsentManagement) {
                  this.initConsentManagement();
                } else {
                  this.userConsent = true;
                  this.initTracking();
                }
              };
              
              AnalyticsManager.prototype.shouldTrack = function() {
                // Respect Do Not Track header
                if (config.respectDoNotTrack && (navigator.doNotTrack === '1' || window.doNotTrack === '1')) {
                  return false;
                }
                
                // Exclude admins if configured
                if (config.excludeAdmins) {
                  try {
                    var userInfo = _spPageContextInfo.userDisplayName;
                    var isAdmin = _spPageContextInfo.isSiteAdmin;
                    if (isAdmin) return false;
                  } catch (e) {
                    // Ignore errors
                  }
                }
                
                return true;
              };
              
              AnalyticsManager.prototype.initConsentManagement = function() {
                // Simple consent banner implementation
                var consentBanner = document.createElement('div');
                consentBanner.id = 'analytics-consent-banner';
                consentBanner.innerHTML = \`
                  <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #323130; color: white; padding: 16px; z-index: 9999; font-family: 'Segoe UI', sans-serif; font-size: 14px;">
                    <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 16px;">
                      <div style="flex: 1;">
                        We use analytics to improve your experience. By continuing to use this site, you consent to our use of cookies and analytics tracking.
                      </div>
                      <button onclick="window.analyticsManager.grantConsent()" style="background: #0078d4; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Accept</button>
                      <button onclick="window.analyticsManager.denyConsent()" style="background: transparent; color: white; border: 1px solid white; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Decline</button>
                    </div>
                  </div>
                \`;
                
                // Check for existing consent
                var savedConsent = localStorage.getItem('analytics_consent');
                if (savedConsent === 'granted') {
                  this.userConsent = true;
                  this.initTracking();
                } else if (savedConsent === 'denied') {
                  this.userConsent = false;
                } else {
                  document.body.appendChild(consentBanner);
                }
              };
              
              AnalyticsManager.prototype.grantConsent = function() {
                this.userConsent = true;
                localStorage.setItem('analytics_consent', 'granted');
                this.removeConsentBanner();
                this.initTracking();
              };
              
              AnalyticsManager.prototype.denyConsent = function() {
                this.userConsent = false;
                localStorage.setItem('analytics_consent', 'denied');
                this.removeConsentBanner();
              };
              
              AnalyticsManager.prototype.removeConsentBanner = function() {
                var banner = document.getElementById('analytics-consent-banner');
                if (banner) banner.remove();
              };
              
              AnalyticsManager.prototype.initTracking = function() {
                if (!this.userConsent) return;
                
                // Initialize Google Analytics 4
                if (config.enableGA4 && config.ga4MeasurementId) {
                  this.initGA4();
                }
                
                // Initialize Azure Application Insights
                if (config.enableAppInsights && config.appInsightsConnectionString) {
                  this.initAppInsights();
                }
                
                // Set up event tracking
                this.setupEventTracking();
                
                this.isInitialized = true;
                this.log('Analytics tracking initialized');
              };
              
              AnalyticsManager.prototype.initGA4 = function() {
                // Load GA4
                var script = document.createElement('script');
                script.src = 'https://www.googletagmanager.com/gtag/js?id=' + config.ga4MeasurementId;
                script.async = true;
                document.head.appendChild(script);
                
                // Initialize gtag
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                
                gtag('js', new Date());
                gtag('config', config.ga4MeasurementId, {
                  cookie_domain: config.cookieDomain,
                  anonymize_ip: true,
                  allow_google_signals: false,
                  custom_map: config.customDimensions
                });
                
                this.log('Google Analytics 4 initialized');
              };
              
              AnalyticsManager.prototype.initAppInsights = function() {
                // Load Application Insights
                var script = document.createElement('script');
                script.src = 'https://js.monitor.azure.com/scripts/b/ai.2.min.js';
                script.onload = function() {
                  var appInsights = new Microsoft.ApplicationInsights.ApplicationInsights({
                    config: {
                      connectionString: config.appInsightsConnectionString,
                      enableAutoRouteTracking: true,
                      disableAjaxTracking: false,
                      disableFetchTracking: false,
                      enableCorsCorrelation: true
                    }
                  });
                  appInsights.loadAppInsights();
                  appInsights.trackPageView();
                  
                  window.appInsights = appInsights;
                }.bind(this);
                
                document.head.appendChild(script);
                this.log('Azure Application Insights initialized');
              };
              
              AnalyticsManager.prototype.setupEventTracking = function() {
                // Track page view
                if (config.trackPageViews) {
                  this.trackEvent('page_view', {
                    page_title: document.title,
                    page_location: window.location.href,
                    page_referrer: document.referrer
                  });
                }
                
                // Track clicks
                if (config.trackClicks) {
                  this.setupClickTracking();
                }
                
                // Track form submissions
                if (config.trackFormSubmissions) {
                  this.setupFormTracking();
                }
                
                // Track file downloads
                if (config.trackFileDownloads) {
                  this.setupDownloadTracking();
                }
                
                // Track scroll depth
                if (config.trackScrollDepth) {
                  this.setupScrollTracking();
                }
                
                // Track time on page
                if (config.trackTimeOnPage) {
                  this.setupTimeTracking();
                }
              };
              
              AnalyticsManager.prototype.setupClickTracking = function() {
                document.addEventListener('click', function(e) {
                  var element = e.target;
                  var tagName = element.tagName.toLowerCase();
                  
                  // Track link clicks
                  if (tagName === 'a' && element.href) {
                    var isExternal = element.hostname !== window.location.hostname;
                    this.trackEvent('click', {
                      event_category: 'engagement',
                      event_label: element.href,
                      link_text: element.textContent.trim(),
                      link_url: element.href,
                      outbound: isExternal
                    });
                  }
                  
                  // Track button clicks
                  if (tagName === 'button' || element.getAttribute('role') === 'button') {
                    this.trackEvent('click', {
                      event_category: 'engagement',
                      event_label: 'button',
                      button_text: element.textContent.trim(),
                      button_id: element.id || 'unnamed'
                    });
                  }
                }.bind(this));
              };
              
              AnalyticsManager.prototype.setupFormTracking = function() {
                document.addEventListener('submit', function(e) {
                  var form = e.target;
                  if (form.tagName.toLowerCase() === 'form') {
                    this.trackEvent('form_submit', {
                      event_category: 'engagement',
                      form_id: form.id || 'unnamed',
                      form_action: form.action || window.location.href
                    });
                  }
                }.bind(this));
              };
              
              AnalyticsManager.prototype.setupDownloadTracking = function() {
                document.addEventListener('click', function(e) {
                  var element = e.target;
                  if (element.tagName.toLowerCase() === 'a' && element.href) {
                    var href = element.href.toLowerCase();
                    var downloadExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.zip', '.rar'];
                    
                    var isDownload = downloadExtensions.some(function(ext) {
                      return href.indexOf(ext) !== -1;
                    });
                    
                    if (isDownload) {
                      var fileName = element.href.split('/').pop();
                      this.trackEvent('file_download', {
                        event_category: 'engagement',
                        event_label: fileName,
                        file_name: fileName,
                        file_url: element.href
                      });
                    }
                  }
                }.bind(this));
              };
              
              AnalyticsManager.prototype.setupScrollTracking = function() {
                var throttle = function(func, delay) {
                  var timeoutId;
                  var lastExecTime = 0;
                  return function() {
                    var currentTime = Date.now();
                    if (currentTime - lastExecTime > delay) {
                      func.apply(this, arguments);
                      lastExecTime = currentTime;
                    }
                  };
                };
                
                var trackScroll = throttle(function() {
                  var scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                  
                  this.scrollDepthMarkers.forEach(function(marker) {
                    if (scrollPercent >= marker && this.scrollDepthReached.indexOf(marker) === -1) {
                      this.scrollDepthReached.push(marker);
                      this.trackEvent('scroll', {
                        event_category: 'engagement',
                        event_label: marker + '%',
                        scroll_depth: marker
                      });
                    }
                  }.bind(this));
                }.bind(this), 1000);
                
                window.addEventListener('scroll', trackScroll);
              };
              
              AnalyticsManager.prototype.setupTimeTracking = function() {
                var trackingIntervals = [30, 60, 180, 300, 600]; // 30s, 1m, 3m, 5m, 10m
                var trackedIntervals = [];
                
                this.timeOnPageInterval = setInterval(function() {
                  var timeOnPage = Math.floor((Date.now() - this.pageLoadTime) / 1000);
                  
                  trackingIntervals.forEach(function(interval) {
                    if (timeOnPage >= interval && trackedIntervals.indexOf(interval) === -1) {
                      trackedIntervals.push(interval);
                      this.trackEvent('timing', {
                        event_category: 'engagement',
                        event_label: interval + 's',
                        time_on_page: interval
                      });
                    }
                  }.bind(this));
                }.bind(this), 5000);
              };
              
              AnalyticsManager.prototype.trackEvent = function(eventName, parameters) {
                if (!this.userConsent) return;
                
                parameters = parameters || {};
                
                // Add SharePoint context data
                try {
                  if (_spPageContextInfo) {
                    parameters.sp_site_id = _spPageContextInfo.siteId;
                    parameters.sp_web_id = _spPageContextInfo.webId;
                    parameters.sp_user_id = _spPageContextInfo.userId;
                    parameters.sp_culture = _spPageContextInfo.currentUICultureName;
                  }
                } catch (e) {
                  // Ignore errors
                }
                
                // Track with Google Analytics 4
                if (config.enableGA4 && window.gtag) {
                  window.gtag('event', eventName, parameters);
                }
                
                // Track with Application Insights
                if (config.enableAppInsights && window.appInsights) {
                  window.appInsights.trackEvent({ name: eventName, properties: parameters });
                }
                
                this.log('Event tracked: ' + eventName, parameters);
              };
              
              AnalyticsManager.prototype.log = function(message, data) {
                if (config.debugMode) {
                  console.log('[Analytics] ' + message, data || '');
                }
              };
              
              // Global access
              window.analyticsManager = new AnalyticsManager();
              
              // Initialize when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                  window.analyticsManager.init();
                });
              } else {
                window.analyticsManager.init();
              }
              
              // Clean up on page unload
              window.addEventListener('beforeunload', function() {
                if (window.analyticsManager.timeOnPageInterval) {
                  clearInterval(window.analyticsManager.timeOnPageInterval);
                }
              });
              
            })();
          `
        },
        requiredParameters: [
          {
            name: 'enableGA4',
            displayName: 'Enable Google Analytics 4',
            description: 'Enable Google Analytics 4 tracking',
            type: TemplateParameterType.Boolean,
            required: true,
            defaultValue: false
          },
          {
            name: 'enableAppInsights',
            displayName: 'Enable Azure Application Insights',
            description: 'Enable Azure Application Insights tracking',
            type: TemplateParameterType.Boolean,
            required: true,
            defaultValue: false
          }
        ],
        optionalParameters: [
          {
            name: 'ga4MeasurementId',
            displayName: 'GA4 Measurement ID',
            description: 'Google Analytics 4 Measurement ID (G-XXXXXXXXXX)',
            type: TemplateParameterType.Text,
            required: false,
            validation: { pattern: '^G-[A-Z0-9]{10}$' }
          },
          {
            name: 'appInsightsConnectionString',
            displayName: 'Application Insights Connection String',
            description: 'Azure Application Insights connection string',
            type: TemplateParameterType.Text,
            required: false,
          },
          {
            name: 'trackPageViews',
            displayName: 'Track Page Views',
            description: 'Automatically track page view events',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'trackClicks',
            displayName: 'Track Clicks',
            description: 'Track link and button clicks',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'trackFormSubmissions',
            displayName: 'Track Form Submissions',
            description: 'Track form submission events',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'trackFileDownloads',
            displayName: 'Track File Downloads',
            description: 'Track clicks on downloadable files',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'trackScrollDepth',
            displayName: 'Track Scroll Depth',
            description: 'Track how far users scroll on pages',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'trackTimeOnPage',
            displayName: 'Track Time on Page',
            description: 'Track engagement time milestones',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'respectDoNotTrack',
            displayName: 'Respect Do Not Track',
            description: 'Honor browser Do Not Track settings',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'enableConsentManagement',
            displayName: 'Enable Consent Management',
            description: 'Show consent banner for GDPR compliance',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: false
          },
          {
            name: 'cookieDomain',
            displayName: 'Cookie Domain',
            description: 'Domain for analytics cookies (auto for automatic)',
            type: TemplateParameterType.Text,
            required: false,
            defaultValue: 'auto'
          },
          {
            name: 'excludeAdmins',
            displayName: 'Exclude Site Administrators',
            description: 'Don\'t track site administrators',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'debugMode',
            displayName: 'Debug Mode',
            description: 'Enable console logging for debugging',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: false
          },
          {
            name: 'customDimensions',
            displayName: 'Custom Dimensions (JSON)',
            description: 'Custom dimension mappings as JSON',
            type: TemplateParameterType.Code,
            required: false,
            helpText: 'Enter JSON object mapping parameters to custom dimensions'
          }
        ],
        icon: 'BarChartVertical',
        previewUrl: 'https://example.com/analytics-tracker-preview.png'
      },

      // SECURITY & BRANDING TEMPLATES
      {
        id: 'security-header-enhancement',
        name: 'Security Header Enhancement',
        description: 'Comprehensive security headers and Content Security Policy (CSP) implementation for enhanced site security',
        category: 'Security',
        tags: ['security', 'csp', 'headers', 'protection', 'xss', 'clickjacking'],
        author: 'Microsoft',
        version: '2.0.0',
        createdDate: new Date('2024-02-10'),
        modifiedDate: new Date('2024-03-20'),
        isBuiltIn: true,
        isActive: true,
        usageCount: 67,
        rating: 4.6,
        defaultScope: CustomActionScope.Site,
        template: {
          Title: 'Security Header Enhancement',
          Location: 'ScriptLink',
          Sequence: 10,
          ScriptBlock: `
            (function() {
              'use strict';
              
              // Configuration
              var config = {
                enableCSP: {{enableCSP}},
                cspDirectives: {
                  defaultSrc: "{{defaultSrc}}" || "'self'",
                  scriptSrc: "{{scriptSrc}}" || "'self' 'unsafe-inline' 'unsafe-eval'",
                  styleSrc: "{{styleSrc}}" || "'self' 'unsafe-inline'",
                  imgSrc: "{{imgSrc}}" || "'self' data: https:",
                  fontSrc: "{{fontSrc}}" || "'self' data:",
                  connectSrc: "{{connectSrc}}" || "'self'",
                  frameSrc: "{{frameSrc}}" || "'self'",
                  objectSrc: "{{objectSrc}}" || "'none'"
                },
                enableXFrameOptions: {{enableXFrameOptions}},
                xFrameOptions: "{{xFrameOptions}}" || "SAMEORIGIN",
                enableXSSProtection: {{enableXSSProtection}},
                enableNoSniff: {{enableNoSniff}},
                enableReferrerPolicy: {{enableReferrerPolicy}},
                referrerPolicy: "{{referrerPolicy}}" || "strict-origin-when-cross-origin",
                enableHSTS: {{enableHSTS}},
                hstsMaxAge: {{hstsMaxAge}} || 31536000,
                hstsIncludeSubDomains: {{hstsIncludeSubDomains}},
                enableClickjackProtection: {{enableClickjackProtection}},
                allowedFrameAncestors: "{{allowedFrameAncestors}}" || "'self'",
                reportViolations: {{reportViolations}},
                reportUri: "{{reportUri}}",
                enforceMode: {{enforceMode}},
                showSecurityBanner: {{showSecurityBanner}},
                logSecurityEvents: {{logSecurityEvents}}
              };
              
              // Security Manager Class
              function SecurityManager() {
                this.violations = [];
                this.isInitialized = false;
              }
              
              SecurityManager.prototype.init = function() {
                this.log('Initializing security enhancements...');
                
                // Apply security headers via meta tags (where possible)
                this.applySecurityHeaders();
                
                // Set up Content Security Policy
                if (config.enableCSP) {
                  this.setupCSP();
                }
                
                // Enable clickjack protection
                if (config.enableClickjackProtection) {
                  this.enableClickjackProtection();
                }
                
                // Set up violation reporting
                if (config.reportViolations && config.reportUri) {
                  this.setupViolationReporting();
                }
                
                // Show security status banner if enabled
                if (config.showSecurityBanner) {
                  this.showSecurityBanner();
                }
                
                // Set up monitoring
                this.setupSecurityMonitoring();
                
                this.isInitialized = true;
                this.log('Security enhancements initialized successfully');
              };
              
              SecurityManager.prototype.applySecurityHeaders = function() {
                var head = document.getElementsByTagName('head')[0];
                
                // X-Frame-Options
                if (config.enableXFrameOptions) {
                  this.createMetaTag('http-equiv', 'X-Frame-Options', config.xFrameOptions);
                }
                
                // X-XSS-Protection
                if (config.enableXSSProtection) {
                  this.createMetaTag('http-equiv', 'X-XSS-Protection', '1; mode=block');
                }
                
                // X-Content-Type-Options
                if (config.enableNoSniff) {
                  this.createMetaTag('http-equiv', 'X-Content-Type-Options', 'nosniff');
                }
                
                // Referrer Policy
                if (config.enableReferrerPolicy) {
                  this.createMetaTag('name', 'referrer', config.referrerPolicy);
                }
                
                this.log('Security headers applied');
              };
              
              SecurityManager.prototype.createMetaTag = function(attributeName, attributeValue, content) {
                var meta = document.createElement('meta');
                meta.setAttribute(attributeName, attributeValue);
                meta.setAttribute('content', content);
                document.getElementsByTagName('head')[0].appendChild(meta);
              };
              
              SecurityManager.prototype.setupCSP = function() {
                var cspValue = this.buildCSPString();
                var headerName = config.enforceMode ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only';
                
                this.createMetaTag('http-equiv', headerName, cspValue);
                this.log('Content Security Policy configured: ' + (config.enforceMode ? 'Enforce Mode' : 'Report Only Mode'));
              };
              
              SecurityManager.prototype.buildCSPString = function() {
                var directives = [];
                
                Object.keys(config.cspDirectives).forEach(function(key) {
                  var value = config.cspDirectives[key];
                  if (value) {
                    var directiveName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                    directives.push(directiveName + ' ' + value);
                  }
                });
                
                // Add report-uri if configured
                if (config.reportViolations && config.reportUri) {
                  directives.push('report-uri ' + config.reportUri);
                }
                
                return directives.join('; ');
              };
              
              SecurityManager.prototype.enableClickjackProtection = function() {
                // Prevent clickjacking attempts
                if (window.top !== window.self) {
                  // Check if framing is allowed
                  var isAllowedFrameAncestor = this.checkFrameAncestor();
                  
                  if (!isAllowedFrameAncestor) {
                    this.log('Potential clickjacking attempt detected - blocking frame', 'warn');
                    
                    // Break out of frame
                    window.top.location = window.self.location;
                    
                    // Hide content as fallback
                    document.body.style.display = 'none';
                    
                    this.reportSecurityEvent('clickjack_attempt', {
                      top_location: window.top.location.href,
                      current_location: window.self.location.href,
                      referrer: document.referrer
                    });
                  }
                }
              };
              
              SecurityManager.prototype.checkFrameAncestor = function() {
                try {
                  var allowedAncestors = config.allowedFrameAncestors.split(' ');
                  var parentOrigin = window.parent.location.origin;
                  
                  return allowedAncestors.includes("'self'") && parentOrigin === window.location.origin ||
                         allowedAncestors.includes(parentOrigin);
                } catch (e) {
                  // Cross-origin restriction - assume not allowed
                  return false;
                }
              };
              
              SecurityManager.prototype.setupViolationReporting = function() {
                // Listen for CSP violations
                document.addEventListener('securitypolicyviolation', function(e) {
                  this.handleCSPViolation(e);
                }.bind(this));
                
                // Set up periodic violation reporting
                setInterval(this.reportViolationsSummary.bind(this), 60000); // Every minute
              };
              
              SecurityManager.prototype.handleCSPViolation = function(event) {
                var violation = {
                  timestamp: new Date().toISOString(),
                  blocked_uri: event.blockedURI,
                  document_uri: event.documentURI,
                  effective_directive: event.effectiveDirective,
                  original_policy: event.originalPolicy,
                  referrer: event.referrer,
                  status_code: event.statusCode,
                  violated_directive: event.violatedDirective
                };
                
                this.violations.push(violation);
                this.log('CSP Violation detected', violation);
                
                // Report immediately for critical violations
                if (this.isCriticalViolation(violation)) {
                  this.reportSecurityEvent('csp_violation_critical', violation);
                }
              };
              
              SecurityManager.prototype.isCriticalViolation = function(violation) {
                var criticalDirectives = ['script-src', 'object-src', 'base-uri'];
                return criticalDirectives.includes(violation.effective_directive);
              };
              
              SecurityManager.prototype.setupSecurityMonitoring = function() {
                // Monitor for suspicious script injections
                var originalCreateElement = document.createElement;
                document.createElement = function(tagName) {
                  var element = originalCreateElement.call(document, tagName);
                  
                  if (tagName.toLowerCase() === 'script') {
                    this.log('Script element created dynamically', 'info');
                    
                    // Monitor script loading
                    element.addEventListener('load', function() {
                      this.reportSecurityEvent('dynamic_script_loaded', {
                        src: element.src,
                        inline: !element.src
                      });
                    }.bind(this));
                  }
                  
                  return element;
                }.bind(this);
                
                // Monitor for eval() usage
                var originalEval = window.eval;
                window.eval = function(code) {
                  this.log('eval() called - potential security risk', 'warn');
                  this.reportSecurityEvent('eval_usage', {
                    code_snippet: code.substring(0, 100),
                    stack_trace: new Error().stack
                  });
                  
                  return originalEval.call(window, code);
                }.bind(this);
              };
              
              SecurityManager.prototype.reportSecurityEvent = function(eventType, details) {
                if (!config.logSecurityEvents) return;
                
                var event = {
                  type: eventType,
                  timestamp: new Date().toISOString(),
                  url: window.location.href,
                  user_agent: navigator.userAgent,
                  details: details
                };
                
                // Send to configured endpoint
                if (config.reportUri) {
                  this.sendSecurityReport(event);
                }
                
                // Log locally
                this.log('Security event: ' + eventType, event);
              };
              
              SecurityManager.prototype.sendSecurityReport = function(event) {
                try {
                  fetch(config.reportUri, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(event)
                  }).catch(function(error) {
                    this.log('Failed to send security report: ' + error.message, 'error');
                  }.bind(this));
                } catch (e) {
                  this.log('Error sending security report: ' + e.message, 'error');
                }
              };
              
              SecurityManager.prototype.reportViolationsSummary = function() {
                if (this.violations.length === 0) return;
                
                var summary = {
                  total_violations: this.violations.length,
                  violation_types: {},
                  time_range: {
                    start: this.violations[0].timestamp,
                    end: this.violations[this.violations.length - 1].timestamp
                  }
                };
                
                // Aggregate violations by type
                this.violations.forEach(function(violation) {
                  var directive = violation.effective_directive;
                  summary.violation_types[directive] = (summary.violation_types[directive] || 0) + 1;
                });
                
                this.reportSecurityEvent('csp_violations_summary', summary);
                
                // Clear violations after reporting
                this.violations = [];
              };
              
              SecurityManager.prototype.showSecurityBanner = function() {
                var banner = document.createElement('div');
                banner.id = 'security-status-banner';
                banner.innerHTML = \`
                  <div style="position: fixed; top: 0; right: 20px; background: #107c10; color: white; padding: 8px 16px; border-radius: 0 0 8px 8px; font-family: 'Segoe UI', sans-serif; font-size: 12px; z-index: 10000; cursor: pointer;" onclick="this.style.display='none'">
                    🔒 Security Enhanced
                    <span style="margin-left: 8px; opacity: 0.8;">Click to dismiss</span>
                  </div>
                \`;
                
                document.body.appendChild(banner);
                
                // Auto-hide after 5 seconds
                setTimeout(function() {
                  if (banner.parentNode) {
                    banner.style.opacity = '0';
                    banner.style.transition = 'opacity 0.5s ease';
                    setTimeout(function() {
                      if (banner.parentNode) {
                        banner.parentNode.removeChild(banner);
                      }
                    }, 500);
                  }
                }, 5000);
              };
              
              SecurityManager.prototype.log = function(message, data, level) {
                level = level || 'info';
                var prefix = '[Security] ';
                
                if (console[level]) {
                  console[level](prefix + message, data || '');
                } else {
                  console.log(prefix + message, data || '');
                }
              };
              
              // Initialize security manager
              var securityManager = new SecurityManager();
              
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                  securityManager.init();
                });
              } else {
                securityManager.init();
              }
              
              // Global access for debugging
              window.securityManager = securityManager;
              
            })();
          `
        },
        requiredParameters: [
          {
            name: 'enableCSP',
            displayName: 'Enable Content Security Policy',
            description: 'Implement Content Security Policy headers',
            type: TemplateParameterType.Boolean,
            required: true,
            defaultValue: true
          },
          {
            name: 'enforceMode',
            displayName: 'CSP Enforce Mode',
            description: 'Enforce CSP violations (vs report-only mode)',
            type: TemplateParameterType.Boolean,
            required: true,
            defaultValue: false
          }
        ],
        optionalParameters: [
          {
            name: 'defaultSrc',
            displayName: 'CSP default-src',
            description: 'Default source policy for all resource types',
            type: TemplateParameterType.Text,
            required: false,
            defaultValue: "'self'",
            helpText: "Use 'self' for same-origin, 'none' to block all, or specify domains"
          },
          {
            name: 'scriptSrc',
            displayName: 'CSP script-src',
            description: 'Allowed sources for JavaScript',
            type: TemplateParameterType.Text,
            required: false,
            defaultValue: "'self' 'unsafe-inline' 'unsafe-eval'",
            helpText: "Consider removing 'unsafe-inline' and 'unsafe-eval' for better security"
          },
          {
            name: 'styleSrc',
            displayName: 'CSP style-src',
            description: 'Allowed sources for CSS stylesheets',
            type: TemplateParameterType.Text,
            required: false,
            defaultValue: "'self' 'unsafe-inline'"
          },
          {
            name: 'imgSrc',
            displayName: 'CSP img-src',
            description: 'Allowed sources for images',
            type: TemplateParameterType.Text,
            required: false,
            defaultValue: "'self' data: https:"
          },
          {
            name: 'enableXFrameOptions',
            displayName: 'Enable X-Frame-Options',
            description: 'Prevent clickjacking with X-Frame-Options header',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'xFrameOptions',
            displayName: 'X-Frame-Options Value',
            description: 'X-Frame-Options header value',
            type: TemplateParameterType.Dropdown,
            required: false,
            defaultValue: 'SAMEORIGIN',
            options: [
              { key: 'DENY', text: 'DENY - No framing allowed', value: 'DENY' },
              { key: 'SAMEORIGIN', text: 'SAMEORIGIN - Same origin only', value: 'SAMEORIGIN' }
            ]
          },
          {
            name: 'enableClickjackProtection',
            displayName: 'Enable Clickjack Protection',
            description: 'Advanced clickjacking protection with JavaScript',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'reportViolations',
            displayName: 'Report Security Violations',
            description: 'Enable reporting of security policy violations',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: false
          },
          {
            name: 'reportUri',
            displayName: 'Report URI',
            description: 'Endpoint URL for security violation reports',
            type: TemplateParameterType.Url,
            required: false,
          },
          {
            name: 'showSecurityBanner',
            displayName: 'Show Security Status Banner',
            description: 'Display security enhancement notification',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: false
          },
          {
            name: 'logSecurityEvents',
            displayName: 'Log Security Events',
            description: 'Enable detailed security event logging',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          }
        ],
        icon: 'Shield',
        previewUrl: 'https://example.com/security-enhancement-preview.png'
      },

      // UTILITY TEMPLATES  
      {
        id: 'responsive-image-optimizer',
        name: 'Responsive Image Optimizer',
        description: 'Automatic image optimization with lazy loading, WebP support, and responsive sizing for improved performance',
        category: 'Utility',
        tags: ['images', 'performance', 'lazy-loading', 'webp', 'responsive', 'optimization'],
        author: 'Microsoft',
        version: '1.3.0',
        createdDate: new Date('2024-03-01'),
        modifiedDate: new Date('2024-03-25'),
        isBuiltIn: true,
        isActive: true,
        usageCount: 143,
        rating: 4.4,
        defaultScope: CustomActionScope.Web,
        template: {
          Title: 'Responsive Image Optimizer',
          Location: 'ScriptLink',
          Sequence: 800,
          ScriptBlock: `
            (function() {
              'use strict';
              
              // Configuration
              var config = {
                enableLazyLoading: {{enableLazyLoading}},
                lazyLoadOffset: {{lazyLoadOffset}} || 100,
                enableWebP: {{enableWebP}},
                enableResponsive: {{enableResponsive}},
                breakpoints: {{breakpoints}} ? JSON.parse('{{breakpoints}}') : [480, 768, 1024, 1200],
                qualitySettings: {{qualitySettings}} ? JSON.parse('{{qualitySettings}}') : {
                  high: 90,
                  medium: 75,
                  low: 60
                },
                enablePlaceholder: {{enablePlaceholder}},
                placeholderColor: '{{placeholderColor}}' || '#f0f0f0',
                enableBlurEffect: {{enableBlurEffect}},
                enableProgressiveLoading: {{enableProgressiveLoading}},
                loadingAnimation: '{{loadingAnimation}}' || 'fade',
                enableRetry: {{enableRetry}},
                maxRetries: {{maxRetries}} || 3,
                enableAnalytics: {{enableAnalytics}},
                debugMode: {{debugMode}}
              };
              
              // Image Optimizer Class
              function ImageOptimizer() {
                this.observer = null;
                this.images = [];
                this.stats = {
                  totalImages: 0,
                  optimizedImages: 0,
                  lazyLoadedImages: 0,
                  webpImages: 0,
                  failedImages: 0,
                  averageLoadTime: 0
                };
                this.isInitialized = false;
              }
              
              ImageOptimizer.prototype.init = function() {
                this.log('Initializing image optimizer...');
                
                // Check browser support
                this.checkBrowserSupport();
                
                // Initialize Intersection Observer for lazy loading
                if (config.enableLazyLoading && 'IntersectionObserver' in window) {
                  this.initLazyLoading();
                }
                
                // Process existing images
                this.processExistingImages();
                
                // Set up mutation observer for dynamically added images
                this.setupMutationObserver();
                
                // Add CSS for optimizations
                this.addOptimizationStyles();
                
                this.isInitialized = true;
                this.log('Image optimizer initialized successfully');
                
                // Report initial stats
                if (config.enableAnalytics) {
                  setTimeout(this.reportStats.bind(this), 5000);
                }
              };
              
              ImageOptimizer.prototype.checkBrowserSupport = function() {
                // Check WebP support
                if (config.enableWebP) {
                  this.checkWebPSupport(function(supported) {
                    this.webpSupported = supported;
                    this.log('WebP support: ' + (supported ? 'Yes' : 'No'));
                  }.bind(this));
                }
                
                // Check Intersection Observer support
                this.intersectionObserverSupported = 'IntersectionObserver' in window;
                this.log('Intersection Observer support: ' + (this.intersectionObserverSupported ? 'Yes' : 'No'));
              };
              
              ImageOptimizer.prototype.checkWebPSupport = function(callback) {
                var webP = new Image();
                webP.onload = webP.onerror = function () {
                  callback(webP.height === 2);
                };
                webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
              };
              
              ImageOptimizer.prototype.initLazyLoading = function() {
                var options = {
                  root: null,
                  rootMargin: config.lazyLoadOffset + 'px',
                  threshold: 0.1
                };
                
                this.observer = new IntersectionObserver(this.handleIntersection.bind(this), options);
              };
              
              ImageOptimizer.prototype.handleIntersection = function(entries) {
                entries.forEach(function(entry) {
                  if (entry.isIntersecting) {
                    var img = entry.target;
                    this.loadImage(img);
                    this.observer.unobserve(img);
                  }
                }.bind(this));
              };
              
              ImageOptimizer.prototype.processExistingImages = function() {
                var images = document.querySelectorAll('img');
                this.stats.totalImages = images.length;
                
                images.forEach(function(img) {
                  this.processImage(img);
                }.bind(this));
                
                this.log('Processed ' + images.length + ' existing images');
              };
              
              ImageOptimizer.prototype.processImage = function(img) {
                // Skip if already processed
                if (img.dataset.optimized) return;
                
                var imageData = {
                  element: img,
                  originalSrc: img.src,
                  startTime: Date.now(),
                  retries: 0
                };
                
                this.images.push(imageData);
                
                // Add loading placeholder if enabled
                if (config.enablePlaceholder && !img.src) {
                  this.addPlaceholder(img);
                }
                
                // Set up responsive images
                if (config.enableResponsive) {
                  this.makeResponsive(img);
                }
                
                // Handle lazy loading
                if (config.enableLazyLoading && this.observer) {
                  if (img.dataset.src || img.dataset.lazySrc) {
                    // Already set up for lazy loading
                    this.observer.observe(img);
                  } else if (!this.isInViewport(img)) {
                    // Convert to lazy loading
                    img.dataset.src = img.src;
                    img.src = this.generatePlaceholderUrl(img);
                    this.observer.observe(img);
                  } else {
                    // In viewport, load immediately
                    this.loadImage(img);
                  }
                } else {
                  // No lazy loading, process immediately
                  this.optimizeImageSrc(img);
                }
                
                img.dataset.optimized = 'true';
              };
              
              ImageOptimizer.prototype.isInViewport = function(element) {
                var rect = element.getBoundingClientRect();
                return (
                  rect.top >= 0 &&
                  rect.left >= 0 &&
                  rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                  rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
              };
              
              ImageOptimizer.prototype.loadImage = function(img) {
                var src = img.dataset.src || img.dataset.lazySrc || img.src;
                var optimizedSrc = this.optimizeImageSrc(img, src);
                
                var imageData = this.getImageData(img);
                if (imageData) {
                  imageData.loadStartTime = Date.now();
                }
                
                // Create new image for loading
                var newImg = new Image();
                newImg.onload = this.handleImageLoad.bind(this, img, newImg);
                newImg.onerror = this.handleImageError.bind(this, img, src);
                
                newImg.src = optimizedSrc;
                
                this.stats.lazyLoadedImages++;
              };
              
              ImageOptimizer.prototype.handleImageLoad = function(originalImg, loadedImg) {
                var imageData = this.getImageData(originalImg);
                
                // Apply loading animation
                if (config.loadingAnimation !== 'none') {
                  originalImg.style.opacity = '0';
                  originalImg.style.transition = 'opacity 0.3s ease';
                }
                
                originalImg.src = loadedImg.src;
                
                // Remove loading classes
                originalImg.classList.remove('img-loading', 'img-placeholder');
                originalImg.classList.add('img-loaded');
                
                // Trigger animation
                if (config.loadingAnimation !== 'none') {
                  setTimeout(function() {
                    originalImg.style.opacity = '1';
                  }, 50);
                }
                
                // Update stats
                if (imageData) {
                  var loadTime = Date.now() - (imageData.loadStartTime || imageData.startTime);
                  this.updateLoadTimeStats(loadTime);
                }
                
                this.stats.optimizedImages++;
                this.log('Image loaded successfully: ' + originalImg.src);
              };
              
              ImageOptimizer.prototype.handleImageError = function(img, originalSrc) {
                var imageData = this.getImageData(img);
                
                if (config.enableRetry && imageData && imageData.retries < config.maxRetries) {
                  imageData.retries++;
                  this.log('Retrying image load (' + imageData.retries + '/' + config.maxRetries + '): ' + originalSrc);
                  
                  setTimeout(function() {
                    img.src = originalSrc; // Fallback to original
                  }, 1000 * imageData.retries);
                } else {
                  this.stats.failedImages++;
                  img.classList.add('img-error');
                  this.log('Image load failed: ' + originalSrc, 'error');
                }
              };
              
              ImageOptimizer.prototype.optimizeImageSrc = function(img, src) {
                src = src || img.src;
                if (!src) return src;
                
                var optimizedSrc = src;
                
                // Add WebP support if available
                if (config.enableWebP && this.webpSupported) {
                  optimizedSrc = this.addWebPFormat(optimizedSrc);
                  this.stats.webpImages++;
                }
                
                // Add quality parameters for supported services
                optimizedSrc = this.addQualityParameters(optimizedSrc, img);
                
                return optimizedSrc;
              };
              
              ImageOptimizer.prototype.addWebPFormat = function(src) {
                // For SharePoint image renditions and Office 365
                if (src.indexOf('/_layouts/15/getpreview.ashx') !== -1 || 
                    src.indexOf('.sharepoint.com') !== -1) {
                  return src + (src.indexOf('?') !== -1 ? '&' : '?') + 'format=webp';
                }
                
                return src;
              };
              
              ImageOptimizer.prototype.addQualityParameters = function(src, img) {
                // Determine quality based on image size and context
                var quality = this.determineQuality(img);
                
                // SharePoint image renditions
                if (src.indexOf('/_layouts/15/getpreview.ashx') !== -1) {
                  return src + (src.indexOf('?') !== -1 ? '&' : '?') + 'quality=' + quality;
                }
                
                return src;
              };
              
              ImageOptimizer.prototype.determineQuality = function(img) {
                var rect = img.getBoundingClientRect();
                var area = rect.width * rect.height;
                
                if (area > 500000) return config.qualitySettings.high;
                if (area > 100000) return config.qualitySettings.medium;
                return config.qualitySettings.low;
              };
              
              ImageOptimizer.prototype.makeResponsive = function(img) {
                if (!img.srcset && img.src) {
                  var srcset = this.generateSrcSet(img.src);
                  if (srcset) {
                    img.srcset = srcset;
                    img.sizes = this.generateSizes();
                  }
                }
              };
              
              ImageOptimizer.prototype.generateSrcSet = function(baseSrc) {
                var srcset = [];
                
                config.breakpoints.forEach(function(width) {
                  var src = this.addSizeParameters(baseSrc, width);
                  if (src !== baseSrc) {
                    srcset.push(src + ' ' + width + 'w');
                  }
                }.bind(this));
                
                return srcset.length > 0 ? srcset.join(', ') : null;
              };
              
              ImageOptimizer.prototype.addSizeParameters = function(src, width) {
                // SharePoint specific
                if (src.indexOf('/_layouts/15/getpreview.ashx') !== -1) {
                  return src + (src.indexOf('?') !== -1 ? '&' : '?') + 'width=' + width;
                }
                
                return src;
              };
              
              ImageOptimizer.prototype.generateSizes = function() {
                var sizes = [];
                
                config.breakpoints.forEach(function(breakpoint, index) {
                  if (index < config.breakpoints.length - 1) {
                    sizes.push('(max-width: ' + breakpoint + 'px) ' + breakpoint + 'px');
                  }
                });
                
                sizes.push('100vw');
                return sizes.join(', ');
              };
              
              ImageOptimizer.prototype.addPlaceholder = function(img) {
                img.classList.add('img-placeholder');
                
                if (config.enableBlurEffect) {
                  img.style.filter = 'blur(5px)';
                  img.style.transition = 'filter 0.3s ease';
                }
                
                if (!img.src) {
                  img.src = this.generatePlaceholderUrl(img);
                }
              };
              
              ImageOptimizer.prototype.generatePlaceholderUrl = function(img) {
                var width = img.offsetWidth || 300;
                var height = img.offsetHeight || 200;
                
                // Generate a simple SVG placeholder
                var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
                         '<rect width="100%" height="100%" fill="' + config.placeholderColor + '"/>' +
                         '<text x="50%" y="50%" font-family="Arial" font-size="14" fill="#999" text-anchor="middle" dy=".3em">Loading...</text>' +
                         '</svg>';
                
                return 'data:image/svg+xml;base64,' + btoa(svg);
              };
              
              ImageOptimizer.prototype.setupMutationObserver = function() {
                if (!window.MutationObserver) return;
                
                var observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                      mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                          var images = node.tagName === 'IMG' ? [node] : node.querySelectorAll('img');
                          images.forEach(this.processImage.bind(this));
                        }
                      }.bind(this));
                    }
                  }.bind(this));
                }.bind(this));
                
                observer.observe(document.body, {
                  childList: true,
                  subtree: true
                });
              };
              
              ImageOptimizer.prototype.addOptimizationStyles = function() {
                var styles = document.createElement('style');
                styles.textContent = \`
                  .img-loading {
                    opacity: 0.7;
                  }
                  
                  .img-placeholder {
                    background-color: \${config.placeholderColor};
                    min-height: 100px;
                  }
                  
                  .img-loaded {
                    opacity: 1 !important;
                    filter: none !important;
                  }
                  
                  .img-error {
                    opacity: 0.5;
                    filter: grayscale(100%);
                  }
                  
                  .img-error::after {
                    content: "⚠️ Failed to load";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0,0,0,0.7);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                  }
                \`;
                
                document.head.appendChild(styles);
              };
              
              ImageOptimizer.prototype.getImageData = function(img) {
                return this.images.find(function(item) {
                  return item.element === img;
                });
              };
              
              ImageOptimizer.prototype.updateLoadTimeStats = function(loadTime) {
                var totalTime = this.stats.averageLoadTime * this.stats.optimizedImages;
                this.stats.averageLoadTime = (totalTime + loadTime) / (this.stats.optimizedImages + 1);
              };
              
              ImageOptimizer.prototype.reportStats = function() {
                var stats = {
                  ...this.stats,
                  webpSupported: this.webpSupported,
                  intersectionObserverSupported: this.intersectionObserverSupported
                };
                
                this.log('Image optimization stats', stats);
                
                // Send to analytics if configured
                if (window.gtag) {
                  window.gtag('event', 'image_optimization', {
                    event_category: 'performance',
                    custom_map: stats
                  });
                }
              };
              
              ImageOptimizer.prototype.log = function(message, data, level) {
                if (!config.debugMode) return;
                
                level = level || 'info';
                var prefix = '[ImageOptimizer] ';
                
                if (console[level]) {
                  console[level](prefix + message, data || '');
                } else {
                  console.log(prefix + message, data || '');
                }
              };
              
              // Initialize image optimizer
              var imageOptimizer = new ImageOptimizer();
              
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                  imageOptimizer.init();
                });
              } else {
                imageOptimizer.init();
              }
              
              // Global access for debugging
              window.imageOptimizer = imageOptimizer;
              
            })();
          `
        },
        requiredParameters: [
          {
            name: 'enableLazyLoading',
            displayName: 'Enable Lazy Loading',
            description: 'Load images only when they become visible',
            type: TemplateParameterType.Boolean,
            required: true,
            defaultValue: true
          }
        ],
        optionalParameters: [
          {
            name: 'lazyLoadOffset',
            displayName: 'Lazy Load Offset (px)',
            description: 'Distance before viewport to start loading',
            type: TemplateParameterType.Number,
            required: false,
            defaultValue: 100,
            validation: { min: 0, max: 500 }
          },
          {
            name: 'enableWebP',
            displayName: 'Enable WebP Support',
            description: 'Use WebP format when supported by browser',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'enableResponsive',
            displayName: 'Enable Responsive Images',
            description: 'Generate responsive image srcsets',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'breakpoints',
            displayName: 'Responsive Breakpoints (JSON)',
            description: 'Array of viewport widths for responsive images',
            type: TemplateParameterType.Code,
            required: false,
            defaultValue: '[480, 768, 1024, 1200]',
            helpText: 'Enter as JSON array, e.g., [480, 768, 1024]'
          },
          {
            name: 'enablePlaceholder',
            displayName: 'Enable Placeholders',
            description: 'Show placeholders while images load',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'placeholderColor',
            displayName: 'Placeholder Color',
            description: 'Background color for image placeholders',
            type: TemplateParameterType.Color,
            required: false,
            defaultValue: '#f0f0f0'
          },
          {
            name: 'enableBlurEffect',
            displayName: 'Enable Blur Effect',
            description: 'Apply blur effect to placeholders',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: false
          },
          {
            name: 'loadingAnimation',
            displayName: 'Loading Animation',
            description: 'Animation style when images load',
            type: TemplateParameterType.Dropdown,
            required: false,
            defaultValue: 'fade',
            options: [
              { key: 'none', text: 'No animation', value: 'none' },
              { key: 'fade', text: 'Fade in', value: 'fade' },
              { key: 'slide', text: 'Slide in', value: 'slide' }
            ]
          },
          {
            name: 'enableRetry',
            displayName: 'Enable Retry Logic',
            description: 'Retry failed image loads',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: true
          },
          {
            name: 'maxRetries',
            displayName: 'Maximum Retries',
            description: 'Number of retry attempts for failed images',
            type: TemplateParameterType.Number,
            required: false,
            defaultValue: 3,
            validation: { min: 1, max: 10 }
          },
          {
            name: 'qualitySettings',
            displayName: 'Quality Settings (JSON)',
            description: 'Image quality settings for different sizes',
            type: TemplateParameterType.Code,
            required: false,
            defaultValue: '{"high": 90, "medium": 75, "low": 60}',
            helpText: 'Quality values from 0-100'
          },
          {
            name: 'enableAnalytics',
            displayName: 'Enable Performance Analytics',
            description: 'Track image loading performance',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: false
          },
          {
            name: 'debugMode',
            displayName: 'Debug Mode',
            description: 'Enable console logging for debugging',
            type: TemplateParameterType.Boolean,
            required: false,
            defaultValue: false
          }
        ],
        icon: 'Photo2',
        previewUrl: 'https://example.com/image-optimizer-preview.png'
      }
    ];
  }
}