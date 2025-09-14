import { WebPartContext } from '@microsoft/sp-webpart-base';
import {
  IAdvancedSearchCriteria,
  ISearchResult,
  IExtendedCustomAction,
  ISearchFilter,
  SearchOperator,
  CustomActionStatus
} from '../models/IAdvancedSearch';
import { ICustomAction, CustomActionScope } from '../models';
import { CustomActionService } from './CustomActionService';

export class AdvancedSearchService {
  private context: WebPartContext;
  private customActionService: CustomActionService;
  private searchIndex: Map<string, IExtendedCustomAction> = new Map();

  constructor(context: WebPartContext) {
    this.context = context;
    this.customActionService = new CustomActionService(context);
  }

  public async buildSearchIndex(): Promise<void> {
    try {
      // Load all custom actions from both web and site scopes
      const [webActions, siteActions] = await Promise.all([
        this.customActionService.getCustomActions(CustomActionScope.Web),
        this.customActionService.getCustomActions(CustomActionScope.Site)
      ]);

      const allActions = [...webActions, ...siteActions];

      // Clear existing index
      this.searchIndex.clear();

      // Build extended custom actions with additional metadata
      for (const action of allActions) {
        const extendedAction = await this._createExtendedCustomAction(action);
        this.searchIndex.set(action.Id, extendedAction);
      }

    } catch (error) {
      console.error('Error building search index:', error);
    }
  }

