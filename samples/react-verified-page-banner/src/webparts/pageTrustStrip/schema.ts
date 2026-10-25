export const pageOwnerField: string = "PageOwner";
export const lastConfirmedField: string = "LastConfirmed";
export const reviewListTitle: string = "Page Review Requests";
export const pageTitleField: string = "PageTitle";
export const pageLinkField: string = "PageLink";
/** Indexed single line of text. Server-relative page path, used because PageLink is a Note and cannot be $filter'd. */
export const pageKeyField: string = "PageKey";
export const pageKeyMaxLength: number = 255;
export const flaggedByField: string = "FlaggedBy";
export const noteField: string = "Note";
export const statusField: string = "Status";
export const statusNew: string = "New";
export const pageLibraryTemplate: number = 119;
export const noteMaxLength: number = 2000;

export const pageOwnerSchemaXml: string =
  '<Field Type="User" DisplayName="Page Owner" Name="PageOwner" StaticName="PageOwner" Group="Page Trust" List="UserInfo" UserSelectionMode="PeopleOnly" UserSelectionScope="0" ShowField="ImnName" />';

export const lastConfirmedSchemaXml: string =
  '<Field Type="DateTime" DisplayName="Last Confirmed" Name="LastConfirmed" StaticName="LastConfirmed" Group="Page Trust" Format="DateOnly" FriendlyDisplayFormat="Disabled" />';

export const pageTitleSchemaXml: string =
  '<Field Type="Text" DisplayName="Page title" Name="PageTitle" StaticName="PageTitle" Group="Page Trust" MaxLength="255" />';

export const pageLinkSchemaXml: string =
  '<Field Type="Note" DisplayName="Page link" Name="PageLink" StaticName="PageLink" Group="Page Trust" NumLines="3" RichText="FALSE" AppendOnly="FALSE" Description="Absolute URL of the page." />';

export const pageKeySchemaXml: string =
  '<Field Type="Text" DisplayName="Page key" Name="PageKey" StaticName="PageKey" Group="Page Trust" MaxLength="255" Description="Server-relative URL of the page. Used to count open review requests." />';

export const flaggedBySchemaXml: string =
  '<Field Type="User" DisplayName="Flagged by" Name="FlaggedBy" StaticName="FlaggedBy" Group="Page Trust" UserSelectionMode="PeopleOnly" />';

export const noteSchemaXml: string =
  '<Field Type="Note" DisplayName="Note" Name="Note" StaticName="Note" Group="Page Trust" NumLines="6" RichText="FALSE" AppendOnly="FALSE" />';

export const statusSchemaXml: string =
  '<Field Type="Choice" DisplayName="Status" Name="Status" StaticName="Status" Group="Page Trust" Format="Dropdown">' +
  "<Default>New</Default>" +
  "<CHOICES><CHOICE>New</CHOICE><CHOICE>In review</CHOICE><CHOICE>Resolved</CHOICE></CHOICES>" +
  "</Field>";

/** One column or list field that the banner requires. The fingerprint covers name, type, and XML. */
export interface ISchemaFingerprint {
  name: string;
  type: string;
  schemaXml: string;
}

/**
 * FNV-1a 32-bit. Exported so tests can show that any schema text change produces a new fingerprint.
 * The result is 8 lowercase hex characters.
 */
export function fnv1a32(value: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index++) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  let hex = (hash >>> 0).toString(16);
  while (hex.length < 8) {
    hex = `0${hex}`;
  }
  return hex;
}

/**
 * Hash the review list title plus each required field's name, type, and schema XML.
 * A later release that adds or renames a column gets a new schemaVersion without a manual bump.
 */
export function computeSchemaVersion(listTitle: string, parts: readonly ISchemaFingerprint[]): string {
  const lines: string[] = [listTitle];
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    lines.push(part.name);
    lines.push(part.type);
    lines.push(part.schemaXml);
  }
  return fnv1a32(lines.join("\n"));
}

export function schemaFingerprintParts(): readonly ISchemaFingerprint[] {
  return [
    { name: pageOwnerField, type: "User", schemaXml: pageOwnerSchemaXml },
    { name: lastConfirmedField, type: "DateTime", schemaXml: lastConfirmedSchemaXml },
    { name: pageTitleField, type: "Text", schemaXml: pageTitleSchemaXml },
    { name: pageLinkField, type: "Note", schemaXml: pageLinkSchemaXml },
    { name: pageKeyField, type: "Text", schemaXml: pageKeySchemaXml },
    { name: flaggedByField, type: "User", schemaXml: flaggedBySchemaXml },
    { name: noteField, type: "Note", schemaXml: noteSchemaXml },
    { name: statusField, type: "Choice", schemaXml: statusSchemaXml }
  ];
}

/** Fingerprint of the lists and columns this build knows how to provision. */
export const schemaVersion: string = computeSchemaVersion(reviewListTitle, schemaFingerprintParts());
