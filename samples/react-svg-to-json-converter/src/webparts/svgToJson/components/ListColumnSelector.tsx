import * as React from 'react';
import { useEffect, useState } from 'react';
import { IDropdownOption, MessageBarType, MessageBar, Dropdown } from '@fluentui/react';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import styles from './SvgToJson.module.scss';

interface IListColumnSelectorProps {
  siteUrl: string;
  context: any;
  onListChange: (listId: string, listName: string) => void;
  onColumnChange: (columnName: string) => void;
  className?: string;
}

const ListColumnSelector: React.FC<IListColumnSelectorProps> = ({ siteUrl, context, onListChange, onColumnChange, className }) => {
  const [lists, setLists] = useState<IDropdownOption[]>([]);
  const [columns, setColumns] = useState<IDropdownOption[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  useEffect(() => {
    const fetchLists = async (): Promise<void> => {
      if (!siteUrl) {
        return;
      }

      try {
        const sp = spfi(siteUrl).using(SPFx(context)); 
        const fetchedLists: any[] = await sp.web.lists();

        // List of titles to exclude
        const excludedTitles = [
          'appdata', 'appfiles', 'Composed Looks', 'Converted Forms', 'Documents', 
          'Form Templates', 'List Template Gallery','Style Library', 'Master Page Gallery', 'Site Assets', 
          'Site Pages', 'Solution Gallery', 'TaxonomyHiddenList', 'Theme Gallery', 
          'User Information List', 'Web Part Gallery', 'Web Template Extensions'
        ];

        const listOptions: IDropdownOption[] = fetchedLists
          .filter(list => excludedTitles.indexOf(list.Title) === -1)
          .map(list => ({
            key: list.Id,
            text: list.Title
          }));

        setLists(listOptions);
      } catch (error) {
        console.error('Error fetching lists:', error);
        setMessage(`Error fetching lists: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    fetchLists();
  }, [siteUrl, context]);

  const handleListChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): Promise<void> => {
    if (option) {
      onListChange(option.key as string, option.text as string);
      try {
        const sp = spfi(siteUrl).using(SPFx(context)); 
        const fetchedColumns: any[] = await sp.web.lists.getById(option.key as string).fields();

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
    }
  };

  const handleColumnChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    if (option) {
      onColumnChange(option.key as string);
    }
  };

  return (
    <div className={className}>
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
      <Dropdown
        placeholder="Select a list"
        label="Lists"
        options={lists}
        onChange={handleListChange}
        className={styles.dropdown}
      />
      <Dropdown
        placeholder="Select a column"
        label="Columns"
        options={columns}
        onChange={handleColumnChange}
        className={styles.dropdown}
      />
    </div>
  );
};

export default ListColumnSelector;