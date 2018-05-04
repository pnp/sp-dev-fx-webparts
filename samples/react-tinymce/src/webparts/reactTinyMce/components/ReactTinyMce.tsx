/*
Imports the tinymce javascript from your local dependencies,
can switch this with a CDN or deploy to sharepoint CDN.
This is only an example, you will have to decide based
on your requirements where tinymce comes from.
*/
import * as tinymce from 'tinymce';

/*
Import the plugins that you want to use here.
*/
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

/**
 * TinyMCE Class that contains a TinyMCE Editor instance.
 * Takes the HTML stored in the WebPart,
 * the display mode of the webpart and either dislays
 * the HTML as HTML or displays the HTML inside the
 * tinyMCE rich text editor.
 * @export
 * @class ReactTinyMce
 * @extends {React.Component<IReactTinyMceProps, IReactTinyMceState>}
 */
export default class ReactTinyMce extends React.Component<IReactTinyMceProps, IReactTinyMceState> {

  /**
   * Creates an instance of ReactTinyMce.
   * Initializes the local version of tinymce.
   * @param {IReactTinyMceProps} props 
   * @memberof ReactTinyMce
   */
  public constructor(props: IReactTinyMceProps) {
    super(props);
    tinymce.init({});
    this.state = {
      content: this.props.content
    } as IReactTinyMceState;
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Renders the editor in read mode or edit mode depending
   * on the site page.
   * @returns {React.ReactElement<IReactTinyMceProps>} 
   * @memberof ReactTinyMce
   */
  public render(): React.ReactElement<IReactTinyMceProps> {
    return (
      <div className={ styles.reactTinyMce }>
        {
          this.props.isReadMode
          ? this.renderReadMode()
          : this.renderEditMode()
        }
      </div>
    );
  }

  /**
   * Displays the Editor in read mode, for all users.
   * @private
   * @returns {React.ReactElement<IReactTinyMceProps>} 
   * @memberof ReactTinyMce
   */
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

  /**
   * Displays the editor in edit mode for power users
   * who have access to click the edit button on the site page.
   * @private
   * @returns {React.ReactElement<any>} 
   * @memberof ReactTinyMce
   */
  private renderReadMode(): React.ReactElement<any> {
    return (
      <div className="tinyMceReadMode">
        {ReactHtmlParser(this.state.content)}
      </div>
    );
  }
  
  /**
   * Sets the state of the current TSX file and
   * invokes the saveRteContent callback with
   * the states content.
   * @private
   * @param {string} content 
   * @memberof ReactTinyMce
   */
  private handleChange(content: string): void {
    this.setState({content: content}, () => {
      this.props.saveRteContent(content);
    });
  }
}
