import * as React from 'react';
import { useState, useEffect } from 'react';
import { Modal, IconButton, DefaultButton, PrimaryButton, TextField, Rating, RatingSize, MessageBar, MessageBarType } from '@fluentui/react';
import styles from './ListformattingWebpart.module.scss';
import ApplyButton from './ApplyButton';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import useSaveFeedback from './useSaveFeedback';
import * as strings from 'ListformattingWebpartWebPartStrings';

const cancelIcon = { iconName: 'Cancel' };

interface Sample {
  key: string;
  text: string;
  path: string;
  shortDescription: string;
  author: string;
  authorPictureUrl: string;
  imageUrl: string;
}

interface SampleModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  sample: Sample;
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
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const { saveFeedback, feedbackSaved, error } = useSaveFeedback(context);

  useEffect(() => {
    if (feedbackSaved) {
      setShowSuccessMessage(true);
      setFeedbackSubmitted(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
  }, [feedbackSaved]);

  const handleRatingChange = (event: React.FormEvent<HTMLElement>, rating?: number): void => {
    setRating(rating || 0);
  };

  const handleFeedbackChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    setFeedback(newValue || '');
  };

  const handleSubmitFeedback = async (): Promise<void> => {
    await saveFeedback(sample.text, rating, feedback, githubUrl);
    if (feedbackSaved) {
      setRating(0);
      setFeedback('');
    }
  };

  const handleApplySuccess = async (message: string): Promise<void> => {
    onSuccess(message);
    setShowFeedbackForm(true);
  };

  const handleDismiss = (): void => {
    setShowFeedbackForm(false);
    setFeedbackSubmitted(false);
    setRating(0);
    setFeedback('');
    setShowSuccessMessage(false);
    onDismiss();
  };

  return (
    <Modal isOpen={isOpen} onDismiss={handleDismiss} isBlocking={false} containerClassName={styles.modalContainer}>
      <div className={styles.modalHeader}>
        <h2>{sample.text}</h2>
        <IconButton styles={{ root: { marginLeft: 'auto', marginTop: '4px', marginRight: '2px' } }} iconProps={cancelIcon} ariaLabel={strings.CloseModal} onClick={handleDismiss} />
      </div>
      {showSuccessMessage && <MessageBar messageBarType={MessageBarType.success}>{strings.FeedbackSubmittedSuccessfully}</MessageBar>}
      <div className={styles.modalContent} style={{ display: feedbackSubmitted ? 'none' : 'flex' }}>
        <div className={styles.leftContainer}>
          {!showFeedbackForm && (
            <>
              <p>{sample.shortDescription}</p>
              <div className={styles.authorInfo}>
                <img src={sample.authorPictureUrl} alt={sample.author} className={styles.authorPicture} />
                <span>{sample.author}</span>
              </div>
              <div className={styles.buttonContainer}>
                <DefaultButton text={strings.OpenInGitHub} href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.button} />
                <ApplyButton
                  selectedList={selectedList}
                  selectedColumn={selectedColumn}
                  selectedSample={sample.key}
                  selectedSite={selectedSite}
                  context={context}
                  selectedListName={selectedListName}
                  resetInputs={resetInputs}
                  disabled={false}
                  onSuccess={handleApplySuccess}
                  className={styles.button}
                />
              </div>
            </>
          )}
          {showFeedbackForm && (
            <div className={styles.feedbackContainer}>
              <h3>{strings.RateExperience}</h3>
              <Rating
                min={1}
                max={5}
                size={RatingSize.Large}
                rating={rating}
                onChange={handleRatingChange}
                ariaLabel={strings.RateExperience}
              />
              <TextField
                label={strings.AdditionalFeedback}
                multiline
                rows={3}
                value={feedback}
                onChange={handleFeedbackChange}
                className={styles.feedbackComment}
              />
              <PrimaryButton text={strings.SubmitFeedback} onClick={handleSubmitFeedback} />
              {error && <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>}
            </div>
          )}
        </div>
        {!showFeedbackForm && (
          <div className={styles.rightContainer}>
            <img src={sample.imageUrl} alt={sample.text} className={styles.modalImage} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SampleModal;