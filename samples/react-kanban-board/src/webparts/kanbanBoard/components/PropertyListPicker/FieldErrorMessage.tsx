import * as React from 'react';
import styles from './FieldErrorMessage.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';

export interface IFieldErrorMessageProps {
  errorMessage: string;
}

/**
 * Component that shows an error message when something went wront with the property control
 */
export default class FieldErrorMessage extends React.Component<IFieldErrorMessageProps> {
  public render(): JSX.Element {
    if (this.props.errorMessage !== 'undefined' && this.props.errorMessage !== null && this.props.errorMessage !== '') {
      return (
        <div aria-live="assertive">
          <p className={`ms-TextField-errorMessage ${styles.errorMessage}`}>
            <Icon iconName='Error' className={styles.errorIcon} />
            <span data-automation-id="error-message">{this.props.errorMessage}</span>
          </p>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
