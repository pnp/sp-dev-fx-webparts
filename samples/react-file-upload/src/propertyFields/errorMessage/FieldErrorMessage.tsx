import * as React from 'react';


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
        <div style={{ paddingBottom: '8px' }}><div aria-live='assertive' className='ms-u-screenReaderOnly' data-automation-id='error-message'>{this.props.errorMessage}</div>
          <span>
            <p className='ms-TextField-errorMessage ms-u-slideDownIn20'>{this.props.errorMessage}</p>
          </span>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
