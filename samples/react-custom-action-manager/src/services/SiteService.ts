import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse, MSGraphClientV3 } from '@microsoft/sp-http';

export interface ISiteInfo {
  id: string;
  title: string;
  url: string;
  serverRelativeUrl: string;
  description: string;
  template: string;
  isSubsite: boolean;
  parentUrl?: string;
  customActionsCount?: number;
  lastModified: Date;
  created: Date;
}

export interface ISiteCollection {
  sites: ISiteInfo[];
  totalCount: number;
  hasMore: boolean;
}

interface ICachedSiteCollection {
  data: ISiteCollection;
  timestamp: number;
}

export class SiteService {
  private context: WebPartContext;
  private sitesCache: Map<string, ICachedSiteCollection> = new Map();
  private readonly CACHE_DURATION: number = 5 * 60 * 1000; // 5 minutes
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

  private _buildUrl(path: string): string {
    const trimmed = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${trimmed}`;
  }

  public async getCurrentSite(): Promise<ISiteInfo> {
    try {
      const endpoint = this._buildUrl('/_api/web?$select=Id,Title,Url,ServerRelativeUrl,Description,WebTemplate,Created,LastItemModifiedDate');
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        endpoint,
        SPHttpClient.configurations.v1
      );

      if (response.ok) {
        const data = await response.json();
        return this._mapWebDataToSiteInfo(data);
      }

      throw new Error(`Failed to get current site: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.error('Error getting current site:', error);
      throw error;
    }
  }

  public async getSitesInCollection(includeSubsites: boolean = true, maxResults: number = 100): Promise<ISiteCollection> {
    const cacheKey = `${this.baseUrl}|sites_${includeSubsites}_${maxResults}`;

    // Check cache first
    const cached = this.sitesCache.get(cacheKey);
    if (cached && this._isCacheValid(cacheKey)) {
      return cached.data;
    }

    try {
      const sites: ISiteInfo[] = [];

      // Get root site
      const rootSite = await this.getCurrentSite();
      sites.push(rootSite);

      if (includeSubsites) {
        const subsites = await this._getSubsites(rootSite.url, maxResults - 1);
        sites.push(...subsites);
      }

      // Get custom actions count for each site
      await this._enrichSitesWithCustomActionsCounts(sites);

      const result: ISiteCollection = {
        sites: sites.slice(0, maxResults),
        totalCount: sites.length,
        hasMore: sites.length > maxResults
      };

      // Cache the result
      this.sitesCache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });

      return result;
    } catch (error) {
      console.error('Error getting sites in collection:', error);
      return {
        sites: [],
        totalCount: 0,
        hasMore: false
      };
    }
  }

  public async getAllAccessibleSites(maxResults: number = 100): Promise<ISiteInfo[]> {
    try {
      // Try to get sites via Microsoft Graph API
      const graphSites = await this._getSitesFromGraph(maxResults);
      if (graphSites.length > 0) {
        return graphSites;
      }

      // Fallback to site collection approach
      console.warn('Microsoft Graph not available, falling back to site collection enumeration');
      const collection = await this.getSitesInCollection(true, maxResults);
      return collection.sites;
    } catch (error) {
      console.error('Error getting all accessible sites:', error);

      // Final fallback to current site collection
      try {
        const collection = await this.getSitesInCollection(true, maxResults);
        return collection.sites;
      } catch (fallbackError) {
        console.error('Error in fallback approach:', fallbackError);
        return [];
      }
    }
  }

  public async getRecentlyAccessedSites(maxResults: number = 20): Promise<ISiteInfo[]> {
    try {
      // Get all accessible sites and sort by last modified
      const allSites = await this.getAllAccessibleSites(maxResults * 2);

      // Sort by last modified date
      return allSites
        .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
        .slice(0, maxResults);
    } catch (error) {
      console.error('Error getting recently accessed sites:', error);
      return [];
    }
  }

  public async searchSites(query: string, maxResults: number = 50): Promise<ISiteInfo[]> {
    try {
      // First try SharePoint search API for better site discovery
      const searchResults = await this._searchSitesUsingSearchAPI(query, maxResults);
      if (searchResults.length > 0) {
        return searchResults;
      }

      // Fallback to collection-based search
      const collection = await this.getSitesInCollection(true, maxResults * 2);

      // Filter sites based on query
      const filteredSites = collection.sites.filter(site =>
        site.title.toLowerCase().includes(query.toLowerCase()) ||
        site.description.toLowerCase().includes(query.toLowerCase()) ||
        site.url.toLowerCase().includes(query.toLowerCase())
      );

      return filteredSites.slice(0, maxResults);
    } catch (error) {
      console.error('Error searching sites:', error);
      return [];
    }
  }

  private async _searchSitesUsingSearchAPI(query: string, maxResults: number = 50): Promise<ISiteInfo[]> {
    try {
      // Use SharePoint Search REST API to find sites
      const searchQuery = `contentclass:STS_Site OR contentclass:STS_Web ${query ? `AND (Title:${query}* OR Path:${query}*)` : ''}`;
      const endpoint = `${this.baseUrl}/_api/search/query?querytext='${encodeURIComponent(searchQuery)}'&selectproperties='Title,Path,Description,LastModifiedTime,CreatedTime,WebTemplate,SiteId'&rowlimit=${maxResults}&sourceid='8413cd39-2156-4e00-b54d-11efd9abdb89'`;

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
        const results = data.d?.query?.PrimaryQueryResult?.RelevantResults?.Table?.Rows || [];

        return results.map((row: any) => {
          const cells = row.Cells || [];
          const getValue = (key: string) => {
            const cell = cells.find((c: any) => c.Key === key);
            return cell ? cell.Value : '';
          };

          const path = getValue('Path');
          return {
            id: getValue('SiteId') || this._generateIdFromUrl(path),
            title: getValue('Title') || 'Untitled Site',
            url: path,
            serverRelativeUrl: this._extractServerRelativeUrl(path),
            description: getValue('Description') || '',
            template: getValue('WebTemplate') || 'STS',
            isSubsite: this._isSubsite(path),
            lastModified: new Date(getValue('LastModifiedTime') || Date.now()),
            created: new Date(getValue('CreatedTime') || Date.now()),
            customActionsCount: 0
          } as ISiteInfo;
        });
      }

      console.warn('SharePoint Search API not available or returned no results');
      return [];
    } catch (error) {
      console.warn('Error using SharePoint Search API:', error);
      return [];
    }
  }

  private _generateIdFromUrl(url: string): string {
    // Generate a consistent ID from URL
    return btoa(url).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
  }

  public async getSiteCustomActionsCount(siteUrl: string): Promise<number> {
    try {
      const normalizedSiteUrl = siteUrl.replace(/\/$/, '');
      let endpoint: string | undefined = `${normalizedSiteUrl}/_api/web/UserCustomActions?$select=Id&$top=5000`;
      let total = 0;

      while (endpoint) {
        const response: SPHttpClientResponse = await this.context.spHttpClient.get(
          endpoint,
          SPHttpClient.configurations.v1,
          {
            headers: {
              Accept: 'application/json;odata=nometadata'
            }
          }
        );

        if (!response.ok) {
          console.warn(`Failed to get custom actions for ${siteUrl}: ${response.status} ${response.statusText}`);
          break;
        }

        const data = await response.json();
        const items: any[] = data.value || [];
        total += items.length;
        endpoint = data['@odata.nextLink'];
      }

      return total;
    } catch (error) {
      console.error('Error getting custom actions count for site:', siteUrl, error);
      return 0;
    }
  }

  public isCurrentSite(siteUrl: string): boolean {
    return siteUrl === this.context.pageContext.web.absoluteUrl;
  }

  private async _getSubsites(parentUrl: string, maxResults: number): Promise<ISiteInfo[]> {
    try {
      const sites: ISiteInfo[] = [];
      const normalizedParent = parentUrl.replace(/\/$/, '');
      const endpoint = `${normalizedParent}/_api/web/webs?$select=Id,Title,Url,ServerRelativeUrl,Description,WebTemplate,Created,LastItemModifiedDate&$top=${maxResults}`;

      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        endpoint,
        SPHttpClient.configurations.v1
      );

      if (response.ok) {
        const data = await response.json();
        const webs = data.value || [];

        for (const web of webs) {
          const siteInfo = this._mapWebDataToSiteInfo(web, true, parentUrl);
          sites.push(siteInfo);

          // Recursively get subsites if we haven't reached the limit
          if (sites.length < maxResults) {
            const subsites = await this._getSubsites(web.Url, maxResults - sites.length);
            sites.push(...subsites);
          }
        }
      }

      return sites;
    } catch (error) {
      console.error('Error getting subsites for:', parentUrl, error);
      return [];
    }
  }

  private async _enrichSitesWithCustomActionsCounts(sites: ISiteInfo[]): Promise<void> {
    const promises = sites.map(async (site) => {
      try {
        site.customActionsCount = await this.getSiteCustomActionsCount(site.url);
      } catch (error) {
        console.warn('Failed to get custom actions count for site:', site.url);
        site.customActionsCount = 0;
      }
    });

    await Promise.all(promises);
  }

  private _mapWebDataToSiteInfo(webData: any, isSubsite: boolean = false, parentUrl?: string): ISiteInfo {
    return {
      id: webData.Id || webData.id || '',
      title: webData.Title || webData.title || 'Untitled Site',
      url: webData.Url || webData.url || '',
      serverRelativeUrl: webData.ServerRelativeUrl || webData.serverRelativeUrl || '',
      description: webData.Description || webData.description || '',
      template: webData.WebTemplate || webData.webTemplate || 'STS',
      isSubsite,
      parentUrl,
      lastModified: new Date(webData.LastItemModifiedDate || webData.lastItemModifiedDate || Date.now()),
      created: new Date(webData.Created || webData.created || Date.now()),
      customActionsCount: 0
    };
  }

  private _isCacheValid(cacheKey: string): boolean {
    const cached = this.sitesCache.get(cacheKey);
    if (!cached) {
      return false;
    }

    const isValid = (Date.now() - cached.timestamp) < this.CACHE_DURATION;

    if (!isValid) {
      this.sitesCache.delete(cacheKey);
    }

    return isValid;
  }

  private async _getSitesFromGraph(maxResults: number): Promise<ISiteInfo[]> {
    try {
      const graphClient: MSGraphClientV3 = await this.context.msGraphClientFactory.getClient('3');

      // Get sites the user has access to
      const sitesResponse = await graphClient.api('/sites').select('id,name,displayName,description,webUrl,lastModifiedDateTime,createdDateTime').top(maxResults).get();

      const sites: ISiteInfo[] = [];

      if (sitesResponse && sitesResponse.value) {
        for (const site of sitesResponse.value) {
          if (site.webUrl) {
            const siteInfo: ISiteInfo = {
              id: site.id || '',
              title: site.displayName || site.name || 'Untitled Site',
              url: site.webUrl,
              serverRelativeUrl: this._extractServerRelativeUrl(site.webUrl),
              description: site.description || '',
              template: 'STS', // Graph doesn't provide template info
              isSubsite: this._isSubsite(site.webUrl),
              lastModified: new Date(site.lastModifiedDateTime || Date.now()),
              created: new Date(site.createdDateTime || Date.now()),
              customActionsCount: 0 // Will be populated later if needed
            };
            sites.push(siteInfo);
          }
        }
      }

      // Also try to get followed sites
      try {
        const followedResponse = await graphClient.api('/me/followedSites').select('id,name,displayName,description,webUrl,lastModifiedDateTime,createdDateTime').top(50).get();

        if (followedResponse && followedResponse.value) {
          for (const site of followedResponse.value) {
            if (site.webUrl && !sites.some(s => s.url === site.webUrl)) {
              const siteInfo: ISiteInfo = {
                id: site.id || '',
                title: site.displayName || site.name || 'Untitled Site',
                url: site.webUrl,
                serverRelativeUrl: this._extractServerRelativeUrl(site.webUrl),
                description: site.description || '',
                template: 'STS',
                isSubsite: this._isSubsite(site.webUrl),
                lastModified: new Date(site.lastModifiedDateTime || Date.now()),
                created: new Date(site.createdDateTime || Date.now()),
                customActionsCount: 0
              };
              sites.push(siteInfo);
            }
          }
        }
      } catch (followedError) {
        console.warn('Could not get followed sites:', followedError);
      }

      console.info(`Retrieved ${sites.length} sites from Microsoft Graph`);
      return sites.slice(0, maxResults);

    } catch (error) {
      console.warn('Microsoft Graph API not available or permission denied:', error);
      return [];
    }
  }

  private _extractServerRelativeUrl(fullUrl: string): string {
    try {
      const url = new URL(fullUrl);
      return url.pathname;
    } catch {
      return '/';
    }
  }

  private _isSubsite(siteUrl: string): boolean {
    try {
      const url = new URL(siteUrl);
      const pathParts = url.pathname.split('/').filter(p => p.length > 0);
      // If path has more than 2 parts (e.g., /sites/sitename/subsite), it's likely a subsite
      return pathParts.length > 2;
    } catch {
      return false;
    }
  }

  public clearCache(): void {
    this.sitesCache.clear();
  }
}
