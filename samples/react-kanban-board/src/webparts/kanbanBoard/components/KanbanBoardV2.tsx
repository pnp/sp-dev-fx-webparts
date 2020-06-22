import * as React from 'react';
import styles from './KanbanBoardV2.module.scss';
import * as strings from 'KanbanBoardWebPartStrings';
import { DisplayMode, Guid } from '@microsoft/sp-core-library';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { IKanbanBucket } from '../../../kanban/IKanbanBucket';
import { IKanbanTask, KanbanTaskMamagedPropertyType } from '../../../kanban/IKanbanTask';
import KanbanComponent from '../../../kanban/KanbanComponent';
import { findIndex, clone, isEqual, cloneDeep } from '@microsoft/sp-lodash-subset';
import { sp } from '@pnp/sp';
import { mergeBucketsWithChoices } from './helper';

export interface IKanbanBoardV2Props {
    hideWPTitle: boolean;
    title: string;
    displayMode: DisplayMode;
    updateProperty: (value: string) => void;
    context: WebPartContext;
    listId: string;
    configuredBuckets: IKanbanBucket[]; // need mearge with current readed
    statekey: string; // force refresh ;)
}

export interface IKanbanBoardV2State {
    loading: boolean;
    isConfigured: boolean;
    buckets: IKanbanBucket[];
    tasks: IKanbanTask[];
    errorMessage?: string;

}

export default class KanbanBoardV2 extends React.Component<IKanbanBoardV2Props, IKanbanBoardV2State> {
    private choices: string[] = [];
    constructor(props: IKanbanBoardV2Props) {
        super(props);

        this.state = {
            loading: false,
            isConfigured: false,
            buckets: [],
            tasks: []
        };
    }
    public componentDidMount(): void {
        this._getData();
    }
    public shouldComponentUpdate(nextProps: IKanbanBoardV2Props, nextState: IKanbanBoardV2State): boolean {
        if (!isEqual(this.state, nextState)) { return true; }
        if (!isEqual(this.props, nextProps)) {
            //stateKey
            return true;
        }

        return false;
    }
    public componentDidUpdate(prevProps: IKanbanBoardV2Props) {
        console.log('componentDidUpdate');
        if (this.props.listId !== prevProps.listId) {
            this._getData();
        }
        const currentPropBuckets: IKanbanBucket[] = mergeBucketsWithChoices(this.props.configuredBuckets, this.choices);
        if (!isEqual(this.state.buckets, currentPropBuckets)) {
            this.setState({ buckets: cloneDeep(currentPropBuckets) });
        }
        /*
        const currentbuckets: IKanbanBucket[] = mergeBucketsWithChoices(this.props.configuredBuckets, this.choices);
        console.log(this.props.configuredBuckets);
        console.log(currentbuckets);
        console.log(this.state.buckets);
        if (!isEqual(this.state.buckets, currentbuckets)) {

            this.setState({ buckets: currentbuckets });

        }*/
    }

    public render(): React.ReactElement<IKanbanBoardV2Props> {
        const { buckets, tasks, errorMessage } = this.state;
        const { hideWPTitle, displayMode } = this.props;
        const isConfigured: boolean = this.state.isConfigured;
        const isLoading: boolean = this.state.loading;

        return (
            <div>
                {!hideWPTitle && (<WebPartTitle displayMode={displayMode}
                    title={this.props.title}
                    updateProperty={this.props.updateProperty} />
                )}
                {!isConfigured && !isLoading && (<Placeholder iconName='Edit'
                    iconText='Configure your web part'
                    description='Please configure the web part.'
                    buttonLabel='Configure'
                    hideButton={displayMode === DisplayMode.Read}
                    onConfigure={this._onConfigure} />
                )}
                {isConfigured && isLoading && (
                    <Spinner label="Seriously, still loading..." ariaLive="assertive" labelPosition="top" />
                )}
                {isConfigured && !isLoading && (
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
                            moved: this._moved.bind(this),
                        }}
                        showCommandbar={false}
                    />)
                }
                {!!errorMessage && (<div>{errorMessage}</div>)}
            </div>
        );
    }

    private _onConfigure = () => {
        this.props.context.propertyPane.open();
    }


    private _moved(taskId: string, targetBucket: IKanbanBucket): void {
        const elementsIndex = findIndex(this.state.tasks, element => element.taskId == taskId);
        let newArray = [...this.state.tasks]; // same as Clone
        newArray[elementsIndex].bucket = targetBucket.bucket;
        sp.web.lists.getById(this.props.listId).items.getById(+taskId).update({
            Status: targetBucket.bucket
        }).then(res => {
            console.log("Task updated");
            this.setState({ tasks: newArray });
        }).catch(error=> {
            this.setState({ errorMessage: 'Error Update Task Item' });
        });


    }



    private _getData(): void {
        if (!this.props.listId || this.props.listId.length == 0) {
            this.setState({ isConfigured: false, loading: false });
        } else {
            const listId: string = this.props.listId;
            sp.web.lists.getById(listId).fields.getByInternalNameOrTitle("Status").get()
                .then(status => {

                    this.choices = status.Choices.map((val, index) => {
                        return val;
                    });
                    //matching with existing configured buckets
                    const currentbuckets: IKanbanBucket[] = mergeBucketsWithChoices(this.props.configuredBuckets, this.choices);
                    if (!currentbuckets) {
                        this.setState({ isConfigured: false, loading: false, errorMessage: 'No Buckets found' });
                        return;
                    }
                    const odatafiels: string[] = ['AssignedTo/Id', 'AssignedTo/Title', 'AssignedTo/Name', 'AssignedTo/EMail',
                        'ID', 'Title', 'Status', 'Priority', 'PercentComplete', 'Body'
                    ];

                    sp.web.lists.getById(listId).items
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
                            this.setState({
                                isConfigured: true,
                                loading: false,
                                errorMessage: undefined,
                                buckets: currentbuckets,
                                tasks: tasks
                            });
                        });


                });
            this.setState({ isConfigured: true, loading: true });
        }

    }
}
