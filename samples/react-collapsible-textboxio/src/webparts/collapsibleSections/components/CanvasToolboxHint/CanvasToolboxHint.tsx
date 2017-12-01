import * as React from 'react';
import ICanvasToolboxHintProps from "./ICanvasToolboxHintProps";

class CanvasToolboxHint extends React.Component<ICanvasToolboxHintProps, null> {

    private _refCanvas: HTMLElement;

    public render(): React.ReactElement<CanvasToolboxHint> {

        let renderCanvasHint: JSX.Element = null;

        if (this.props.visible) {
            renderCanvasHint =  <button ref={ (elt)=> { this._refCanvas = elt; }}
                                    onClick={(e) => { 
                                        this._refCanvas.blur();
                                        this.props.onClick(e);
                                    }} 
                                    className="CanvasToolboxHint"
                                    data-automation-id="toolboxHintButton" data-sp-a11y-class="ToolboxHint"
                                    title="Add a new collapsible section">
                                    <div className="CanvasToolboxHint-plusButtonWrapperOriginal">
                                        <div className="CanvasToolboxHint-plusButtonOriginal">
                                            <i role="presentation" aria-hidden="true" data-icon-name="Add" className="ms-Icon css-liugll ms-Icon--Add">
                                            </i>
                                        </div>
                                    </div>
                                </button>;         
        }

        return renderCanvasHint;
    }
}


export default CanvasToolboxHint;