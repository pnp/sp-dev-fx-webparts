import IContentZoneEditorProps from "./IContentZoneEditorProps";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as tbio from "textboxio";
import { EnvironmentType, Environment } from "@microsoft/sp-core-library";
import { Text } from "@microsoft/sp-core-library";
import * as $ from "jquery";

export default class ContentZoneEditor extends React.Component<IContentZoneEditorProps, null> {

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
        // By this way we don't trigger a re render each time the content is updated (textboxio dirty/onChange event). 
        // There is a glitch with the editor if you do it (the cursor position goes wrong)
        // We use the same CSS class (cke_editable) as the default SharePoint editor to get default styles (h1, h2, etc.)
        return (
            <div className="contentZoneEditor--edit">
                <div className="editor cke_editable" ref={ (ref)=> {
                    this._refEditor = ref;
                }} id={ "textbox-io-editor-" + this. _getNewGuid() } onBlur={ this._saveContent }></div>
            </div>
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
        }
    }

    /**
     * Instanciates and sets up textbox.io control in the section
     */
    private _initTextboxIo(elementId: string, props: IContentZoneEditorProps) {

        // Check if the DOM element is present before creating the editor
        if ($("#" + elementId).length > 0) {
        
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
            if (props.content) {
                editorInstance.content.set(props.content);
            }

            editorInstance.events.loaded.addListener(() => {
                
                // Hide the toolbar (IE fix)
                $(Text.format(".ephox-polish-editor-container[aria-owns='{0}']", elementId)).hide();
            });
        }
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