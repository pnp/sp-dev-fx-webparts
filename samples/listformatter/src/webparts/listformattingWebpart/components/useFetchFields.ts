import { useState, useEffect } from 'react';
import { spfi, SPFx } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import { MessageBarType } from '@fluentui/react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as strings from 'ListformattingWebpartWebPartStrings';

export interface Field {
  InternalName: string;
  Title: string;
  Hidden: boolean;
  ReadOnlyField: boolean;
}

const useFetchFields = (siteUrl: string, context: WebPartContext, listId: string | undefined): { fields: Field[], message: string | undefined, messageType: MessageBarType } => {
  const [fields, setFields] = useState<Field[]>([]);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  useEffect(() => {
    const fetchFields = async (): Promise<void> => {
      if (!siteUrl || !listId) {
        return;
      }

      try {
        const sp = spfi(siteUrl).using(SPFx(context));
        const list = await sp.web.lists.getById(listId);
        const fetchedFields = await list.fields();

        // Filter and set the fields directly in the state
        const availableFields = fetchedFields.filter(field => !field.Hidden && !field.ReadOnlyField);
        setFields(availableFields);

      } catch (error) {
        console.error('Error fetching fields:', error);
        setMessage(`${strings.errorFetchingFields}: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    fetchFields().catch(error => console.error('Error in fetchFields:', error)); // Handle the promise properly
  }, [siteUrl, context, listId]);

  return { fields, message, messageType };
};

export default useFetchFields;