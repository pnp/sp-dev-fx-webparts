import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IUser, IGroup, ISite, IUserPresence } from '../types/interfaces';
import { GroupMemberService, IGroupMemberService } from './GroupMemberService';
import { ProfileService } from './ProfileService';
import { SitePermissionService, ISitePermissionService } from './SitePermissionService';

export interface IUnifiedGraphService extends IGroupMemberService, ISitePermissionService {
  getUserPhoto(userId: string, userPrincipalName?: string): Promise<string | undefined>;
  getUserPresence(userId: string, userPrincipalName?: string): Promise<IUserPresence | undefined>;
  getBatchUserPresence(userIds: string[]): Promise<Record<string, IUserPresence>>;
  prefetchUserPhotos(users: IUser[]): Promise<void>;
  dispose(): void;
}

export class UnifiedGraphService implements IUnifiedGraphService {
  private groupMemberService: GroupMemberService;
  private profileService: ProfileService;
  private sitePermissionService: SitePermissionService;

  constructor(context: WebPartContext) {
    this.groupMemberService = new GroupMemberService(context);
    this.profileService = new ProfileService(context);
    this.sitePermissionService = new SitePermissionService(context);
  }

  // Group Member Service methods
  public async getGroupMembers(groupId: string, role: 'admin' | 'member'): Promise<IUser[]> {
    return this.groupMemberService.getGroupMembers(groupId, role);
  }

  public async getUserGroups(): Promise<IGroup[]> {
    return this.groupMemberService.getUserGroups();
  }

  public async batchGetGroupMembers(requests: Array<{ groupId: string; role: 'admin' | 'member' }>): Promise<Record<string, IUser[]>> {
    return this.groupMemberService.batchGetGroupMembers(requests);
  }

  public async resolveGroupMembers(groupId: string, accessLevel: 'owner' | 'admin' | 'member' | 'visitor'): Promise<IUser[]> {
    return this.groupMemberService.resolveGroupMembers(groupId, accessLevel);
  }

  // Profile Service methods
  public async getUserPhoto(userId: string, userPrincipalName?: string): Promise<string | undefined> {
    return this.profileService.getUserPhoto(userId, userPrincipalName);
  }

  public async getUserPresence(userId: string, userPrincipalName?: string): Promise<IUserPresence | undefined> {
    return this.profileService.getUserPresence(userId, userPrincipalName);
  }

  public async getBatchUserPresence(userIds: string[]): Promise<Record<string, IUserPresence>> {
    return this.profileService.getBatchUserPresence(userIds);
  }

  public async prefetchUserPhotos(users: IUser[]): Promise<void> {
    return this.profileService.prefetchUserPhotos(users);
  }

  // Site Permission Service methods
  public async getCurrentSite(): Promise<ISite | undefined> {
    return this.sitePermissionService.getCurrentSite();
  }

  public async getSiteMembers(siteId: string): Promise<IUser[]> {
    return this.sitePermissionService.getSiteMembers(siteId);
  }

  public async getAllSiteMembers(): Promise<IUser[]> {
    return this.sitePermissionService.getAllSiteMembers();
  }

  public dispose(): void {
    this.profileService.dispose();
  }
}
