import * as React from 'react';
import { MessageBar } from '@fluentui/react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as strings from 'ListformattingWebpartWebPartStrings';
import styles from './ListformattingWebpart.module.scss';
import useFetchColumnType from './useFetchColumnType';

interface ColumnTypeDisplayProps {
  siteUrl: string;
  context: WebPartContext;
  listId: string | undefined;
  columnName: string | undefined;
  onColumnTypeChange: (columnType: string) => void;
}

const ColumnTypeDisplay: React.FC<ColumnTypeDisplayProps> = ({ siteUrl, context, listId, columnName, onColumnTypeChange }) => {
  const { columnType, message, messageType } = useFetchColumnType(siteUrl, context, listId, columnName, onColumnTypeChange);

  return (
    <div className={styles.columnTypeDisplay}>
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
      {columnType && <p>{`${strings.ColumnType}: ${columnType}`}</p>}
    </div>
  );
};

export default ColumnTypeDisplay;