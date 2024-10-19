import * as React from 'react';
import { useEffect, useState } from 'react';
import { Dropdown, IDropdownOption, MessageBarType, MessageBar } from '@fluentui/react';
import { spfi, SPFx } from '@pnp/sp';
import styles from './SvgToJson.module.scss';


interface ColumnSelectorProps {
    siteUrl: string;
    context: any;
    listId: string | null;
    onColumnChange: (columnName: string) => void;
  }
  
  const ColumnSelector: React.FC<ColumnSelectorProps> = ({ siteUrl, context, listId, onColumnChange }) => {
    const [columns, setColumns] = useState<IDropdownOption[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  
    useEffect(() => {
      const fetchColumns = async (): Promise<void> => {
        if (!siteUrl || !listId) {
          return;
        }
  
        try {
          const sp = spfi(siteUrl).using(SPFx(context)); 
          const fetchedColumns: any[] = await sp.web.lists.getById(listId).fields();
  
          const columnOptions: IDropdownOption[] = fetchedColumns
            .filter(column => !column.Hidden && !column.ReadOnlyField)
            .map(column => ({
              key: column.InternalName,
              text: column.Title
            }));
  
          setColumns(columnOptions);
        } catch (error) {
          console.error('Error fetching columns:', error);
          setMessage(`Error fetching columns: ${error.message}`);
          setMessageType(MessageBarType.error);
        }
      };
  
      fetchColumns();
    }, [siteUrl, context, listId]);
  
    const handleColumnChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
      if (option) {
        onColumnChange(option.key as string);
      }
    };
  
    return (
      <div className={styles.dropdown}>
        {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
        <Dropdown
          placeholder="Select a column"
          label="Columns"
          options={columns}
          onChange={handleColumnChange}
          className={styles.dropdown}
          aria-label="Select a column"
        />
      </div>
    );
  };
  
  export default ColumnSelector;