import type { SPFI } from '@pnp/sp';
import { IFormDefinition, parseFormDefinition } from '../../shared/models/IFormDefinition';
import { buildFieldSchemaXml, getSharePointFieldType } from './ListSchemaService';

interface IExistingField {
  InternalName: string;
  TypeAsString: string;
}

export class ProvisioningService {
  public constructor(private readonly sp: SPFI) {}

  public async ensureTargetList(definition: IFormDefinition): Promise<void> {
    const form = parseFormDefinition(definition);
    const ensured = await this.sp.web.lists.ensure(form.targetListTitle, 'Flex Forms submissions', 100);
    const existing: IExistingField[] = await ensured.list.fields.select('InternalName', 'TypeAsString')();
    const fieldsByName = new Map(existing.map(field => [field.InternalName.toLowerCase(), field]));

    for (const field of form.fields) {
      const current = fieldsByName.get(field.internalName.toLowerCase());
      if (current && current.TypeAsString !== getSharePointFieldType(field.type)) {
        throw new Error(`The existing ${field.internalName} column has an incompatible type.`);
      }
    }

    for (const field of form.fields) {
      const current = fieldsByName.get(field.internalName.toLowerCase());
      if (!current) {
        await ensured.list.fields.createFieldAsXml(buildFieldSchemaXml(field));
      }
    }
  }
}
