import * as React from 'react';
import { PrimaryButton, MessageBarType } from '@fluentui/react';
import { spfi, SPFx } from '@pnp/sp';

interface ApplyButtonProps {
  selectedList: string | null;
  selectedColumn: string | null;
  jsonResult: string;
  selectedSite: string | null;
  context: any;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setMessageType: React.Dispatch<React.SetStateAction<MessageBarType>>;
  selectedListName: string | null;
  resetInputs: () => void;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({ selectedList, selectedColumn, jsonResult, selectedSite, context, setMessage, setMessageType, selectedListName, resetInputs }) => {
  const applyColumnFormatting = async (): Promise<void> => {
    if (!selectedList || !selectedColumn || !jsonResult) {
      setMessage('Please select a list, column, and generate JSON result before applying formatting.');
      setMessageType(MessageBarType.error);
      return;
    }

    try {
      const fullSiteUrl = selectedSite!;
      const sp = spfi(fullSiteUrl).using(SPFx(context));

      // Fetch the FormDigestValue using the SharePoint REST API
      const response = await fetch(`${fullSiteUrl}/_api/contextinfo`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose'
        }
      });
      const data = await response.json();
      const formDigestValue = data.d.GetContextWebInformation.FormDigestValue;
      console.log(formDigestValue);

      await sp.web.lists.getById(selectedList!).fields.getByInternalNameOrTitle(selectedColumn!).update({
        CustomFormatter: jsonResult
      }, `${formDigestValue}`);

      setMessage('Column formatting applied successfully!');
      setMessageType(MessageBarType.success);

      const listUrl = `${selectedSite}/Lists/${selectedListName}/AllItems.aspx`;
      window.open(listUrl, '_blank');

      resetInputs(); // Reset inputs after applying formatting
    } catch (error) {
      console.error('Error applying column formatting:', error);
      setMessage(`Error applying column formatting: ${error.message}`);
      setMessageType(MessageBarType.error);
    }
  };

  return (
    <PrimaryButton
      text="Apply Column Formatting"
      onClick={applyColumnFormatting}
      aria-label="Apply Column Formatting"
    />
  );
};

export default ApplyButton;