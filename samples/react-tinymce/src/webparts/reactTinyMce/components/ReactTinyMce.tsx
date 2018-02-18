import * as tinymce from 'tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';

import * as React from 'react';
import styles from './ReactTinyMce.module.scss';
import { IReactTinyMceProps } from './IReactTinyMceProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IReactTinyMceState } from './IReactTinyMceState';
import { Editor } from "@tinymce/tinymce-react";

export default class ReactTinyMce extends React.Component<IReactTinyMceProps, IReactTinyMceState> {

  public constructor(props: IReactTinyMceProps) {
    super(props);
    tinymce.init({
      selector: '#tiny',
      plugins: ['paste', 'link'],
      skin_url: "../../src/webparts/reactTinyMce/skins/light/"
    })
    this.state = {} as IReactTinyMceState;
  }

  public render(): React.ReactElement<IReactTinyMceProps> {
    return (
      <div className={ styles.reactTinyMce }>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.7.6/jquery.tinymce.min.js"></script>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
              <Editor
                init={{
                  plugins: ['paste', 'link'],
                  skin_url: "../../src/webparts/reactTinyMce/skins/pnp/"
                }}
              >
              </Editor>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
