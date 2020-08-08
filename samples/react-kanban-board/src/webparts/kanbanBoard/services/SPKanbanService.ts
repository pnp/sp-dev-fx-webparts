import { ISPKanbanService } from "./ISPKanbanService";
import "@pnp/polyfill-ie11";
import { sp } from '@pnp/sp';
import { IKanbanTask, KanbanTaskMamagedPropertyType } from "../../../kanban";
import * as strings from 'KanbanBoardWebPartStrings';

export default class SPKanbanService implements ISPKanbanService {


    public updateTaskBucketMove(listid: string, taskId: number, bucket: string): Promise<boolean> {
        return sp.web.lists.getById(listid).items.getById(+taskId).update({
            Status: bucket
        }).then(() => { return true; });
    }
    public getAllTasks(listId: string, ): Promise<IKanbanTask[]> {

        const odatafiels: string[] = ['AssignedTo/Id', 'AssignedTo/Title', 'AssignedTo/Name', 'AssignedTo/EMail',
            'ID', 'Title', 'Status', 'Priority', 'PercentComplete', 'Body'
        ];

        return sp.web.lists.getById(listId).items
            .select(odatafiels.join(','))
            .expand('AssignedTo').getAll().then(res => {
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
        return sp.web.lists.getById(listId).fields.getByInternalNameOrTitle("Status").get()
            .then(status => status.Choices.map((val, index) => {
                return val;
            }));
    }


}