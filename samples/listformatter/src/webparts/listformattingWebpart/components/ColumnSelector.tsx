import * as React from 'react';
import { Dropdown, MessageBar, IDropdownOption } from '@fluentui/react';
import styles from './ListformattingWebpart.module.scss';
import useFetchFields, { Field } from './useFetchFields';
import * as strings from 'ListformattingWebpartWebPartStrings';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface ColumnSelectorProps {
  siteUrl: string;
  context: WebPartContext;
  listId: string | undefined;
  onColumnChange: (columnName: string) => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ siteUrl, context, listId, onColumnChange }) => {
  const { fields, message, messageType } = useFetchFields(siteUrl, context, listId);

  const fieldOptions: IDropdownOption[] = fields.map((field: Field) => ({
    key: field.InternalName,
    text: field.Title,
  }));

  const handleColumnChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    if (option) {
      onColumnChange(option.key as string);
    }
  };

  return (
    <div className={styles.dropdown}>
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
      <Dropdown
        placeholder={listId ? strings.SelectColumn : strings.SelectListFirst}
        label={strings.Columns}
        options={listId ? fieldOptions : []}
        onChange={handleColumnChange}
        className={styles.dropdown}
        aria-label={listId ? strings.SelectColumn : strings.SelectListFirst}
        disabled={!listId}
      />
    </div>
  );
};

export default ColumnSelector;