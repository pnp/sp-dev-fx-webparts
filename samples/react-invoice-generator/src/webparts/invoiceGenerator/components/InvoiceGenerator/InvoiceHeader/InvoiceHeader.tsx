import { DateConvention, DateTimePicker } from '@pnp/spfx-controls-react/lib/DateTimePicker';
import * as React from 'react';
import styles from './InvoiceHeader.module.scss';
import * as strings from 'InvoiceGeneratorWebPartStrings';
export interface IInvoiceHeaderProps {
  invoiceNumber: number;
  customerName: string;
  customerAddress: string;
  amountdue: number;
  companyName: string;
  companyAddress: string;
  issueDate: Date;
  dueDate: Date;
  onIssueDateChange: (date: Date) => void;
  onDueDateChange: (date: Date) => void;
}

export const InvoiceHeader: React.FC<IInvoiceHeaderProps> = (props) => {
  const {
    invoiceNumber,
    customerName,
    customerAddress,
    amountdue,
    companyAddress,
    companyName,
    issueDate,
    dueDate,
    onIssueDateChange,
    onDueDateChange,
  } = props;

  return (
    <div className={styles.header}>
      <div className={styles.headerSection}>
        <div className={styles.companyName}>{companyName}</div>
        <div className={styles.companyAddress}>{companyAddress}</div>
        <div className={styles.customerDetails}>
          <div className={styles.customerName}>{strings.billToText} {customerName}</div>
          <div className={styles.customerAddress}>{customerAddress}</div>
          <div className={styles.invoiceDate}>
            Date of Issue:
            <DateTimePicker
              dateConvention={DateConvention.Date}
              showLabels={false}
              value={issueDate}
              onChange={(date) => onIssueDateChange(date)}
            />
          </div>
        </div>
      </div>

      <div className={styles.headerSection}>
        <div className={styles.invoiceDetails}>
          <div className={styles.invoiceTitle}>{strings.invoiceNumberText}</div>
          <div className={styles.invoiceNumber}>#000{invoiceNumber}</div>
          <div className={styles.Amount}>{strings.amountDue}</div>
          <div className={styles.amountDue}>${amountdue}</div>
          <div className={styles.invoiceDate}>
          {strings.dueDate}
            <DateTimePicker
              dateConvention={DateConvention.Date}
              showLabels={false}
              value={dueDate}
              onChange={(date) => onDueDateChange(date)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
