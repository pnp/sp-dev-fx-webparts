import * as React from 'react';
import { IGroupListProps } from './IGroupListProps';

export class GroupList extends React.Component<IGroupListProps, {}> {

  public render(): React.ReactElement<IGroupListProps> {
    return (
      <div>
        <ul>
          {this.props.groups.map(group => (
            <li><a href={group.url}>{group.displayName}</a></li>
          ))}
        </ul>
      </div>
    );
  }

}
