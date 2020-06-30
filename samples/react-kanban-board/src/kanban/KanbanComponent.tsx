import * as React from 'react';
import styles from './KanbanComponent.module.scss';
import bucketstyles from './KanbanBucket.module.scss';
import * as strings from 'KanbanBoardStrings';

import { IKanbanTask, KanbanTaskMamagedPropertyType } from './IKanbanTask';
import { IKanbanBoardTaskSettings } from './IKanbanBoardTaskSettings';
import { IKanbanBoardTaskActions } from './IKanbanBoardTaskActions';
import { IKanbanBoardRenderers } from './IKanbanBoardRenderers';
import { IKanbanBucket } from './IKanbanBucket';
import KanbanBucket from './KanbanBucket';
import KanbanTaskManagedProp from './KanbanTaskManagedProp';

import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IStackStyles, Stack } from 'office-ui-fabric-react/lib/Stack';
import { clone } from '@microsoft/sp-lodash-subset';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

import { TooltipHost, findIndex } from 'office-ui-fabric-react';

export interface IKanbanComponentProps {
    buckets: IKanbanBucket[];
    tasks: IKanbanTask[];
    tasksettings: IKanbanBoardTaskSettings;
    taskactions: IKanbanBoardTaskActions;
    showCommandbar?: boolean;
    renderers?: IKanbanBoardRenderers;
    allowEdit?: boolean;
    allowAdd?: boolean;
    editSchema?: boolean;
    /*
    showCommandbarNew: boolean;
    allowDialog: boolean;  TODO im mock
    */
}

export interface IKanbanComponentState {
    leavingTaskId?: string;
    leavingBucket?: string;
    openDialog: boolean;
    openTaskId?: string;
    dialogState?: DialogState;
    editTask?: IKanbanTask;
    addBucket?: IKanbanBucket;
}

export enum DialogState {
    New = 1,
    Edit = 2,
    Display = 3
}

export class KanbanComponent extends React.Component<IKanbanComponentProps, IKanbanComponentState> {
    private dragelement?: IKanbanTask;
    private bucketsref: any[];
    constructor(props: IKanbanComponentProps) {
        super(props);

        this.state = {
            openDialog: false,
            leavingTaskId: null,
            leavingBucket: null,

        };
        this.bucketsref = [];
       
        }
  
    public render(): React.ReactElement<IKanbanComponentProps> {
        const { buckets, tasks, tasksettings, taskactions, showCommandbar } = this.props;
        const { openDialog } = this.state;
        const bucketwidth: number = buckets.length > 0 ? 100 / buckets.length : 100;
        const { leavingBucket, leavingTaskId } = this.state;
const hasprocessIndicator = buckets.filter((b)=> b.showPercentageHeadline).length >0;
        
        return (
            <div style={{ overflowX: 'auto' }}>
                {showCommandbar && <CommandBar
                    items={this.getItems()}

                    farItems={this.getFarItems()}
                    ariaLabel={'Use left and right arrow keys to navigate between commands'}
                />}
                <div className={styles.kanbanBoard}>
                    {

                        buckets.map((b, i) => {
                            const merge = { ...b, ...this.state };
                            return (<div
                            
                                style={{ 
                                    flexBasis: bucketwidth ? bucketwidth + '%' : '100%' ,
                                    maxWidth: bucketwidth ? bucketwidth + '%' : '100%'
                                }}
                                
                                className={styles.bucketwrapper}
                                ref={bucketContent => this.bucketsref[i] = bucketContent}
                                key={'BucketWrapper' + b.bucket + i}
                                onDragOver={(event) => this.onDragOver(event, b.bucket)}
                                onDragLeave={(event) => this.onDragLeave(event, b.bucket)}
                                onDrop={(event) => this.onDrop(event, b.bucket)}
                            >
                                <KanbanBucket
                                    key={b.bucket}
                                    {...merge}
                                    hasOneProcessIndicator={hasprocessIndicator}
                                    buckettasks={tasks.filter((x) => x.bucket == b.bucket)}
                                    tasksettings={tasksettings}

                                    toggleCompleted={this.props.taskactions && this.props.taskactions.toggleCompleted ? this.props.taskactions.toggleCompleted : undefined}

                                    addTask={this.internalAddTask.bind(this)}
                                    openDetails={this.internalOpenDialog.bind(this)}


                                    onDragStart={this.onDragStart.bind(this)}
                                    onDragEnd={this.onDragEnd.bind(this)}
                                />
                            </div>);

                        }

                        )}
                </div>
                {openDialog && (this.renderDialog())}
            </div>
        );
    }
    private getTaskByID(taskId: string): IKanbanTask {
        const tasks = this.props.tasks.filter(t => t.taskId == this.state.openTaskId);
        if (tasks.length == 1) {
            return tasks[0];
        }
        throw "Error Taks not found by taskId";
    }

