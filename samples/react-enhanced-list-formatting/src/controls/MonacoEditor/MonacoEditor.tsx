import * as React from 'react';

import { css } from "@uifabric/utilities/lib/css";
import styles from './MonacoEditor.module.scss';
import { IMonacoEditorProps } from './IMonacoEditorProps';

const monaco = require('../MonacoCustomBuild') as any;



export class MonacoEditor extends React.Component<IMonacoEditorProps, {}> {

  private _container: HTMLElement;
  private _editor: any;

  public componentDidMount(): void {
    this.createEditor();
  }

  private createEditor() {
    if (this._editor) {
      this._editor.dispose();
    }

    //Create the editor
    this._editor = monaco.editor.create(this._container, {
      value: this.props.value,
      scrollBeyondLastLine: false,
      theme: this.props.theme,
	    language: this.props.language,
      folding: this.props.folding,
      renderIndentGuides: this.props.showIndentGuides,
      readOnly: this.props.readOnly,
      lineNumbers: this.props.showLineNumbers,
      lineNumbersMinChars: 4,
      minimap: {
        enabled: this.props.showMiniMap
      }
    });

    //Subscribe to changes
    this._editor.onDidChangeModelContent((e:any)=>this.onDidChangeModelContent(e));
    this._editor.onDidBlurEditorText((e:any)=>this.onDidBlurEditorText(e));
    this._editor.layout();
    //KLUDGE: The Monaco editor does not draw if layout is called too early
    //introduce a slight delay to make sure it is ready
    setTimeout(() => {
      this._editor.layout();
    }, 100);

  }

  public componentDidUpdate(prevProps: IMonacoEditorProps) {
    if (this.props.value !== prevProps.value) {
      console.log("Editor value changed", this.props.value);
      if (this._editor) {
        this._editor.setValue(this.props.value);
      }
    }
    if (this.props.theme !== prevProps.theme) {
      console.log("Editor theme changed", this.props.theme);
      monaco.editor.setTheme(this.props.theme);
    }
    if (this.props.showLineNumbers != prevProps.showLineNumbers ||
      this.props.showMiniMap != prevProps.showMiniMap ||
      this.props.showIndentGuides != prevProps.showIndentGuides ||
      this.props.folding != prevProps.folding ) {
        console.log("Editor various settings changed");
      this.createEditor();
    }
    if (this._editor) {
      console.log("Calling layout", this.props.theme);
      this._editor.layout();
    }
  }

  public componentWillUnmount(): void {
    if (this._editor) {
      this._editor.dispose();
    }
  }

  public render(): React.ReactElement<IMonacoEditorProps> {
    return (
      <div ref={(container) => this._container = container!} className={css(styles.codeEditor, this.props.className)} />
    );
  }

  private onDidBlurEditorText(e: any): void {
    if (this.props.onDidBlurEditorText && this._editor) {
      let curVal: string = this._editor.getValue();
      if (curVal !== this.props.value) {

        this.props.onDidBlurEditorText(curVal);
      }
    }
  }

  private onDidChangeModelContent(e: any): void {
    if (this.props.onValueChange && this._editor) {
      let curVal: string = this._editor.getValue();
      if (curVal !== this.props.value) {

        this.props.onValueChange(curVal);
      }
    }
  }
}
