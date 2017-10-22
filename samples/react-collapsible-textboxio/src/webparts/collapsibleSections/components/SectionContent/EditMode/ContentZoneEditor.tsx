import IContentZoneEditorProps from "./IContentZoneEditorProps";
import * as React from "react";
import * as textboxio from "textboxio";

export default class ContentZoneEditor extends React.Component<IContentZoneEditorProps, null> {

    public constructor(props) {
        super(props);
        this._saveContent = this._saveContent.bind(this);
        this._initTextboxIo = this._initTextboxIo.bind(this);
    }

    public render() {
        // We save content every time the focus is lost
        // By this way we don't trigger a re render each time the content is updated (textboxio dirty/onChange event). 
        // There is a glitch with the editor if you do it (the cursor position goes wrong)
        return (
            <div className="contentZoneEditor--edit">
                <div ref={ (ref) => {
                    this._initTextboxIo(this.props);
                }} id={ this.props.domElementId } onBlur={ this._saveContent }></div>
            </div>
        );
    }

    /**
     * Instanciates and sets up textbox.io control in the section
     */
    private _initTextboxIo(props: IContentZoneEditorProps) {
   
        const editors = textboxio.get("#" + props.domElementId);
        
        if (editors.length === 0) {
            let editorInstance = textboxio.inline("#" + props.domElementId, {
                // You can configure your own options here: http://docs.ephox.com/display/tbio/toolbar
                ui: {
                    toolbar: {
                        items: [
                            'emphasis',
                            {  
                                label  : 'Common ',
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
            editorInstance.content.set(props.content);
        }
    }

    /**
     * Notifies the parent to persit the editor content
     */
    private _saveContent() {
        const editors = textboxio.get("#" + this.props.domElementId);

        if (editors.length > 0) {
            this.props.onContentChanged(editors[0].content.get());
        }        
    }
}