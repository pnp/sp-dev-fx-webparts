import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';
import styles from './ListformattingWebpart.module.scss';
import * as strings from 'ListformattingWebpartWebPartStrings';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface ApplyButtonProps {
  onApply: () => Promise<void>;
  selectedList: string;
  selectedColumn: string;
  selectedSample: string;
  selectedSite: string;
  context: WebPartContext;
  selectedListName: string;
  resetInputs: () => void;
  disabled: boolean;
  onSuccess: (message: string) => void;
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
  onSuccess
}) => {
  const handleApplyClick = async (): Promise<void> => {
    await onApply();
    onSuccess(strings.ColumnFormattingApplied);
  };

  return (
    <div className={styles.applyButtonContainer}>
      <PrimaryButton onClick={handleApplyClick} text={strings.ApplyColumnFormatting} disabled={disabled} />
    </div>
  );
};

export default ApplyButton;