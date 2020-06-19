import * as React from 'react';
import styles from './KanbanComponent.module.scss';
import { IKanbanTask } from './IKanbanTask';
import { IKanbanBoardTaskSettings } from './IKanbanBoardTaskSettings';
import { IKanbanBoardTaskActions } from './IKanbanBoardTaskActions';
import { IKanbanBoardRenderers } from './IKanbanBoardRenderers';
import { IKanbanBucket } from './IKanbanBucket';
import KanbanBucket from './KanbanBucket';
import KanbanTaskManagedProp from './KanbanTaskManagedProp';

import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IStackStyles, Stack } from 'office-ui-fabric-react/lib/Stack';



import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

export interface IKanbanComponentProps {
    buckets: IKanbanBucket[];
    tasks: IKanbanTask[];
    tasksettings: IKanbanBoardTaskSettings;
    taskactions: IKanbanBoardTaskActions;
    showCommandbar?: boolean;
    renderers?: IKanbanBoardRenderers;
    /*
    showCommandbarNew: boolean;
    allowDialog: boolean;  TODO im mock
    */
}

export interface IKanbanComponentState {
    leavingTaskId?: number | string;
    leavingBucket?: string;
    overBucket?: string;
    openDialog: boolean;
    openTaskId?: number | string;
}

export default class KanbanComponent extends React.Component<IKanbanComponentProps, IKanbanComponentState> {
    private dragelement?: IKanbanTask;
    constructor(props: IKanbanComponentProps) {
        super(props);

        this.state = {
            openDialog: false,
            leavingTaskId: null,
            leavingBucket: null,
            overBucket: null
        };
    }

    public render(): React.ReactElement<IKanbanComponentProps> {
        const { buckets, tasks, tasksettings, taskactions, showCommandbar } = this.props;
        const { openDialog } = this.state;
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
                                openDetails={this.openDialog.bind(this)}
                                onDrop={this.onDrop.bind(this)}
                                onDragLeave={this.onDragLeave.bind(this)}
                                onDragOver={this.onDragOver.bind(this)}
                                onDragStart={this.onDragStart.bind(this)}

                            />);

                        }

                        )}
                </div>
                {openDialog && (this.renderDetails())}
            </div>
        );
    }

    private renderDetails(): JSX.Element {
        debugger;
        const renderer = this.props.renderers && this.props.renderers.taskDetail ? this.props.renderers.taskDetail : this.internalTaskDetailRenderer;
        const tasks = this.props.tasks.filter(t => t.taskId == this.state.openTaskId);

        if (tasks.length == 1) {
            const task = tasks[0];

            return (<Dialog
                minWidth={600}
                hidden={!this.state.openDialog}
                onDismiss={this.closeDialog.bind(this)}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: task.title,
                    subText: ''
                }}
                modalProps={{
                    isBlocking: false,
                    styles: { main: { minWidth: 600 } }
                }}
            >
                {renderer(task)}
            </Dialog>);
        }

        // Error Not found or more than one
        throw "Error Not found or more than one";
        return (<div></div>);

    }

    private internalTaskDetailRenderer(task: IKanbanTask): JSX.Element {
        return (<Stack>
            {/* <Stack horizontal horizontalAlign="stretch">
                <Stack.Item align="auto" styles={rowStyle1}>
                    <span>% Complete</span>
                </Stack.Item>
                <Stack.Item align="stretch" styles={rowStyle2}>
                    <span>{task.bucket}</span>
                </Stack.Item>
            </Stack>
            <KanbanTaskManagedProp name:'person' ...  key={p.name+i} />
        */}
            {task.mamagedProperties && (
                task.mamagedProperties.map((p, i) => {
                    return (
                        <KanbanTaskManagedProp {...p} key={p.name + i} />
                    );
                })
            )}

        </Stack>
        );
    }
    private closeDialog(ev?: React.MouseEvent<HTMLButtonElement>) {
        this.setState({
            openDialog: false,
            openTaskId: undefined
        });
    }
    private openDialog(taskid: number | string) {
        this.setState({
            openDialog: true,
            openTaskId: taskid
        });

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
            const source = this.props.buckets.filter(s => s.bucket == sourcebucket)[0];
            const target = this.props.buckets.filter(s => s.bucket == targetbucket)[0];
            const taskId = event.dataTransfer.getData("taskId");
            if (this.props.taskactions) {
                let allowMove = true;
                if (this.props.taskactions.allowMove) {
                    allowMove = this.props.taskactions.allowMove(taskId,
                        source,
                        target
                    );
                }
                if (allowMove && this.props.taskactions.moved) {
                    this.props.taskactions.moved(taskId, target);
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
