import { useState } from 'react';
import { spfi, SPFx } from '@pnp/sp';
import { MessageBarType } from '@fluentui/react';
import * as strings from 'ListformattingWebpartWebPartStrings';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface UseApplyColumnFormattingResult {
  applyColumnFormatting: () => Promise<void>;
  message: string | undefined;
  messageType: MessageBarType;
}

const useApplyColumnFormatting = (
  selectedList: string | undefined,
  selectedColumn: string | undefined,
  selectedSample: string | undefined,
  selectedSite: string | undefined,
  context: WebPartContext,
  selectedListName: string | undefined,
  resetInputs: () => void
): UseApplyColumnFormattingResult => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  const applyColumnFormatting = async (): Promise<void> => {
    if (!selectedList || !selectedColumn || !selectedSample) {
      setMessage(strings.SelectListColumn);
      setMessageType(MessageBarType.error);
      return;
    }

    try {
      const fullSiteUrl = selectedSite!;
      const sp = spfi(fullSiteUrl).using(SPFx(context));

      // Remove the 'pnp-list-formatting-' prefix from the selectedSample
      const formattedSampleName = selectedSample.replace('pnp-list-formatting-', '');

      // Fetch the list of files in the root of the sample folder
      const filesResponse = await fetch(`https://api.github.com/repos/pnp/List-Formatting/contents/column-samples/${formattedSampleName}`);
      const filesData = await filesResponse.json();
      console.log('Fetched files:', filesData);

      // Find the JSON file in the root of the sample folder
      const jsonFile = filesData.find((file: { name: string }) => file.name.endsWith('.json'));
      if (!jsonFile) {
        throw new Error('JSON file not found in the sample folder');
      }

      // Fetch the JSON format from the selected sample
      const sampleResponse = await fetch(jsonFile.download_url);
      const sampleData = await sampleResponse.json();
      const jsonResult = JSON.stringify(sampleData);

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

  return { applyColumnFormatting, message, messageType };
};

export default useApplyColumnFormatting;