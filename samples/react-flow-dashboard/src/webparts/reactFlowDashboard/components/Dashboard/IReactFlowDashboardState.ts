import { IColumn,IGroup } from '@fluentui/react';
import {MessageBarType } from '@fluentui/react';
import { Items } from './IReactFlowDashboardProps';
import { IFlow } from './IReactFlowDashboardProps';
import { IFlowRun } from '../RunHistory/IReactFlowRunHistoryProps';
export interface IReactFlowDashboardState{
    flowItems : Items[];
    columns: IColumn[];
    isLoaded : boolean;
    groups : IGroup[];
    flowEnabled? : boolean;
    flowEnabledMessage ? : string;
    flowEnabledMessageBarType? : MessageBarType;
    showFlowEnabledMessage ? : boolean;
    isSynced ? : boolean;
    syncedTime? :string;
    runhistoryItems? : IFlow[];
    flowrunItems? : IFlowRun[];
    openPanel : boolean;
}