    private renderDialog(): JSX.Element {
        let renderer: (task?: IKanbanTask, bucket?: IKanbanBucket) => JSX.Element = () => (<div>Dialog Renderer Not Set</div>);
        let task: IKanbanTask = undefined;
        let bucket: IKanbanBucket = undefined;
        let dialogheadline: string = '';
        switch (this.state.dialogState) {
            case DialogState.Edit:
                task = this.getTaskByID(this.state.openTaskId);
                renderer = this.internalTaskEditRenderer.bind(this);
                dialogheadline = strings.EditTaskDlgHeadline;
                break;
            case DialogState.New:
                renderer = this.internalTaskAddRenderer.bind(this);
                dialogheadline = strings.AddTaskDlgHeadline;
                break;
            default:
                task = this.getTaskByID(this.state.openTaskId);
                dialogheadline = task.title;
                renderer = (this.props.renderers && this.props.renderers.taskDetail) ? this.props.renderers.taskDetail : this.internalTaskDetailRenderer.bind(this);

                break;
        }

        return (<Dialog
            minWidth={600}
            hidden={!this.state.openDialog}
            onDismiss={this.internalCloseDialog.bind(this)}
            dialogContentProps={{
                type: DialogType.largeHeader,
                title: dialogheadline,
                subText: ''
            }}
            modalProps={{
                isBlocking: false,
                styles: { main: { minWidth: 600 } }
            }}
        >
            {renderer(task, bucket)}

            <DialogFooter>
                {(this.props.allowEdit && this.state.dialogState === DialogState.Display) &&
                    (<PrimaryButton onClick={this.clickEditTask.bind(this)} text={strings.EditTaskBtn} />)}
                {(this.props.allowEdit && this.state.dialogState === DialogState.Edit) &&
                    (<PrimaryButton onClick={this.saveEditTask.bind(this)} text={strings.SaveTaskBtn} />)}
                {(this.props.allowAdd && this.state.dialogState === DialogState.New) &&
                    (<PrimaryButton onClick={this.saveAddTask.bind(this)} text={strings.SaveAddTaskBtn} />)}
                <DefaultButton onClick={this.internalCloseDialog.bind(this)} text={strings.CloseTaskDialog} />
            </DialogFooter>

        </Dialog>);
    }

    private clickEditTask(): void {
        const task = this.getTaskByID(this.state.openTaskId);
        if (this.props.taskactions.taskEdit) {

            this.internalCloseDialog();
            this.props.taskactions.taskEdit(clone(task));
        } else {
            this.setState({
                dialogState: DialogState.Edit,
                editTask: clone(task)
            });
        }
    }
    private saveEditTask() {
        if (this.props.taskactions.editTaskSaved) {
            const edittask = clone(this.state.editTask);
            //check fist state and than event or in the other way
            this.internalCloseDialog();
            this.props.taskactions.editTaskSaved(edittask);
        } else {
            throw "allowEdit is Set but no handler is set";
        }
    }
    private saveAddTask() {

        if (this.props.taskactions.editTaskSaved) {
            const edittask = clone(this.state.editTask);
            //check fist state and than event or in the other way
            this.internalCloseDialog();
            this.props.taskactions.editTaskSaved(edittask);
        } else {
            throw "allowAdd is Set but no handler is set";
        }
    }