  public async search(criteria: IAdvancedSearchCriteria): Promise<ISearchResult> {
    const startTime = Date.now();

    try {
      // Ensure search index is built
      if (this.searchIndex.size === 0) {
        await this.buildSearchIndex();
      }

      let results = Array.from(this.searchIndex.values());
      const appliedFilters: ISearchFilter[] = [];

      // Apply search term filter
      if (criteria.searchTerm.trim()) {
        results = this._applyTextSearch(results, criteria.searchTerm);
        appliedFilters.push({
          field: 'searchTerm',
          operator: SearchOperator.Contains,
          value: criteria.searchTerm,
          displayName: `Search: "${criteria.searchTerm}"`
        });
      }

      // Apply scope filter
      if (criteria.scope !== 'All') {
        results = results.filter(action => action.Scope === criteria.scope);
        appliedFilters.push({
          field: 'Scope',
          operator: SearchOperator.Equals,
          value: criteria.scope,
          displayName: `Scope: ${criteria.scope}`
        });
      }

      // Apply location filters
      if (criteria.location.length > 0) {
        results = results.filter(action => 
          action.Location && criteria.location.includes(action.Location)
        );
        appliedFilters.push({
          field: 'Location',
          operator: SearchOperator.In,
          value: criteria.location,
          displayName: `Location: ${criteria.location.join(', ')}`
        });
      }

      // Apply group filters
      if (criteria.group.length > 0) {
        results = results.filter(action => 
          action.Group && criteria.group.includes(action.Group)
        );
        appliedFilters.push({
          field: 'Group',
          operator: SearchOperator.In,
          value: criteria.group,
          displayName: `Group: ${criteria.group.join(', ')}`
        });
      }

      // Apply tag filters
      if (criteria.tags.length > 0) {
        results = results.filter(action => 
          criteria.tags.some(tag => action.tags.includes(tag))
        );
        appliedFilters.push({
          field: 'tags',
          operator: SearchOperator.In,
          value: criteria.tags,
          displayName: `Tags: ${criteria.tags.join(', ')}`
        });
      }

      // Apply date filters
      if (criteria.dateCreatedFrom) {
        results = results.filter(action => action.createdDate >= criteria.dateCreatedFrom!);
        appliedFilters.push({
          field: 'createdDate',
          operator: SearchOperator.GreaterThanOrEqual,
          value: criteria.dateCreatedFrom,
          displayName: `Created after: ${criteria.dateCreatedFrom.toLocaleDateString()}`
        });
      }

      if (criteria.dateCreatedTo) {
        results = results.filter(action => action.createdDate <= criteria.dateCreatedTo!);
        appliedFilters.push({
          field: 'createdDate',
          operator: SearchOperator.LessThanOrEqual,
          value: criteria.dateCreatedTo,
          displayName: `Created before: ${criteria.dateCreatedTo.toLocaleDateString()}`
        });
      }

      if (criteria.dateModifiedFrom) {
        results = results.filter(action => action.modifiedDate >= criteria.dateModifiedFrom!);
        appliedFilters.push({
          field: 'modifiedDate',
          operator: SearchOperator.GreaterThanOrEqual,
          value: criteria.dateModifiedFrom,
          displayName: `Modified after: ${criteria.dateModifiedFrom.toLocaleDateString()}`
        });
      }

      if (criteria.dateModifiedTo) {
        results = results.filter(action => action.modifiedDate <= criteria.dateModifiedTo!);
        appliedFilters.push({
          field: 'modifiedDate',
          operator: SearchOperator.LessThanOrEqual,
          value: criteria.dateModifiedTo,
          displayName: `Modified before: ${criteria.dateModifiedTo.toLocaleDateString()}`
        });
      }

      // Apply status filters
      if (criteria.status.length > 0) {
        results = results.filter(action => criteria.status.includes(action.status));
        appliedFilters.push({
          field: 'status',
          operator: SearchOperator.In,
          value: criteria.status,
          displayName: `Status: ${criteria.status.join(', ')}`
        });
      }

      // Apply author filters
      if (criteria.author.length > 0) {
        results = results.filter(action => criteria.author.includes(action.author));
        appliedFilters.push({
          field: 'author',
          operator: SearchOperator.In,
          value: criteria.author,
          displayName: `Author: ${criteria.author.join(', ')}`
        });
      }

      // Apply category filters
      if (criteria.category.length > 0) {
        results = results.filter(action => criteria.category.includes(action.category));
        appliedFilters.push({
          field: 'category',
          operator: SearchOperator.In,
          value: criteria.category,
          displayName: `Category: ${criteria.category.join(', ')}`
        });
      }

      // Apply script presence filters
      if (criteria.hasScript !== null) {
        results = results.filter(action => {
          const hasScript = !!(action.ScriptBlock || action.ScriptSrc);
          return hasScript === criteria.hasScript;
        });
        appliedFilters.push({
          field: 'hasScript',
          operator: SearchOperator.Equals,
          value: criteria.hasScript,
          displayName: `Has Script: ${criteria.hasScript ? 'Yes' : 'No'}`
        });
      }

      // Apply URL presence filters
      if (criteria.hasUrl !== null) {
        results = results.filter(action => {
          const hasUrl = !!action.Url;
          return hasUrl === criteria.hasUrl;
        });
        appliedFilters.push({
          field: 'hasUrl',
          operator: SearchOperator.Equals,
          value: criteria.hasUrl,
          displayName: `Has URL: ${criteria.hasUrl ? 'Yes' : 'No'}`
        });
      }

      // Apply enabled/disabled filter
      if (criteria.isEnabled !== null) {
        results = results.filter(action => {
          const isEnabled = action.status !== CustomActionStatus.Inactive;
          return isEnabled === criteria.isEnabled;
        });
        appliedFilters.push({
          field: 'isEnabled',
          operator: SearchOperator.Equals,
          value: criteria.isEnabled,
          displayName: `Enabled: ${criteria.isEnabled ? 'Yes' : 'No'}`
        });
      }

      // Apply sequence filters
      if (criteria.sequenceFrom !== undefined) {
        results = results.filter(action => 
          (action.Sequence || 0) >= criteria.sequenceFrom!
        );
        appliedFilters.push({
          field: 'Sequence',
          operator: SearchOperator.GreaterThanOrEqual,
          value: criteria.sequenceFrom,
          displayName: `Sequence >= ${criteria.sequenceFrom}`
        });
      }

      if (criteria.sequenceTo !== undefined) {
        results = results.filter(action => 
          (action.Sequence || 0) <= criteria.sequenceTo!
        );
        appliedFilters.push({
          field: 'Sequence',
          operator: SearchOperator.LessThanOrEqual,
          value: criteria.sequenceTo,
          displayName: `Sequence <= ${criteria.sequenceTo}`
        });
      }

      // Apply registration type filters
      if (criteria.registrationType.length > 0) {
        results = results.filter(action => 
          action.RegistrationType !== undefined && 
          criteria.registrationType.includes(action.RegistrationType)
        );
        appliedFilters.push({
          field: 'RegistrationType',
          operator: SearchOperator.In,
          value: criteria.registrationType,
          displayName: `Registration Type: ${criteria.registrationType.join(', ')}`
        });
      }

      const searchTime = Date.now() - startTime;
      const suggestions = this._generateSuggestions(criteria, results);

      return {
        items: results,
        totalCount: results.length,
        appliedFilters,
        searchTime,
        suggestions
      };

    } catch (error) {
      console.error('Error performing advanced search:', error);
      return {
        items: [],
        totalCount: 0,
        appliedFilters: [],
        searchTime: Date.now() - startTime,
        suggestions: []
      };
    }
  }

