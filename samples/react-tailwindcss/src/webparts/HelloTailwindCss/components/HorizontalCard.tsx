import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import './../../../tailwind.css';
import User, { IUserProps } from './User';

export interface IHorizontalCardProps {
  title: string;
  description: string;
  documentImageUrl: string;
  lastEditUserInfo: IUserProps;
}

const rootClassName = "sp-col-1/3:max-w-sm sp-col-1:max-w-full sp-col-1:flex overflow-hidden shadow hover:outline-none hover:shadow-lg hover:cursor-pointer";

export default class HorizontalCard extends React.Component<IHorizontalCardProps, {}> {
  public render(): React.ReactElement<IHorizontalCardProps> {
    return (
      <div className={rootClassName}>
        <div className="h-48 sp-col-1:h-auto sp-col-1:w-48 flex-none bg-cover text-center overflow-hidden" style={{ backgroundImage: "url('//tailwindcss.com/img/card-left.jpg')" }} title="Woman holding a mug">
        </div>
        <div className="border-r border-b border-l border-gray-400 sp-col-1:border-l-0 sp-col-1:border-t bg-buttonBackground text-buttonText p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="font-bold text-xl mb-2">{this.props.title}</div>
            <p className="text-base text-buttonTextDisabled">{this.props.description}</p>
          </div>
          <User profileImageUrl={this.props.lastEditUserInfo.profileImageUrl}
            line1={this.props.lastEditUserInfo.line1}
            line2={this.props.lastEditUserInfo.line1} />
        </div>
      </div>
    );
  }
}
