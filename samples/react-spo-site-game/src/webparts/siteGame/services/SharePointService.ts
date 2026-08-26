import { SPHttpClient } from '@microsoft/sp-http';
import { ISPData, ISPGroupUser, ISPList, ISPUser } from './ISharePointData';

export class SharePointService {
  constructor(
    private spHttpClient: SPHttpClient,
    private siteAbsoluteUrl: string
  ) {}

  public async fetchAll(): Promise<ISPData> {
    const [webData, listData, currentUserData, groupUsersData] = await Promise.all([
      this.fetchWeb(),
      this.fetchLists(),
      this.fetchCurrentUser(),
      this.fetchGroupUsers(),
    ]);

    return {
      siteTitle: webData.Title,
      siteAbsoluteUrl: this.siteAbsoluteUrl,
      lists: listData,
      users: groupUsersData,
      currentUser: currentUserData,
    };
  }

  private async fetchWeb(): Promise<{ Title: string }> {
    const url = `${this.siteAbsoluteUrl}/_api/web?$select=Title`;
    const response = await this.spHttpClient.get(url, SPHttpClient.configurations.v1);
    if (!response.ok) return { Title: 'SharePoint Site' };
    const data = await response.json();
    return data;
  }

  private async fetchLists(): Promise<ISPList[]> {
    const url =
      `${this.siteAbsoluteUrl}/_api/web/lists` +
      `?$select=Id,Title,BaseTemplate,ItemCount,DefaultViewUrl,Description,RootFolder/ServerRelativeUrl` +
      `&$expand=RootFolder` +
      `&$filter=Hidden eq false`;
    try {
      const response = await this.spHttpClient.get(url, SPHttpClient.configurations.v1);
      if (!response.ok) return [];
      const data = await response.json();
      return (data.value as ISPList[]) || [];
    } catch {
      return [];
    }
  }

  private async fetchCurrentUser(): Promise<ISPUser> {
    const url = `${this.siteAbsoluteUrl}/_api/web/currentuser?$select=Id,Title,Email,LoginName`;
    try {
      const response = await this.spHttpClient.get(url, SPHttpClient.configurations.v1);
      if (!response.ok) return { Id: 0, Title: 'Player', Email: '', LoginName: '' };
      return await response.json();
    } catch {
      return { Id: 0, Title: 'Player', Email: '', LoginName: '' };
    }
  }

  private async fetchGroupUsers(): Promise<ISPGroupUser[]> {
    const groupApis: Array<{ endpoint: string; name: 'Owners' | 'Members' | 'Visitors' }> = [
      { endpoint: 'associatedownergroup', name: 'Owners' },
      { endpoint: 'associatedmembergroup', name: 'Members' },
      { endpoint: 'associatedvisitorgroup', name: 'Visitors' },
    ];

    const results: ISPGroupUser[] = [];
    const seen = new Set<string>();

    await Promise.all(
      groupApis.map(async (group) => {
        try {
          const url =
            `${this.siteAbsoluteUrl}/_api/web/${group.endpoint}/users` +
            `?$select=Id,Title,Email,LoginName&$top=50`;
          const response = await this.spHttpClient.get(url, SPHttpClient.configurations.v1);
          if (!response.ok) return;
          const data = await response.json();
          const users: ISPUser[] = data.value || [];
          for (const u of users) {
            if (!seen.has(u.LoginName) && u.Email) {
              seen.add(u.LoginName);
              results.push({ ...u, groupName: group.name });
            }
          }
        } catch {
          // silently skip if group not available
        }
      })
    );

    return results;
  }

  public async fetchListItems(
    listId: string,
    top = 100,
    folderServerRelativeUrl?: string
  ): Promise<Array<{
    Id: number;
    Title: string;
    FileLeafRef: string;
    FSObjType: number;        // 0 = file, 1 = folder
    FileDirRef: string;       // parent folder server-relative URL
    Modified: string;
    Editor?: { Title: string };
    File?: { ServerRelativeUrl: string };
  }>> {
    let url =
      `${this.siteAbsoluteUrl}/_api/web/lists/getbyid('${listId}')/items` +
      `?$select=Id,Title,FileLeafRef,FSObjType,FileDirRef,Modified,Editor/Title,File/ServerRelativeUrl` +
      `&$expand=Editor,File&$top=${top}&$orderby=FSObjType desc,FileLeafRef asc`;
    if (folderServerRelativeUrl) {
      url += `&$filter=FileDirRef eq '${encodeURIComponent(folderServerRelativeUrl).replace(/%2F/g, '/')}'`;
    }
    try {
      const response = await this.spHttpClient.get(url, SPHttpClient.configurations.v1);
      if (!response.ok) return [];
      const data = await response.json();
      return data.value || [];
    } catch {
      return [];
    }
  }
}
