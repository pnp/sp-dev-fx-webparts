import * as React from 'react';
import { Dropdown, MessageBar, IDropdownOption } from '@fluentui/react';
import styles from './SvgToJson.module.scss';
import useFetchLists from './useFetchLists';
import * as strings from 'SvgToJsonWebPartStrings';

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
        placeholder={strings.SelectList}
        label={strings.Lists}
        options={lists}
        onChange={handleListChange}
        className={styles.dropdown}
        aria-label={strings.SelectList}
      />
    </div>
  );
};

export default ListSelector;