import { useState, useEffect } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { IDropdownOption } from '@fluentui/react';
import { MessageBarType } from '@fluentui/react';

export const useFetchSites = (context: WebPartContext) => {
  const [sites, setSites] = useState<IDropdownOption[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  useEffect(() => {
    const fetchSites = async (): Promise<void> => {
      try {
        console.log('Fetching site collections using Search API...');
        
        const apiUrl = `${context.pageContext.site.absoluteUrl}/_api/search/query?querytext='contentclass:STS_Site'&trimduplicates=false&selectproperties='Title,Path'`;

        const response = await context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
        const result = await response.json();

        const siteResults = result.PrimaryQueryResult.RelevantResults.Table.Rows;
        const siteOptions: IDropdownOption[] = siteResults.map((row: any) => {
          const title = row.Cells.find((cell: any) => cell.Key === "Title").Value;
          const url = row.Cells.find((cell: any) => cell.Key === "Path").Value;
          return {
            key: url,
            text: title
          };
        });

        setSites(siteOptions);
        setMessage(null); 
      } catch (error) {
        console.error('Error fetching site collections:', error);
        setMessage(`${strings.errorFetchingSites}: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    fetchSites();
  }, [context]);

  return { sites, message, messageType };
};