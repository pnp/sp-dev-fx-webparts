import * as React from 'react';

// The file contains custom field render components used in the redux form in the purchase requestwebpart.

var requiredMessageStyle={
    color:'Red'
};

// Custom renderer for dropdown field with validation message
export class renderDropDown extends React.Component<any,{}>{
    render() {
      return (
        <div>
            <label>{this.props.label}</label>
            <select {...this.props.input}>
                {this.props.children}
            </select>
            <br/>
            {this.props.meta.touched && this.props.meta.error && <span style={requiredMessageStyle}>{this.props.meta.error}</span>}
        </div>
      );
    }
  }

  // Custom renderer for Input fields with validation message
  export class renderInput extends React.Component<any,{}>{
    render() {
      return (
        <div>
            <label>{this.props.label}</label>
            <input {...this.props.input} placeholder={this.props.placeholder}></input>
            <br/>
            {this.props.meta.touched && this.props.meta.error && <span style={requiredMessageStyle}>{this.props.meta.error}</span>}
        </div>
      );
    }
  }