  public async getFilterOptions(): Promise<{
    locations: string[];
    groups: string[];
    tags: string[];
    authors: string[];
    categories: string[];
    registrationTypes: number[];
  }> {
    if (this.searchIndex.size === 0) {
      await this.buildSearchIndex();
    }

    const actions = Array.from(this.searchIndex.values());
    
    const locationSet = new Set<string>();
    const groupSet = new Set<string>();
    const tagSet = new Set<string>();
    const authorSet = new Set<string>();
    const categorySet = new Set<string>();
    const registrationTypeSet = new Set<number>();

    actions.forEach(action => {
      if (action.Location) locationSet.add(action.Location);
      if (action.Group) groupSet.add(action.Group);
      action.tags.forEach(tag => tagSet.add(tag));
      if (action.author) authorSet.add(action.author);
      if (action.category) categorySet.add(action.category);
      if (action.RegistrationType !== undefined) registrationTypeSet.add(action.RegistrationType);
    });

    return {
      locations: Array.from(locationSet).sort(),
      groups: Array.from(groupSet).sort(),
      tags: Array.from(tagSet).sort(),
      authors: Array.from(authorSet).sort(),
      categories: Array.from(categorySet).sort(),
      registrationTypes: Array.from(registrationTypeSet).sort((a, b) => a - b)
    };
  }

  public async refreshIndex(): Promise<void> {
    await this.buildSearchIndex();
  }

