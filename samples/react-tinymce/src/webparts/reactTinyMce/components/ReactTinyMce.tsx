import * as tinymce from 'tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';

import * as React from 'react';
import styles from './ReactTinyMce.module.scss';
import { IReactTinyMceProps } from './IReactTinyMceProps';
import './workbench.css';
import { IReactTinyMceState } from './IReactTinyMceState';
import { Editor } from "@tinymce/tinymce-react";
import ReactHtmlParser from 'react-html-parser';

export default class ReactTinyMce extends React.Component<IReactTinyMceProps, IReactTinyMceState> {

  public constructor(props: IReactTinyMceProps) {
    super(props);
    tinymce.init({});
    this.state = {
      content: this.props.content
    } as IReactTinyMceState;
    this.handleChange = this.handleChange.bind(this);
  }

  public render(): React.ReactElement<IReactTinyMceProps> {
    return (
      <div className={ styles.reactTinyMce }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              {
                this.props.isReadMode
                ? this.renderReadMode()
                : this.renderEditMode()
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderEditMode(): React.ReactElement<IReactTinyMceProps> {
    return (
      <div className="tinyMceEditMode">
        <Editor
          init={{
            plugins: ['paste', 'link'],
            skin_url: "../../src/webparts/reactTinyMce/skins/pnp/"
          }}
          initialValue={this.state.content}
          onChange={(event) => {this.handleChange(event.target.getContent());}}
        />
      </div>
    );
  }

  private renderReadMode(): React.ReactElement<any> {
    return (
      <div className="tinyMceReadMode">
        {ReactHtmlParser(this.state.content)}
      </div>
    );
  }
  
  private handleChange(content: string): void {
    this.setState({content: content}, () => {
      console.log('State Set, saving content');
      this.props.saveRteContent(content);
    });
  }
}
