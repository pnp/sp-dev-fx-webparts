import { getVisibleFields, mapFields } from '../models/FieldMapping';
import { IListDataApi, IListField, IListPage, IListRecord } from '../models/ListModels';
import { buildListQuery } from './Query';
import { safeItemUrl } from '../models/Url';
import { searchText } from '../models/ValueFormatting';

export const MAX_PAGE_SIZE = 100;

export interface IListServiceOptions {
  listTitle: string;
  webUrl: string;
  visibleFields: string;
  defaultSortField: string;
  ascending: boolean;
  pageSize: number;
  page: number;
  search: string;
}

export class ListService {
  public constructor(private readonly api: IListDataApi) {}

  public async getFields(listTitle: string): Promise<IListField[]> {
    const fields = await this.api.getFields(listTitle);
    return mapFields(fields);
  }

  public async getPage(options: IListServiceOptions, fields: IListField[]): Promise<IListPage> {
    const visibleFields = getVisibleFields(fields, options.visibleFields);
    const sortField = visibleFields.find((field) => field.internalName.toLowerCase() === options.defaultSortField.trim().toLowerCase());
    const query = buildListQuery(
      visibleFields,
      sortField,
      options.ascending,
      normalizePageSize(options.pageSize),
      options.page,
      options.search
    );
    const items = await this.api.getItems(options.listTitle, query);
    const records = items
      .map((item) => this.toRecord(item, visibleFields, options.webUrl, options.listTitle))
      .filter((record): record is IListRecord => Boolean(record));
    const boundedRecords = query.filter || !options.search.trim()
      ? records
      : records.filter((record) => searchText(record, visibleFields).includes(options.search.trim().toLowerCase()));

    return { records: boundedRecords, hasNext: items.length === query.top };
  }

  private toRecord(item: Record<string, unknown>, fields: IListField[], webUrl: string, listTitle: string): IListRecord | undefined {
    const id = typeof item.Id === 'number' ? item.Id : Number(item.Id);
    const url = safeItemUrl(webUrl, listTitle, id);
    if (!Number.isInteger(id) || !url) {
      return undefined;
    }

    const values: Record<string, unknown> = {};
    fields.forEach((field) => {
      values[field.internalName] = item[field.internalName];
    });
    return { id, url, values };
  }
}

export function normalizePageSize(value: number): number {
  return Number.isFinite(value)
    ? Math.max(1, Math.min(MAX_PAGE_SIZE, Math.floor(value) || 20))
    : 20;
}
