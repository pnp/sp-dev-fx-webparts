import '@pnp/sp/search';
import { SearchQueryBuilder, SortDirection } from '@pnp/sp/search';
import { BaseService } from './BaseService';
import { IFileInfo } from '../types/IGraphModels';
import { ISiteInfo } from '../types/ISiteInfo';
import { SITE_SELECT_PROPERTIES, buildSitesQuery } from '../constants/searchQueries';
import { mapRowsToSites, SearchRow } from '../utils/siteMapper';

export interface IGetSitesOptions {
  /** Free-text term matched against the site Title. */
  searchText?: string;
  /** Maximum rows to request from search. */
  rowLimit?: number;
  /** Skip the localStorage cache for the default (unfiltered) query. */
  bypassCache?: boolean;
}

const CACHE_KEY = 'sites:all';
const DEFAULT_ROW_LIMIT = 500;
const FILE_SELECT_PROPERTIES = [
  'Title',
  'Path',
  'FileType',
  'LastModifiedTime',
  'SiteTitle',
  'CheckoutUser',
  'CheckoutUserOWSUSER',
  'CheckedOutUserOWSUSER'
];
type DateInput = Date | string | undefined;

function toDate(value: DateInput): Date | undefined {
  if (!value) {
    return undefined;
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function normalizeSiteDates(sites: ISiteInfo[]): ISiteInfo[] {
  return sites.map((site) => ({
    ...site,
    created: toDate(site.created),
    lastModified: toDate(site.lastModified)
  }));
}

function str(row: SearchRow, key: string): string {
  const value = row[key];
  return value !== null && value !== undefined ? String(value) : '';
}

function getCheckedOutTo(row: SearchRow): string | undefined {
  const value = str(row, 'CheckoutUser') || str(row, 'CheckoutUserOWSUSER') || str(row, 'CheckedOutUserOWSUSER');
  if (!value) {
    return undefined;
  }
  const parts = value.split('|').filter((part) => part && !/^\d+$/.test(part));
  return parts[parts.length - 1] ?? value;
}

function mapRowToFile(row: SearchRow, index: number): IFileInfo {
  const path = str(row, 'Path');
  return {
    id: path || String(index),
    name: str(row, 'Title') || path || 'Untitled',
    webUrl: path || undefined,
    type: str(row, 'FileType') || undefined,
    modified: str(row, 'LastModifiedTime') || undefined,
    containerName: str(row, 'SiteTitle') || undefined,
    checkedOutTo: getCheckedOutTo(row)
  };
}

/**
 * Discovers the sites, team sites and webs the current user can see via the
 * SharePoint Search API, returning normalized {@link ISiteInfo} models.
 */
export class SearchService extends BaseService {
  public async getUserSites(options: IGetSitesOptions = {}): Promise<ISiteInfo[]> {
    const { searchText, rowLimit = DEFAULT_ROW_LIMIT, bypassCache = false } = options;
    const isDefaultQuery = !searchText || searchText.trim().length === 0;

    const run = async (): Promise<ISiteInfo[]> => {
      try {
        const query = SearchQueryBuilder(buildSitesQuery(searchText))
          .rowLimit(rowLimit)
          .enableSorting.sortList({
            Property: 'LastModifiedTime',
            Direction: SortDirection.Descending
          })
          .selectProperties(...SITE_SELECT_PROPERTIES);

        const results = await this.sp?.search(query);
        const rows = (results?.PrimarySearchResults ?? []) as unknown as SearchRow[];
        return mapRowsToSites(rows);
      } catch (error) {
        throw this.toError(error, 'SearchService.getUserSites');
      }
    };

    if (isDefaultQuery && !bypassCache) {
      const sites = await this.withCache(CACHE_KEY, run);
      return normalizeSiteDates(sites);
    }
    return normalizeSiteDates(await run());
  }

  /** Most recently modified SharePoint files visible to the current user. */
  public async getRecentlyModifiedFiles(top: number = 5): Promise<IFileInfo[]> {
    try {
      const query = SearchQueryBuilder('IsDocument:true')
        .rowLimit(top)
        .enableSorting.sortList({
          Property: 'LastModifiedTime',
          Direction: SortDirection.Descending
        })
        .selectProperties(...FILE_SELECT_PROPERTIES);
      const results = await this.sp?.search(query);
      const rows = (results?.PrimarySearchResults ?? []) as unknown as SearchRow[];
      return rows.map(mapRowToFile);
    } catch (error) {
      throw this.toError(error, 'SearchService.getRecentlyModifiedFiles');
    }
  }

  /** Checked-out SharePoint files visible to the current user. */
  public async getCheckedOutFiles(rowLimit: number = 200): Promise<IFileInfo[]> {
    try {
      const query = SearchQueryBuilder('IsDocument:true')
        .rowLimit(rowLimit)
        .enableSorting.sortList({
          Property: 'LastModifiedTime',
          Direction: SortDirection.Descending
        })
        .selectProperties(...FILE_SELECT_PROPERTIES);
      const results = await this.sp?.search(query);
      const rows = (results?.PrimarySearchResults ?? []) as unknown as SearchRow[];
      return rows
        .map(mapRowToFile)
        .filter((file) => file.checkedOutTo !== undefined);
    } catch (error) {
      throw this.toError(error, 'SearchService.getCheckedOutFiles');
    }
  }
}
