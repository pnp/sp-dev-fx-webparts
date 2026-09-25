import type { SPFI } from '@pnp/sp';
import type { IList } from '@pnp/sp/lists';
import { IFormDefinition, parseFormDefinition } from '../../shared/models/IFormDefinition';
import { ProvisioningService } from './ProvisioningService';

const configListTitle = 'Flex Forms';

interface IStoredFormItem {
  Id: number;
  Title: string;
  FF_FormDefinition: string;
  FF_TargetListTitle: string;
  FF_IsPublished: boolean;
}

export class FormStorageService {
  public constructor(
    private readonly sp: SPFI,
    private readonly provisioning = new ProvisioningService(sp)
  ) {}

  public async saveForm(definition: IFormDefinition): Promise<IFormDefinition> {
    const form = parseFormDefinition(definition);
    const data = this.toItemData(form);

    if (form.id) {
      await this.list.items.getById(form.id).update(data);
      return form;
    }

    const added: { Id: number } = await this.list.items.add(data);
    const saved = { ...form, id: added.Id };
    await this.list.items.getById(added.Id).update(this.toItemData(saved));
    return saved;
  }

  public async loadForm(id: number, publishedOnly = false): Promise<IFormDefinition> {
    if (!Number.isInteger(id) || id <= 0) throw new Error('Invalid form ID.');
    const item: IStoredFormItem = await this.list.items.getById(id)
      .select('Id', 'Title', 'FF_FormDefinition', 'FF_TargetListTitle', 'FF_IsPublished')();
    const form = parseFormDefinition(JSON.parse(item.FF_FormDefinition) as unknown);
    const stored = parseFormDefinition({
      ...form,
      id: item.Id,
      title: item.Title,
      targetListTitle: item.FF_TargetListTitle,
      published: item.FF_IsPublished
    });

    if (publishedOnly && !stored.published) throw new Error('Form is not published.');
    return stored;
  }

  public async publishForm(definition: IFormDefinition): Promise<IFormDefinition> {
    const form = parseFormDefinition(definition);
    if (form.fields.length === 0) throw new Error('Add at least one field before publishing.');
    await this.provisioning.ensureTargetList(form);
    return this.saveForm({ ...form, published: true });
  }

  private get list(): IList {
    return this.sp.web.lists.getByTitle(configListTitle);
  }

  private toItemData(form: IFormDefinition): Record<string, unknown> {
    return {
      Title: form.title,
      FF_FormDefinition: JSON.stringify(form),
      FF_TargetListTitle: form.targetListTitle,
      FF_IsPublished: form.published
    };
  }
}
