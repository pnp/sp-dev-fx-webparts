import * as React from 'react';
import { Dropdown, MessageBar, IDropdownOption } from '@fluentui/react';
import styles from './ListformattingWebpart.module.scss';
import useFetchLists from './useFetchLists';
import * as strings from 'ListformattingWebpartWebPartStrings';
import { WebPartContext } from '@microsoft/sp-webpart-base';

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
        options={siteUrl ? lists : []}
        onChange={handleListChange}
        className={styles.dropdown}
        aria-label={siteUrl ? strings.SelectList : strings.SelectSiteFirst}
        disabled={!siteUrl}
      />
    </div>
  );
};

export default ListSelector;