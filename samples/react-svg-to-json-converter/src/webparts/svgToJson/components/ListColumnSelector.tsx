import * as React from 'react';
import { useEffect, useState } from 'react';
import { IDropdownOption, MessageBarType, MessageBar, Dropdown } from '@fluentui/react';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import styles from './SvgToJson.module.scss';

interface IListColumnSelectorProps {
  siteUrl: string;
  context: any;
  onListChange: (listId: string, listName: string) => void;
  onColumnChange: (columnName: string) => void;
  className?: string;
}

const ListColumnSelector: React.FC<IListColumnSelectorProps> = ({ siteUrl, context, onListChange, onColumnChange, className }) => {
  const [lists, setLists] = useState<IDropdownOption[]>([]);
  const [columns, setColumns] = useState<IDropdownOption[]>([]);
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

        const listOptions: IDropdownOption[] = fetchedLists.map(list => ({
          key: list.Id,
          text: list.Title,
        }));
        setLists(listOptions);
        setMessage(null);
      } catch (error) {
        setMessage(`Error fetching lists: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    fetchLists();
  }, [siteUrl, context]);

  const handleListChange = async (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): Promise<void> => {
    if (option) {
      onListChange(option.key as string, option.text as string);

      try {
        const sp = spfi(siteUrl).using(SPFx(context));
        const fields = await sp.web.lists.getById(option.key as string).fields();

        const excludedInternalNames = ["ID", "ContentType", "Modified", "Created", "Author", "Editor"];
        const columnOptions: IDropdownOption[] = fields.map(field => ({
          key: field.InternalName,
          text: field.Title,
          readOnlyField: field.ReadOnlyField,
        })).filter(option => excludedInternalNames.indexOf(option.key) === -1 && !option.readOnlyField);

        setColumns(columnOptions);
      } catch (error) {
        setMessage(`Error fetching fields: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    }
  };

  return (
    <div>
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
      <Dropdown
        placeholder="Select a list"
        label="Lists"
        options={lists}
        onChange={handleListChange}
        styles={{ dropdown: { width: 500 } }} // Consistent width for the list dropdown
        className={styles.dropdown}
      />
      <Dropdown
        placeholder="Select a column"
        label="Columns"
        options={columns}
        onChange={(event, option) => onColumnChange(option?.key as string)}
        styles={{ dropdown: { width: 500 } }} // Consistent width for the column dropdown
        className={styles.dropdown}
      />
    </div>
  );
};

export default ListColumnSelector;
