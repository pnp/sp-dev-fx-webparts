import * as React from 'react';
import { ICardProps } from './ICardProps';
import styles from './Card.module.scss';

export default class Card extends React.Component<ICardProps, {}> {

  public render(): React.ReactElement<ICardProps> {
    return (
      <div className={styles.card}>
        <div className={styles.wrapper}>
          <img src={this.props.listItem.imageUrl} className={styles.image} />
          <a href="#" className={styles.url} >
            <h3 className={styles.title}>{this.props.listItem.title}</h3>
          </a>
          <p className={styles.description}>{this.props.listItem.description}</p>
        </div>
      </div>
    );
  }
}
