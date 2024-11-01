import * as React from 'react';
import { useEffect, useState } from 'react';
import { Dropdown, IDropdownOption, MessageBar, MessageBarType } from '@fluentui/react';
import { SPHttpClient } from '@microsoft/sp-http'; // Remove ISPHttpClientOptions and keep SPHttpClient for making API calls
import styles from './SvgToJson.module.scss';
import * as strings from 'SvgToJsonWebPartStrings';

interface SiteSelectorProps {
  context: any; // Should be your SPFx context
  onSiteChange: (siteUrl: string) => void;
  className?: string;
}

const SiteSelector: React.FC<SiteSelectorProps> = ({ context, onSiteChange, className }) => {
  const [sites, setSites] = useState<IDropdownOption[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  useEffect(() => {
    const fetchSites = async (): Promise<void> => {
      try {
        console.log('Fetching site collections using Search API...');
        
        const apiUrl = `${context.pageContext.site.absoluteUrl}/_api/search/query?querytext='contentclass:STS_Site'&trimduplicates=false&selectproperties='Title,Path'`;

        // Make the API call to get all site collections using the SPHttpClient
        const response = await context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
        const result = await response.json();

        // Extract site collection URLs and titles from the search result
        const siteResults = result.PrimaryQueryResult.RelevantResults.Table.Rows;
        const siteOptions: IDropdownOption[] = siteResults.map((row: any) => {
          const title = row.Cells.find((cell: any) => cell.Key === "Title").Value;
          const url = row.Cells.find((cell: any) => cell.Key === "Path").Value;
          return {
            key: url,
            text: title
          };
        });

        // Set the fetched site collections to the state
        setSites(siteOptions);
        setMessage(null); // Clear any previous message
      } catch (error) {
        console.error('Error fetching site collections:', error);
        setMessage(`Error fetching site collections: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    // Fetch site collections when the component mounts
    fetchSites();
  }, [context]);

  const handleSiteChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    if (option) {
      onSiteChange(option.key as string);
    }
  };

  return (
    <div>
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
      <Dropdown
        placeholder={strings.SelectSite}
        label={strings.Sites}
        options={sites}
        onChange={handleSiteChange}
        className={styles.dropdown}
      />
    </div>
  );
};

export default SiteSelector;
