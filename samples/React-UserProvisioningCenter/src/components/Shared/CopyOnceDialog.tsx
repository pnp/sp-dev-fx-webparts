import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Text,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import * as strings from 'UpcStrings';
import type { ICredentialPresentation } from '../../services/engine/stepTypes';

const CLIPBOARD_CLEAR_DELAY_MS: number = 45 * 1000;

const useStyles = makeStyles({
  secret: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase500,
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    textAlign: 'center',
    userSelect: 'all',
    letterSpacing: '0.05em'
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM
  }
});

export interface ICopyOnceDialogProps {
  credential: ICredentialPresentation | null;
  onConfirm: () => void;
}

export const CopyOnceDialog: React.FC<ICopyOnceDialogProps> = ({ credential, onConfirm }) => {
  const styles = useStyles();
  const [copied, setCopied] = React.useState<boolean>(false);

  React.useEffect(() => {
    setCopied(false);
  }, [credential]);

  if (!credential) {
    return null;
  }

  const scheduleClipboardClear = (value: string): void => {
    window.setTimeout(() => {
      if (!navigator.clipboard?.readText || !navigator.clipboard?.writeText) {
        return;
      }
      navigator.clipboard
        .readText()
        .then((current) => (current === value ? navigator.clipboard.writeText('') : undefined))
        .catch(() => undefined);
    }, CLIPBOARD_CLEAR_DELAY_MS);
  };

  const copy = async (): Promise<void> => {

    if (!navigator.clipboard?.writeText) {
      setCopied(false);
      return;
    }
    try {
      await navigator.clipboard.writeText(credential.value);
      setCopied(true);
      scheduleClipboardClear(credential.value);
    } catch {
      setCopied(false);
    }
  };

  const bodyLabel: string =
    credential.kind === 'tap'
      ? strings.CredentialDialogBodyTap
      : strings.CredentialDialogBodyPassword;

  return (
    <Dialog modalType="alert" open={true}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{strings.CredentialDialogTitle}</DialogTitle>
          <DialogContent className={styles.body}>
            <Text>
              {bodyLabel} <strong>{credential.userPrincipalName}</strong>
            </Text>
            <div className={styles.secret}>{credential.value}</div>
            <Text size={200}>{strings.CredentialDialogWarning}</Text>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={copy}>
              {copied ? strings.CopiedLabel : strings.CopyLabel}
            </Button>
            <Button appearance="primary" onClick={onConfirm}>
              {strings.CredentialDialogConfirm}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
