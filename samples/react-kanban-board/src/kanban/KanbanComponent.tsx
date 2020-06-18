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

export interface IKanbanComponentState { }

export default class KanbanComponent extends React.Component<IKanbanComponentProps, IKanbanComponentState> {

    constructor(props: IKanbanComponentProps) {
        super(props);

        this.state = {

        };
    }

    public render(): React.ReactElement<IKanbanComponentProps> {
        const { buckets, tasks, tasksettings, taskactions, showCommandbar } = this.props;
        return (
            <div>
                {showCommandbar && <CommandBar
                    items={this.getItems()}

                    farItems={this.getFarItems()}
                    ariaLabel={'Use left and right arrow keys to navigate between commands'}
                />}
                <div className={styles.kanbanBoard}>
                    {buckets.map((b) =>
                        (<KanbanBucket
                            {...b}
                            buckettasks={tasks.filter((x) => x.bucket == b.bucket)}
                            tasksettings={tasksettings}
                            taskactions={taskactions}
                            openDetails={(x) => alert(x)}
                        />)

                    )}
                </div>
            </div>
        );
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
