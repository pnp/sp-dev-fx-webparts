import { useState, useEffect } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { MessageBarType } from '@fluentui/react';
import { SPHttpClient } from '@microsoft/sp-http'; // Import SPHttpClient
import * as strings from 'ListformattingWebpartWebPartStrings'; // Import strings

interface Field {
  key: string;
  text: string;
  columnType: string;
}

const useFetchFields = (siteUrl: string, context: WebPartContext, listId: string): { fields: Field[], message: string | undefined, messageType: MessageBarType } => {
  const [fields, setFields] = useState<Field[]>([]);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  useEffect((): void => {
    const fetchFields = async (): Promise<void> => {
      try {
        const response = await context.spHttpClient.get(
          `${siteUrl}/_api/web/lists(guid'${listId}')/fields?$filter=Hidden eq false and ReadOnlyField eq false`,
          SPHttpClient.configurations.v1
        );
        const data = await response.json();
        const fetchedFields: Field[] = data.value.map((field: { InternalName: string, Title: string, TypeAsString: string }) => ({
          key: field.InternalName,
          text: field.Title,
          columnType: field.TypeAsString
        }));
        setFields(fetchedFields);
      } catch {
        setMessage(strings.errorFetchingFields);
        setMessageType(MessageBarType.error);
      }
    };

    if (siteUrl && listId) {
      fetchFields().catch(console.error);
    }
  }, [siteUrl, listId, context]);

  return { fields, message, messageType };
};

export default useFetchFields;