import { useState, useEffect } from 'react';
import { IDropdownOption, MessageBarType } from '@fluentui/react';
import * as strings from 'ListformattingWebpartWebPartStrings';

interface Metadata {
  key: string;
  value: string;
}

interface Sample {
  name: string;
  title: string;
  url: string;
  metadata: Metadata[];
}

interface ExtendedDropdownOption extends IDropdownOption {
  url: string;
}

interface UseFetchColumnFormattingSamplesResult {
  samples: ExtendedDropdownOption[];
  message: string | undefined;
  messageType: MessageBarType;
  totalSamples: number;
}

const columnTypeMapping: { [key: string]: string } = {
  'Boolean': 'Yes/No',
  'Text': 'General',
  'Number': 'Number',
  'Choice': 'Choice',
  'DateTime': 'Date',
  'MultiChoice': 'Multi-Choice',
  'User': 'Person'
};

const useFetchColumnFormattingSamples = (columnType: string, includeGenericSamples: boolean, currentPage: number, pageSize: number): UseFetchColumnFormattingSamplesResult => {
  const [samples, setSamples] = useState<ExtendedDropdownOption[]>([]);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [totalSamples, setTotalSamples] = useState<number>(0);

  useEffect(() => {
    const fetchSamples = async (): Promise<void> => {
      const token = "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"; // Hardcoded token for testing
      const headers = new Headers();
      if (token) {
        headers.append('Authorization', `token ${token}`);
      }
  
      console.log('Token:', token);
      console.log('Headers:', headers);
  
      try {
        const response = await fetch('http://localhost:3000/github/repos/pnp/List-Formatting/contents/column-samples', { headers });
        if (response.status === 401) {
          throw new Error('Unauthorized: Invalid or expired token');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
  
        if (data.message && data.message.includes('API rate limit exceeded')) {
          setMessage(data.message);
          setMessageType(MessageBarType.error);
          return;
        }
  
        if (!Array.isArray(data)) {
          console.error('Fetched data is not an array:', data);
          throw new Error('Fetched data is not an array');
        }
  
        const items = data;
        setTotalSamples(items.length);
  
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = items.slice(startIndex, endIndex);
  
        console.log(`Fetching samples for page ${currentPage} with page size ${pageSize}`);
        console.log('Paginated data:', paginatedData);
  
        const sampleOptions: ExtendedDropdownOption[] = [];
  
        for (const item of paginatedData) {
          try {
            // Check if the item is a directory
            if (item.type === 'dir') {
              // Fetch the sample.json file from within the directory
              const metadataResponse = await fetch(`http://localhost:3000/github/repos/pnp/List-Formatting/contents/${item.path}/assets/sample.json`, { headers });
              const metadata = await metadataResponse.json();
              console.log(`Fetched sample.json for ${item.name}:`, metadata);
  
              // Decode base64 content
              const decodedContent = atob(metadata.content);
              const sampleData: Sample[] = JSON.parse(decodedContent);
              console.log(`Parsed sample.json for ${item.name}:`, sampleData);
  
              for (const sample of sampleData) {
                const sampleColumnType = sample.metadata.find((meta: Metadata) => meta.key === 'LIST-COLUMN-TYPE')?.value || 'General';
                console.log(`Sample column type for ${sample.name}: ${sampleColumnType}`);
                if (sampleColumnType === columnTypeMapping[columnType] || (includeGenericSamples && sampleColumnType === 'General')) {
                  // Fetch the list of files in the assets folder
                  const assetsResponse = await fetch(`http://localhost:3000/github/repos/pnp/List-Formatting/contents/${item.path}/assets`, { headers });
                  const assetsData = await assetsResponse.json();
                  const imageFile = assetsData.find((file: { name: string }) => /\.(png|gif|jpg|jpeg)$/i.test(file.name));
                  const imageUrl = imageFile ? imageFile.download_url : '';
  
                  sampleOptions.push({
                    key: sample.name,
                    text: sample.title,
                    url: imageUrl // Use the image URL
                  });
                  console.log(`Added sample option: ${sample.name}`);
                }
              }
            }
          } catch (sampleError) {
            console.error(`Error parsing sample.json for ${item.name}:`, sampleError);
          }
        }
  
        console.log('Filtered sample options:', sampleOptions);
        setSamples(sampleOptions);
        setMessage(undefined);
      } catch (error) {
        console.error('Error fetching samples:', error);
        setMessage(`${strings.errorFetchingSamples}: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };
  
    fetchSamples().catch(error => console.error('Error in fetchSamples:', error));
  }, [columnType, includeGenericSamples, currentPage, pageSize]);
  
  return { samples, message, messageType, totalSamples };
  };
  
  export default useFetchColumnFormattingSamples;