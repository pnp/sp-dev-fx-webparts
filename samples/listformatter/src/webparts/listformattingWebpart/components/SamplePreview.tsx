import * as React from 'react';
import { useState, useEffect } from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';
import * as strings from 'ListformattingWebpartWebPartStrings';
import styles from './ListformattingWebpart.module.scss';

interface SamplePreviewProps {
  sampleName: string;
}

const SamplePreview: React.FC<SamplePreviewProps> = ({ sampleName }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<MessageBarType>(MessageBarType.info);

  useEffect(() => {
    const fetchPreviewImage = async (): Promise<void> => {
      if (!sampleName) {
        setImageUrl(undefined);
        return;
      }

      const formattedSampleName = sampleName.replace('pnp-list-formatting-', '');

      try {
        const response = await fetch(`https://api.github.com/repos/pnp/List-Formatting/contents/column-samples/${formattedSampleName}/assets`);
        const data = await response.json();
        console.log('Fetched assets:', data);

        if (Array.isArray(data)) {
          const imageFile = data.find(file => /\.(png|gif|jpg|jpeg)$/i.test(file.name));
          if (imageFile) {
            setImageUrl(imageFile.download_url);
            setMessage(undefined);
          } else {
            setImageUrl(undefined);
            setMessage(strings.errorFetchingPreviewImage);
            setMessageType(MessageBarType.warning);
          }
        } else {
          console.error('Unexpected response format:', data);
          setImageUrl(undefined);
          setMessage(`${strings.errorFetchingPreviewImage}: Unexpected response format`);
          setMessageType(MessageBarType.warning);
        }
      } catch (error) {
        console.error('Error fetching preview image:', error);
        setMessage(`${strings.errorFetchingPreviewImage}: ${error.message}`);
        setMessageType(MessageBarType.error);
      }
    };

    fetchPreviewImage().catch(error => console.error('Error in fetchPreviewImage:', error));
  }, [sampleName]);

  return (
    <div className={styles.samplePreview}>
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
      {imageUrl && <img src={imageUrl} alt={strings.SamplePreviewAltText} className={styles.previewImage} />}
    </div>
  );
};

export default SamplePreview;