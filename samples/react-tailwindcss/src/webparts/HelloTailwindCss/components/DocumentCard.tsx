import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import './../../../tailwind.css';
import User, { IUserProps } from './User';

export interface IDocumentCardProps {
  title: string;
  documentImageUrl: string;
  lastEditUserInfo: IUserProps;
}

export default class DocumentCard extends React.Component<IDocumentCardProps, {}> {
  public render(): React.ReactElement<IDocumentCardProps> {
    return (
      <div className="max-w-sm overflow-hidden bg-white text-black border border-solid border-gray-400 hover:outline-none hover:shadow-lg hover:cursor-pointer">
        <img className="w-full border-0 border-solid border-b border-gray-400" src={this.props.documentImageUrl} alt="Document Preview" />
        <div className="px-4 py-3 pt-1">
          <div className="text-lg mb-2">{this.props.title}</div>
          <User profileImageUrl={this.props.lastEditUserInfo.profileImageUrl}
            line1={this.props.lastEditUserInfo.line1}
            line2={this.props.lastEditUserInfo.line1} />
        </div>
      </div>
    );
  }
}
