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

interface UseFetchColumnFormattingSamplesResult {
  samples: IDropdownOption[];
  message: string | undefined;
  messageType: MessageBarType;
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

const useFetchColumnFormattingSamples = (columnType: string, includeGenericSamples: boolean): UseFetchColumnFormattingSamplesResult => {
  const [samples, setSamples] = useState<IDropdownOption[]>([]);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  useEffect(() => {
    const fetchSamples = async (): Promise<void> => {
      try {
        const response = await fetch('https://api.github.com/repos/pnp/List-Formatting/contents/column-samples');
        const data: { name: string, path: string }[] = await response.json();
        console.log('Fetched data:', data);

        const sampleOptions: IDropdownOption[] = [];

        for (const item of data) {
          try {
            const metadataResponse = await fetch(`https://raw.githubusercontent.com/pnp/List-Formatting/master/column-samples/${item.name}/assets/sample.json`);
            const metadataText = await metadataResponse.text();
            console.log(`Fetched sample.json for ${item.name}:`, metadataText);

            const sampleData: Sample[] = JSON.parse(metadataText);
            console.log(`Parsed sample.json for ${item.name}:`, sampleData);

            for (const sample of sampleData) {
              const sampleColumnType = sample.metadata.find((meta: Metadata) => meta.key === 'LIST-COLUMN-TYPE')?.value || 'General';
              if (sampleColumnType === columnTypeMapping[columnType] || (includeGenericSamples && sampleColumnType === 'General')) {
                sampleOptions.push({
                  key: sample.name,
                  text: sample.title
                });
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
  }, [columnType, includeGenericSamples]);

  return { samples, message, messageType };
};

export default useFetchColumnFormattingSamples;