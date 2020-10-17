import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import './../../../tailwind.css';

export interface IUserProps {
  profileImageUrl: string;
  line1: string;
  line2: string;
}

export default class User extends React.Component<IUserProps, {}> {
  public render(): React.ReactElement<IUserProps> {
    return (
      <div className="flex mt-4">
        <img className="h-8 w-8 rounded-full mr-2" src={this.props.profileImageUrl} />
        <div className="text-left">
          <div className="font-bold text-xs">{this.props.line1}</div>
          <div className="text-xs text-buttonTextDisabled">{this.props.line2}</div>
        </div>
      </div>
    );
  }
}
