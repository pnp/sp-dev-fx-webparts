import { useState, useEffect } from 'react';
import { IDropdownOption, MessageBarType } from '@fluentui/react';
import * as strings from 'ListformattingWebpartWebPartStrings';

interface Metadata {
  key: string;
  value: string;
}

interface Thumbnail {
  type: string;
  order: number;
  url: string;
  alt: string;
}

interface Sample {
  name: string;
  title: string;
  url: string;
  metadata: Metadata[];  // Now required for filtering
  thumbnails: Thumbnail[]; // Now required for gallery display
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

// Fetch the contents of sample.json in the assets folder and return relevant data
const fetchSampleData = async (path: string, headers: Headers): Promise<Sample | undefined> => {
  try {
    console.log(`Fetching sample data for path: ${path}`);
    const metadataResponse = await fetch(`http://localhost:3000/github/repos/pnp/List-Formatting/contents/${path}/assets/sample.json`, { headers });
    const metadataData = await metadataResponse.json();

    if (metadataData && metadataData.content) {
      const decodedContent = atob(metadataData.content);
      const sampleData = JSON.parse(decodedContent);

      // Validate and extract required fields
      const title = sampleData[0]?.title;
      const metadata = sampleData[0]?.metadata;
      const thumbnails = sampleData[0]?.thumbnails;

      // Ensure the sample has title, metadata array, and at least one thumbnail URL
      if (!title || !Array.isArray(metadata) || !Array.isArray(thumbnails) || thumbnails.length === 0) {
        console.warn(`Invalid or missing required fields in sample data for path: ${path}`);
        return undefined;
      }

      // Extract the first thumbnail URL
      const imageUrl = thumbnails[0]?.url;
      return { name: sampleData[0].name, title, url: imageUrl, metadata, thumbnails };
    } else {
      console.warn(`No metadata content found for ${path}`);
    }
  } catch (error) {
    console.error(`Error fetching sample data for ${path}:`, error);
  }
  return undefined;
};

const useFetchColumnFormattingSamples = (
  columnType: string,
  includeGenericSamples: boolean,
  currentPage: number,
  pageSize: number
): UseFetchColumnFormattingSamplesResult => {
  const [samples, setSamples] = useState<ExtendedDropdownOption[]>([]);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [totalSamples, setTotalSamples] = useState<number>(0);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const token = "your token here"; // Replace with your actual token
      const headers = new Headers();
      if (token) {
        headers.append('Authorization', `token ${token}`);
      }

      try {
        console.log("Fetching all samples from GitHub...");
        const response = await fetch('http://localhost:3000/github/repos/pnp/List-Formatting/contents/column-samples', { headers });
        
        if (response.status === 401) {
          throw new Error('Unauthorized: Invalid or expired token');
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          setMessage(strings.errorFetchingSamples);
          setMessageType(MessageBarType.error);
          console.error('Fetched data is not an array:', data);
          return;
        }

        // Fetch all samples and log each result
        const allSamples: Sample[] = (await Promise.all(
          data.map(async (item) => {
            if (item.type === 'dir') {
              return await fetchSampleData(item.path, headers);
            }
            return undefined;
          })
        )).filter((sample): sample is Sample => sample !== undefined);

        console.log("All fetched samples:", allSamples);

        // Filter samples based on column type using metadata
        const filteredSamples = allSamples.filter(sample => {
          const sampleColumnType = sample.metadata?.find(meta => meta.key === 'LIST-COLUMN-TYPE')?.value || 'General';
          return sampleColumnType === columnTypeMapping[columnType] || (includeGenericSamples && sampleColumnType === 'General');
        });

        console.log("Filtered samples based on column type:", filteredSamples);
        
        setTotalSamples(filteredSamples.length);

        // Paginate samples
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedSamples = filteredSamples.slice(startIndex, startIndex + pageSize);

        const sampleOptions: ExtendedDropdownOption[] = paginatedSamples.map(sample => ({
          key: sample.name,
          text: sample.title,
          url: sample.url // Image URL from thumbnails
        }));

        console.log("Paginated samples:", sampleOptions);

        setSamples(sampleOptions);
        setMessage(undefined);
      } catch (error) {
        console.error('Error fetching samples:', error);
        setMessage(`${strings.errorFetchingSamples}: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    fetchData().catch(error => console.error('Error in fetchData:', error));
  }, [columnType, includeGenericSamples, currentPage, pageSize]);

  return { samples, message, messageType, totalSamples };
};

export default useFetchColumnFormattingSamples;
