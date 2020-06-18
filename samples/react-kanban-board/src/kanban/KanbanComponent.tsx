import * as React from 'react';
import styles from './KanbanComponent.module.scss';
import { IKanbanTask } from './IKanbanTask';
import { IKanbanBoardTaskSettings } from './IKanbanBoardTaskSettings';
import { IKanbanBoardTaskActions } from './IKanbanBoardTaskActions';
import { IKanbanBucket } from './IKanbanBucket';
import KanbanBucket from './KanbanBucket';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

export interface IKanbanComponentProps {
    buckets: IKanbanBucket[];
    tasks: IKanbanTask[];
    tasksettings: IKanbanBoardTaskSettings;
    taskactions: IKanbanBoardTaskActions;
    showCommandbar?: boolean;
    /*
    showCommandbarNew: boolean;
    allowDialog: boolean;  TODO im mock
    */
}

export interface IKanbanComponentState {
    leavingTaskId?: number | string;
    leavingBucket?: string;
    overBucket?: string;
}

export default class KanbanComponent extends React.Component<IKanbanComponentProps, IKanbanComponentState> {
    private dragelement?: IKanbanTask;
    constructor(props: IKanbanComponentProps) {
        super(props);

        this.state = {
            leavingTaskId: null,
            leavingBucket: null,
            overBucket: null
        };
    }

    public render(): React.ReactElement<IKanbanComponentProps> {
        const { buckets, tasks, tasksettings, taskactions, showCommandbar } = this.props;
        const { leavingBucket, leavingTaskId, overBucket } = this.state
        return (
            <div>
                {showCommandbar && <CommandBar
                    items={this.getItems()}

                    farItems={this.getFarItems()}
                    ariaLabel={'Use left and right arrow keys to navigate between commands'}
                />}
                <div className={styles.kanbanBoard}>
                    {

                        buckets.map((b) => {
                            const merge = { ...b, ...this.state }
                            return (<KanbanBucket
                                key={b.bucket}
                                {...merge}
                                buckettasks={tasks.filter((x) => x.bucket == b.bucket)}
                                tasksettings={tasksettings}
                                taskactions={taskactions}
                                openDetails={(x) => alert(x)}
                                onDrop={this.onDrop.bind(this)}
                                onDragLeave={this.onDragLeave.bind(this)}
                                onDragOver={this.onDragOver.bind(this)}
                                onDragStart={this.onDragStart.bind(this)}

                            />)

                        }

                        )}
                </div>
            </div>
        );
    }

    private onDragLeave(event): void {
        console.log('onDragLeave');
        /* if (this.bucketRef.current.classList.contains(styles.dragover)) {
             this.bucketRef.current.classList.remove(styles.dragover)
         }*/

    }

    private onDragStart(event, taskId: string | number, bucket: string): void {
        console.log('onDragStart');
        const taskitem = this.props.tasks.filter(p => p.taskId == taskId);

        if (taskitem.length === 1) {
            event.dataTransfer.setData("taskId", taskId);
            event.dataTransfer.setData("sourcebucket", bucket);
            //set element because event.dataTransfer is empty by DragOver
            console.log('set dragelement');
            this.dragelement = taskitem[0];
            this.setState({
                leavingTaskId: taskId,
                leavingBucket: bucket,
            });
        } else {
            // Error not consitent
        }


    }

    private onDragOver(event, targetbucket: string): void {
        event.preventDefault();
        console.log('onDragOver');
        console.log(event.dataTransfer.getData("sourcebucket"));
        if (this.dragelement.bucket !== targetbucket) {
            /* if (!this.bucketRef.current.classList.contains(styles.dragover)) {
                 this.bucketRef.current.classList.add(styles.dragover)
             }*/
        } else {

        }

    }

    private onDrop(event, targetbucket: string): void {
        console.log(`onDrop sourcebucket ${event.dataTransfer.getData("sourcebucket")} taskid: ${event.dataTransfer.getData("taskId")}`);
        /* if (this.bucketRef.current.classList.contains(styles.dragover)) {
             this.bucketRef.current.classList.remove(styles.dragover)
         }*/
        if (event.dataTransfer.getData("sourcebucket") !== targetbucket) {
            const sourcebucket = event.dataTransfer.getData("sourcebucket");
            const source = this.props.buckets.filter(s=>s.bucket == sourcebucket)[0];
            const target = this.props.buckets.filter(s=>s.bucket == targetbucket)[0];
            const taskId = event.dataTransfer.getData("taskId");
            if(this.props.taskactions) {
                let allowMove= true;
                if(this.props.taskactions.allowMove) {
                    allowMove= this.props.taskactions.allowMove(taskId,
                        source,
                        target
                        );
                }
                if(allowMove && this.props.taskactions.moved) {
                    this.props.taskactions.moved(taskId,target);
                }
            }
        }
        this.dragelement = null;
        this.setState({
            leavingTaskId: null,
            leavingBucket: null,
            overBucket: null,
        });

    }

    private getItems = () => {
        return [
            {
                key: 'newItem',
                name: 'New',
                cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
                iconProps: {
                    iconName: 'Add'
                }
            }]
    }

    private getFarItems = () => {
        return [
            {
                key: 'info',
                name: 'Info',
                ariaLabel: 'Info',
                iconProps: {
                    iconName: 'Info'
                },
                iconOnly: true,
                onClick: () => console.log('Info')
            }
        ];
    };
}
