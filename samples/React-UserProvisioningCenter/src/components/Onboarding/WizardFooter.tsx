import * as React from 'react';
import { Button, Spinner, makeStyles, tokens } from '@fluentui/react-components';
import * as strings from 'UpcStrings';
import { scrollToFirstInvalidField } from '../Shared/scrollToFirstInvalid';

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    columnGap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalL,
    marginTop: tokens.spacingVerticalL,
    borderTopWidth: tokens.strokeWidthThin,
    borderTopStyle: 'solid',
    borderTopColor: tokens.colorNeutralStroke2
  },
  button: {
    minWidth: '96px'
  }
});

export interface IWizardFooterProps {
  onBack?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextLoading?: boolean;
  nextLabel?: string;
  nextIsSubmit?: boolean;
}

export const WizardFooter: React.FC<IWizardFooterProps> = (props) => {
  const styles = useStyles();
  return (
    <div className={styles.footer}>
      {props.onBack ? (
        <Button appearance="secondary" className={styles.button} onClick={props.onBack}>
          {strings.BackLabel}
        </Button>
      ) : undefined}
      <Button
        appearance="primary"
        className={styles.button}
        type={props.nextIsSubmit ? 'submit' : 'button'}
        onClick={(ev) => {
          scrollToFirstInvalidField(ev.currentTarget);
          props.onNext?.();
        }}
        disabled={props.nextDisabled || props.nextLoading}
        icon={props.nextLoading ? <Spinner size="tiny" aria-label={strings.LoadingLabel} /> : undefined}
      >
        {props.nextLabel ?? strings.NextLabel}
      </Button>
    </div>
  );
};
