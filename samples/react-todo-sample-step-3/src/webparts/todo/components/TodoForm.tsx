/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file TodoForm.tsx
 */

import * as React from 'react';
import { Compare } from '@microsoft/sp-client-base';
import {
  TextField,
  Button,
  ButtonType
} from 'office-ui-fabric-react';

import {
  ITodoTask,
  ItemOperationCallback
} from '../ITodoWebPartProps';
import * as strings from 'todoStrings';
import styles from '../style/Todo.module.scss';

/**
 * Props for TodoForm component.
 */
export interface ITodoFormProps {
  /**
   * onSubmit callback triggered when the form is submitted.
   * Either triggered by clicking on add button or pressed Enter key in input field.
   */
  onSubmit: ItemOperationCallback;
}

/**
 * States for TodoForm component.
 */
export interface ITodoFormState {
  /**
   * inputValue is the react state of input box value.
   */
  inputValue: string;

  /**
   * The error message will show below the input box if the title filled in is invalid.
   */
  errorMessage: string;
}

/**
 * The form component used for adding new item to the list.
 *
 * It uses fabric-react component <TextField> <Button>
 * Link of TextField: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/textfield
 * Link of Button: https://fabricreact.azurewebsites.net/fabric-react/master/#/examples/button
 */
export default class TodoForm extends React.Component<ITodoFormProps, ITodoFormState> {
  private _textField: TextField;

  constructor(props: ITodoFormProps) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChanged = this._handleChanged.bind(this);

    this.state = {
      inputValue: '',
      errorMessage: ''
    };
  }

  public shouldComponentUpdate(nextProps: ITodoFormProps, nextState: ITodoFormState): boolean {
    return !Compare.shallowCompare(this.props, nextProps) || !Compare.shallowCompare(this.state, nextState);
  }

  public render(): JSX.Element {
    return (
      <form className={ styles.todoForm } onSubmit={ this._handleSubmit }>
        <TextField
          className={ styles.textField }
          value={ this.state.inputValue }
          ref={(ref: TextField) => this._textField = ref}
          placeholder={ strings.InputBoxPlaceholder }
          onBeforeChange={ this._handleChanged }
          autoComplete='off'
          errorMessage={ this.state.errorMessage }
        />
        <div className={ styles.addButtonCell }>
          <Button
            className={ styles.addButton }
            buttonType={ ButtonType.primary }
            ariaLabel={ strings.AddButton }
          >
            { strings.AddButton }
          </Button>
        </div>
      </form>
    );
  }

  private _handleSubmit(event: React.FormEvent): void {
    event.preventDefault();

    if (!this._getTitleErrorMessage(this.state.inputValue)) {
      this.setState({
        inputValue: '',
        errorMessage: ''
      });

      this.props.onSubmit({
        Title: this.state.inputValue
      } as ITodoTask);
    } else {
      this.setState({
        errorMessage: this._getTitleErrorMessage(this.state.inputValue)
      } as ITodoFormState);

      this._textField.focus();
    }
  }

  private _handleChanged(newValue: string): void {
    this.setState({
      inputValue: newValue
    } as ITodoFormState);
  }

  private _getTitleErrorMessage(title: string): string {
    if (title === '') {
      return strings.TitleEmptyErrorMessage;
    } else {
      return '';
    }
  }
}
