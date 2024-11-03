import * as React from 'react';
import { PrimaryButton, MessageBar } from '@fluentui/react';
import * as strings from 'ListformattingWebpartWebPartStrings';
import useApplyColumnFormatting from './useApplyColumnFormatting';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface ApplyButtonProps {
  selectedList: string | undefined;
  selectedColumn: string | undefined;
  selectedSample: string | undefined;
  selectedSite: string | undefined;
  context: WebPartContext;
  selectedListName: string | undefined;
  resetInputs: () => void;
  className?: string;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({ selectedList, selectedColumn, selectedSample, selectedSite, context, selectedListName, resetInputs, className }) => {
  const { applyColumnFormatting, message, messageType } = useApplyColumnFormatting(
    selectedList,
    selectedColumn,
    selectedSample,
    selectedSite,
    context,
    selectedListName,
    resetInputs
  );

  return (
    <div>
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
      <PrimaryButton
        text={strings.ApplyColumnFormatting}
        onClick={applyColumnFormatting}
        className={className}
        aria-label={strings.ApplyColumnFormatting}
      />
    </div>
  );
};

export default ApplyButton;