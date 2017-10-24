import ITextboxioEditorProps from "./ITextboxioEditorProps";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { DisplayMode, Environment, EnvironmentType } from "@microsoft/sp-core-library";
import * as tbio from "textboxio";
import styles from "./TextboxioEditor.module.scss";

export default class TextboxioEditor extends React.Component<ITextboxioEditorProps, null> {

    private _refEditor;
    private _textboxio;

    public constructor(props) {
        super(props);
        this._saveContent = this._saveContent.bind(this);
        this._initTextboxIo = this._initTextboxIo.bind(this);
        this._ensureEditor = this._ensureEditor.bind(this);

        // In local mode, the externals(i.e. the Textbox.io library ) are bundled in a single file (no textboxio.js standalone file)
        if (Environment.type === EnvironmentType.Local) {
            this._textboxio = tbio;
        } else {
            // Otherwise we take the window variable directly.
            this._textboxio = window["textboxio"];
        }
    }

    public render() {

        // We save content every time the focus is lost
        return (
            <div className={ styles.editor } ref={ (ref)=> {
                this._refEditor = ref;
            }} id={ "textbox-io-editor-" + this. _getNewGuid() } onBlur={ this._saveContent }></div>
        );
    }

    public componentDidMount() {
        this._ensureEditor();
    }

    public componentDidUpdate() {
        this._ensureEditor();
    }

    private _ensureEditor() {
        
        const control = ReactDOM.findDOMNode(this._refEditor);
        const editors = this._textboxio.get("#" + control.getAttribute("id"));
        
        if (editors.length ===  0) {
            this._initTextboxIo(control.getAttribute("id"), this.props);  
        } else {
            if (this.props.displayMode === DisplayMode.Read) {
                editors[0].restore();
            }
        }
    }

    /**
     * Instanciates and sets up textbox.io control in the section
     */
    private _initTextboxIo(elementId: string, props: ITextboxioEditorProps) {
        
        let editorInstance = this._textboxio.inline("#" + elementId, {
            ui: {
                toolbar: {
                    items: [
                        'emphasis',
                        {  
                            label  : 'Common',
                            items : ['styles', 'removeformat', 'font-color']
                        },
                        'align',
                        {
                            label: 'Align',
                            items: ['ul', 'ol', 'indent', 'outdent', 'blockquote']
                        },
                        {
                            label: 'Miscellaneous',
                            items: ['link', 'fileupload','media', 'table', 'hr']
                        }
                    ],
                    draggable: false,
                },
                locale: props.locale ? props.locale.split("-")[0] : ''
            },
            css : {
                // Configure a list of available CSS classes   
                styles : [     
                    { rule : 'h1'},
                    { rule : 'h2'},
                    { rule : 'h3'},
                    { rule : 'p' },                  
                ],
            },
        });

        // Set default content
        editorInstance.content.set(props.content ? props.content : "");

    }

    /**
     * Notifies the parent to persit the editor content
     */
    private _saveContent() {
        
        const control = ReactDOM.findDOMNode(this._refEditor);
        const editors = this._textboxio.get("#" + control.getAttribute("id"));

        if (editors.length > 0) {
            this.props.onContentChanged(editors[0].content.get());
        }        
    }

    /**
     * Create a new random guid
     * @return {String} A new guid as string
     */
    private _getNewGuid(): string {
        
        const guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            // tslint:disable-next-line:no-bitwise
            const r = Math.random() * 16 | 0;
            // tslint:disable-next-line:no-bitwise
            const v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return guid;
    }
}