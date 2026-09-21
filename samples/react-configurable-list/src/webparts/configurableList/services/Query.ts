import { IListField, IListQuery } from '../models/ListModels';

const MAX_SEARCH_LENGTH = 80;
const MAX_PAGE_SIZE = 100;

function escapeODataString(value: string): string {
  return value
    .slice(0, MAX_SEARCH_LENGTH)
    .split('')
    .map((character) => character.charCodeAt(0) <= 31 || character.charCodeAt(0) === 127 ? ' ' : character)
    .join('')
    .replace(/'/g, "''");
}

export function searchableFields(fields: IListField[]): IListField[] {
  return fields.filter((field) => field.kind === 'text' || field.kind === 'choice' || field.kind === 'hyperlink');
}

export function buildServerFilter(search: string, fields: IListField[]): string | undefined {
  const value = search.trim();
  const candidates = searchableFields(fields);
  if (!value || !candidates.length) {
    return undefined;
  }

  const escaped = escapeODataString(value);
  return candidates.map((field) => `substringof('${escaped}',${field.internalName})`).join(' or ');
}

export function buildListQuery(
  fields: IListField[],
  sortField: IListField | undefined,
  ascending: boolean,
  pageSize: number,
  page: number,
  search: string,
  listFilterEnabled: boolean = true
): IListQuery {
  const top = Number.isFinite(pageSize)
    ? Math.max(1, Math.min(MAX_PAGE_SIZE, Math.floor(pageSize)))
    : 1;
  const pageNumber = Number.isFinite(page) ? Math.max(0, Math.floor(page)) : 0;
  const select = ['Id'];
  const expand: string[] = [];
  fields.forEach((field) => {
    if (field.kind === 'person') {
      select.push(`${field.internalName}/Title`);
      expand.push(field.internalName);
    } else {
      select.push(field.internalName);
    }
  });

  const filter = listFilterEnabled ? buildServerFilter(search, fields) : undefined;
  return {
    select: Array.from(new Set(select)),
    expand: Array.from(new Set(expand)),
    filter,
    orderBy: sortField ? sortField.internalName : 'Id',
    ascending,
    top,
    skip: pageNumber * top
  };
}
