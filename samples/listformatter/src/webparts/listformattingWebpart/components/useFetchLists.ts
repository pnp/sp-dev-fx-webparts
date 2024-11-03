import { useState, useEffect } from 'react';
import { spfi, SPFx } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { IDropdownOption, MessageBarType } from '@fluentui/react';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface UseFetchListsResult {
  lists: IDropdownOption[];
  message: string | undefined;
  messageType: MessageBarType;
}

interface List {
  Id: string;
  Title: string;
}

const useFetchLists = (siteUrl: string, context: WebPartContext): UseFetchListsResult => {
  const [lists, setLists] = useState<IDropdownOption[]>([]);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  useEffect(() => {
    const fetchLists = async (): Promise<void> => {
      if (!siteUrl) {
        return;
      }

      try {
        const sp = spfi(siteUrl).using(SPFx(context)); 
        const fetchedLists: List[] = await sp.web.lists();

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
        setMessage(error.message);
        setMessageType(MessageBarType.error);
      }
    };

    fetchLists().catch(error => console.error('Error in fetchLists:', error)); // Handle the promise properly
  }, [siteUrl, context]);

  return { lists, message, messageType };
};

export default useFetchLists;