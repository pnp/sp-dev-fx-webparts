import * as React from 'react';
import styles from './KanbanBucket.module.scss';
import { IKanbanBucket } from './IKanbanBucket';
import { IKanbanTask } from './IKanbanTask';
import { IKanbanBoardTaskSettings } from './IKanbanBoardTaskSettings';
import { IKanbanBoardTaskActions } from './IKanbanBoardTaskActions';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { ActionButton } from 'office-ui-fabric-react';
import KanbanTask from './KanbanTask';
import * as strings from 'KanbanBoardStrings';

export interface IKanbanBucketProps extends IKanbanBucket {
    buckettasks: IKanbanTask[];
    tasksettings: IKanbanBoardTaskSettings;
    taskactions: IKanbanBoardTaskActions;

    openDetails?: (taskId: number | string) => void;
}

export interface IKanbanBucketState { }

export default class KanbanBucket extends React.Component<IKanbanBucketProps, IKanbanBucketState> {

    constructor(props: IKanbanBucketProps) {
        super(props);

        this.state = {

        };
    }
    /*
    nice to use a object merge
    ECMAScript 2018 Standard Method
    {...t, ...tasksettings, ...taskactions}
    hope this will be translated 
    */
    public render(): React.ReactElement<IKanbanBucketProps> {
        const { bucketheadline, color, buckettasks, tasksettings, taskactions, percentageComplete, allowAddTask } = this.props;
        return (
            <div className={styles.bucket}
                onDragOver={(event) => this.onDragOver(event)}
                onDrop={this.onDrop.bind(this)}
            >
                <div className={styles.headline}>
                    <span>{bucketheadline}</span>
                    {color && <div style={{ backgroundColor: color }} className={styles.colorindicator}></div>}
                    <ProgressIndicator percentComplete={percentageComplete / 100} />
                </div>
                {allowAddTask && (<ActionButton
                    iconProps={{ iconName: 'Add' }}
                    allowDisabledFocus={true}

                >
                    {strings.AddTask}
                </ActionButton>)}
                {
                    buckettasks.map((t) => {
                        const merge = { ...t, ...tasksettings, ...taskactions };
                        return (
                            <KanbanTask
                                {...merge}
                                openDetails={this.props.openDetails}
                            />
                        );
                    })
                }
            </div >
        );
    }


    private onDragOver(event): void {
        event.preventDefault();
    }

    private onDrop(event): void {
        // this.props.name
        // let taskName = event.dataTransfer.getData("taskName");
        /*
            let tasks = this.state.tasks.filter((task) => {
                if (task.taskName == taskName) {
                    task.type = cat;
                }
                return task;
            });
            
        
            this.setState({
                ...this.state,
                tasks
            });
            */
    }

}
