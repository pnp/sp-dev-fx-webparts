import * as React from 'react';
import { Dropdown, MessageBar, IDropdownOption } from '@fluentui/react';
import styles from './SvgToJson.module.scss';
import useFetchLists from './useFetchLists';

interface ListSelectorProps {
  siteUrl: string;
  context: any;
  onListChange: (listId: string, listName: string) => void;
}

const ListSelector: React.FC<ListSelectorProps> = ({ siteUrl, context, onListChange }) => {
  const { lists, message, messageType } = useFetchLists(siteUrl, context);

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