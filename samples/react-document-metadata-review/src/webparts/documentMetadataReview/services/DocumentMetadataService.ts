import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPFI, SPFx, spfi } from '@pnp/sp';
import '@pnp/sp/items';
import '@pnp/sp/lists';
import '@pnp/sp/webs';

import { IDocumentQuery, IDocumentRecord } from '../models/DocumentMetadataModels';
import { normalizeServerRelativePath } from '../utils/validation';

type SharePointDocumentItem = {
  Id: number;
  FileLeafRef?: string;
  Title?: string;
  FileRef?: string;
  Modified?: string;
  Editor?: { Title?: string };
  [key: string]: unknown;
};

export interface IDocumentMetadataService {
  getDocuments(query: IDocumentQuery): Promise<IDocumentRecord[]>;
}

export class DocumentMetadataService implements IDocumentMetadataService {
  private readonly sp: SPFI;

  public constructor(context: WebPartContext) {
    this.sp = spfi().using(SPFx(context));
  }

  public async getDocuments(query: IDocumentQuery): Promise<IDocumentRecord[]> {
    const list = this.sp.web.getList(normalizeServerRelativePath(query.libraryPath));
    const selectedFields = ['Id', 'FileLeafRef', 'FileRef', 'FileDirRef', 'Modified', 'Editor/Title', ...query.fields.map(field => field.internalName)];
    const folderFilter = query.folderPath ? ` and FileDirRef eq '${escapeOData(normalizeServerRelativePath(query.folderPath))}'` : '';
    const items = await list.items
      .select(selectedFields.join(','))
      .expand('Editor')
      .filter(`FSObjType eq 0${folderFilter}`)
      .top(query.maxRows)();

    return items.map((item: SharePointDocumentItem) => {
      const editor = item.Editor as { Title?: string } | undefined;
      const metadata: Record<string, unknown> = {};
      query.fields.forEach(field => {
        metadata[field.internalName] = item[field.internalName];
      });
      return {
        id: Number(item.Id),
        name: String(item.FileLeafRef || item.Title || 'Unnamed document'),
        url: String(item.FileRef || '#'),
        modified: String(item.Modified || ''),
        modifiedBy: editor && editor.Title ? editor.Title : 'Unknown',
        metadata
      };
    });
  }
}

function escapeOData(value: string): string {
  return value.replace(/'/g, "''");
}
