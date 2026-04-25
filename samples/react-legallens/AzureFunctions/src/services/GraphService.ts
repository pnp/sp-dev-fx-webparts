import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import 'isomorphic-fetch';

export class GraphService {
  private client: Client;
  private siteId: string;
  private driveIdCache: Map<string, string> = new Map();

  constructor() {
    const credential = new ClientSecretCredential(
      process.env.TENANT_ID!,
      process.env.CLIENT_ID!,
      process.env.CLIENT_SECRET!
    );

    this.siteId = process.env.SHAREPOINT_SITE_ID!;

    this.client = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => {
          const token = await credential.getToken('https://graph.microsoft.com/.default');
          return token.token;
        },
      },
    });
  }

  private async resolveListDriveId(listGuidOrDriveId: string): Promise<string> {
    if (listGuidOrDriveId.startsWith('b!')) {
      return listGuidOrDriveId;
    }

    const cached = this.driveIdCache.get(listGuidOrDriveId);
    if (cached) {
      console.log('[Graph] Drive ID from cache:', cached);
      return cached;
    }

    console.log('[Graph] Resolving drive ID for list GUID:', listGuidOrDriveId);

    const drive = await this.client
      .api(`/sites/${this.siteId}/lists/${listGuidOrDriveId}/drive`)
      .get();

    const driveId: string = drive.id;
    this.driveIdCache.set(listGuidOrDriveId, driveId);

    console.log('[Graph] Resolved drive ID:', driveId);
    return driveId;
  }

  async getListItem(listId: string, itemId: string): Promise<any> {
    try {
      const item = await this.client
        .api(`/sites/${this.siteId}/lists/${listId}/items/${itemId}`)
        .expand('fields')
        .get();
      return item.fields;
    } catch (error) {
      console.error('[Graph] Error getting list item:', error);
      throw error;
    }
  }

  async queryList(listId: string, filter: string): Promise<any[]> {
    try {
      const response = await this.client
        .api(`/sites/${this.siteId}/lists/${listId}/items`)
        .expand('fields')
        .filter(filter)
        .get();
      return response.value.map((item: any) => item.fields);
    } catch (error) {
      console.error('[Graph] Error querying list:', error);
      throw error;
    }
  }

  async updateListItem(listId: string, itemId: string, fields: any): Promise<void> {
    try {
      await this.client
        .api(`/sites/${this.siteId}/lists/${listId}/items/${itemId}/fields`)
        .update(fields);
      console.log('[Graph] List item updated:', itemId);
    } catch (error) {
      console.error('[Graph] Error updating list item:', error);
      throw error;
    }
  }

  async createListItem(siteId: string, listId: string, fields: any): Promise<any> {
    try {
      return await this.client
        .api(`/sites/${siteId}/lists/${listId}/items`)
        .post({ fields });
    } catch (error) {
      console.error('[Graph] Error creating list item:', error);
      throw error;
    }
  }

  async downloadFile(libraryId: string, itemId: string): Promise<Buffer> {
    try {
      const driveId = await this.resolveListDriveId(libraryId);
      console.log('[Graph] Downloading - drive:', driveId, 'item:', itemId);

      const nodeFetch = require('node-fetch');
      const { ClientSecretCredential } = require('@azure/identity');

      const cred = new ClientSecretCredential(
        process.env.TENANT_ID!,
        process.env.CLIENT_ID!,
        process.env.CLIENT_SECRET!
      );
      const tokenResponse = await cred.getToken('https://graph.microsoft.com/.default');
      const accessToken = tokenResponse.token;

      const driveItemUrl = `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/content`;
      console.log('[Graph] Fetching content via raw HTTP...');

      const response = await nodeFetch(driveItemUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
        follow: 20,
        timeout: 30000,
      });

      if (!response.ok) throw new Error(`Download HTTP error: ${response.status} ${response.statusText}`);

      const buffer = Buffer.from(await response.buffer());
      console.log('[Graph] Downloaded:', buffer.length, 'bytes');
      return buffer;

    } catch (error: any) {
      console.error('[Graph] Error downloading file:', error);
      throw new Error(`Failed to download file: ${error.message}`);
    }
  }

  async getFileByPath(libraryId: string, fileName: string): Promise<any> {
    try {
      const driveId = await this.resolveListDriveId(libraryId);
      console.log('[Graph] Searching for file:', fileName, 'in drive:', driveId);

      try {
        const response = await this.client
          .api(`/drives/${driveId}/root:/${encodeURIComponent(fileName)}`)
          .get();
        console.log('[Graph] Found file via path:', response.id);
        return response;
      } catch {
        console.log('[Graph] Direct path failed, trying search...');
      }

      try {
        const searchResponse = await this.client
          .api(`/drives/${driveId}/root/children`)
          .filter(`name eq '${fileName.replace(/'/g, "''")}'`)
          .get();

        if (searchResponse.value?.length > 0) {
          console.log('[Graph] Found via filter:', searchResponse.value[0].id);
          return searchResponse.value[0];
        }
      } catch {
        console.log('[Graph] Filter search failed, trying full list...');
      }

      const allItems = await this.client
        .api(`/drives/${driveId}/root/children`)
        .get();

      const match = (allItems.value as any[]).find(
        (item) => item.name === fileName || item.name.includes(fileName)
      );

      if (match) {
        console.log('[Graph] Found via full list:', match.id);
        return match;
      }

      throw new Error(`File not found: ${fileName}`);
    } catch (error: any) {
      console.error('[Graph] Error getting file:', error);
      throw new Error(`Failed to find file "${fileName}": ${error.message}`);
    }
  }

  async uploadFile(libraryId: string, fileName: string, content: Buffer): Promise<any> {
    try {
      const driveId = await this.resolveListDriveId(libraryId);
      console.log('[Graph] Uploading file:', fileName, 'size:', content.length, 'drive:', driveId);

      if (content.length > 4 * 1024 * 1024) {
        return await this.uploadLargeFile(driveId, fileName, content);
      }

      const response = await this.client
        .api(`/drives/${driveId}/root:/${encodeURIComponent(fileName)}:/content`)
        .put(content);

      console.log('[Graph] File uploaded:', fileName, 'ID:', response.id);
      return response;
    } catch (error: any) {
      console.error('[Graph] Error uploading file:', error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  private async uploadLargeFile(driveId: string, fileName: string, content: Buffer): Promise<any> {
    console.log('[Graph] Creating upload session for large file:', fileName);

    const session = await this.client
      .api(`/drives/${driveId}/root:/${encodeURIComponent(fileName)}:/createUploadSession`)
      .post({ item: { '@microsoft.graph.conflictBehavior': 'replace' } });

    const uploadUrl: string = session.uploadUrl;
    const chunkSize = 320 * 1024;
    let uploadedBytes = 0;

    while (uploadedBytes < content.length) {
      const chunk = content.slice(uploadedBytes, uploadedBytes + chunkSize);
      const end = uploadedBytes + chunk.length - 1;

      const res = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Length': chunk.length.toString(),
          'Content-Range': `bytes ${uploadedBytes}-${end}/${content.length}`,
        },
        body: chunk,
      });

      if (!res.ok && res.status !== 201 && res.status !== 202) {
        throw new Error(`Chunk upload failed: ${res.status} ${res.statusText}`);
      }

      uploadedBytes += chunk.length;
      console.log('[Graph] Uploaded:', uploadedBytes, '/', content.length, 'bytes');
    }

    const result = await fetch(uploadUrl);
    const fileInfo = await result.json() as any;
    console.log('[Graph] Large file upload complete:', fileInfo.id);
    return fileInfo;
  }

  async updateFileMetadata(libraryId: string, itemId: string, metadata: any): Promise<void> {
    try {
      const driveId = await this.resolveListDriveId(libraryId);
      console.log('[Graph] Updating metadata for item:', itemId);

      await this.client
        .api(`/drives/${driveId}/items/${itemId}/listItem/fields`)
        .update(metadata);

      console.log('[Graph] Metadata updated successfully');
    } catch (error: any) {
      console.error('[Graph] Error updating metadata (non-critical):', error);
    }
  }

  async getDrive(driveId: string): Promise<any> {
    try {
      const drive = await this.client.api(`/drives/${driveId}`).get();
      console.log('[Graph] Drive info:', drive.name);
      return drive;
    } catch (error) {
      console.error('[Graph] Error getting drive info:', error);
      throw error;
    }
  }
}