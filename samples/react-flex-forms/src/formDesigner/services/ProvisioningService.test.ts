import type { SPFI } from '@pnp/sp';
import { ProvisioningService } from './ProvisioningService';

describe('V5/B6 target list provisioning', () => {
  it('creates missing fields without mutating existing fields or items', async () => {
    const createFieldAsXml = jest.fn().mockResolvedValue(undefined);
    const fieldQuery = jest.fn().mockResolvedValue([{ InternalName: 'Existing', TypeAsString: 'Text' }]);
    const fields = Object.assign(jest.fn(), {
      select: jest.fn().mockReturnValue(fieldQuery),
      createFieldAsXml
    });
    const ensure = jest.fn().mockResolvedValue({ list: { fields } });
    const sp = { web: { lists: { ensure } } } as unknown as SPFI;

    await new ProvisioningService(sp).ensureTargetList({
      schemaVersion: 1,
      title: 'Form',
      targetListTitle: 'Submissions',
      published: false,
      fields: [
        { id: '1', internalName: 'Existing', label: 'Existing', type: 'text', required: false },
        { id: '2', internalName: 'NewField', label: 'New', type: 'number', required: true }
      ]
    });

    expect(ensure).toHaveBeenCalledWith('Submissions', 'Flex Forms submissions', 100);
    expect(fields.select).toHaveBeenCalledWith('InternalName', 'TypeAsString');
    expect(createFieldAsXml).toHaveBeenCalledTimes(1);
    expect(createFieldAsXml).toHaveBeenCalledWith(expect.stringContaining('Name="NewField"'));
  });

  it('blocks an incompatible existing field without mutation or deletion', async () => {
    const createFieldAsXml = jest.fn();
    const fields = {
      select: jest.fn().mockReturnValue(jest.fn().mockResolvedValue([
        { InternalName: 'Amount', TypeAsString: 'Text' }
      ])),
      createFieldAsXml
    };
    const sp = {
      web: { lists: { ensure: jest.fn().mockResolvedValue({ list: { fields } }) } }
    } as unknown as SPFI;

    await expect(new ProvisioningService(sp).ensureTargetList({
      schemaVersion: 1,
      title: 'Form',
      targetListTitle: 'Submissions',
      published: false,
      fields: [{ id: '1', internalName: 'Amount', label: 'Amount', type: 'number', required: false }]
    })).rejects.toThrow('The existing Amount column has an incompatible type.');
    expect(createFieldAsXml).not.toHaveBeenCalled();
  });

  it('preflights conflicts before creating any missing fields', async () => {
    const createFieldAsXml = jest.fn();
    const fields = {
      select: jest.fn().mockReturnValue(jest.fn().mockResolvedValue([
        { InternalName: 'Amount', TypeAsString: 'Text' }
      ])),
      createFieldAsXml
    };
    const sp = {
      web: { lists: { ensure: jest.fn().mockResolvedValue({ list: { fields } }) } }
    } as unknown as SPFI;

    await expect(new ProvisioningService(sp).ensureTargetList({
      schemaVersion: 1,
      title: 'Form',
      targetListTitle: 'Submissions',
      published: false,
      fields: [
        { id: '1', internalName: 'NewField', label: 'New', type: 'number', required: true },
        { id: '2', internalName: 'Amount', label: 'Amount', type: 'number', required: false }
      ]
    })).rejects.toThrow('The existing Amount column has an incompatible type.');
    expect(createFieldAsXml).not.toHaveBeenCalled();
  });
});
