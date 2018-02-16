import * as React from 'react';
import styles from './ReactOfflineFirst.module.scss';
import { IReactOfflineFirstProps } from './IReactOfflineFirstProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as localforage from "localforage";

export default class ReactOfflineFirst extends React.Component<IReactOfflineFirstProps, {}> {

  public componentDidMount(): void {
    localforage.ready()
    .then((event: any) => {
      fetch("https://api.github.com/orgs/SharePoint/repos")
      .then((response: Response) => {
        if(response.ok) {
          response.json()
          .then((json: any) => {
            localforage.setItem("https://api.github.com/orgs/SharePoint/repos", json);
          })
          .catch((error: Error|any) => {
            console.error(error);
          });
        }
      })
      .catch((error: Error|any) => {
        console.error(error);
      });
    })
    .catch((error: Error | any) => {
      console.error(error);
    });
  }

  public render(): React.ReactElement<IReactOfflineFirstProps> {
    return (
      <div className={ styles.reactOfflineFirst }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
