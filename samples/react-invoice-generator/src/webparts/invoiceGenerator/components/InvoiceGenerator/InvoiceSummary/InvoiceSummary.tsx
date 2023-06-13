import * as React from 'react';
import styles from './InvoiceSummary.module.scss';

interface IInvoiceSummaryProps {
  subtotal: number;
  taxRate: number;
  total:number
}

export const InvoiceSummary: React.FC<IInvoiceSummaryProps> = ({ subtotal, taxRate }) => {
  const tax = subtotal * (taxRate / 100) || 0;
  const total = subtotal + tax || 0;

  return (
    <div className={styles.summary}>
      <div className={styles.row}>
        <div className={styles.label}>Subtotal:</div>
        <div className={styles.value}>${subtotal.toFixed(2)}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Tax ({taxRate}%):</div>
        <div className={styles.value}>${tax.toFixed(2)}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Total:</div>
        <div className={styles.value}>${total.toFixed(2)}</div>
      </div>
    </div>
  );
};
