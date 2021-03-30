import { sp } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import { PermissionKind } from "@pnp/sp/security";
import { BaseService } from './base.service';
import { LogHelper, ListTitles } from 'utilities';
import { RoleType } from '@pnp/sp/sharing';
import { _RoleAssignment, _RoleDefinition } from '@pnp/sp/security/types';

export class PermissionService extends BaseService {

    private questionsListTitle = ListTitles.QUESTIONS;
    private questionsAssetsListTitle = ListTitles.QUESTIONS_ASSETS;

    public async canVisitorsAskQuestions(): Promise<boolean> {
        LogHelper.verbose(this.constructor.name, 'canVisitorsAskQuestions', '');
        let canAsk: boolean = false;

        let visitorGroup = await sp.web.associatedVisitorGroup();

        console.log(visitorGroup.Id);

        let roles = await sp.web.lists.getByTitle(this.questionsListTitle).roleAssignments
        .expand('Member', 'RoleDefinitionBindings')
        .get();

        let visitorRole: any = roles.find(r => r.PrincipalId === visitorGroup.Id);

        if(visitorRole) {
          for (let def of visitorRole.RoleDefinitionBindings) {
            if (sp.web.hasPermissions(def.BasePermissions, PermissionKind.AddListItems)) {
                canAsk = true;
            }
          }
        }

        return canAsk;
    }

    public async toggleVisitorCanAskQuestions(): Promise<void> {
        LogHelper.verbose(this.constructor.name, 'toggleVisitorCanAskQuestions', '');

        let canAsk = await this.canVisitorsAskQuestions();
        if (canAsk === true) {
            // reset list to inherit parent permissions for questions
            sp.web.lists.getByTitle(this.questionsListTitle)
                .resetRoleInheritance();

            // reset list to inherit parent permissions for questions assets
            sp.web.lists.getByTitle(this.questionsAssetsListTitle)
            .resetRoleInheritance();
        }
        else {
            let contributorPerms = await sp.web.roleDefinitions
                .getByType(RoleType.Contributor)
                .get();

            let visitorGroupId = (await sp.web.associatedVisitorGroup()).Id;

            if (contributorPerms && visitorGroupId) {
                // break the list inheritance from the parent for questions
                await sp.web.lists.getByTitle(this.questionsListTitle)
                    .breakRoleInheritance(true, true);

                // give the visitor group contribute permissions for questions
                await sp.web.lists.getByTitle(this.questionsListTitle)
                    .roleAssignments
                    .add(visitorGroupId, contributorPerms.Id);

                // break the list inheritance from the parent for questions assets
                await sp.web.lists.getByTitle(this.questionsAssetsListTitle)
                    .breakRoleInheritance(true, true);

                // give the visitor group contribute permissions for questions assets
                await sp.web.lists.getByTitle(this.questionsAssetsListTitle)
                    .roleAssignments
                    .add(visitorGroupId, contributorPerms.Id);
            }
        }

    }


}
