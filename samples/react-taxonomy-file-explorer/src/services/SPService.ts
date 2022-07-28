import { ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import "@pnp/sp/files";
import "@pnp/sp/folders";

import { IFileItem } from "../model/IFileItem";
import { IItem } from "@pnp/sp/items";

export class SPService {
  private _listName: string;
  private _fieldName: string;
  private _sp: SPFI;

  public constructor (serviceScope: ServiceScope, listname: string, fieldname: string) {
    this._listName = listname;
    this._fieldName = fieldname;
    serviceScope.whenFinished(() => {
      const pageContext: PageContext = serviceScope.consume(PageContext.serviceKey);
      this._sp = spfi().using(SPFx({ pageContext }));
    });
  }

  public async getItems (termsetID: string): Promise<IFileItem[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = await this._sp.web.lists.getByTitle(this._listName).items.select('Id', this._fieldName).expand('File').getAll();
    const files: IFileItem[] = [];
    items.forEach(i => {
      const nameparts: string[] = i.File.Name.split('.');
      const file: IFileItem = {
        title: i.File.Name,
        extension: nameparts[nameparts.length - 1],
        id: i.Id,
        termGuid: [""],
        taxValue: [""],
        url: i.File.LinkingUrl
      };
      if (Array.isArray(i[this._fieldName])) {
        const termguids: string[] = [];
        const taxvalues: string[] = [];
        i[this._fieldName].forEach(f => {
          termguids.push(f.TermGuid.toLowerCase());
          taxvalues.push(`${f.Label}|${f.TermGuid}`);
        });
        file.termGuid = termguids;
        file.taxValue = taxvalues;
      }
      else {
        file.termGuid = i[this._fieldName] ? [i[this._fieldName].TermGuid.toLowerCase()]:[""];
        file.taxValue = i[this._fieldName] ? [`${i[this._fieldName].Label.toLowerCase()}|${i[this._fieldName].TermGuid.toLowerCase()}`]:[""];
      }
      files.push(file);
    });
    return files;
  }

  public async updateTaxonomyItemByAdd(file: IFileItem, fieldName: string, newTaxonomyValue: string): Promise<void> {   
    const itemID: number = parseInt(file.id);
    let fieldValues = file.taxValue.join(';');
    fieldValues += `;${newTaxonomyValue}`;

    // https://blog.aterentiev.com/how-to-easily-update-managed-metadata
    await this._sp.web.lists.getByTitle(this._listName).items.getById(itemID).validateUpdateListItem([{
      ErrorMessage: null,
      FieldName: fieldName,
      FieldValue: fieldValues,
      HasException: false
    }]);
  }

  public async updateTaxonomyItemByReplace (file: IFileItem, fieldName: string, newTaxonomyValue: string): Promise<void> {   
    const itemID: number = parseInt(file.id);

    await this._sp.web.lists.getByTitle(this._listName).items.getById(itemID).validateUpdateListItem([{
      ErrorMessage: null,
      FieldName: fieldName,
      FieldValue: newTaxonomyValue,
      HasException: false
    }]);
  }

  public async newTaxonomyItemByCopy (file: IFileItem, fieldName: string, newTaxonomyValue: string): Promise<IFileItem> {
    const fileUrl: URL = new URL(file.url);
    const currentFileNamePart: string = file.title.replace(`.${file.extension}`, '');
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const newFilename: string = `${currentFileNamePart}_Copy.${file.extension}`;
    const destinationUrl: string = decodeURI(fileUrl.pathname).replace(file.title, newFilename);
    await this._sp.web.getFileByServerRelativePath(decodeURI(fileUrl.pathname)).copyByPath(destinationUrl, false, true);
    const newFileItemPromise: IItem = await this._sp.web.getFileByServerRelativePath(destinationUrl).getItem();
    const newFileItem = await newFileItemPromise.file.getItem<{ Id: number }>("Id");
    const itemID: number = newFileItem.Id;

    await this._sp.web.lists.getByTitle(this._listName).items.getById(itemID).validateUpdateListItem([{
      ErrorMessage: null,
      FieldName: fieldName,
      FieldValue: newTaxonomyValue,
      HasException: false
    }]);
    const newFile: IFileItem = {
      extension: file.extension,
      id: itemID.toString(),
      taxValue: [newTaxonomyValue],
      termGuid: [newTaxonomyValue.split('|')[1]],
      title: newFilename,
      url: fileUrl.host + '/' + destinationUrl
    };
    return newFile;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async newTaxonomyItemByUpload (file: any, fieldName: string, newTaxonomyValue: string): Promise<IFileItem> {
    const libraryRoot = await this._sp.web.lists.getByTitle(this._listName).rootFolder();
    // Assuming small file size, otherwise use chunks
    const result = await this._sp.web.getFolderByServerRelativePath(libraryRoot.ServerRelativeUrl).files.addUsingPath(file.name, file, { Overwrite: true });
    const fileNameParts: string[] = result.data.Name.split('.');
    const newFileItemPromise = await this._sp.web.getFileByServerRelativePath(result.data.ServerRelativeUrl).getItem();
    const newFileItem = await newFileItemPromise.file.getItem<{ Id: number }>("Id");

    const itemID: number = newFileItem.Id;
    await this._sp.web.lists.getByTitle(this._listName).items.getById(itemID).validateUpdateListItem([{
      ErrorMessage: null,
      FieldName: fieldName,
      FieldValue: newTaxonomyValue,
      HasException: false
    }]);

    const newFile: IFileItem = {
      extension: fileNameParts[fileNameParts.length - 1],
      id: itemID.toString(),
      taxValue: [newTaxonomyValue],
      termGuid: [newTaxonomyValue.split('|')[1]],
      title: file.name,
      url: result.data.ServerRelativeUrl
    };
    return newFile;
  }
}