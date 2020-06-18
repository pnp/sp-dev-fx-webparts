import * as React from 'react';
import KanbanComponent from './KanbanComponent';
import { IKanbanBucket } from './IKanbanBucket';
import { IKanbanTask } from './IKanbanTask';
import { findIndex } from "lodash";

export interface IMockKanbanProps { }

export interface IMockKanbanState {
    buckets: IKanbanBucket[];
    tasks: IKanbanTask[];
}

export class MockKanban extends React.Component<IMockKanbanProps, IMockKanbanState> {

    constructor(props: IMockKanbanProps) {
        super(props);

        this.state = {
            buckets:[
                {bucket:'Not Started', bucketheadline:'Not Started Head',percentageComplete:0, color:'yellow' ,allowAddTask:true},
                {bucket:'Test1', bucketheadline:'Test1 Head',percentageComplete:10, color:'orange',allowAddTask:true },
                {bucket:'Test2', bucketheadline:'Test2 Head',percentageComplete:50, color:'green' },
                {bucket:'Test3', bucketheadline:'Test3 Head',percentageComplete:50, color:'#FF0000' },
                {bucket:'Test4', bucketheadline:'Test4 Head',percentageComplete:0 ,allowAddTask:true }
            ],
            tasks: [
                {taskId: 1, title:'test1',bucket:'Not Started'},
                {taskId: 2, title:'test2',bucket:'Not Started'},
                {taskId: 3, title:'test3',bucket:'Not Started'},
                {taskId: '4', title:'test 4',bucket:'Test4'},
                {taskId: '5', title:'test 5',bucket:'Test3'},
                    
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
                        showLabels: true,
                        showPriority: true,
                        showAssignedTo: true
                    }
                    }
                    taskactions={{
                        toggleCompleted: this._toggleCompleted.bind(this),
                        allowMove: this._allowMove.bind(this),
                        moved: this._moved.bind(this),
                    }}
                    showCommandbar={true}
                />
            </div>
        );
    }



    private _toggleCompleted(taskId: number | string): void {
//TODO
    }
    private _allowMove(taskId: number | string, prevBucket: IKanbanBucket, targetBucket: IKanbanBucket): boolean {
        if(prevBucket.bucket ==='Test2' && targetBucket.bucket ==='Test3') {
            return false;
        }
        return true;
    }

    private _moved(taskId: number | string, targetBucket: IKanbanBucket): void {
        debugger;
        const elementsIndex = findIndex( this.state.tasks ,element => element.taskId == taskId );
        let newArray = [...this.state.tasks];
        newArray[elementsIndex].bucket = targetBucket.bucket;
        this.setState({tasks:newArray});

    }
}
