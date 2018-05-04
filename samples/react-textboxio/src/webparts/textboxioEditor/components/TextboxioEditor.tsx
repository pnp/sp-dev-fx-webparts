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

        let renderHtml: JSX.Element = null;
        
        if (this.props.displayMode === DisplayMode.Read) {

            renderHtml = <div dangerouslySetInnerHTML={ {__html: this.props.content } }></div>;

        } else {
            renderHtml =  

            <div className={ styles.editor } 
                 ref={ (ref)=> {
                    this._refEditor = ref;
                }} id={ "textbox-io-editor-" + this. _getNewGuid() }>
            </div>
        }

        return renderHtml;
    }

    public componentDidMount() {
        this._ensureEditor(this.props);
    }

    public componentWillReceiveProps(nextProps: ITextboxioEditorProps): void { 
        this._ensureEditor(nextProps);
    }

    private _ensureEditor(props: ITextboxioEditorProps) {
        
        const control = ReactDOM.findDOMNode(this._refEditor);
        const editors = this._textboxio.get("#" + control.getAttribute("id"));
        
        if (editors.length ===  0) {
            this._initTextboxIo(control.getAttribute("id"), props);  
        } else {
            if (props.displayMode === DisplayMode.Read) {
                editors[0].restore();
            }
        }
    }

    /**
     * Instanciates and sets up textbox.io control
     */
    private _initTextboxIo(elementId: string, props: ITextboxioEditorProps) {
        
        // You can also use "replace()" here to have the full Textbox.io experience
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

        editorInstance.events.dirty.addListener(() =>  {
            
            // We use the dirty event instead of the change event because this event is synchronous
            // (There is a little trigger delay with the change event)
            this.props.onContentChanged(editorInstance.content.get());

            editorInstance.content.setDirty(false);
        });

        // Set default content
        if (props.content) {
            editorInstance.content.set(props.content);
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