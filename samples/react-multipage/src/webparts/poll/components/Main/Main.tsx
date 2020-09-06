import * as React from 'react';
import { IMainProps } from './IMainProps';
import { Config } from '../Config';
import { Poll } from '../Poll';

import styles from './Main.module.scss';

export class Main extends React.Component<IMainProps, {}> {
  constructor(props: IMainProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { needsConfiguration, pollTitle, pollDescription, configureWebPart } = this.props;

    return (
      <div className={styles.poll}>
        { needsConfiguration &&
          <Config configure={configureWebPart} {...this.props} />
        }
        { needsConfiguration === false &&
          <Poll title={pollTitle} description={pollDescription} {...this.props} />
        }
      </div>
    );
  }
}