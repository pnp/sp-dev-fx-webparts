import { sp, PermissionKind, RoleType } from '@pnp/sp/presets/all';
import { BaseService } from './base.service';
import { LogHelper, ListTitles } from 'utilities';

export class PermissionService extends BaseService {

    private listTitle = ListTitles.QUESTIONS;

    public async canVisitorsAskQuestions(): Promise<boolean> {
        LogHelper.verbose(this.constructor.name, 'canVisitorsAskQuestions', '');
        let canAsk: boolean = false;

        debugger;

        let visitorGroup = await sp.web.associatedVisitorGroup();
        let perms = await sp.web.lists.getByTitle(this.listTitle).getUserEffectivePermissions(visitorGroup.LoginName);
        if(sp.web.hasPermissions(perms, PermissionKind.AddListItems)) {
          canAsk = true;
        }

        return canAsk;
    }

    public async toggleVisitorCanAskQuestions(): Promise<void> {
        LogHelper.verbose(this.constructor.name, 'toggleVisitorCanAskQuestions', '');

        let canAsk = await this.canVisitorsAskQuestions();
        if (canAsk === true) {
            // reset list to inherit parent permissions
            sp.web.lists.getByTitle(this.listTitle)
                .resetRoleInheritance();
        }
        else {
            let contributorPerms = await sp.web.roleDefinitions
                .getByType(RoleType.Contributor)
                .get();

            let visitorGroupId = (await sp.web.associatedVisitorGroup()).Id;

            if (contributorPerms && visitorGroupId) {
                // break the list inheritance from the parent
                await sp.web.lists.getByTitle(this.listTitle)
                    .breakRoleInheritance(true, true);

                // give the visitor group contribute permissions
                await sp.web.lists.getByTitle(this.listTitle)
                    .roleAssignments
                    .add(visitorGroupId, contributorPerms.Id);
            }
        }

    }


}
