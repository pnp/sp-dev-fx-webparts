import * as React from 'react';
import { css } from 'office-ui-fabric-react';

import styles from '../ReactRedux.module.scss';
import { IReactReduxWebPartProps } from '../IReactReduxWebPartProps';

export interface IReactReduxProps extends IReactReduxWebPartProps {
}

export default class ReactRedux extends React.Component<IReactReduxProps, {}> {
  public render(): JSX.Element {
    return (
      <div className={styles.reactRedux}>
        <div className={styles.container}>
          <div className={css('ms-Grid-row ms-bgColor-themeDark ms-fontColor-white', styles.row)}>
            <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
              <span className='ms-font-xl ms-fontColor-white'>
                Welcome to SharePoint!
              </span>
              <p className='ms-font-l ms-fontColor-white'>
                Customize SharePoint experiences using Web Parts.
              </p>
              <p className='ms-font-l ms-fontColor-white'>
                {this.props.description}
              </p>
              <a
                className={css('ms-Button', styles.button)}
                href='https://github.com/SharePoint/sp-dev-docs/wiki'
              >
                <span className='ms-Button-label'>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
