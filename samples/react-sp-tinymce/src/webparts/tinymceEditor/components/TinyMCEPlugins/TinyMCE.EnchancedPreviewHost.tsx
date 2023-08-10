import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import { RenderContentView } from '../RenderContentView/RenderContentView';

import { createGlobalStyle } from 'styled-components';
import { IFieldSchema } from '../../model/IFieldSchema';

export interface IPropertyFieldEnhancedPreviewHostProps {
    listData: any;
    editorContent: string;
    listFieldsSchema: IFieldSchema[];
    openPanel?: boolean;
    editor: any;
    context: WebPartContext;
}


export interface IPropertyFieldFieldPickerHostStats {

}

const GlobalStyle = createGlobalStyle`
.panel-styles p em {
    font-style: italic !important;
}
.panel-styles p strong {
    font-weight: bold !important;
}
.panel-styles div[class^="ant-space"] {
    flex-wrap: wrap;
    gap: 8px 0px;
    display: inline-flex;
    align-items: center;
    font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
    font-size: 14px;
    box-sizing: border-box;

    .ant-space-item {       

        span[class^="ant-tag"]
        {
            box-sizing: border-box;
            margin: 0;
            padding: 0;            
            font-size: 12px;
            line-height: 20px;
            list-style: none;
            font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
            display: inline-block;
            height: auto;
            margin-inline-end: 8px;
            padding-inline: 7px;
            white-space: nowrap;
            background: rgba(0, 0, 0, 0.02);
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            opacity: 1;
            transition: all 0.2s;
            text-align: start;
            color: #fff;
        }
    }
  }
`;

export class EnchancedPreviewHost extends React.Component<IPropertyFieldEnhancedPreviewHostProps, IPropertyFieldFieldPickerHostStats> {


    constructor(props: IPropertyFieldEnhancedPreviewHostProps) {
        super(props);
    }

    public render(): React.ReactElement<IPropertyFieldEnhancedPreviewHostProps> {


        return (
            <div>
                <GlobalStyle />
                <RenderContentView
                    listData={this.props.listData}
                    editorContent={this.props.editorContent}
                    listFieldsSchema={this.props.listFieldsSchema}
                />

            </div>
        );
    }
}
