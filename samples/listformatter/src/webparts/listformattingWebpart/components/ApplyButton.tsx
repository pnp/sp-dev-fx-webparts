import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';
import * as strings from 'ListformattingWebpartWebPartStrings';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import useApplyColumnFormatting from './useApplyColumnFormatting';

interface ApplyButtonProps {
  selectedList: string;
  selectedColumn: string;
  selectedSample: string;
  selectedSite: string;
  context: WebPartContext;
  selectedListName: string;
  resetInputs: () => void;
  disabled: boolean;
  onSuccess: (message: string) => void;
  className?: string; // Add className prop
}

const ApplyButton: React.FC<ApplyButtonProps> = ({
  selectedList,
  selectedColumn,
  selectedSample,
  selectedSite,
  context,
  selectedListName,
  resetInputs,
  disabled,
  onSuccess,
  className // Add className prop
}) => {
  const { applyColumnFormatting } = useApplyColumnFormatting(
    selectedList,
    selectedColumn,
    selectedSample,
    selectedSite,
    context,
    selectedListName,
    resetInputs
  );

  const handleApplyClick = async (): Promise<void> => {
    console.log('Apply button in ApplyButton component clicked'); // Log when the apply button is clicked
    try {
      await applyColumnFormatting();
      onSuccess(strings.ColumnFormattingApplied);
    } catch (error) {
      console.error('Error in ApplyButton handleApplyClick:', error);
    }
  };

  return (
    <PrimaryButton onClick={handleApplyClick} text={strings.ApplyColumnFormatting} disabled={disabled} className={className} />
  );
};

export default ApplyButton;