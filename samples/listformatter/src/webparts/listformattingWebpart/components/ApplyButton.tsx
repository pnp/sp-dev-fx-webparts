import * as React from 'react';
import { PrimaryButton, MessageBar } from '@fluentui/react';
import * as strings from 'ListformattingWebpartWebPartStrings';
import useApplyColumnFormatting from './useApplyColumnFormatting';
import { WebPartContext } from '@microsoft/sp-webpart-base';

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
  className?: string;
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
  className
}) => {
  const { applyColumnFormatting, message, messageType } = useApplyColumnFormatting(
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
      // Remove the logic to open a new tab and reset inputs here
    } catch (error) {
      console.error('Error in ApplyButton handleApplyClick:', error);
    }
  };

  return (
    <div>
      <PrimaryButton onClick={handleApplyClick} text={strings.ApplyColumnFormatting} disabled={disabled} className={className} />
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
    </div>
  );
};

export default ApplyButton;