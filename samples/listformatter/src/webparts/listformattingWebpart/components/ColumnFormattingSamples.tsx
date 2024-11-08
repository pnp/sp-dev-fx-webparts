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
  const { samples, message, messageType } = useFetchColumnFormattingSamples(columnType, includeGenericSamples, '');

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