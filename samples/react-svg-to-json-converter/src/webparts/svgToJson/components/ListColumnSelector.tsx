import * as React from 'react';
import { useEffect, useState } from 'react';
import { Dropdown, IDropdownOption, MessageBar, MessageBarType } from '@fluentui/react';
import styles from './SvgToJson.module.scss';

interface ListColumnSelectorProps {
  siteUrl: string;
  onListChange: (listId: string, listName: string) => void;
  onColumnChange: (columnName: string) => void;
}

const ListColumnSelector: React.FC<ListColumnSelectorProps> = ({ siteUrl, onListChange, onColumnChange }) => {
  const [lists, setLists] = useState<IDropdownOption[]>([]);
  const [columns, setColumns] = useState<IDropdownOption[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  useEffect((): void => {
    const fetchLists = async (): Promise<void> => {
      try {
        const response = await fetch(`${siteUrl}/_api/web/lists?$filter=Hidden eq false`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseText = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseText, 'application/xml');

        const entries = xmlDoc.getElementsByTagName('entry');

        const excludedTitles = ["TaxonomyHiddenList", "Master Page Gallery", "Web Part Gallery", "Documents", "Site Assets", "Style Library", "Teams Wiki Data", "Form Templates", "Site Pages"];
        const listOptions: IDropdownOption[] = Array.from(entries).map(entry => {
          const idElement = entry.getElementsByTagNameNS('http://schemas.microsoft.com/ado/2007/08/dataservices', 'Id')[0];
          const titleElement = entry.getElementsByTagNameNS('http://schemas.microsoft.com/ado/2007/08/dataservices', 'Title')[0];
          const id = idElement ? idElement.textContent : '';
          const title = titleElement ? titleElement.textContent : '';
          return { key: id || '', text: title || '' };
        }).filter(option => excludedTitles.indexOf(option.text) === -1);
        setLists(listOptions);
      } catch (error) {
        console.error('Error fetching lists:', error);
        setMessage(`Error fetching lists: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    fetchLists();
  }, [siteUrl]);

  const handleListChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): Promise<void> => {
    if (option) {
      onListChange(option.key as string, option.text as string);
      try {
        const response = await fetch(`${siteUrl}/_api/web/lists(guid'${option.key}')/fields`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseText = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseText, 'application/xml');

        const entries = xmlDoc.getElementsByTagName('entry');

        const excludedInternalNames = ["ID", "ContentType", "Modified", "Created", "Author", "Editor"];
        const columnOptions: IDropdownOption[] = Array.from(entries).map(entry => {
          const internalNameElement = entry.getElementsByTagNameNS('http://schemas.microsoft.com/ado/2007/08/dataservices', 'InternalName')[0];
          const titleElement = entry.getElementsByTagNameNS('http://schemas.microsoft.com/ado/2007/08/dataservices', 'Title')[0];
          const readOnlyFieldElement = entry.getElementsByTagNameNS('http://schemas.microsoft.com/ado/2007/08/dataservices', 'ReadOnlyField')[0];
          const internalName = internalNameElement ? internalNameElement.textContent : '';
          const title = titleElement ? titleElement.textContent : '';
          const readOnlyField = readOnlyFieldElement ? readOnlyFieldElement.textContent === 'true' : false;
          return { key: internalName || '', text: title || '', readOnlyField };
        }).filter(option => excludedInternalNames.indexOf(option.key) === -1 && !option.readOnlyField);
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
    <div>
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
      <Dropdown
        placeholder="Select a List"
        options={lists}
        onChange={handleListChange}
        className={styles.dropdown}
      />
      <Dropdown
        placeholder="Select a Column"
        options={columns}
        onChange={handleColumnChange}
        className={styles.dropdown}
      />
    </div>
  );
};

export default ListColumnSelector;