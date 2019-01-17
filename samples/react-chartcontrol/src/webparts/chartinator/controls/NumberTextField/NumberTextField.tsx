import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as strings from 'ChartinatorWebPartStrings';

export interface INumberTextFieldProps {
  label: string;
  value: number;
  placeholder: string;
  onChanged: (newValue: string) => void;
}

export interface INumberTextFieldState {
  value: string;
}

export class NumberTextField extends React.Component<INumberTextFieldProps, INumberTextFieldState> {
  constructor(props: INumberTextFieldProps) {
    super(props);

    this.state = {
      value: props.value !== undefined ? props.value.toString() : undefined
    };
  }

  public render(): JSX.Element {
    return (
      <div className="NumberTextField">
        <TextField
          className="NumberTextField-textField"
          label={this.props.label}
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChanged={(newValue:string)=>this._onChanged(newValue)}
          onGetErrorMessage={(value: string)=>this._validateNumber(value)}
        />
      </div>
    );
  }

  private _validateNumber(value: string): string {
    return isNaN(Number(value)) ? strings.NumberErrorMessage : '';
  }

  private _onChanged(newValue: string): void {
    this.setState({
      value: newValue
    });

    this.props.onChanged(newValue);
  }
}
