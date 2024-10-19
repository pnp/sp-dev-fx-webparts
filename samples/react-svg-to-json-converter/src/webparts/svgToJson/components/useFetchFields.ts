import { useState, useEffect } from 'react';
import { spfi, SPFx } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import { IDropdownOption, MessageBarType } from '@fluentui/react';

const useFetchFields = (siteUrl: string, context: any, listId: string | null) => {
  const [fields, setFields] = useState<IDropdownOption[]>([]);
  const [message, setMessage] = useState<string | null>(null);
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

        const fieldOptions: IDropdownOption[] = fetchedFields
          .filter(field => !field.Hidden && !field.ReadOnlyField)
          .map(field => ({
            key: field.InternalName,
            text: field.Title
          }));

        setFields(fieldOptions);
      } catch (error) {
        console.error('Error fetching fields:', error);
        setMessage(`Error fetching fields: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    fetchFields();
  }, [siteUrl, context, listId]);

  return { fields, message, messageType };
};

export default useFetchFields;