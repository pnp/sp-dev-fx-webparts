import {
  Badge,
  Button,
  Card,
  Dropdown,
  Field,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Option,
  Spinner
} from '@fluentui/react-components';
import * as React from 'react';

import { IDocumentReview, IServiceError, ReviewState } from '../models/DocumentMetadataModels';
import { classifyDocument, filterDocuments, statusLabel } from '../utils/metadata';
import { classifyServiceError } from '../utils/errors';
import { parseMetadataFields, validateConfiguration } from '../utils/validation';
import { IDocumentMetadataReviewProps } from './IDocumentMetadataReviewProps';
import { IDocumentMetadataService } from '../services/DocumentMetadataService';
import styles from './DocumentMetadataReview.module.scss';

const REVIEW_LABELS: Record<ReviewState, string> = {
  all: 'All documents',
  'needs-review': 'Needs review',
  complete: 'Complete'
};

const statusColor = (status: string): 'danger' | 'warning' | 'success' | 'subtle' => {
  if (status === 'valid') return 'success';
  if (status === 'empty-optional') return 'subtle';
  if (status === 'missing') return 'warning';
  return 'danger';
};

const DocumentMetadataReview: React.FC<IDocumentMetadataReviewProps> = props => {
  const [documents, setDocuments] = React.useState<IDocumentReview[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<IServiceError | undefined>();
  const [configurationError, setConfigurationError] = React.useState<string | undefined>();
  const [reviewState, setReviewState] = React.useState<ReviewState>('all');

  const load = React.useCallback(async (service: IDocumentMetadataService) => {
    const fields = parseMetadataFields(props.metadataFields);
    const configuration = validateConfiguration(props.libraryPath, props.folderPath, props.metadataFields, props.maxRows);
    if (!configuration.valid || !fields.valid || !fields.value) {
      setConfigurationError(configuration.message || fields.message || 'Check the web part configuration.');
      setDocuments([]);
      return;
    }
    setConfigurationError(undefined);
    setError(undefined);
    setLoading(true);
    try {
      const records = await service.getDocuments({
        libraryPath: props.libraryPath,
        folderPath: props.folderPath,
        fields: fields.value,
        maxRows: props.maxRows
      });
      setDocuments(records.map(record => classifyDocument(record, fields.value as NonNullable<typeof fields.value>)));
    } catch (requestError) {
      setError(classifyServiceError(requestError));
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  }, [props.folderPath, props.libraryPath, props.maxRows, props.metadataFields]);

  React.useEffect(() => {
    void load(props.service);
  }, [load, props.service]);

  const visibleDocuments = filterDocuments(documents, reviewState);
  const reviewCount = documents.filter(document => document.needsReview).length;

  return (
    <section className={styles.container} aria-labelledby="document-metadata-review-title">
      <div className={styles.header}>
        <div>
          <h2 id="document-metadata-review-title" className={styles.title}>Document Metadata Review</h2>
          <p className={styles.subtitle}>Read-only review of {props.libraryPath || 'the configured library'}.</p>
        </div>
        <Button appearance="secondary" onClick={() => void load(props.service)} disabled={loading || !!configurationError}>Refresh</Button>
      </div>

      {configurationError && (
        <MessageBar className={styles.message} intent="warning">
          <MessageBarBody>
            <MessageBarTitle>Configuration needs attention</MessageBarTitle>
            {configurationError}
          </MessageBarBody>
        </MessageBar>
      )}

      {error && (
        <MessageBar className={styles.message} intent={error.kind === 'access-denied' ? 'error' : 'warning'}>
          <MessageBarBody>
            <MessageBarTitle>{error.title}</MessageBarTitle>
            {error.message}
            {error.retryable && <Button appearance="secondary" size="small" onClick={() => void load(props.service)}>Try again</Button>}
          </MessageBarBody>
        </MessageBar>
      )}

      <div className={styles.toolbar}>
        <Field label="Review state" className={styles.filter}>
          <Dropdown
            value={REVIEW_LABELS[reviewState]}
            aria-label="Filter documents by review state"
            onOptionSelect={(_event, data) => setReviewState((data.optionValue || 'all') as ReviewState)}
          >
            <Option value="all">All documents</Option>
            <Option value="needs-review">Needs review</Option>
            <Option value="complete">Complete</Option>
          </Dropdown>
        </Field>
        <div className={styles.summary} aria-live="polite">
          <span>{visibleDocuments.length} shown of {documents.length}</span>
          <Badge appearance="tint" color={reviewCount ? 'warning' : 'success'}>{reviewCount} need review</Badge>
        </div>
      </div>

      {loading && (
        <div className={styles.loadingState} role="status" aria-live="polite">
          <Spinner size="small" label="Loading documents" />
          <span>Loading documents…</span>
        </div>
      )}

      {!loading && !error && !configurationError && visibleDocuments.length === 0 && (
        <div className={styles.emptyState} role="status">
          <strong>{documents.length === 0 ? 'No documents found' : 'No documents match this filter'}</strong>
          <span>{documents.length === 0 ? 'Try a different folder or check that the library contains documents.' : 'Choose All documents to see the full review.'}</span>
        </div>
      )}

      {!loading && !error && !configurationError && visibleDocuments.length > 0 && (
        <ReviewResults documents={visibleDocuments} />
      )}
    </section>
  );
};

interface IReviewResultsProps {
  documents: IDocumentReview[];
}

const ReviewResults: React.FC<IReviewResultsProps> = ({ documents }) => (
  <>
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <caption className="sr-only">Document metadata review results</caption>
        <thead>
          <tr>
            <th scope="col">Document</th>
            <th scope="col">Review state</th>
            {documents[0].fields.map(review => <th scope="col" key={review.field.internalName}>{review.field.displayName}</th>)}
          </tr>
        </thead>
        <tbody>{documents.map(document => <ReviewRow key={document.document.id} review={document} />)}</tbody>
      </table>
    </div>
    <div className={styles.mobileList} aria-label="Document metadata review results">
      {documents.map(document => <ReviewCard key={document.document.id} review={document} />)}
    </div>
  </>
);

const ReviewRow: React.FC<{ review: IDocumentReview }> = ({ review }) => (
  <tr>
    <td>
      <a className={styles.documentName} href={review.document.url} target="_blank" rel="noreferrer">{review.document.name}</a>
      <span className={styles.documentDetails}>Modified {review.document.modified || 'unknown'} by {review.document.modifiedBy}</span>
    </td>
    <td><ReviewBadge needsReview={review.needsReview} /></td>
    {review.fields.map(field => <MetadataCell key={field.field.internalName} review={field} />)}
  </tr>
);

const ReviewCard: React.FC<{ review: IDocumentReview }> = ({ review }) => (
  <Card className={styles.mobileCard} appearance="outline">
    <div className={styles.cardHeader}>
      <div>
        <a className={styles.documentName} href={review.document.url} target="_blank" rel="noreferrer">{review.document.name}</a>
        <span className={styles.documentDetails}>Modified {review.document.modified || 'unknown'} by {review.document.modifiedBy}</span>
      </div>
      <ReviewBadge needsReview={review.needsReview} />
    </div>
    {review.fields.map(field => (
      <div className={styles.cardField} key={field.field.internalName}>
        <span className={styles.cardFieldName}>{field.field.displayName}</span>
        <MetadataValue review={field} />
      </div>
    ))}
  </Card>
);

const ReviewBadge: React.FC<{ needsReview: boolean }> = ({ needsReview }) => (
  <Badge appearance="tint" color={needsReview ? 'danger' : 'success'}>{needsReview ? 'Needs review' : 'Complete'}</Badge>
);

const MetadataCell: React.FC<{ review: IDocumentReview['fields'][number] }> = ({ review }) => (
  <td className={styles.metadataCell}><MetadataValue review={review} /></td>
);

const MetadataValue: React.FC<{ review: IDocumentReview['fields'][number] }> = ({ review }) => (
  <>
    <span className={styles.metadataValue}>{review.displayValue}</span>
    <Badge appearance="outline" color={statusColor(review.status)} aria-label={`${review.field.displayName}: ${statusLabel(review.status)}`}>
      {statusLabel(review.status)}
    </Badge>
  </>
);

export default DocumentMetadataReview;
