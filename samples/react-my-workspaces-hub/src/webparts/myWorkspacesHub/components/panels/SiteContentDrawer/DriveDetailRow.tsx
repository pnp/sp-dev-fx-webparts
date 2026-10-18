import * as React from 'react';
import { Text, Button } from '@fluentui/react-components';
import { CopyRegular, CheckmarkFilled } from '@fluentui/react-icons';
import styles from './SiteContentDrawer.module.scss';
import { IDriveDetailRowProps } from './IDriveDetailRowProps';

/** Read-only label/value row with a copy-to-clipboard affordance. */
const DriveDetailRow: React.FC<IDriveDetailRowProps> = ({ label, value }) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) {
      return undefined;
    }
    const timer = window.setTimeout(() => setCopied(false), 3000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const onCopy = React.useCallback(() => {
    if (!value) {
      return;
    }
    navigator.clipboard.writeText(value).then(
      () => setCopied(true),
      () => undefined
    );
  }, [value]);

  return (
    <div className={styles.detailRow}>
      <Text weight="semibold" className={styles.detailLabel}>
        {label}
      </Text>
      <Text>{value ?? ''}</Text>
      {value && (
        <Button
          appearance="transparent"
          icon={copied ? <CheckmarkFilled /> : <CopyRegular />}
          aria-label={`Copy ${label}`}
          onClick={onCopy}
        />
      )}
    </div>
  );
};

export default DriveDetailRow;
