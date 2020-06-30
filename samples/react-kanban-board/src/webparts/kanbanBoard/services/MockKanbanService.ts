import { ISPKanbanService } from "./ISPKanbanService";
import "@pnp/polyfill-ie11";
import { sp } from '@pnp/sp';
import { IKanbanTask, KanbanTaskMamagedPropertyType } from "../../../kanban";
import * as strings from 'KanbanBoardWebPartStrings';

export default class MockKanbanService implements ISPKanbanService {


    public updateTaskBucketMove(listid: string, taskId: number, bucket: string): Promise<boolean> {
        return new Promise((resolve) => { 
            setTimeout(() => resolve(true), 1000);
        });
            
    
    }
    public getAllTasks(listId: string): Promise < IKanbanTask[] > {
        const data=[1,2,3,4];

        const tasks: IKanbanTask[] = data.map((x) => {
            return {
                taskId: 'tid' + x,
                title: 'Title'+x,
                htmlDescription: '<p>Body <b>Bold</b></p>',
                assignedTo: 
                    {
                        text: 'Person '+x
                    },
                priority: 'Prio'+x,
                bucket: 'Status'+x,
                mamagedProperties: [
                    {
                        name: 'PercentComplete',
                        displayName: strings.PercentComplete,
                        type: KanbanTaskMamagedPropertyType.percent,
                        value: x/10 /* 10/20 30 .. percent */
                    }
                ]

            };
        });

        return new Promise((resolve) => { 
            setTimeout(() => resolve(tasks), 1000);
        });
    }

    public getBuckets(listId: string): Promise < string[] > {
    return new Promise((resolve) => { 
            setTimeout(() => resolve([
                'Status1',
                'Status2',
                'Status3',
                'Status4',
                'Status5',
            ]), 1000);
        });
}


}