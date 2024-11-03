import * as React from 'react';
// import { useState } from 'react';
import { DefaultButton} from '@fluentui/react';
import styles from './ListformattingWebpart.module.scss';
import * as strings from 'ListformattingWebpartWebPartStrings';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface ApplyButtonProps {
  onApply: () => void;
  selectedList: string;
  selectedColumn: string;
  selectedSample: string;
  selectedSite: string;
  context: WebPartContext; // Replace with the correct type for WebPartContext
  selectedListName: string;
  resetInputs: () => void;
  disabled: boolean;
  onSuccess: (message: string) => void; // Add this line
}

const ApplyButton: React.FC<ApplyButtonProps> = ({
  onApply,
  selectedList,
  selectedColumn,
  selectedSample,
  selectedSite,
  context,
  selectedListName,
  resetInputs,
  disabled,
  onSuccess // Add this line
}) => {
  const handleApplyClick = (): void => {
    onApply();
    onSuccess(strings.ColumnFormattingApplied); // Use the callback to set the success message
  };

  return (
    <div className={styles.applyButtonContainer}>
      <DefaultButton onClick={handleApplyClick} text={strings.ApplyColumnFormatting} disabled={disabled} />
    </div>
  );
};

export default ApplyButton;