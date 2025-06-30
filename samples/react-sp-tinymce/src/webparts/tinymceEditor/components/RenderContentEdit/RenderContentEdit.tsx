import * as React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { IRenderContentEditProps } from './IRenderContentEditProps';
import * as FieldPicker from '../TinyMCEPlugins/TinyMCE.FieldPicker';
import { IRenderContentEditState as IRenderContentEditState } from './IRenderContentEditState';
import Styles from './RenderContentEdit.module.scss';
import { decode, encode } from '../../utils/EncodingUtils';

require('tinymce/tinymce');

const plugins = [
    'anchor',
    'autolink',
    'code',
    'directionality',
    'insertdatetime',
    'fullscreen',
    'link',
    'lists',
    'media',
    'preview',
    'searchreplace',
    'table',
    'media',
    'image'
];
const models = ['dom'];
const themes = ['silver'];
const icons = ['default'];

const tinyMceStart = () => {
    plugins.forEach(plugin => require(`tinymce/plugins/${plugin}`));
    models.forEach(model => require(`tinymce/models/${model}`));
    themes.forEach(theme => require(`tinymce/themes/${theme}`));
    icons.forEach(icon => require(`tinymce/icons/${icon}`));

    require(`tinymce/skins/ui/oxide/skin.min.css`);
    require(`tinymce/skins/ui/oxide/content.min.css`);
    require(`tinymce/skins/content/default/content.css`);
};


export class RenderContentEdit extends React.Component<IRenderContentEditProps, IRenderContentEditState> {

    private initOptions: Record<string, any>;
    //private editorRef = null;


    constructor(props: IRenderContentEditProps) {
        super(props);


        this.handleEditorChange = this.handleEditorChange.bind(this);

        this.initTinyMCE();

        this.state = {
            editorContent: this.props.editorContent ? this.props.editorContent : ""
        };
    }  


    private initTinyMCE() {
        tinyMceStart();
        const menu = this.getMenuItems();
        const color_map = this.getColourMap();
        this.initOptions = {
            selector: "textarea#tinymce",
            height: 600,
            plugins,
            menu,
            menubar: 'edit view insert format table',
            toolbar: this.getToolbarItems(),
            content_style: `body#tinymce.mce-content-body {
            font-family: 'Segoe UI Web (West European)',Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
          }`,
            skin: false,
            color_map,
            color_cols: 8,
            block_formats: 'Paragraph=p;Heading 1=h2;Heading 2=h3;Heading 3=h4',
            setup: this.setupContentEditor.bind(this),
            images_upload_url: 'custom',
            image_uploadtab: false,
            target_list: false,
            keep_styles: false,
            paste_block_drop: false,
            paste_data_images: true,
            paste_as_text: true,
            promotion: false,
            browser_spellcheck: true,
            contextmenu: false,
            popup_css: "./RenderContentEdit.TinyMCE.css"
        };
    }

    private handleEditorChange(content: string, editor: any): void {
        this.setState({
            editorContent: encode(content)
        }, () => {
            this.props.onContentUpdate(encode(content));
        });
    }

    private setupContentEditor(editor: any): void {

        debugger;
        // To add a enhanced preview icon:
        editor.ui.registry.addIcon('enchancedpreview', '<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 9.005a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM12 5.5c4.613 0 8.596 3.15 9.701 7.564a.75.75 0 1 1-1.455.365 8.503 8.503 0 0 0-16.493.004.75.75 0 0 1-1.455-.363A10.003 10.003 0 0 1 12 5.5Z" fill="#212121"/></svg>');

        FieldPicker.addToolbarButton(editor, this.props.context, this.props.listFieldsSchema, this.props.listData);
        FieldPicker.addEnhancedPreviewToolbarButton(editor, this.props.context, this.props.listFieldsSchema, this.props.listData);


        editor.ui.registry.addButton('externalimage', {
            icon: 'image',
            tooltip: 'Insert external picture',
            disabled: true,
            onAction: (_: any) => {
                editor.execCommand('mceImage');
            }
        });

        editor.ui.registry.addMenuItem('externalimage', {
            text: 'External image',
            tooltip: 'Insert external picture',
            icon: 'image',
            onAction: (_: any) => {
                editor.execCommand('mceImage');
            }
        });
    }

    private getMenuItems(): object {
        return {
            edit: { title: 'Edit', items: 'undo redo | selectall | searchreplace | directionality' },
            view: { title: 'View', items: 'visualaid | fullscreen | preview' },
            insert: { title: 'Insert', items: 'link unlink | externalimage picturepicker | anchor | media ' },
            format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript forecolor backcolor | blockformats | removeformat unlink' },
            table: { title: 'Table', items: 'inserttable tableprops deletetable | row column cell' }
        };
    }

    private getToolbarItems(): string {
        return [
            `undo redo`,
            `formatselect`,
            `alignleft aligncenter alignright`,
            `bullist numlist indent outdent`,
            `bold italic underline strikethrough forecolor backcolor removeformat`,
            `link unlink externalimage picturepicker media fieldpicker enchancedpreview`,
            `table`,
            `fullscreen`
        ].join('|');
    }

    private startsWith(value: string, matches: string[]): boolean {
        const startsWith = matches.filter(match => {
            return value.match(new RegExp(`^${match}`, 'i')) !== null;
        });

        return startsWith.length > 0;
    }

    private getColourMap(): any {
        const __themeState__ = (window as any)['__themeState__'];

        if (!__themeState__ || !__themeState__.theme) {
            return undefined;
        }

        const { startsWith } = this;

        let color_map: any[] = [];
        Object.keys(__themeState__.theme)
            .filter(key => __themeState__.theme[key][0] === '#')
            .filter(key => startsWith(key, ['neutral', 'black', 'white', 'theme']))
            .forEach(key => {
                let colour = __themeState__.theme[key].substr(1);
                if (startsWith(key, ['black'])) {
                    colour = '000000';
                }

                if (color_map.indexOf(colour) === -1) {
                    color_map.push(colour);
                    color_map.push(key);
                }

            });

        return color_map;

    }


    public render(): React.ReactElement<IRenderContentEditProps> {

        return (
            <div className={Styles.renderContent}>
                <Editor
                    value={decode(this.state.editorContent)}
                    //initialValue={decode(this.state.editorContent)}
                    init={this.initOptions}
                    onEditorChange={(content: string, editor: any) =>
                        this.handleEditorChange(content, editor)
                    }
                />

            </div>
        );
    }
};

