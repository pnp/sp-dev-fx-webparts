import * as React from 'react';
import { Dropdown, MessageBar, IDropdownOption } from '@fluentui/react';
import * as strings from 'ListformattingWebpartWebPartStrings';
import styles from './ListformattingWebpart.module.scss';
import useFetchColumnFormattingSamples from './useFetchColumnFormattingSamples';

interface ColumnFormattingSamplesProps {
  columnType: string;
  includeGenericSamples: boolean;
  onSampleChange: (sampleName: string) => void;
}

const ColumnFormattingSamples: React.FC<ColumnFormattingSamplesProps> = ({ columnType, includeGenericSamples, onSampleChange }) => {
  const currentPage = 1; // Default to the first page
  const pageSize = 10; // Number of samples per page
  const { samples, message, messageType } = useFetchColumnFormattingSamples(columnType, includeGenericSamples, currentPage, pageSize);

  const handleSampleChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    if (option) {
      onSampleChange(option.key as string);
    }
  };

  return (
    <div className={styles.dropdown}>
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
      <Dropdown
        placeholder={strings.SelectSample}
        label={strings.Samples}
        options={samples}
        onChange={handleSampleChange}
        className={styles.dropdown}
        aria-label={strings.SelectSample}
      />
    </div>
  );
};

export default ColumnFormattingSamples;