  private async _createExtendedCustomAction(action: ICustomAction): Promise<IExtendedCustomAction> {
    
    return {
      ...action,
      status: this._determineActionStatus(action),
      tags: this._extractTags(action),
      category: this._determineCategory(action),
      author: this._extractAuthor(action),
      createdDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000), // Random date within last year
      modifiedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last month
      usageCount: Math.floor(Math.random() * 100),
      isHealthy: this._checkActionHealth(action),
      healthIssues: this._getHealthIssues(action),
      dependencies: this._extractDependencies(action)
    };
  }

  private _determineActionStatus(action: ICustomAction): CustomActionStatus {
    // Simulate status determination based on action properties
    if (!action.ScriptBlock && !action.ScriptSrc && !action.Url) {
      return CustomActionStatus.Broken;
    }
    
    // Random status for simulation
    const statuses = [
      CustomActionStatus.Active,
      CustomActionStatus.Active, // Weight towards active
      CustomActionStatus.Active,
      CustomActionStatus.Inactive,
      CustomActionStatus.Testing
    ];
    
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  private _extractTags(action: ICustomAction): string[] {
    const tags: string[] = [];
    
    // Extract tags based on action properties
    if (action.Location) {
      tags.push(action.Location.toLowerCase());
    }
    
    if (action.ScriptBlock || action.ScriptSrc) {
      tags.push('javascript');
    }
    
    if (action.Url) {
      tags.push('redirect');
    }
    
    if (action.CommandUIExtension) {
      tags.push('ribbon');
    }
    
    // Add some random tags for demonstration
    const possibleTags = ['navigation', 'branding', 'utility', 'integration', 'analytics'];
    const randomTag = possibleTags[Math.floor(Math.random() * possibleTags.length)];
    if (!tags.includes(randomTag)) {
      tags.push(randomTag);
    }
    
    return tags;
  }

  private _determineCategory(action: ICustomAction): string {
    if (action.Location?.includes('Navigation')) return 'Navigation';
    if (action.ScriptBlock || action.ScriptSrc) return 'Scripting';
    if (action.CommandUIExtension) return 'Ribbon';
    if (action.Url) return 'Redirect';
    return 'General';
  }

  private _extractAuthor(action: ICustomAction): string {
    const authors = ['System Administrator', 'Site Owner', 'Developer', 'Business User'];
    return authors[Math.floor(Math.random() * authors.length)];
  }

  private _checkActionHealth(action: ICustomAction): boolean {
    // Simple health check - actions with both title and location are considered healthy
    return !!(action.Title && action.Location);
  }

  private _getHealthIssues(action: ICustomAction): string[] {
    const issues: string[] = [];
    
    if (!action.Title || action.Title.trim() === '') {
      issues.push('Missing or empty title');
    }
    
    if (!action.Location || action.Location.trim() === '') {
      issues.push('Missing or empty location');
    }
    
    if (!action.ScriptBlock && !action.ScriptSrc && !action.Url && !action.CommandUIExtension) {
      issues.push('No action defined (no script, URL, or command UI extension)');
    }
    
    return issues;
  }

  private _extractDependencies(action: ICustomAction): string[] {
    const dependencies: string[] = [];
    
    // Extract dependencies from script blocks (simplified)
    if (action.ScriptBlock) {
      const jqueryPattern = /jquery|[$]\s*\(/gi;
      const spPattern = /SP\.|_spPageContextInfo/gi;
      const customPattern = /customLib|myLib/gi;
      
      if (jqueryPattern.test(action.ScriptBlock)) {
        dependencies.push('jQuery');
      }
      
      if (spPattern.test(action.ScriptBlock)) {
        dependencies.push('SharePoint JavaScript API');
      }
      
      if (customPattern.test(action.ScriptBlock)) {
        dependencies.push('Custom Libraries');
      }
    }
    
    return dependencies;
  }

  private _applyTextSearch(actions: IExtendedCustomAction[], searchTerm: string): IExtendedCustomAction[] {
    const term = searchTerm.toLowerCase();
    
    return actions.filter(action => {
      // Search in multiple fields
      const searchableText = [
        action.Title,
        action.Description,
        action.Location,
        action.Group,
        action.Name,
        action.ScriptBlock,
        action.author,
        action.category,
        ...action.tags
      ].join(' ').toLowerCase();
      
      return searchableText.includes(term);
    });
  }

  private _generateSuggestions(criteria: IAdvancedSearchCriteria, results: IExtendedCustomAction[]): string[] {
    const suggestions: string[] = [];
    
    // If no results and search term exists, suggest alternatives
    if (results.length === 0 && criteria.searchTerm) {
      suggestions.push('Try removing some filters');
      suggestions.push('Check spelling in search term');
      suggestions.push('Try broader search terms');
    }
    
    // If many results, suggest refinement
    if (results.length > 50) {
      suggestions.push('Consider adding more filters to narrow results');
      suggestions.push('Try searching for specific locations or groups');
    }
    
    // Suggest popular categories if no category filter is applied
    if (criteria.category.length === 0) {
      const categories = results.map(r => r.category);
      const categoryCount = new Map<string, number>();
      categories.forEach(cat => {
        categoryCount.set(cat, (categoryCount.get(cat) || 0) + 1);
      });
      
      const topCategory = Array.from(categoryCount.entries())
        .sort((a, b) => b[1] - a[1])[0];
      
      if (topCategory && topCategory[1] > 5) {
        suggestions.push(`Many results in "${topCategory[0]}" category`);
      }
    }
    
    return suggestions;
  }
}