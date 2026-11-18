import { spfi, SPFx, type SPFI } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/site-groups/web';
import '@pnp/sp/site-users/web';
import type { WebPartContext } from '@microsoft/sp-webpart-base';

export type SiteAccessRole = 'visitor' | 'member' | 'owner';

export class SiteAccessService {
  private readonly _context: WebPartContext;

  public constructor(context: WebPartContext) {
    this._context = context;
  }

  public async grantAccess(siteUrl: string, upn: string, role: SiteAccessRole): Promise<void> {
    const sp: SPFI = spfi(siteUrl).using(SPFx(this._context));
    const ensured: { LoginName: string } = await sp.web.ensureUser(upn);
    const group =
      role === 'owner'
        ? sp.web.associatedOwnerGroup
        : role === 'member'
          ? sp.web.associatedMemberGroup
          : sp.web.associatedVisitorGroup;
    await group.users.add(ensured.LoginName);
  }
}
