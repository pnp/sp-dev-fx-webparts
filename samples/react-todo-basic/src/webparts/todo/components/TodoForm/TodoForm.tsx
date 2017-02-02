import * as React from 'react';
import {
  TextField,
  Button,
  ButtonType
} from 'office-ui-fabric-react';
import styles from './TodoForm.module.scss';
import ITodoFormState from './ITodoFormState';
import ITodoFormProps from './ITodoFormProps';

export default class TodoForm extends React.Component<ITodoFormProps, ITodoFormState>{

  private _placeHolderText: string = 'Enter your todo';

  constructor(props: ITodoFormProps) {
    super(props);

    this.state = {
      inputValue: ''
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleAddButtonClick = this._handleAddButtonClick.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className={ styles.todoForm }>
        <TextField
          className={ styles.textField }
          value={ this.state.inputValue }
          placeholder={ this._placeHolderText }
          autoComplete='off'          
          onChanged={this._handleInputChange}/>
        <div className={ styles.addButtonCell }>
          <Button
            className={ styles.addButton }
            buttonType={ ButtonType.primary }
            ariaLabel='Add a todo task'
            onClick={this._handleAddButtonClick}>
            Add
          </Button>
        </div>
      </div>
    );
  }

  private _handleInputChange(newValue: string) {
    this.setState({
      inputValue: newValue
    });
  }

  private _handleAddButtonClick(event?: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      inputValue: this._placeHolderText
    });
    this.props.onAddTodoItem(this.state.inputValue);
  }
}
