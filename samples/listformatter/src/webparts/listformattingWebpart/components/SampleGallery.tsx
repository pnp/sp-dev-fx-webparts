import * as React from 'react';
import { useState } from 'react';
import { MessageBar, DefaultButton, TextField } from '@fluentui/react';
import styles from './ListformattingWebpart.module.scss';
import useFetchColumnFormattingSamples from './useFetchColumnFormattingSamples';

interface SampleGalleryProps {
  columnType: string;
  includeGenericSamples: boolean;
  onSampleSelect: (sampleName: string) => void;
}

const SampleGallery: React.FC<SampleGalleryProps> = ({ columnType, includeGenericSamples, onSampleSelect }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearchChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    setSearchQuery(newValue || '');
  };

  const filteredSamples = samples.filter(sample => 
    sample.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
    sample.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.sampleGallery}>
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
      <h3>Select a sample</h3>
      <TextField
        placeholder="Search by sample name or author"
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchField}
      />
      <div className={styles.galleryGrid}>
        {filteredSamples.map(sample => {
          const imageUrl = sample.url;
          return (
            <div
              key={sample.key}
              className={`${styles.galleryItem} ${selectedSample === sample.key ? styles.selected : ''}`}
              onClick={() => handleSampleClick(sample.key as string)}
            >
              {imageUrl && <img src={imageUrl} alt={sample.text} className={styles.previewImage} />}
              <div className={styles.sampleTitle}>{sample.text}</div>
              <div className={styles.sampleAuthor}>
                <img src={sample.authorPictureUrl} alt={sample.author} className={styles.authorPicture} /> {/* Display the author's picture */}
                {sample.author}
              </div>
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