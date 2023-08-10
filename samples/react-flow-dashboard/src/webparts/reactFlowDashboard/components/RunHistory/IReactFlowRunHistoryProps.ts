
export interface IFlowRun {
    runName: string;
    startTime: string;
    endTime: string;
    status: string;
    triggername : string;
}

export interface IReactFlowRunHistoryProps {
    items : IFlowRun[];
    isOpen: boolean;
    onDismiss: (e: any) => void; 
}