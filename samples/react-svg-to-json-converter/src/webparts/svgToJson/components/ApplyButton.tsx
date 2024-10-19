import * as React from 'react';
import { PrimaryButton, MessageBarType } from '@fluentui/react';
import { spfi, SPFx } from "@pnp/sp";
import styles from './SvgToJson.module.scss';

interface ApplyButtonProps {
  selectedList: string | null;
  selectedColumn: string | null;
  jsonResult: string;
  selectedSite: string | null;
  context: any;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setMessageType: React.Dispatch<React.SetStateAction<MessageBarType>>;
  selectedListName: string | null;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({ selectedList, selectedColumn, jsonResult, selectedSite, context, setMessage, setMessageType, selectedListName }) => {
  const applyColumnFormatting = async (): Promise<void> => {
    if (!selectedList || !selectedColumn || !jsonResult) {
      setMessage('Please select a list, column, and generate JSON result before applying formatting.');
      setMessageType(MessageBarType.error);
      return;
    }

    try {
      const fullSiteUrl = selectedSite!;
      const sp = spfi(fullSiteUrl).using(SPFx(context));

      await sp.web.lists.getById(selectedList!).fields.getByInternalNameOrTitle(selectedColumn!).update({
        CustomFormatter: jsonResult
      });

      setMessage('Column formatting applied successfully!');
      setMessageType(MessageBarType.success);

      const listUrl = `${selectedSite}/Lists/${selectedListName}/AllItems.aspx`;
      window.open(listUrl, '_blank');
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
      className={styles.button}
      aria-label="Apply Column Formatting"
    />
  );
};

export default ApplyButton;