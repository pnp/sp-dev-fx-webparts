import { sp } from "@pnp/sp";
import { IFileItem } from "../model/IFileItem";

export class SPService {
  private listName: string;
  private fieldName: string;

  constructor (listname: string, fieldname: string) {
    this.listName = listname;
    this.fieldName = fieldname;
  }

  public async getItems (termsetID: string): Promise<IFileItem[]> {
    const items: any[] = await sp.web.lists.getByTitle(this.listName).items.select('Id', this.fieldName).expand('File').get();
    const files: IFileItem[] = [];
    items.forEach(i => {
      const nameparts = i.File.Name.split('.');
      const file: IFileItem = {
        title: i.File.Name,
        extension: nameparts[nameparts.length - 1],
        id: i.Id,
        termGuid: [""],
        taxValue: [""],
        url: i.File.LinkingUrl
      };
      if (Array.isArray(i[this.fieldName])) {
        const termguids: string[] = [];
        const taxvalues: string[] = [];
        i[this.fieldName].forEach(f => {
          termguids.push(f.TermGuid.toLowerCase());
          taxvalues.push(`${f.Label}|${f.TermGuid}`);
        });
        file.termGuid = termguids;
        file.taxValue = taxvalues;
      }
      else {
        file.termGuid = i[this.fieldName] ? [i[this.fieldName].TermGuid.toLowerCase()]:[""];
        file.taxValue = i[this.fieldName] ? [`${i[this.fieldName].Label.toLowerCase()}|${i[this.fieldName].TermGuid.toLowerCase()}`]:[""];
      }
      files.push(file);
    });
    return files;
  }

  public async updateTaxonomyItemByAdd (file: IFileItem, fieldName: string, newTaxonomyValue: string) {   
    const itemID: number = parseInt(file.id);
    let fieldValues = file.taxValue.join(';');
    fieldValues += `;${newTaxonomyValue}`;

    // https://blog.aterentiev.com/how-to-easily-update-managed-metadata
    await sp.web.lists.getByTitle(this.listName).items.getById(itemID).validateUpdateListItem([{
      ErrorMessage: null,
      FieldName: fieldName,
      FieldValue: fieldValues,
      HasException: false
    }]);
  }

  public async updateTaxonomyItemByReplace (file: IFileItem, fieldName: string, newTaxonomyValue: string) {   
    const itemID: number = parseInt(file.id);

    await sp.web.lists.getByTitle(this.listName).items.getById(itemID).validateUpdateListItem([{
      ErrorMessage: null,
      FieldName: fieldName,
      FieldValue: newTaxonomyValue,
      HasException: false
    }]);
  }

  public async newTaxonomyItemByCopy (file: IFileItem, fieldName: string, newTaxonomyValue: string): Promise<IFileItem> {
    const fileUrl: URL = new URL(file.url);
    const currentFileNamePart = file.title.replace(`.${file.extension}`, '');
    const newFilename = `${currentFileNamePart}_Copy.${file.extension}`;
    const destinationUrl = decodeURI(fileUrl.pathname).replace(file.title, newFilename);
    await sp.web.getFileByServerRelativePath(decodeURI(fileUrl.pathname)).copyByPath(destinationUrl, false, true);
    const newFileItemPromise = await sp.web.getFileByServerRelativePath(destinationUrl).getItem();
    const newFileItem = await newFileItemPromise.get();
    console.log(newFileItem);
    const itemID: number = parseInt(newFileItem.Id);

    await sp.web.lists.getByTitle(this.listName).items.getById(itemID).validateUpdateListItem([{
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
}