import * as React from 'react';
import { Dropdown, IDropdownOption, MessageBar } from '@fluentui/react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import useFetchFields from './useFetchFields';
import * as strings from 'ListformattingWebpartWebPartStrings';

interface Field {
  key: string;
  text: string;
  columnType: string;
}

interface ColumnSelectorProps {
  siteUrl: string;
  context: WebPartContext;
  listId: string;
  onColumnChange: (columnName: string, columnType: string) => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ siteUrl, context, listId, onColumnChange }) => {
  const { fields, message, messageType } = useFetchFields(siteUrl, context, listId);

  const handleChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    if (option) {
      const selectedField = fields.find((field: Field) => field.key === option.key);
      if (selectedField) {
        onColumnChange(selectedField.text, selectedField.columnType); // Pass both column name and type
      }
    }
  };

  return (
    <div>
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
      <Dropdown
        placeholder={strings.SelectColumn}
        label={strings.Columns}
        options={fields.map(field => ({ key: field.key, text: field.text }))}
        onChange={handleChange}
        disabled={!listId}
      />
    </div>
  );
};

export default ColumnSelector;