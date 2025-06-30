import * as React from 'react';
import styles from './InvoiceItemRow.module.scss';
import { IInvoiceItem } from '../../../models/index';
import { Icon } from '@fluentui/react/lib/Icon';

interface IInvoiceItemRowProps {
  item: IInvoiceItem;
  isSelected: boolean;
  onItemSelected: (item: IInvoiceItem) => void;
  onDeleteItem: () => void;
}

const Delete = (): JSX.Element => <Icon iconName="Delete" />;

export const InvoiceItemRow: React.FC<IInvoiceItemRowProps> = (props) => {
  const { item, isSelected, onItemSelected, onDeleteItem } = props;

  const handleClick = (): void => {
    onItemSelected(item);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.stopPropagation();
    onItemSelected(item);
    onDeleteItem();
  };

  return (
    <div
      className={`${styles.itemRow} ${isSelected ? styles.selectedItem : ''}`}
      onClick={handleClick}
    >
      <div className={styles.itemDescription}>{item.description}</div>
      <div className={styles.itemQuantity}>{item.quantity}</div>
      <div className={styles.itemPrice}>{item.price.toFixed(2)}</div>
      <div className={styles.itemTotal}>{item.totalAmount.toFixed(2)}</div>
      <button className={styles.deleteButton} onClick={handleDelete}>
        <Delete />
      </button>
    </div>
  );
};

