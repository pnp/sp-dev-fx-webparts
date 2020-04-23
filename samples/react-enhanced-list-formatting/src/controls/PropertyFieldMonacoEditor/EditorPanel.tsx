import * as React from 'react';
import styles from './EditorPanel.module.scss';


import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { DefaultButton, PrimaryButton, IconButton } from 'office-ui-fabric-react/lib/Button';

import { Async } from 'office-ui-fabric-react/lib/Utilities';

import * as strings from 'MonacoControlsLibraryStrings';
import { MonacoEditor } from '../MonacoEditor';

export interface IEditorPanelProps {
  //defaultValue?: string;
  deferredValidationTime?: number;
  disabled?: boolean;
  editorClassName?: string;
  editorHeight?: string;
  errorMessage?: string;
  initialValue?: string;
  label?: string;
  language: string;
  targetProperty: string;
  showIndentGuides?: boolean;
  showLineNumbers?: boolean;
  showMiniMap?: boolean;
  folding?: boolean;
  theme?: string;
  value?: string;
  onClose(): void;
  onSave(value: string): void;
}

export interface IEditorPanelState {
  value: string;
}

export class EditorPanel extends React.Component<IEditorPanelProps, IEditorPanelState> {
  private _async: Async;
  //private _editor: AceEditor;
  private _delayedChange: (value: string) => void;

  /**
   *
   */
  constructor(props: IEditorPanelProps) {
    super(props);

    this.state = {
      value: this.props.value,
    };

    this._async = new Async(this);
    this._delayedChange = this._async.debounce(this._handleOnChanged, this.props.deferredValidationTime ? this.props.deferredValidationTime : 200);
  }

  // public componentDidMount(): void {
  //   if (this.props.customMode !== undefined) {
  //     try {
  //       // execute the custom mode function
  //       this.props.customMode();

  //       // get a reference to ace
  //       const aceThingy: any = this._editor as any;

  //       // get a reference to brace
  //       var ace = require('brace') as any;

  //       // set the mode to custom
  //       var editor = ace.edit(aceThingy.editor);
  //       editor.session.setMode(`ace/mode/custom`);
  //     } catch (error) {
  //       console.log("Error with refs", error);
  //     }
  //   }
  // }

  public render(): React.ReactElement<IEditorPanelProps> {
    return (
      <Panel
        isOpen={true}
        onDismiss={() => this._handleClose()}
        type={PanelType.large}
        headerText={this.props.label}
        onRenderFooterContent={() => (
          <div className={styles.actionButtonsContainer}>
            <div className={styles.actionButtons}>
              <PrimaryButton
                onClick={() => this._handleSave()} className={styles.actionButton}>{strings.SaveButtonLabel}</PrimaryButton>
              <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
            </div>
          </div>
        )}>
        <MonacoEditor
          value={this.props.value}
          theme={this.props.theme}
          readOnly={this.props.disabled}
          language={this.props.language}
          onValueChange={(editorString: string) => {
            this._delayedChange(editorString);
          }}
          showLineNumbers={this.props.showLineNumbers !== undefined ? this.props.showLineNumbers : false}
          showMiniMap={this.props.showMiniMap !== undefined ? this.props.showMiniMap : false}
          showIndentGuides={this.props.showIndentGuides !== undefined ? this.props.showIndentGuides : false}
          folding={this.props.folding !== undefined ? this.props.folding : false}
        />
      </Panel>
    );
  }

  private _handleSave = () => {
    this.props.onSave(this.state.value);
  }

  private _handleClose = () => {
    this.props.onClose();
  }

  /**
  * On field change event handler
  */
  private _handleOnChanged = (value: string): void => {
    // Update state
    this.setState({
      value
    });
  }
}
