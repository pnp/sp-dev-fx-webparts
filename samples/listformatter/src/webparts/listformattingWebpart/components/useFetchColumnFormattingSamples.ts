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
  path: string; // Add the path property
  shortDescription: string; // Add the short description property
  metadata: Metadata[];
  thumbnails: Thumbnail[];
  author: string; // Add the author property
  authorPictureUrl: string; // Add the author picture URL property
  imageUrl: string; // Add the image URL property
}

interface ExtendedDropdownOption extends IDropdownOption {
  path: string; // Add the path property
  url: string; // Add the url property
  author: string; // Add the author property
  authorPictureUrl: string; // Add the author picture URL property
  shortDescription: string; // Add the short description property
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
    const metadataResponse = await fetch(`https://api.github.com/repos/pnp/List-Formatting/contents/${path}/assets/sample.json`, { headers });
    const metadataData = await metadataResponse.json();

    if (metadataData && metadataData.content) {
      const decodedContent = atob(metadataData.content);
      const sampleData = JSON.parse(decodedContent);

      // Validate and extract required fields
      const title = sampleData[0]?.title;
      const shortDescription = sampleData[0]?.shortDescription; // Extract the short description
      const metadata = sampleData[0]?.metadata;
      const thumbnails = sampleData[0]?.thumbnails;
      const author = sampleData[0]?.authors?.[0]?.name || 'Unknown'; // Extract the author's name
      const authorPictureUrl = sampleData[0]?.authors?.[0]?.pictureUrl || ''; // Extract the author's picture URL

      // Ensure the sample has title, metadata array, and at least one thumbnail URL
      if (!title || !Array.isArray(metadata) || !Array.isArray(thumbnails) || thumbnails.length === 0) {
        console.warn(`Invalid or missing required fields in sample data for path: ${path}`);
        return undefined;
      }

      // Extract the first thumbnail URL
      const imageUrl = thumbnails[0]?.url;
      return { name: sampleData[0].name, title, path, shortDescription, metadata, thumbnails, author, authorPictureUrl, imageUrl };
    } else {
      console.warn(`No metadata content found for ${path}`);
    }
  } catch (error) {
    console.error(`Error fetching sample data for ${path}:`, error);
  }
  return undefined;
};

const useFetchColumnFormattingSamples = (columnType: string, includeGenericSamples: boolean, currentPage: number, pageSize: number): UseFetchColumnFormattingSamplesResult => {
  const [samples, setSamples] = useState<ExtendedDropdownOption[]>([]);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [totalSamples, setTotalSamples] = useState<number>(0);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const cacheKey = `samples_${columnType}_${includeGenericSamples}_${currentPage}_${pageSize}`;
      const cachedSamples = localStorage.getItem(cacheKey);

      if (cachedSamples) {
        setSamples(JSON.parse(cachedSamples));
        return;
      }

      const token = "your token here"; // Add your GitHub token here
      const headers = new Headers();
      if (token) {
        headers.append('Authorization', `token ${token}`);
      }

      try {
        console.log("Fetching all samples from GitHub...");
        const response = await fetch('https://api.github.com/repos/pnp/List-Formatting/contents/column-samples', { headers });
        
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

        const allSamples: Sample[] = (await Promise.all(data.map(async (item) => {
          if (item.type === 'dir') {
            try {
              const sample = await fetchSampleData(item.path, headers);
              return sample ? [sample] : [];
            } catch (sampleError) {
              console.error(`Error parsing sample.json for ${item.name}:`, sampleError);
              return [];
            }
          }
          return [];
        }))).reduce((acc, val) => acc.concat(val), []);

        const filteredSamples = allSamples.filter(sample => {
          const sampleColumnType = sample.metadata.find((meta: Metadata) => meta.key === 'LIST-COLUMN-TYPE')?.value || 'General';
          return sampleColumnType === columnTypeMapping[columnType] || (includeGenericSamples && sampleColumnType === 'General');
        });

        setTotalSamples(filteredSamples.length);

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedSamples = filteredSamples.slice(startIndex, endIndex);

        const sampleOptions: ExtendedDropdownOption[] = paginatedSamples.map(sample => ({
          key: sample.name,
          text: sample.title,
          path: sample.path, // Use the correct path from the sample JSON
          url: sample.imageUrl, // Include the URL
          author: sample.author, // Include the author
          authorPictureUrl: sample.authorPictureUrl, // Include the author picture URL
          shortDescription: sample.shortDescription // Include the short description
        }));

        setSamples(sampleOptions);
        localStorage.setItem(cacheKey, JSON.stringify(sampleOptions));
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