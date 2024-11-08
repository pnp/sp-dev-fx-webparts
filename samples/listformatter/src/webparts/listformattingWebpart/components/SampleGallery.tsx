import * as React from 'react';
import { useState } from 'react';
import { MessageBar, DefaultButton, TextField } from '@fluentui/react';
import styles from './ListformattingWebpart.module.scss';
import useFetchColumnFormattingSamples from './useFetchColumnFormattingSamples';
import SampleModal from './SampleModal';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface SampleGalleryProps {
  columnType: string;
  includeGenericSamples: boolean;
  onSampleSelect: (sampleName: string) => Promise<void>;
  selectedList: string;
  selectedColumn: string;
  selectedSample: string;
  selectedSite: string;
  context: WebPartContext;
  selectedListName: string;
  resetInputs: () => void;
  disabled: boolean;
  onSuccess: (message: string) => void;
}

interface SampleDetails {
  key: string;
  text: string;
  path: string; // Add the path property
  url: string; // Add the url property
  shortDescription: string;
  author: string;
  authorPictureUrl: string;
  imageUrl: string; // Add a new property for the image URL
}

const SampleGallery: React.FC<SampleGalleryProps> = ({
  columnType,
  includeGenericSamples,
  onSampleSelect,
  selectedList,
  selectedColumn,
  selectedSample,
  selectedSite,
  context,
  selectedListName,
  resetInputs,
  disabled,
  onSuccess
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSampleDetails, setSelectedSampleDetails] = useState<SampleDetails | null>(null);
  const pageSize = 10; // Number of samples per page
  const { samples, message, messageType, totalSamples } = useFetchColumnFormattingSamples(columnType, includeGenericSamples, currentPage, pageSize);

  const handleSampleClick = (sampleName: string): void => {
    const sample = samples.find(s => s.key === sampleName);
    if (sample) {
      console.log(`Sample selected: ${sampleName}`); // Log the sample name that is selected
      setSelectedSampleDetails({
        key: sample.key.toString(), // Convert the key to a string
        text: sample.text,
        path: sample.path, // Use the correct path from the sample JSON
        url: sample.url, // Use the correct URL from the sample JSON
        shortDescription: sample.shortDescription,
        author: sample.author,
        authorPictureUrl: sample.authorPictureUrl,
        imageUrl: sample.url // Use the image URL
      });
      setIsModalOpen(true);
    }
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

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
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

      {selectedSampleDetails && (
        <SampleModal
          isOpen={isModalOpen}
          onDismiss={handleCloseModal}
          sample={selectedSampleDetails}
          selectedList={selectedList}
          selectedColumn={selectedColumn}
          selectedSample={selectedSample}
          selectedSite={selectedSite}
          context={context}
          selectedListName={selectedListName}
          resetInputs={resetInputs}
          disabled={disabled}
          onSuccess={onSuccess}
        />
      )}
    </div>
  );
};

export default SampleGallery;