import * as React from 'react';
import styles from './GraphAutoBatching.module.scss';
import { IGraphAutoBatchingProps } from './IGraphAutoBatchingProps';
import { UserCard } from './UserCard';

export default class GraphAutoBatching extends React.Component<IGraphAutoBatchingProps, {}> {
  public render(): React.ReactElement<IGraphAutoBatchingProps> {
    return (
      <div>
        <div>
          <div>
            <div>
              <UserCard graphClient={this.props.graphClient} userQuery={"/me"} />
            </div>
            <div>
              <UserCard graphClient={this.props.graphClient} userQuery={"/me/manager"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
