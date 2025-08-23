import * as React from 'react';
import styles from './ReactStyledList.module.scss';
import type { IReactStyledListProps } from './IReactStyledListProps';


import type { IBookItem } from '../services/SharePointService';
import { BooksService } from '../services/SharePointService';



interface IReactStyledListState {
  items: IBookItem[];
}

export default class ReactStyledList extends React.Component<IReactStyledListProps, IReactStyledListState> {
  constructor(props: IReactStyledListProps) {
    super(props);
    this.state = { items: [] };

  }
  public async componentDidMount(): Promise<void> {
    const booksService = new BooksService(this.props.spfxContext);
    try {
      const items = await booksService.getBooks();
      this.setState({ items });
    } catch (err) {
      this.setState({ items: [] });
    }
  }

  public render(): React.ReactElement<IReactStyledListProps> {
    const { theme, alignment, hasTeamsContext } = this.props;
    const { items } = this.state;

    const containerClass = `${styles.reactStyledList} ${hasTeamsContext ? styles.teams : ''} ${theme === 'light' ? styles.light : styles.dark} ${alignment === 'vertical' ? styles.vertical : styles.horizontal}`;

    return (
      <section className={containerClass}>
        <div className={styles.gridContainer}>
          {items.map((item) => (
            <ListCard key={item.Id ?? item.Number} item={item} />
          ))}
        </div>
      </section>
    );
  }
}

interface IListCardProps {
  item: IBookItem;
}

class ListCard extends React.Component<IListCardProps> {
  public render(): React.ReactElement<IListCardProps> {
    const { item } = this.props;

    return (
      <div className={styles.gridItem}>
        <div className={styles.number}>{item.Number}</div>
        <div className={styles.contentContainer}>
          <div className={styles.author}>{item.BookAuthor}</div>
          <div className={styles.bookAbstract}>{item.BookAbstract}</div>
        </div>
        <div className={styles.category}>{item.Category}</div>
        <div className={styles.price}>{item.Price}</div>
      </div>
    );
  }
}
