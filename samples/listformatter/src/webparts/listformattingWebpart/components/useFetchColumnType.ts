import { useState, useEffect } from 'react';
import { spfi, SPFx } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { MessageBarType } from '@fluentui/react';
import * as strings from 'ListformattingWebpartWebPartStrings';

interface UseFetchColumnTypeResult {
  columnType: string | undefined;
  message: string | undefined;
  messageType: MessageBarType;
}

const useFetchColumnType = (siteUrl: string, context: WebPartContext, listId: string | undefined, columnName: string | undefined, onColumnTypeChange: (columnType: string) => void): UseFetchColumnTypeResult => {
  const [columnType, setColumnType] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  useEffect(() => {
    const fetchColumnType = async (): Promise<void> => {
      if (!siteUrl || !listId || !columnName) {
        setColumnType(undefined);
        onColumnTypeChange('');
        return;
      }

      try {
        const sp = spfi(siteUrl).using(SPFx(context));
        const list = await sp.web.lists.getById(listId);
        const field = await list.fields.getByInternalNameOrTitle(columnName)();

        setColumnType(field.TypeAsString);
        onColumnTypeChange(field.TypeAsString);
        setMessage(undefined);
      } catch (error) {
        console.error('Error fetching column type:', error);
        setMessage(`${strings.errorFetchingColumnType}: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    fetchColumnType().catch(error => console.error('Error in fetchColumnType:', error));
  }, [siteUrl, context, listId, columnName, onColumnTypeChange]);

  return { columnType, message, messageType };
};

export default useFetchColumnType;