import * as React from 'react';
import styles from './KanbanTask.module.scss';
import * as strings from 'KanbanBoardStrings';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import {IKanbanTask} from './IKanbanTask';
import {IKanbanBoardTaskSettings} from './IKanbanBoardTaskSettings';
import {IKanbanBoardTaskActions} from './IKanbanBoardTaskActions';

export interface IKanbanTaskProps extends IKanbanTask,IKanbanBoardTaskSettings,IKanbanBoardTaskActions {
    
    
    openDetails?: (taskId: number | string) => void;
    
}

export interface IKanbanTaskState { }

export default class KanbanTask extends React.Component<IKanbanTaskProps, IKanbanTaskState> {
    constructor(props: IKanbanTaskProps) {
        super(props);
        this.state = {};
    }
    public render(): React.ReactElement<IKanbanTaskProps> {

        const { title, showLabels, showPriority, showAssignedTo, isCompleted } = this.props;
        const showCompleted = !!this.props.toggleCompleted;
        const iconCompleted = { iconName: isCompleted ? 'RadioBtnOn' : 'RadioBtnOff' };
        return (
            <div className={styles.taskcard}
            onDragStart = {(event) => this.onDragStart(event)}
            >
                <div className={styles.titlerow}>
                    {showCompleted && (
                        <IconButton
                            iconProps={iconCompleted}
                            title={isCompleted ? strings.IsCompleted : strings.IsNotCompleted}
                            ariaLabel={isCompleted ? strings.IsCompleted : strings.IsNotCompleted}
                            onClick={this._toggleCompleted.bind(this)}
                        />)
                    }
                    <div className={styles.title}>{title}</div>
                </div>
                <div className={styles.membersAndLabels}>
                    {showAssignedTo && (<div className={styles.assignedto}></div>)}
                    {showLabels && (<div className={styles.labels}></div>)}
                    {showPriority && (<div className={styles.priority}></div>)}
                </div>
            </div>
        );
    }

    private _toggleCompleted(): void {
        if (this.props.toggleCompleted) {
            this.props.toggleCompleted(this.props.taskId);
        }
    }

    private onDragStart(event): void {
        console.log('dragstart on div: ', this.props.taskId);
        event.dataTransfer.setData("taskId", this.props.taskId);
    }
}