    private internalTaskDetailRenderer(task: IKanbanTask): JSX.Element {
        const { tasksettings } = this.props;
        return (<Stack>
            {tasksettings && tasksettings.showPriority && (
                <KanbanTaskManagedProp
                    name="assignedTo"
                    displayName={strings.Priority}
                    type={KanbanTaskMamagedPropertyType.string}
                    value={task.priority}
                    key={'assignedToProp'} />
            )}
            {tasksettings && tasksettings.showAssignedTo && (<KanbanTaskManagedProp
                name="assignedTo"
                displayName={strings.AssignedTo}
                type={KanbanTaskMamagedPropertyType.person}
                value={task.assignedTo}
                key={'assignedToProp'} />
            )}
            <KanbanTaskManagedProp
                name="assignedTo"
                displayName={strings.HtmlDescription}
                type={KanbanTaskMamagedPropertyType.html}
                value={task.htmlDescription}
                key={'htmlDescriptionProp'} />

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


    private internalTaskEditRenderer(task: IKanbanTask): JSX.Element {
        const schema = this.props.editSchema; //TODO
        return (<div>Edit</div>);
    }
    private internalTaskAddRenderer(task?: IKanbanTask, bucket?: IKanbanBucket): JSX.Element {
        const schema = this.props.editSchema; //TODO
        return (<div>New</div>);
    }

    private internalCloseDialog(ev?: React.MouseEvent<HTMLButtonElement>) {
        this.setState({
            openDialog: false,
            openTaskId: undefined,
            dialogState: undefined,
            editTask: undefined,
            addBucket: undefined
        });
    }
    private internalOpenDialog(taskid: string) {
        this.setState({
            openDialog: true,
            openTaskId: taskid,
            dialogState: DialogState.Display
        });
    }
    private internalAddTask(targetbucket?: string) {
        let bucket: IKanbanBucket = undefined;
        if (bucket) {
            const buckets = this.props.buckets.filter((p) => p.bucket === targetbucket);
            if (buckets.length === 1) {
                bucket = clone(buckets[0]);
            } else {
                throw "Bucket not Found in addDialog";

            }
        }
        if (this.props.taskactions && this.props.taskactions.taskAdd) {
            this.props.taskactions.taskAdd(bucket);
        } else {
            this.setState({
                openDialog: true,
                openTaskId: '',
                dialogState: DialogState.New,
                addBucket: bucket
            });
        }
    }

    private onDragLeave(event, bucket): void {
        const index = findIndex(this.props.buckets, element => element.bucket == bucket);
        if (index != -1 && this.bucketsref.length > index) {

            //&& this.bucketsref[index].classList.contains(styles.dragover)) {
            this.bucketsref[index].classList.remove(styles.dragover);
        }

    }

    private onDragEnd(event): void {

        this.dragelement = undefined;
        this.setState({
            leavingTaskId: null,
            leavingBucket: null,

        });
    }

    private onDragStart(event, taskId: string, bucket: string): void {
        const taskitem = this.props.tasks.filter(p => p.taskId === taskId);
        if (taskitem.length === 1) {
            event.dataTransfer.setData("text", taskId);
            event.dataTransfer.effectAllowed = 'copy';
            //event.dataTransfer.setData("sourcebucket", bucket);
            //set element because event.dataTransfer is empty by DragOver
            this.dragelement = taskitem[0];
            this.setState({
                leavingTaskId: taskId,
                leavingBucket: bucket,
            });
        } else {
            // Error not consitent
            throw "TaskItem not found on DragStart";

        }


    }

    private onDragOver(event, targetbucket: string): void {
        event.preventDefault();

        if (this.dragelement.bucket !== targetbucket) {
            const index = findIndex(this.props.buckets, element => element.bucket == targetbucket);
            if (index > -1 && this.bucketsref.length > index) {
                //&& this.bucketsref[index].classList.contains(styles.dragover)) {
                this.bucketsref[index].classList.add(styles.dragover);
            }
        }

    }

    private onDrop(event, targetbucket: string): void {
        if (this.bucketsref && this.bucketsref.length > 0) {
            this.bucketsref.forEach(x => { x.classList.remove(styles.dragover); });
        }
        if (this.dragelement.bucket !== targetbucket) {
            //event.dataTransfer.getData("text");
            const taskId = this.dragelement.taskId;
            const source = this.props.buckets.filter(s => s.bucket == this.dragelement.bucket)[0];
            const target = this.props.buckets.filter(s => s.bucket == targetbucket)[0];

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

        });

    }

  

    private getItems = () => {
        if (this.props.allowAdd) {
            return [
                {
                    key: 'newItem',
                    name: 'New',
                    cacheKey: 'myAddBtnKey',
                    iconProps: {
                        iconName: 'Add'
                    },
                    onClick: () => this.internalAddTask.bind(this)
                }];
        }
        return [];

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
    }
}
