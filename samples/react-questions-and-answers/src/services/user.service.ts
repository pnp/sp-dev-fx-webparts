import '@pnp/polyfill-ie11';
import { sp, PermissionKind, ISiteGroupInfo } from '@pnp/sp/presets/all';
import { BaseService } from './base.service';
import { LogHelper, ListTitles, NotificationGroup } from 'utilities';
import { ICurrentUser } from 'models';

export class UserService extends BaseService {

    private currentUser: ICurrentUser;
    private listTitle = ListTitles.QUESTIONS;

    public async getCurrentUser(): Promise<ICurrentUser> {

        if (this.currentUser == null) {
            LogHelper.verbose(this.constructor.name, 'getCurrentUser', 'currentUser is null fetching');

            let result = await sp.web.currentUser
                .select('Id', 'Email', 'LoginName', 'Title', 'IsSiteAdmin', 'Groups/Id,Groups/Title,Groups/LoginName')
                .expand('Groups')
                .get()
                .catch(e => {
                    super.handleHttpError('getCurrentUser', e);
                    throw e;
                });

            if (result) {
                this.currentUser = {
                    id: result.Id,
                    loginName: result.LoginName.toLocaleLowerCase(),
                    email: result.Email,
                    displayName: result.Title,
                    isSiteAdmin: result.IsSiteAdmin,
                    canAddItems: false,
                    canDeleteItems: false,
                    canEditItems: false,
                    canModerateItems: false,
                    canViewItems: false,
                    canManagePermissions: false
                };

                await sp.web.ensureUser(this.currentUser.loginName);
                await this.updatePermissionInfo(this.currentUser);
            }
        }
        else {
            LogHelper.verbose(this.constructor.name, 'getCurrentUser', 'currentUser already retrieved');
        }
        return this.currentUser;
    }

    public async getNotificationGroup() {
        let notificationGroup = await sp.web.siteGroups.getByName(NotificationGroup.NAME)
            .get()
            .catch(e => {
                super.handleHttpError('getNotificationGroup', e);
            });

        return notificationGroup;
    }

    // https://www.ktskumar.com/2016/09/pnp-js-core-create-sharepoint-group/
    public async createNotificationGroup(): Promise<ISiteGroupInfo> {
        let notificationGroup = await this.getNotificationGroup();
        if (!notificationGroup) {
            await sp.web.siteGroups.add({
                Title: NotificationGroup.NAME,
                Description: NotificationGroup.DESCRIPTION,
                OnlyAllowMembersViewMembership: false,
                AllowMembersEditMembership: true
                })
                .catch(e => {
                    super.handleHttpError('createNotificationGroup', e);
                    throw e;
                });
            notificationGroup = await this.getNotificationGroup() as ISiteGroupInfo;
        }

        return notificationGroup;
    }


    public async getNotificationGroupUserEmails(): Promise<string[]> {
        let emails: string[] = [];

        let users = await sp.web.siteGroups.getByName(NotificationGroup.NAME).users
            .get()
            .catch(e => {
                super.handleHttpError('getNotificationGroup', e);
                throw e;
            });

        if(users) {
            for(let user of users) {
                if(user && user.Email) {
                    if(emails.indexOf(user.Email) === -1) {
                        emails.push(user.Email);
                    }
                }
            }
        }
        return emails;
    }

    private async updatePermissionInfo(currentUser: ICurrentUser) {
        let listPerms = await sp.web.lists.getByTitle(this.listTitle)
            .getCurrentUserEffectivePermissions()
            .catch(e => {
                super.handleHttpError('updatePermissionInfo', e);
            });

        if (listPerms) {
            if (sp.web.hasPermissions(listPerms, PermissionKind.ViewListItems)) {
                currentUser.canViewItems = true;
            }

            if (sp.web.hasPermissions(listPerms, PermissionKind.AddListItems)) {
                currentUser.canAddItems = true;
            }

            if (sp.web.hasPermissions(listPerms, PermissionKind.EditListItems)) {
                currentUser.canEditItems = true;
            }

            if (sp.web.hasPermissions(listPerms, PermissionKind.DeleteListItems)) {
                currentUser.canDeleteItems = true;
            }

            if (sp.web.hasPermissions(listPerms, PermissionKind.ApproveItems)) {
                currentUser.canModerateItems = true;
            }

            if (sp.web.hasPermissions(listPerms, PermissionKind.ManagePermissions)) {
                currentUser.canManagePermissions = true;
            }
        }
    }
}
