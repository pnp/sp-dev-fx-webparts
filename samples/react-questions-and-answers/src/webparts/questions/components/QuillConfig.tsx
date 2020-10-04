import * as React from 'react';

export class QuillConfig {

    // https://github.com/quilljs/quill/blob/develop/docs/_includes/standalone/full.html
    public static header = (
        <div>
            <span className="ql-formats">
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-strike"></button>
            </span>
            <span className="ql-formats">
                <select className="ql-color"></select>
                <select className="ql-background"></select>
            </span>
            <span className="ql-formats">
                <button className="ql-header" value="1"></button>
                <button className="ql-header" value="2"></button>
                <button className="ql-header" value="3"></button>
                <button className="ql-blockquote"></button>
            </span>
            <span className="ql-formats">
                <button className="ql-list" value="ordered"></button>
                <button className="ql-list" value="bullet"></button>
                <button className="ql-indent" value="-1"></button>
                <button className="ql-indent" value="+1"></button>
            </span>
            <span className="ql-formats">
                <select className="ql-align"></select>
            </span>
            <span className="ql-formats">
                <button className="ql-link"></button>
            </span>
            <span className="ql-formats">
                <button className="ql-clean"></button>
            </span>
        </div>
    );

}