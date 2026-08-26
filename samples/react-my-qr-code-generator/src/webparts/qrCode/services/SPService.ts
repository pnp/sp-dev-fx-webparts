import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/attachments';
import '@pnp/sp/fields';

export class SPService {
  private sp: SPFI;
  private listName: string = 'QR Codes';

  constructor(context: WebPartContext) {
    this.sp = spfi().using(SPFx(context));
  }

  public async ensureList(): Promise<void> {
    try {
      await this.sp.web.lists.getByTitle(this.listName)();
    } catch {
      await this.sp.web.lists.add(this.listName, 'List to store QR Code metadata and images', 100, false);
      
      const list = this.sp.web.lists.getByTitle(this.listName);
      await list.fields.addMultilineText('Description', { RichText: false });
    }
  }

  public async saveQRCode(title: string, description: string, blob: Blob, fileName: string): Promise<void> {
    await this.ensureList();

    const item = await this.sp.web.lists.getByTitle(this.listName).items.add({
      Title: title,
      Description: description
    });

    await this.sp.web.lists.getByTitle(this.listName)
      .items.getById(item.Id)
      .attachmentFiles.add(fileName, blob);
  }
}
