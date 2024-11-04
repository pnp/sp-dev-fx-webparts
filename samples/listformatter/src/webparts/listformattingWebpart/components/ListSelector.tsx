import * as React from 'react';
import { Dropdown, IDropdownOption, MessageBar } from '@fluentui/react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import useFetchLists from './useFetchLists';
import * as strings from 'ListformattingWebpartWebPartStrings';
import styles from './ListformattingWebpart.module.scss';

interface ListSelectorProps {
  siteUrl: string;
  context: WebPartContext;
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
        placeholder={siteUrl ? strings.SelectList : strings.SelectSiteFirst}
        label={strings.Lists}
        options={lists}
        onChange={handleListChange}
        className={styles.dropdown}
        aria-label={siteUrl ? strings.SelectList : strings.SelectSiteFirst}
        disabled={!siteUrl}
      />
    </div>
  );
};

export default ListSelector;