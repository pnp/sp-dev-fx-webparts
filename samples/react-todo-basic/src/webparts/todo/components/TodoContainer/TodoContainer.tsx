import * as React from 'react';
import { DisplayMode } from '@microsoft/sp-client-base';
import { Placeholder } from '@microsoft/sp-client-preview';
import { Fabric } from 'office-ui-fabric-react';
import TodoForm from '../TodoForm/TodoForm';
import styles from './TodoContainer.module.scss';
import ITodoItem from '../../models/ITodoItem';
import TodoList from '../TodoList/TodoList';
import ITodoContainerProps from './ITodoContainerProps';
import ITodoContainerState from './ITodoContainerState';
import update = require('react-addons-update');

export default class Todo extends React.Component<ITodoContainerProps, ITodoContainerState> {

  //private _dataProvider: ITodoDataProvider;
  private _showPlaceHolder: boolean = true;

  constructor(props: ITodoContainerProps) {
    super(props);

    if (this.props.dataProvider.selectedList) {
      if (this.props.dataProvider.selectedList.Id !== '0') {
        this._showPlaceHolder = false;
      }
      else if (this.props.dataProvider.selectedList.Id === '0') {
        this._showPlaceHolder = true;
      }
    } else {
      this._showPlaceHolder = true;
    }

    this.state = {
      todoItems: []
    };

    this._configureWebPart = this._configureWebPart.bind(this);
    this._createTodoItem = this._createTodoItem.bind(this);
    this._completeTodoItem = this._completeTodoItem.bind(this);
    this._deleteTodoItem = this._deleteTodoItem.bind(this);
  }

  public componentWillReceiveProps(props: ITodoContainerProps) {
    //if (props.selectedList) {
    if (this.props.dataProvider.selectedList) {
      if (this.props.dataProvider.selectedList.Id !== '0') {
        //this._dataProvider.selectedList = props.selectedList;
        this._showPlaceHolder = false;
        this.props.dataProvider.getItems().then(
          (items: ITodoItem[]) => {
            const newItems = update(this.state.todoItems, { $set: items });
            this.setState({ todoItems: newItems });
          });
      }
      else if (this.props.dataProvider.selectedList.Id === '0') {
        this._showPlaceHolder = true;
      }
    } else {
      this._showPlaceHolder = true;
    }
  }

  public componentDidMount() {
    if (!this._showPlaceHolder) {
      this.props.dataProvider.getItems().then(
        (items: ITodoItem[]) => {
          this.setState({ todoItems: items });
        });
    }
  }

  public render(): JSX.Element {
    return (
      <Fabric>
        { this._showPlaceHolder && this.props.webPartDisplayMode === DisplayMode.Edit &&
          <Placeholder
            icon={ 'ms-Icon--Edit' }
            iconText='Todos'
            description='Get things done. Organize and share your team\'s to-do items with your team.'
            buttonLabel='Configure'
            onAdd={ this._configureWebPart.bind(this) }  />
        }
        { this._showPlaceHolder && this.props.webPartDisplayMode === DisplayMode.Read &&
          <Placeholder
            icon={ 'ms-Icon--Edit' }
            iconText='Todos'
            description='Get things done. Organize and share your team\'s to-do items with your team. Edit this web part to start managing to-dos.' />
        }
        { !this._showPlaceHolder &&
          <div className={ styles.todo }>
            <div className={ styles.topRow }>
              <h2 className={ styles.todoHeading }>{this.props.description}</h2>
            </div>
            <TodoForm onAddTodoItem={ this._createTodoItem} />
            <TodoList items={this.state.todoItems}
              onCompleteTodoItem={this._completeTodoItem}
              onDeleteTodoItem={this._deleteTodoItem} />
          </div>
        }
      </Fabric>
    );
  }

  private _configureWebPart(): void {
    this.props.configureStartCallback();
  }

  private _createTodoItem(inputValue: string): Promise<void> {
    return this.props.dataProvider.createItem(inputValue).then(
      (items: ITodoItem[]) => {
        const newItems = update(this.state.todoItems, { $set: items });
        this.setState({ todoItems: newItems });
      });
  }

  private _completeTodoItem(todoItem: ITodoItem): Promise<void> {
    return this.props.dataProvider.updateItem(todoItem).then(
      (items: ITodoItem[]) => {
        const newItems = update(this.state.todoItems, { $set: items });
        this.setState({ todoItems: newItems });
      });
  }

  private _deleteTodoItem(todoItem: ITodoItem): Promise<void> {
    return this.props.dataProvider.deleteItem(todoItem).then(
      (items: ITodoItem[]) => {
        const newItems = update(this.state.todoItems, { $set: items });
        this.setState({ todoItems: newItems });
      });
  }
}
