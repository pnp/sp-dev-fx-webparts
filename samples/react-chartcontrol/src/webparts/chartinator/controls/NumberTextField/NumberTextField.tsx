import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import * as strings from 'ChartinatorWebPartStrings';
import { INumberTextFieldProps, INumberTextFieldState } from './NumberTextField.types';

/**
 * Textbox for only signed numbers
 */
export class NumberTextField extends React.Component<INumberTextFieldProps, INumberTextFieldState> {
  constructor(props: INumberTextFieldProps) {
    super(props);

    this.state = {
      value: props.value !== undefined ? props.value.toString() : undefined
    };
  }

  /**
   * Renders the textobx
   */
  public render(): JSX.Element {
    return (
      <TextField
        label={this.props.label}
        value={this.state.value}
        placeholder={this.props.placeholder}
        onChange={(_event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>, newValue: string) => this._handleChange(newValue)}
        onGetErrorMessage={(value: string) => this._validateNumber(value)}
      />
    );
  }

  /**
   * Validates a number as it is typed in
   * @param value the value
   */
  private _validateNumber(value: string): string {
    return value !== '' && value !== undefined && isNaN(Number(value)) ? strings.NumberErrorMessage : '';
  }

  /**
   * Handles changes in the textbox
   */
  private _handleChange(newValue: string): void {
    this.setState({
      value: newValue
    });

    this.props.onChanged(newValue);
  }
}
