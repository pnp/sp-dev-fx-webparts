import { useState, useEffect } from 'react';
import { spfi, SPFx } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { IDropdownOption, MessageBarType } from '@fluentui/react';

const useFetchLists = (siteUrl: string, context: any) => {
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

  return { lists, message, messageType };
};

export default useFetchLists;