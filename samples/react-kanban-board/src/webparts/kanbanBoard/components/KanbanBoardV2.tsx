import * as React from 'react';

import * as strings from 'KanbanBoardWebPartStrings';

import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { findIndex, isEqual, cloneDeep } from '@microsoft/sp-lodash-subset';


import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

import { KanbanComponent, IKanbanBucket, IKanbanTask } from '../../../kanban';

import { mergeBucketsWithChoices } from './helper';
import { ISPKanbanService } from '../services/ISPKanbanService';

import { Spinner } from '@fluentui/react';

export interface IKanbanBoardV2Props {
    hideWPTitle: boolean;
    title: string;
    displayMode: DisplayMode;
    updateProperty: (value: string) => void;
    context: WebPartContext;
    listId: string;
    configuredBuckets: IKanbanBucket[]; // need mearge with current readed
    statekey: string; // force refresh ;)
    dataService: ISPKanbanService;
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
    private dataService: ISPKanbanService;
    constructor(props: IKanbanBoardV2Props) {
        super(props);
        this.dataService = this.props.dataService;
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
    public componentDidUpdate(prevProps: IKanbanBoardV2Props): void {
        if (this.props.listId !== prevProps.listId) {
            this._getData();
        }
        const currentPropBuckets: IKanbanBucket[] = mergeBucketsWithChoices(this.props.configuredBuckets, this.choices);
        if (!isEqual(this.state.buckets, currentPropBuckets)) {
            this.setState({ buckets: cloneDeep(currentPropBuckets) });
        }

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
                    iconText={strings.PlaceholderIconText}
                    description={strings.PlaceholderDescription}
                    buttonLabel={strings.PlaceholderButtonLabel}
                    hideButton={displayMode === DisplayMode.Read}
                    onConfigure={this._onConfigure} />
                )}
                {isConfigured && isLoading && (
                    <Spinner label={strings.SpinnerLabel} ariaLive="assertive" labelPosition="top" />
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

    private _onConfigure = (): void => {
        this.props.context.propertyPane.open();
    }


    private _moved(taskId: string, targetBucket: IKanbanBucket): void {
        const elementsIndex = findIndex(this.state.tasks, element => element.taskId === taskId);
        const newArray = [...this.state.tasks]; // same as Clone
        newArray[elementsIndex].bucket = targetBucket.bucket;
        this.dataService.updateTaskBucketMove(this.props.listId, +taskId, targetBucket.bucket)
            .then(res => {
                this.setState({ tasks: newArray });
            }).catch(error => {
                this.setState({ errorMessage: 'Error Update Task Item' });
            });


    }



    private _getData(): void {
        if (!this.props.listId || this.props.listId.length === 0) {
            this.setState({ isConfigured: false, loading: false });
        } else {
            const listId: string = this.props.listId;
            this.dataService.getBuckets(listId)
                .then((choices) => {
                    this.choices = choices;
                    const currentbuckets: IKanbanBucket[] = mergeBucketsWithChoices(this.props.configuredBuckets, this.choices);
                    if (!currentbuckets) {
                        this.setState({ isConfigured: false, loading: false, errorMessage: 'No Buckets found' });
                        return;
                    }
                    this.dataService.getAllTasks(listId).then((tasks) => {
                        this.setState({
                            isConfigured: true,
                            loading: false,
                            errorMessage: undefined,
                            buckets: currentbuckets,
                            tasks: tasks
                        });
                    }, (reject) => { throw new Error(reject) })
                        .catch(error => { throw new Error('Error loading Tasks') });

                })
                .catch(error => { throw new Error('Error loading Buckets') });
            this.setState({ isConfigured: true, loading: true });
        }

    }
}
