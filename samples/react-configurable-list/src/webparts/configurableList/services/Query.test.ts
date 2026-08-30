import { buildListQuery, buildServerFilter, searchableFields } from './Query';
import { IListField } from '../models/ListModels';

const fields: IListField[] = [
  { id: 'title', title: 'Title', internalName: 'Title', kind: 'text', multiple: false },
  { id: 'owner', title: 'Owner', internalName: 'Owner', kind: 'person', multiple: false },
  { id: 'status', title: 'Status', internalName: 'Status', kind: 'choice', multiple: false },
  { id: 'amount', title: 'Amount', internalName: 'Amount', kind: 'currency', multiple: false }
];

describe('buildListQuery', () => {
  it('selects requested fields and expands people explicitly', () => {
    expect(buildListQuery(fields, fields[0], true, 20, 2, '').select).toEqual([
      'Id', 'Title', 'Owner/Title', 'Status', 'Amount'
    ]);
    expect(buildListQuery(fields, fields[0], true, 20, 2, '').expand).toEqual(['Owner']);
  });

  it('builds escaped filters and bounded paging values', () => {
    const query = buildListQuery(fields, fields[0], false, 150, -2, " O'Reilly ");

    expect(query.filter).toBe("substringof('O''Reilly',Title) or substringof('O''Reilly',Status)");
    expect(query.top).toBe(100);
    expect(query.skip).toBe(0);
    expect(query.orderBy).toBe('Title');
    expect(query.ascending).toBe(false);
  });

  it('limits server search to supported text-like fields', () => {
    expect(searchableFields(fields).map((field) => field.internalName)).toEqual(['Title', 'Status']);
    expect(buildServerFilter('amount', [fields[3]])).toBeUndefined();
  });
});
