import * as React from 'react';

import { IHomeProps } from './IHomeProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { App } from './AppForm/App';

export default class Home extends React.Component<IHomeProps, {}> {
  public render(): React.ReactElement<IHomeProps> {
    return (
      <div>
        <App />
      </div>
    );
  }
}
