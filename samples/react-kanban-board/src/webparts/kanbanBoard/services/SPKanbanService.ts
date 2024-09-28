import { ISPKanbanService } from "./ISPKanbanService";

import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/fields';
import { IKanbanTask, KanbanTaskMamagedPropertyType } from "../../../kanban";
import * as strings from 'KanbanBoardWebPartStrings';
import { IFieldInfo } from "@pnp/sp/fields";
import { SPFI } from "@pnp/sp";

interface IFieldChoiceInfo extends IFieldInfo {
    Choices: string[];
}

export default class SPKanbanService implements ISPKanbanService {
    private sp:SPFI;
 constructor(sp:SPFI) {
    this.sp=sp;
 }

    public updateTaskBucketMove(listid: string, taskId: number, bucket: string): Promise<boolean> {
        return this.sp.web.lists.getById(listid).items.getById(+taskId).update({
            Status: bucket
        }).then(() => { return true; });
    }
    public getAllTasks(listId: string, ): Promise<IKanbanTask[]> {

        const odatafiels: string[] = ['AssignedTo/Id', 'AssignedTo/Title', 'AssignedTo/Name', 'AssignedTo/EMail',
            'ID', 'Title', 'Status', 'Priority', 'PercentComplete', 'Body'
        ];

        return this.sp.web.lists.getById(listId).items
            .select(odatafiels.join(','))
            .expand('AssignedTo')().then(res => {
                const tasks: IKanbanTask[] = res.map((x) => {
                    return {
                        taskId: '' + x.ID,
                        title: x.Title,
                        htmlDescription: x.Body,
                        assignedTo: (x.AssignedTo && (x.AssignedTo).length === 1) ?
                            {
                                text: x.AssignedTo[0].Title
                            }
                            : undefined,
                        priority: x.Priority,
                        bucket: x.Status,
                        mamagedProperties: [
                            {
                                name: 'PercentComplete',
                                displayName: strings.PercentComplete,
                                type: KanbanTaskMamagedPropertyType.percent,
                                value: x.PercentComplete
                            }
                        ]

                    };
                });
                return tasks;
            });

    }
    public getBuckets(listId: string, ): Promise<string[]> {
        return this.sp.web.lists.getById(listId).fields.getByInternalNameOrTitle("Status")()
            .then((status: IFieldChoiceInfo) => status.Choices.map((val) => {
                return val;
            }));
    }


}