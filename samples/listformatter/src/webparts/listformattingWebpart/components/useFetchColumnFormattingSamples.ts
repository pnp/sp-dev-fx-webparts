import { useState, useEffect } from 'react';
import { IDropdownOption, MessageBarType } from '@fluentui/react';
import { Octokit } from '@octokit/rest';
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
  path: string;
  shortDescription: string;
  metadata: Metadata[];
  thumbnails: Thumbnail[];
  author: string;
  authorPictureUrl: string;
  imageUrl: string;
}

interface ExtendedDropdownOption extends IDropdownOption {
  path: string;
  url: string;
  author: string;
  authorPictureUrl: string;
  shortDescription: string;
  imageUrl: string;
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

const fetchSampleData = async (octokit: Octokit, path: string): Promise<Sample | undefined> => {
  try {
    console.log(`Fetching sample data for path: ${path}`);
    const { data: metadataData } = await octokit.repos.getContent({
      owner: 'pnp',
      repo: 'List-Formatting',
      path: `${path}/assets/sample.json`,
      mediaType: {
        format: 'raw'
      }
    });

    if (metadataData) {
      const sampleData = JSON.parse(metadataData as unknown as string);

      const title = sampleData[0]?.title;
      const shortDescription = sampleData[0]?.shortDescription;
      const metadata = sampleData[0]?.metadata;
      const thumbnails = sampleData[0]?.thumbnails;
      const author = sampleData[0]?.authors?.[0]?.name || 'Unknown';
      const authorPictureUrl = sampleData[0]?.authors?.[0]?.pictureUrl || '';

      if (!title || !Array.isArray(metadata) || !Array.isArray(thumbnails) || thumbnails.length === 0) {
        console.warn(`Invalid or missing required fields in sample data for path: ${path}`);
        return undefined;
      }

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

const useFetchColumnFormattingSamples = (columnType: string, includeGenericSamples: boolean, searchQuery: string): UseFetchColumnFormattingSamplesResult => {
  const [samples, setSamples] = useState<ExtendedDropdownOption[]>([]);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);
  const [totalSamples, setTotalSamples] = useState<number>(0);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const cacheKey = `samples_${columnType}_${includeGenericSamples}`;
      const cachedSamples = localStorage.getItem(cacheKey);

      if (cachedSamples) {
        const parsedSamples = JSON.parse(cachedSamples);
        setSamples(parsedSamples);
        setTotalSamples(parsedSamples.length);
        return;
      }

      const octokit = new Octokit({
        auth: 'your sample goes in here' // please replace with your token
      });

      try {
        console.log("Fetching all samples from GitHub...");
        const { data } = await octokit.repos.getContent({
          owner: 'pnp',
          repo: 'List-Formatting',
          path: 'column-samples'
        });

        if (!Array.isArray(data)) {
          setMessage(strings.errorFetchingSamples);
          setMessageType(MessageBarType.error);
          console.error('Fetched data is not an array:', data);
          return;
        }

        const allSamples: Sample[] = (await Promise.all(data.map(async (item) => {
          if (item.type === 'dir') {
            try {
              const sample = await fetchSampleData(octokit, item.path);
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

        const sampleOptions: ExtendedDropdownOption[] = filteredSamples.map(sample => ({
          key: sample.name,
          text: sample.title,
          path: sample.path,
          url: sample.imageUrl,
          author: sample.author,
          authorPictureUrl: sample.authorPictureUrl,
          shortDescription: sample.shortDescription,
          imageUrl: sample.imageUrl
        }));

        setSamples(sampleOptions);
        setTotalSamples(sampleOptions.length);
        localStorage.setItem(cacheKey, JSON.stringify(sampleOptions));
        setMessage(undefined);
      } catch (error) {
        console.error('Error fetching samples:', error);
        setMessage(`${strings.errorFetchingSamples}: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    fetchData().catch(error => console.error('Error in fetchData:', error));
  }, [columnType, includeGenericSamples]);

  useEffect(() => {
    if (searchQuery) {
      const filteredSamples = samples.filter(sample =>
        sample.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sample.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSamples(filteredSamples);
      setTotalSamples(filteredSamples.length);
    } else {
      // Reset to all samples if search query is empty
      const cacheKey = `samples_${columnType}_${includeGenericSamples}`;
      const cachedSamples = localStorage.getItem(cacheKey);
      if (cachedSamples) {
        const parsedSamples = JSON.parse(cachedSamples);
        setSamples(parsedSamples);
        setTotalSamples(parsedSamples.length);
      }
    }
  }, [searchQuery, columnType, includeGenericSamples]);

  return { samples, message, messageType, totalSamples };
};

export default useFetchColumnFormattingSamples;