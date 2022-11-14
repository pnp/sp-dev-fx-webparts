import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';

import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/plugins/paste";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/print';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import "tinymce/plugins/table";
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/media';
import "tinymce/skins/content/default/content.min.css";
import { Editor } from "@tinymce/tinymce-react";

const SPFieldRichTextEdit: React.SFC<ISPFormFieldProps> = (props) => {
    const { Name, RichTextMode } = props.fieldSchema;
    const value = props.value ? props.value : '';

    const editorConfig = {
        "relative_urls": false, "convert_urls": false, "remove_script_host": false,
        height: 300,
        plugins: [
            "paste advlist autolink lists link print preview anchor",
            RichTextMode === 1 ? 'image media table paste imagetools' : 'fullscreen'
        ],
        skin_url: "https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.0.1/skins/ui/oxide"
    };
    return <Editor
        id={`Editor-${Name}-${Date.now().toString()}`}
        init={editorConfig}
        value={value}
        onEditorChange={props.valueChanged}
    />;
};

export default SPFieldRichTextEdit;
