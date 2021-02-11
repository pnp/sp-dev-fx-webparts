export class SharePointFieldTypes {

  public static GetSPFieldTypeByString(fieldTypeAsString: string): SharePointType {
    let result: SharePointType = SharePointType.Text;
    switch (fieldTypeAsString) {
      case 'Text': {
        result = SharePointType.Text;
        break;
      }
      case 'Note': {
        result = SharePointType.Note;
        break;
      }
      case 'NoteFullHtml': {
        result = SharePointType.NoteFullHtml;
        break;
      }
      case 'Choice': {
        result = SharePointType.Choice;
        break;
      }
      case 'MultiChoice': {
        result = SharePointType.ChoiceMulti;
        break;
      }
      case 'Integer': {
        result = SharePointType.Integer;
        break;
      }
      case 'Number': {
        result = SharePointType.Number;
        break;
      }
      case 'Currency': {
        result = SharePointType.Currency;
        break;
      }
      case 'DateTime': {
        result = SharePointType.DateTime;
        break;
      }
      case 'Lookup': {
        result = SharePointType.Lookup;
        break;
      }
      case 'LookupMulti': {
        result = SharePointType.LookupMulti;
        break;
      }
      case 'Boolean': {
        result = SharePointType.Boolean;
        break;
      }
      case 'User': {
        result = SharePointType.User;
        break;
      }
      case 'UserMulti': {
        result = SharePointType.UserMulti;
        break;
      }
      case 'URL': {
        result = SharePointType.Url;
        break;
      }
      case 'Calculated': {
        result = SharePointType.Computed;
        break;
      }
      case 'Image': {
        result = SharePointType.Image;
        break;
      }
      case 'TaxonomyFieldType': {
        result = SharePointType.Taxonomy;
        break;
      }
      case 'TaxonomyFieldTypeMulti': {
        result = SharePointType.TaxonomyMulti;
        break;
      }
      case 'Attachments': {
        result = SharePointType.Attachments;
        break;
      }
      case 'Counter': {
        result = SharePointType.Counter;
        break;
      }
      case 'ContentTypeId': {
        result = SharePointType.ContentTypeId;
        break;
      }
      case 'Guid': {
        result = SharePointType.Guid;
        break;
      }
      default: {
        result = SharePointType.Text;
      }
    }

    return result;
  }

  public static GetSharePointTypesAsArray(): Array<string> {
    return Object.keys(SharePointType).filter(element => element != 'FileIcon');
  }

}

export enum SharePointType {
  Text = "Text",
  Note = "Note",
  NoteFullHtml = "NoteFullHtml",
  Choice = "Choice",
  ChoiceMulti = "ChoiceMulti",
  Integer = "Integer",
  Number = "Number",
  Currency = "Currency",
  DateTime = "DateTime",
  Date = "Date",
  DateLongMonth = "DateLongMonth",
  Lookup = "Lookup",
  LookupMulti = "LookupMulti",
  Boolean = "Boolean",
  User = "User",
  UserEmail = "User-Email",
  UserName = "User-Name",
  UserMulti = "UserMulti",
  Url = "Url",
  Image = "Image",
  Taxonomy = "Taxonomy",
  TaxonomyMulti = "TaxonomyMulti",
  Computed = "Computed",
  Attachments = "Attachments",
  Counter = "Counter",
  ContentTypeId = "ContentTypeId",
  Guid = "Guid",
  FileIcon = "FileIcon",
}
