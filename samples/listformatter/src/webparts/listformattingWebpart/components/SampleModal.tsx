import * as React from 'react';
import { Modal, IconButton, IIconProps, DefaultButton } from '@fluentui/react';
import styles from './ListformattingWebpart.module.scss';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import ApplyButton from './ApplyButton';

interface SampleModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  sample: {
    key: string;
    text: string;
    path: string; // Use the path property
    shortDescription: string;
    author: string;
    authorPictureUrl: string;
    imageUrl: string; // Add a new property for the image URL
  };
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

const cancelIcon: IIconProps = { iconName: 'Cancel' };

const SampleModal: React.FC<SampleModalProps> = ({
  isOpen,
  onDismiss,
  sample,
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
  const githubUrl = `https://github.com/pnp/List-Formatting/tree/master/${sample.path}`;

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      isBlocking={false}
      containerClassName={styles.modalContainer}
    >
      <div className={styles.modalHeader}>
        <h2>{sample.text}</h2>
        <IconButton
          styles={{ root: { marginLeft: 'auto', marginTop: '4px', marginRight: '2px' } }}
          iconProps={cancelIcon}
          ariaLabel="Close popup modal"
          onClick={onDismiss}
        />
      </div>
      <div className={styles.modalContent}>
        <div className={styles.leftContainer}>
          <p>{sample.shortDescription}</p>
          <div className={styles.authorInfo}>
            <img src={sample.authorPictureUrl} alt={sample.author} className={styles.authorPicture} />
            <span>{sample.author}</span>
          </div>
          <div className={styles.buttonContainer}>
            <DefaultButton
              text="Open in GitHub"
              href={githubUrl} // Use the constructed GitHub URL
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button} // Apply the button class
            />
            <ApplyButton
              selectedList={selectedList}
              selectedColumn={selectedColumn}
              selectedSample={sample.key}
              selectedSite={selectedSite}
              context={context}
              selectedListName={selectedListName}
              resetInputs={resetInputs}
              disabled={false} // Ensure the button is always enabled
              onSuccess={onSuccess}
              className={styles.button} // Apply the button class
            />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <img src={sample.imageUrl} alt={sample.text} className={styles.modalImage} />
        </div>
      </div>
    </Modal>
  );
};

export default SampleModal;