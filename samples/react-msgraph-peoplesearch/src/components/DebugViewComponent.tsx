import * as React from 'react';
import { Suspense } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/textmate';

export interface IDebugViewProps {

    /**
     * The debug content to display
     */
    content?: string;
}

export interface IDebugViewState {
}

export class DebugViewComponent extends React.Component<IDebugViewProps, IDebugViewState> {
    
    public render() {
        return <Suspense fallback={""}><AceEditor
            width="100%"
            mode="json"
            theme="textmate"
            enableLiveAutocompletion={ true }
            showPrintMargin={ false }
            showGutter= { true }            
            value={ this.props.content }
            highlightActiveLine={ true }
            readOnly={ true }
            editorProps={
                {
                    $blockScrolling: Infinity,
                }
            }					
            name="CodeView"
        /></Suspense> ;
    }
}