import * as React from 'react';
import { useEffect, useState } from 'react';
import { Dropdown, IDropdownOption, MessageBarType, MessageBar } from '@fluentui/react';
import { spfi, SPFx } from '@pnp/sp';
import styles from './SvgToJson.module.scss';


interface ListSelectorProps {
  siteUrl: string;
  context: any;
  onListChange: (listId: string, listName: string) => void;
}

const ListSelector: React.FC<ListSelectorProps> = ({ siteUrl, context, onListChange }) => {
  const [lists, setLists] = useState<IDropdownOption[]>([]);
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
          'Form Templates', 'List Template Gallery', 'Master Page Gallery', 'Site Assets', 
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

  const handleListChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    if (option) {
      onListChange(option.key as string, option.text as string);
    }
  };

  return (
    <div className={styles.dropdown}>
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
      <Dropdown
        placeholder="Select a list"
        label="Lists"
        options={lists}
        onChange={handleListChange}
        className={styles.dropdown}
        aria-label="Select a list"
      />
    </div>
  );
};

export default ListSelector;