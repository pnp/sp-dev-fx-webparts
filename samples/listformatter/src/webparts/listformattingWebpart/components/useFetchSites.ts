import { useState, useEffect } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { IDropdownOption } from '@fluentui/react';
import { MessageBarType } from '@fluentui/react';
import * as strings from 'ListformattingWebpartWebPartStrings';

interface UseFetchSitesResult {
  sites: IDropdownOption[];
  message: string | undefined;
  messageType: MessageBarType;
}

interface Cell {
  Key: string;
  Value: string;
}

interface Row {
  Cells: Cell[];
}

export const useFetchSites = (context: WebPartContext): UseFetchSitesResult => {
  const [sites, setSites] = useState<IDropdownOption[]>([]);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  useEffect(() => {
    const fetchSites = async (): Promise<void> => {
      try {
        console.log('Fetching site collections using Search API...');
        
        const apiUrl = `${context.pageContext.site.absoluteUrl}/_api/search/query?querytext='contentclass:STS_Site'&trimduplicates=false&selectproperties='Title,Path'`;

        const response = await context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
        const result = await response.json();

        const siteResults: Row[] = result.PrimaryQueryResult.RelevantResults.Table.Rows;
        const siteOptions: IDropdownOption[] = siteResults.map((row: Row) => {
          const title = row.Cells.find((cell: Cell) => cell.Key === "Title")!.Value;
          const url = row.Cells.find((cell: Cell) => cell.Key === "Path")!.Value;
          return {
            key: url,
            text: title
          };
        });

        setSites(siteOptions);
        setMessage(undefined); 
      } catch (error) {
        console.error('Error fetching site collections:', error);
        setMessage(`${strings.errorFetchingSites}: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    fetchSites().catch(error => console.error('Error in fetchSites:', error)); 
  }, [context]);

  return { sites, message, messageType };
};