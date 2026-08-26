import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import type {
  ISPList,
  ISPField,
  IGanttFieldMappings,
  IFieldValidationResult,
} from "../PropertyFields/GanttListPickerPropertyField/IGanttFieldDefinitions";
import { GANTT_TASK_FIELD_DEFINITIONS } from "../PropertyFields/GanttListPickerPropertyField/IGanttFieldDefinitions";

export interface ISPListPage {
  lists: ISPList[];
  hasMore: boolean;
  nextPageUrl?: string;
}

export interface ISPSite {
  Title: string;
  Url: string;
}

interface ISearchCell {
  Key: string;
  Value: string;
}

interface ISearchRow {
  Cells: ISearchCell[];
}

const LIST_PAGE_SIZE = 30;

export class SPListService {
  constructor(
    private spHttpClient: SPHttpClient,
    private siteUrl: string,
  ) {}

  public async searchSites(query: string): Promise<ISPSite[]> {
    const searchText = query
      ? `${query} contentclass:STS_Site`
      : "contentclass:STS_Site";
    const url = `${this.siteUrl}/_api/search/query?querytext='${encodeURIComponent(searchText)}'&selectproperties='Title,Path,SPSiteUrl'&trimduplicates=true&rowlimit=15`;

    const response: SPHttpClientResponse = await this.spHttpClient.get(
      url,
      SPHttpClient.configurations.v1,
    );
    if (!response.ok)
      throw new Error(`Failed to search sites: ${response.statusText}`);

    const json = await response.json();
    const rows: ISearchRow[] =
      json?.PrimaryQueryResult?.RelevantResults?.Table?.Rows || [];

    return rows.map((row) => {
      const getCell = (key: string): string =>
        row.Cells.find((c) => c.Key === key)?.Value || "";
      return {
        Title: getCell("Title"),
        Url: (getCell("SPSiteUrl") || getCell("Path")).replace(/\/$/, ""),
      };
    });
  }

  public async getListsPage(nextPageUrl?: string): Promise<ISPListPage> {
    const url =
      nextPageUrl ??
      `${this.siteUrl}/_api/web/lists?$filter=Hidden eq false and (BaseTemplate eq 100 or BaseTemplate eq 171)&$select=Id,Title,ItemCount,BaseTemplate&$orderby=Title&$top=${LIST_PAGE_SIZE}`;

    const response: SPHttpClientResponse = await this.spHttpClient.get(
      url,
      SPHttpClient.configurations.v1,
    );
    if (!response.ok)
      throw new Error(`Failed to fetch lists: ${response.statusText}`);

    const json = await response.json();
    const odataNextLink: string | undefined =
      json["odata.nextLink"] ?? json["@odata.nextLink"];

    return {
      lists: json.value as ISPList[],
      hasMore: !!odataNextLink,
      nextPageUrl: odataNextLink,
    };
  }

  public async getAllListFields(listId: string): Promise<ISPField[]> {
    const url = `${this.siteUrl}/_api/web/lists(guid'${listId}')/fields?$filter=Hidden eq false&$select=Id,InternalName,Title,TypeAsString,Hidden,ReadOnlyField&$orderby=Title`;
    const response: SPHttpClientResponse = await this.spHttpClient.get(
      url,
      SPHttpClient.configurations.v1,
    );
    if (!response.ok)
      throw new Error(`Failed to fetch fields: ${response.statusText}`);

    const json = await response.json();
    return json.value as ISPField[];
  }

  /** Auto-detects field mappings by matching known internal names and types */
  public static validateFields(fields: ISPField[]): IFieldValidationResult {
    const autoMappings: Partial<IGanttFieldMappings> = {};
    const matched: { key: keyof IGanttFieldMappings; field: ISPField }[] = [];
    const missingRequired: typeof GANTT_TASK_FIELD_DEFINITIONS = [];
    const missingOptional: typeof GANTT_TASK_FIELD_DEFINITIONS = [];

    for (const def of GANTT_TASK_FIELD_DEFINITIONS) {
      let foundField: ISPField | undefined;

      // Try auto-detect by InternalName, then by Title
      for (const autoName of def.autoDetectNames) {
        foundField = fields.find(
          (f) =>
            f.InternalName.toLowerCase() === autoName.toLowerCase() &&
            def.compatibleTypes.indexOf(f.TypeAsString) !== -1,
        );
        if (foundField) break;
      }

      if (!foundField) {
        for (const autoName of def.autoDetectNames) {
          foundField = fields.find(
            (f) =>
              f.Title.toLowerCase() === autoName.toLowerCase() &&
              def.compatibleTypes.indexOf(f.TypeAsString) !== -1,
          );
          if (foundField) break;
        }
      }

      if (foundField) {
        autoMappings[def.key] = foundField.InternalName;
        matched.push({ key: def.key, field: foundField });
      } else if (def.required) {
        missingRequired.push(def);
      } else {
        missingOptional.push(def);
      }
    }

    return {
      isValid: missingRequired.length === 0,
      autoMappings,
      matched,
      missingRequired,
      missingOptional,
    };
  }
}
