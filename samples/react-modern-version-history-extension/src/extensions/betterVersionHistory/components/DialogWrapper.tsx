import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog } from '@microsoft/sp-dialog';

export default class DialogWrapper<T> extends BaseDialog {
    private element: React.FunctionComponentElement<T> = null;

    constructor(element: React.FunctionComponentElement<T>) {
        super({ isBlocking: false });
        this.element = element;
    }

    public render(): void {
        ReactDOM.render(this.element, this.domElement);
    }

    protected onAfterClose(): void {
        super.onAfterClose();
    
        // Clean up the element for the next dialog
        ReactDOM.unmountComponentAtNode(this.domElement);
      }

}
