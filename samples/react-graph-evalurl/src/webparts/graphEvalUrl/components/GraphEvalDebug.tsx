import * as React from 'react';

export interface IGraphEvalDebugState {
    panelText: string;
}

export interface IGraphEvalDebugProps {
    panelText: string;
}

export default class GraphEvalDebug extends React.Component<IGraphEvalDebugProps, IGraphEvalDebugState> {

    constructor(props) {

        super(props);

    }

    public render(): React.ReactElement<void> {

        return (
            <div>
                <label>
                    <strong>Debugging Information</strong>
                </label>
                <pre className="dbgInfo">{this.props.panelText}</pre>
            </div>
        )
    };

}

