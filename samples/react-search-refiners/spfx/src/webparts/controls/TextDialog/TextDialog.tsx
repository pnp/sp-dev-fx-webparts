import * as React                               from 'react';
import { Dialog, DialogType, DialogFooter } 	from 'office-ui-fabric-react/lib/Dialog';
import { Button, ButtonType } 			        from 'office-ui-fabric-react/lib/Button';
import { ITextDialogProps }                  	from './ITextDialogProps';
import { ITextDialogState }                  	from './ITextDialogState';
import AceEditor 								from 'react-ace';
import styles                                   from './TextDialog.module.scss';
import './AceEditor.module.scss';

import 'brace';
import 'brace/mode/html';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';
import { Link } from 'office-ui-fabric-react';

export default class TextDialog extends React.Component<ITextDialogProps, ITextDialogState> {

    /*************************************************************************************
     * Component's constructor
     * @param props 
     * @param state 
     *************************************************************************************/
    constructor(props: ITextDialogProps, state: ITextDialogState) {
        super(props);
		this.state = { dialogText: this.props.dialogTextFieldValue, showDialog: false };
    }


	/*************************************************************************************
	 * Shows the dialog
	 *************************************************************************************/
	private showDialog() {
		this.setState({ dialogText: this.state.dialogText, showDialog: true });
	}


	/*************************************************************************************
	 * Notifies the parent with the dialog's latest value, then closes the dialog
	 *************************************************************************************/
	private saveDialog() {
		this.setState({ dialogText: this.state.dialogText, showDialog: false });

		if(this.props.onChanged) {
			this.props.onChanged(this.state.dialogText);
		}
	}


	/*************************************************************************************
	 * Closes the dialog without notifying the parent for any changes
	 *************************************************************************************/
	private cancelDialog() {
		this.setState({ dialogText: this.state.dialogText, showDialog: false });
	}


	/*************************************************************************************
	 * Updates the dialog's value each time the textfield changes
	 *************************************************************************************/
	private onDialogTextChanged(newValue: string) {
		this.setState({ dialogText: newValue, showDialog: this.state.showDialog });
	}


	/*************************************************************************************
     * Called immediately after updating occurs
     *************************************************************************************/
    public componentDidUpdate(prevProps: ITextDialogProps, prevState: ITextDialogState): void {
        if (this.props.disabled !== prevProps.disabled || this.props.stateKey !== prevProps.stateKey) {
            this.setState({ dialogText: this.props.dialogTextFieldValue, showDialog: this.state.showDialog });
        }
    }


    /*************************************************************************************
     * Renders the the TextDialog component
     *************************************************************************************/
    public render() {
        return (
            <div>		
				<Link label={ this.props.strings.dialogButtonLabel } 
						onClick={ this.showDialog.bind(this) }
						disabled={ this.props.disabled }>
						{ this.props.strings.dialogButtonText }
				</Link>

				<Dialog type={ DialogType.normal }
						isOpen={ this.state.showDialog }
						onDismiss={ this.cancelDialog.bind(this) }
						title={ this.props.strings.dialogTitle }
						subText={ this.props.strings.dialogSubText }
						isBlocking={ true }
						modalProps={
							{
								containerClassName: 'ms-dialogMainOverride ' + styles.textDialog,
							}
						}>
				
					<AceEditor
						width="600px"
						mode={ this.props.language ? this.props.language: 'html' }
						theme="monokai"
						enableLiveAutocompletion={ true }
						showPrintMargin={ false }
						showGutter= { true }
						onChange={ this.onDialogTextChanged.bind(this) }
						value={ this.state.dialogText }
						name="CodeEditor"
						/>

					<DialogFooter>
						<Button buttonType={ ButtonType.primary } onClick={ this.saveDialog.bind(this) }>{ this.props.strings.saveButtonText }</Button>
						<Button onClick={ this.cancelDialog.bind(this) }>{ this.props.strings.cancelButtonText }</Button>
					</DialogFooter>
				</Dialog>
            </div>
        );
    }
}
