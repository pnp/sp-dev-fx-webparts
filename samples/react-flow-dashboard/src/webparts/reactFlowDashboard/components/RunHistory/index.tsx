import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react';
import { IReactFlowRunHistoryProps } from './IReactFlowRunHistoryProps';


export default class FlowRunHistoryPanel extends React.Component<IReactFlowRunHistoryProps>{
    constructor(props: IReactFlowRunHistoryProps) {
        super(props);
    }

    public render(): React.ReactElement<IReactFlowRunHistoryProps>{
        const {items, isOpen} = this.props;
        return(
            <Panel
                type={PanelType.medium}
                onDismiss={(ev)=> this.props.onDismiss(ev)}
                isOpen={isOpen}
                headerText="Flow Run History"
                isBlocking={false}
            >
            <div>
              {items.map((i) => (
                <div key={i.runName}>
                  <p>Run ID: {i.runName}</p>
                  <p>Start Time: {i.startTime}</p>
                  <p>End Time: {i.endTime}</p>
                  <p>Status: {i.status}</p>
                  <p>Trigger: {i.triggername}</p>
                  <hr />
                </div>
              ))}
            </div>
          </Panel>
        )
    }

    public _onPanelDismiss(ev:any){
        this.props.onDismiss(ev);
    }
}