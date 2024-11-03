import * as React from 'react';
import{ useState } from 'react';

import { MessageBar, DefaultButton} from '@fluentui/react';
import styles from './ListformattingWebpart.module.scss';
import useFetchColumnFormattingSamples from './useFetchColumnFormattingSamples';





interface SampleGalleryProps {
    columnType: string;
    includeGenericSamples: boolean;
    onSampleSelect: (sampleName: string) => void;
  }
  
  const SampleGallery: React.FC<SampleGalleryProps> = ({ columnType, includeGenericSamples, onSampleSelect }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Number of samples per page
    const { samples, message, messageType, totalSamples } = useFetchColumnFormattingSamples(columnType, includeGenericSamples, currentPage, pageSize);
    const [selectedSample, setSelectedSample] = useState<string | null>(null);
  
    const handleSampleClick = (sampleName: string): void => {
      setSelectedSample(sampleName);
      onSampleSelect(sampleName);
    };
  
    const handleNextPage = (): void => {
      if (currentPage * pageSize < totalSamples) {
        setCurrentPage(currentPage + 1);
        console.log(`Navigated to page ${currentPage + 1}`);
      }
    };
  
    const handlePreviousPage = (): void => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        console.log(`Navigated to page ${currentPage - 1}`);
      }
    };
  
    return (
      <div className={styles.sampleGallery}>
        {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
        <h3>Select a sample</h3>
        <div className={styles.galleryGrid}>
          {samples.map(sample => {
            const imageUrl = sample.url;
            return (
              <div
                key={sample.key}
                className={`${styles.galleryItem} ${selectedSample === sample.key ? styles.selected : ''}`}
                onClick={() => handleSampleClick(sample.key as string)}
              >
                {imageUrl && <img src={imageUrl} alt={sample.text} className={styles.previewImage} />}
                <div className={styles.sampleTitle}>{sample.text}</div>
                <div className={styles.sampleColumnType}>{columnType}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.paginationControls}>
          <DefaultButton
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            iconProps={{ iconName: 'ChevronLeft' }}
          />
          <DefaultButton
            onClick={handleNextPage}
            disabled={currentPage * pageSize >= totalSamples}
            iconProps={{ iconName: 'ChevronRight' }}
          />
        </div>
      </div>
    );
  };
  
  export default SampleGallery;