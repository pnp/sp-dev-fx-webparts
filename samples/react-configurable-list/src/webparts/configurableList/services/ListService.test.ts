import { ListService, normalizePageSize } from './ListService';
import { IListDataApi, IListField, ISharePointField } from '../models/ListModels';

const fields: IListField[] = [
  { id: 'title', title: 'Title', internalName: 'Title', kind: 'text', multiple: false }
];
const sharePointFields: ISharePointField[] = [{
  Id: 'title', Title: 'Title', InternalName: 'Title', TypeAsString: 'Text'
}];
const options = (overrides: Partial<Parameters<ListService['getPage']>[0]> = {}): Parameters<ListService['getPage']>[0] => ({
  listTitle: 'Records',
  webUrl: 'https://contoso.sharepoint.com/sites/demo',
  visibleFields: 'Title',
  defaultSortField: 'Title',
  ascending: true,
  pageSize: 20,
  page: 0,
  search: '',
  ...overrides
});

describe('ListService', () => {
  it('bounds page sizes and page requests', async () => {
    expect(normalizePageSize(0)).toBe(20);
    expect(normalizePageSize(150)).toBe(100);
    expect(normalizePageSize(20.9)).toBe(20);
    expect(normalizePageSize(Number.NaN)).toBe(20);

    const getItems = jest.fn().mockResolvedValue([{ Id: 21, Title: 'Record' }]);
    const service = new ListService({ getFields: jest.fn(), getItems } as IListDataApi);
    await service.getPage(options({ pageSize: 150, page: 2 }), fields);

    expect(getItems).toHaveBeenCalledWith('Records', expect.objectContaining({ top: 100, skip: 200 }));
  });

  it('marks a short page as the final page', async () => {
    const getItems = jest.fn().mockResolvedValue([{ Id: 1, Title: 'Only record' }]);
    const service = new ListService({ getFields: jest.fn(), getItems } as IListDataApi);

    await expect(service.getPage(options({ pageSize: 2 }), fields)).resolves.toMatchObject({
      records: [{ id: 1 }],
      hasNext: false
    });
  });

  it('propagates failed field and item requests', async () => {
    const fieldError = new Error('fields failed');
    const itemError = new Error('items failed');
    const service = new ListService({
      getFields: jest.fn().mockRejectedValue(fieldError),
      getItems: jest.fn().mockRejectedValue(itemError)
    });

    await expect(service.getFields('Records')).rejects.toBe(fieldError);
    await expect(service.getPage(options(), fields)).rejects.toBe(itemError);
  });

  it('maps records with stable numeric ID keys and drops invalid IDs', async () => {
    const getItems = jest.fn().mockResolvedValue([
      { Id: '2', Title: 'Second' },
      { Id: 0, Title: 'Invalid' }
    ]);
    const service = new ListService({ getFields: jest.fn().mockResolvedValue(sharePointFields), getItems });

    await expect(service.getPage(options(), fields)).resolves.toMatchObject({
      records: [{ id: 2, url: expect.stringContaining('?ID=2'), values: { Title: 'Second' } }]
    });
  });
});
