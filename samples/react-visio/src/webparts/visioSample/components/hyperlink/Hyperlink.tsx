import * as React from 'react';
// import styles from './Hyperlink.module.scss';
import { IHyperlinkProps } from '.';

export class Hyperlink extends React.Component<IHyperlinkProps, {}> {


  public render(): React.ReactElement<IHyperlinkProps> {
    return (
      <a href={this.props.properties.address} target="_blank">{this.props.properties.description}</a>

    );
  }
}
