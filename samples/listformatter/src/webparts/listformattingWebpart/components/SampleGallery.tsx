import * as React from 'react';
import { useEffect, useState } from 'react';
import { MessageBar, DefaultButton, TextField } from '@fluentui/react';
import styles from './ListformattingWebpart.module.scss';
import useFetchColumnFormattingSamples from './useFetchColumnFormattingSamples';
import SampleModal from './SampleModal';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import usePagination from './usePagination';
import useModal from './useModal';
import useSampleSelection from './useSampleSelection';
import * as strings from 'ListformattingWebpartWebPartStrings';

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
  const [searchQuery, setSearchQuery] = useState('');
  const { samples, message, messageType, totalSamples } = useFetchColumnFormattingSamples(columnType, includeGenericSamples, searchQuery);
  const { currentPage, handleNextPage, handlePreviousPage, resetPage } = usePagination(totalSamples, 10);
  const { isModalOpen, openModal, closeModal } = useModal();
  const { selectedSampleDetails, selectSample } = useSampleSelection();

  useEffect(() => {
    resetPage(); // Reset to page 1 when samples change
  }, [samples]);

  const handleSampleClick = (sampleName: string): void => {
    const sample = samples.find(s => s.key === sampleName);
    if (sample) {
      selectSample({
        key: sample.key.toString(),
        text: sample.text,
        path: sample.path,
        url: sample.url,
        shortDescription: sample.shortDescription,
        author: sample.author,
        authorPictureUrl: sample.authorPictureUrl,
        imageUrl: sample.url
      });
      openModal();
    }
  };

  const handleSearchChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    setSearchQuery(newValue || '');
    resetPage();
  };

  const paginatedSamples = samples.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div className={styles.sampleGallery}>
      {message && <MessageBar messageBarType={messageType}>{message}</MessageBar>}
      <h3>{strings.SelectSample}</h3>
<TextField
  placeholder={strings.SearchPlaceholder}
  value={searchQuery}
  onChange={handleSearchChange}
  className={styles.searchField}
/>
      <div className={styles.galleryGrid}>
        {paginatedSamples.map((sample) => {
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
                <img src={sample.authorPictureUrl} alt={sample.author} className={styles.authorPicture} />
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
        <span>{`Page ${currentPage} of ${Math.ceil(totalSamples / 10)}`}</span>
        <DefaultButton
          onClick={handleNextPage}
          disabled={currentPage * 10 >= totalSamples}
          iconProps={{ iconName: 'ChevronRight' }}
        />
      </div>

      {selectedSampleDetails && (
        <SampleModal
          isOpen={isModalOpen}
          onDismiss={closeModal}
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