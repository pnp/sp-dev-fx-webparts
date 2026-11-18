import { spfi, SPFx, SPFI } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/fields';
import '@pnp/sp/items';
import { AddFieldOptions } from '@pnp/sp/fields';
import type { IList } from '@pnp/sp/lists';
import type { WebPartContext } from '@microsoft/sp-webpart-base';
import { UPC_LIST_DEFINITIONS } from './listSchemas';
import type { IUpcFieldDefinition, IUpcListDefinition } from './listSchemas';
import { UPC_SEED_DEFINITIONS, type ISeedDefinition } from './listSeedItems';
import { escapeODataLiteral } from '../util/odata';

export interface IProvisioningProgress {
  message: string;
}

export interface IProvisioningResult {
  createdLists: string[];
  existingLists: string[];
  createdFields: number;
  createdItems: number;
  createdIndexes: number;
  warnings: string[];
}

const GENERIC_LIST_TEMPLATE: number = 100;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function fieldSchemaXml(field: IUpcFieldDefinition): string {
  const common: string =
    `Name="${field.name}" StaticName="${field.name}" ` +
    `DisplayName="${escapeXml(field.displayName)}"` +
    (field.required ? ' Required="TRUE"' : '') +
    (field.indexed ? ' Indexed="TRUE"' : '');
  switch (field.type) {
    case 'Note':
      return `<Field Type="Note" ${common} NumLines="6" />`;
    case 'DateTime':
      return `<Field Type="DateTime" ${common} Format="DateTime" />`;
    case 'User':
      return `<Field Type="User" ${common} UserSelectionMode="PeopleOnly" />`;
    case 'Choice': {
      const choices: string = (field.choices ?? []).map((c) => `<CHOICE>${escapeXml(c)}</CHOICE>`).join('');
      return `<Field Type="Choice" ${common} Format="Dropdown"><CHOICES>${choices}</CHOICES></Field>`;
    }
    default:
      return `<Field Type="${field.type}" ${common} />`;
  }
}

export class ListProvisioningService {
  private readonly _sp: SPFI;

  public constructor(context: WebPartContext);
  public constructor(sp: SPFI);
  public constructor(contextOrSp: WebPartContext | SPFI) {
    this._sp =
      contextOrSp && typeof contextOrSp === 'object' && 'web' in contextOrSp
        ? (contextOrSp as SPFI)
        : spfi().using(SPFx(contextOrSp as WebPartContext));
  }

  public async ensureAllLists(onProgress?: (progress: IProvisioningProgress) => void): Promise<IProvisioningResult> {
    const result: IProvisioningResult = {
      createdLists: [],
      existingLists: [],
      createdFields: 0,
      createdItems: 0,
      createdIndexes: 0,
      warnings: []
    };
    for (const definition of UPC_LIST_DEFINITIONS) {
      onProgress?.({ message: definition.title });
      try {
        const created: number = await this._ensureList(definition, result);
        result.createdFields += created;
        result.createdIndexes += await this._ensureIndexes(definition, result);
      } catch (err) {
        result.warnings.push(`${definition.title}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    for (const seed of UPC_SEED_DEFINITIONS) {
      onProgress?.({ message: seed.listTitle });
      try {
        result.createdItems += await this._ensureSeedItems(seed);
      } catch (err) {
        result.warnings.push(`${seed.listTitle}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    return result;
  }

  private async _ensureList(definition: IUpcListDefinition, result: IProvisioningResult): Promise<number> {
    const ensure = await this._sp.web.lists.ensure(definition.title, 'User Provisioning Center', GENERIC_LIST_TEMPLATE);
    if (ensure.created) {
      result.createdLists.push(definition.title);
    } else {
      result.existingLists.push(definition.title);
    }
    const list: IList = ensure.list;

    const existingFields: { InternalName: string; Title: string; CanBeDeleted: boolean }[] =
      await list.fields.select('InternalName', 'Title', 'CanBeDeleted').top(500)();
    const existingNames: Set<string> = new Set(existingFields.map((f) => f.InternalName));

    let createdFields: number = 0;
    for (const field of definition.fields) {
      if (existingNames.has(field.name)) {
        continue;
      }
      const mangled = existingFields.filter(
        (f) =>
          f.Title === field.displayName &&
          f.InternalName !== field.name &&
          f.InternalName.indexOf('_x0') !== -1 &&
          f.CanBeDeleted
      )[0];
      if (mangled) {
        await list.fields.getByInternalNameOrTitle(mangled.InternalName).delete();
      }
      await list.fields.createFieldAsXml({
        SchemaXml: fieldSchemaXml(field),
        Options: AddFieldOptions.AddFieldInternalNameHint | AddFieldOptions.AddFieldToDefaultView
      });
      createdFields++;
    }

    if (definition.auditSecurity) {
      const current: { ReadSecurity: number; WriteSecurity: number; EnableVersioning: boolean } =
        await list.select('ReadSecurity', 'WriteSecurity', 'EnableVersioning')();
      if (current.ReadSecurity !== 1 || current.WriteSecurity !== 2 || !current.EnableVersioning) {
        await list.update({ ReadSecurity: 1, WriteSecurity: 2, EnableVersioning: true });
      }
    }
    return createdFields;
  }

  private async _ensureIndexes(definition: IUpcListDefinition, result: IProvisioningResult): Promise<number> {
    const wanted: string[] = [
      ...definition.fields.filter((f) => f.indexed).map((f) => f.name),
      ...(definition.indexedBuiltInFields ?? [])
    ];
    if (wanted.length === 0) {
      return 0;
    }
    const list = this._sp.web.lists.getByTitle(definition.title);
    const existing: { InternalName: string; Indexed: boolean }[] = await list.fields.select('InternalName', 'Indexed').top(500)();
    const indexedNow: Map<string, boolean> = new Map(existing.map((f) => [f.InternalName, f.Indexed]));

    let created: number = 0;
    for (const name of wanted) {
      if (!indexedNow.has(name)) {
        result.warnings.push(`${definition.title}: cannot index ${name}, column not found`);
        continue;
      }
      if (indexedNow.get(name) === true) {
        continue;
      }
      try {
        await list.fields.getByInternalNameOrTitle(name).update({ Indexed: true });
        created++;
      } catch (indexErr) {
        result.warnings.push(
          `${definition.title}: could not index ${name} (${indexErr instanceof Error ? indexErr.message : String(indexErr)})`
        );
      }
    }
    return created;
  }

  private async _ensureSeedItems(seed: ISeedDefinition): Promise<number> {
    const list = this._sp.web.lists.getByTitle(seed.listTitle);
    let created: number = 0;
    for (const item of seed.items) {
      const identityValue: string = String(item[seed.identityField] ?? '');
      const existing: { Id: number }[] = await list.items
        .select('Id')
        .filter(`${seed.identityField} eq '${escapeODataLiteral(identityValue)}'`)
        .top(1)();
      if (existing.length > 0) {
        continue;
      }
      await list.items.add(item);
      created++;
    }
    return created;
  }
}
