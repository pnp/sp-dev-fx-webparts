import * as React from 'react';
import { PrimaryButton, MessageBarType } from '@fluentui/react';
import { spfi, SPFx } from '@pnp/sp';
import * as strings from 'SvgToJsonWebPartStrings';

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
  className?: string; 
}

const ApplyButton: React.FC<ApplyButtonProps> = ({ selectedList, selectedColumn, jsonResult, selectedSite, context, setMessage, setMessageType, selectedListName, resetInputs, className }) => {
  const applyColumnFormatting = async (): Promise<void> => {
    if (!selectedList || !selectedColumn || !jsonResult) {
      setMessage(strings.SelectListColumn);
      setMessageType(MessageBarType.error);
      return;
    }

    try {
      const fullSiteUrl = selectedSite!;
      const sp = spfi(fullSiteUrl).using(SPFx(context));

      // Fetch the FormDigestValue using the SharePoint REST API because the PnPjs library does not support it or I am just not smart enough to understand this. argh. 
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

      setMessage(strings.ColumnFormattingApplied);
      setMessageType(MessageBarType.success);

      const listUrl = `${selectedSite}/Lists/${selectedListName}/AllItems.aspx`;
      window.open(listUrl, '_blank');

      resetInputs(); 
    } catch (error) {

      setMessage(strings.ErrorApplyingFormatting.replace('{0}', error.message));
      setMessageType(MessageBarType.error);
    }
  };

  return (
    <PrimaryButton
      text={strings.ApplyColumnFormatting}
      onClick={applyColumnFormatting}
      className={className} 
      aria-label={strings.ApplyColumnFormatting}
    />
  );
};

export default ApplyButton;