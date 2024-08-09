import * as React from 'react';
import {KanbanComponent} from './KanbanComponent';
import {KanbanBucketConfigurator} from './KanbanBucketConfigurator';
import { IKanbanBucket } from './IKanbanBucket';
import { IKanbanTask, KanbanTaskMamagedPropertyType } from './IKanbanTask';
import { findIndex } from "lodash";
import { cloneDeep, clone } from '@microsoft/sp-lodash-subset';

export interface IMockKanbanProps { }

export interface IMockKanbanState {
    buckets: IKanbanBucket[];
    tasks: IKanbanTask[];
}

export class MockKanban extends React.Component<IMockKanbanProps, IMockKanbanState> {

    constructor(props: IMockKanbanProps) {
        super(props);

        this.state = {
            buckets: [
                { bucket: 'Not Started', bucketheadline: 'Not Started Head', percentageComplete: 0, color: 'yellow', allowAddTask: true },
                { bucket: 'Test1', bucketheadline: 'Test1 Head', percentageComplete: 10, color: 'orange', allowAddTask: true },
                { bucket: 'Test2', bucketheadline: 'Test2 Head', percentageComplete: 50, color: 'green' },
                { bucket: 'Test3', bucketheadline: 'Test3 Head', percentageComplete: 50, color: '#FF0000' },
                { bucket: 'Test4', bucketheadline: 'Test4 Head', percentageComplete: 0, allowAddTask: true }
            ],
            tasks: [
                {
                    taskId: '1', title: 'test1', bucket: 'Not Started',
                    mamagedProperties: [
                        {
                            name: 'Prop1',
                            displayName: 'Prop1 Display',
                            type: KanbanTaskMamagedPropertyType.html,
                            value: '<p>test<b>Bold</b></p>'

                        },

                        {
                            name: 'Prop2',
                            displayName: 'Prop2 Display',
                            type: KanbanTaskMamagedPropertyType.complex,
                            value: '<p>test<b>Bold</b></p>',
                            renderer: (name, value, type) => { return (<span>SampleRenderer</span>); }
                        },
                        {
                            name: 'Prop3',
                            displayName: 'String',
                            type: KanbanTaskMamagedPropertyType.string,
                            value: 'Hallo World'

                        }
                    ]
                },
                { taskId: '2', title: 'test2', bucket: 'Not Started' },
                { taskId: '3', title: 'test3', bucket: 'Not Started' },
                { taskId: '4', title: 'test 4', bucket: 'Test4' },
                { taskId: '5', title: 'test 5', bucket: 'Test3' },

            ]
        };
    }

    public render(): React.ReactElement<IMockKanbanProps> {
        const { buckets, tasks } = this.state;
        return (
            <div>
                <KanbanComponent
                    buckets={buckets}
                    tasks={tasks}
                    tasksettings={{
                        showPriority: true,
                        showAssignedTo: true,
                        showTaskDetailsButton: true
                    }
                    }
                    taskactions={{
                        toggleCompleted: this._toggleCompleted.bind(this),
                        allowMove: this._allowMove.bind(this),
                        moved: this._moved.bind(this),
                    }}
                    showCommandbar={true}
                />
                <div>
                    <h2>
                        Bucket Configuration sample
                    </h2>
                    {
                        this.state.buckets.map((b, i) =>
                            <KanbanBucketConfigurator
                                key={'BucketConfig' + i}
                                index={i}
                                bucket={b}
                                update={this.updateBucket.bind(this)}
                            />
                        )
                    }
                </div>
            </div>
        );
    }

    private updateBucket(index: number, value: IKanbanBucket):void {
        const cstate = cloneDeep(this.state);
        cstate.buckets[index] = clone(value);
        this.setState(cstate);
    }

    private _toggleCompleted(taskId: string): void {
        //TODO
    }
    private _allowMove(taskId: string, prevBucket: IKanbanBucket, targetBucket: IKanbanBucket): boolean {
        if (prevBucket.bucket === 'Test2' && targetBucket.bucket === 'Test3') {
            return false;
        }
        return true;
    }

    private _moved(taskId: string, targetBucket: IKanbanBucket): void {
        const elementsIndex = findIndex(this.state.tasks, element => element.taskId === taskId);
        const newArray = [...this.state.tasks];
        newArray[elementsIndex].bucket = targetBucket.bucket;
        this.setState({ tasks: newArray });

    }
}
