import type { SPFI } from '@pnp/sp';
import { IFormDefinition } from '../../shared/models/IFormDefinition';
import { FormStorageService } from './FormStorageService';
import { ProvisioningService } from './ProvisioningService';

const form: IFormDefinition = {
  schemaVersion: 1,
  title: 'Request',
  targetListTitle: 'Requests',
  published: false,
  fields: [{ id: '1', internalName: 'Subject', label: 'Subject', type: 'text', required: true }]
};

function createSp(item?: Record<string, unknown>): {
  sp: SPFI;
  add: jest.Mock;
  update: jest.Mock;
  select: jest.Mock;
} {
  const add = jest.fn().mockResolvedValue({ Id: 9 });
  const update = jest.fn().mockResolvedValue(undefined);
  const query = jest.fn().mockResolvedValue(item);
  const select = jest.fn().mockReturnValue(query);
  const getById = jest.fn().mockReturnValue({ update, select });
  const list = { items: { add, getById } };
  return {
    sp: { web: { lists: { getByTitle: jest.fn().mockReturnValue(list) } } } as unknown as SPFI,
    add,
    update,
    select
  };
}

describe('V5 form storage', () => {
  it('creates a new item and persists its assigned ID in the definition JSON', async () => {
    const { sp, add, update } = createSp();
    const saved = await new FormStorageService(sp).saveForm(form);

    expect(saved.id).toBe(9);
    expect(add).toHaveBeenCalledWith(expect.objectContaining({ Title: 'Request', FF_IsPublished: false }));
    expect(update).toHaveBeenCalledWith(expect.objectContaining({
      FF_FormDefinition: expect.stringContaining('"id":9')
    }));
  });

  it('updates existing definitions and loads the exact four-column contract', async () => {
    const stored = { ...form, id: 4 };
    const { sp, add, update, select } = createSp({
      Id: 4,
      Title: form.title,
      FF_FormDefinition: JSON.stringify(stored),
      FF_TargetListTitle: form.targetListTitle,
      FF_IsPublished: false
    });
    const storage = new FormStorageService(sp);

    await expect(storage.saveForm(stored)).resolves.toEqual(stored);
    await expect(storage.loadForm(4)).resolves.toEqual(stored);
    expect(add).not.toHaveBeenCalled();
    expect(update).toHaveBeenCalledTimes(1);
    expect(select).toHaveBeenCalledWith('Id', 'Title', 'FF_FormDefinition', 'FF_TargetListTitle', 'FF_IsPublished');
    await expect(storage.loadForm(4, true)).rejects.toThrow('Form is not published.');
  });

  it('provisions before saving a published definition', async () => {
    const { sp, add } = createSp();
    const ensureTargetList = jest.fn().mockResolvedValue(undefined);
    const provisioning = { ensureTargetList } as unknown as ProvisioningService;

    const published = await new FormStorageService(sp, provisioning).publishForm(form);
    expect(ensureTargetList).toHaveBeenCalledWith(form);
    expect(add).toHaveBeenCalled();
    expect(published).toMatchObject({ id: 9, published: true });
  });

  it('does not publish an empty definition', async () => {
    const { sp, add } = createSp();
    const provisioning = { ensureTargetList: jest.fn() } as unknown as ProvisioningService;

    await expect(new FormStorageService(sp, provisioning).publishForm({
      ...form,
      fields: []
    })).rejects.toThrow('Add at least one field before publishing.');
    expect(add).not.toHaveBeenCalled();
    expect(provisioning.ensureTargetList).not.toHaveBeenCalled();
  });
});
