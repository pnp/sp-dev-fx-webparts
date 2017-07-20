import * as React from 'react';
import { DisplayMode } from '@microsoft/sp-core-library';
import { Placeholder } from '@microsoft/sp-webpart-base';
import { Fabric } from 'office-ui-fabric-react';
import TodoForm from '../TodoForm/TodoForm';
import styles from './TodoContainer.module.scss';
import ITodoItem from '../../models/ITodoItem';
import TodoList from '../TodoList/TodoList';
import ITodoContainerProps from './ITodoContainerProps';
import ITodoContainerState from './ITodoContainerState';
import * as update from 'immutability-helper';

export default class Todo extends React.Component<ITodoContainerProps, ITodoContainerState> {
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
    if (this.props.dataProvider.selectedList) {
      if (this.props.dataProvider.selectedList.Id !== '0') {
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
            description='Get things done. Organize and share your teams to-do items with your team.'
            buttonLabel='Configure'
            onAdd={ this._configureWebPart }  />
        }
        { this._showPlaceHolder && this.props.webPartDisplayMode === DisplayMode.Read &&
          <Placeholder
            icon={ 'ms-Icon--Edit' }
            iconText='Todos'
            description='Get things done. Organize and share your teams to-do items with your team. Edit this web part to start managing to-dos.' />
        }
        { !this._showPlaceHolder &&
          <div className={ styles.todo }>
            <div className={ styles.topRow }>
              <h2 className={ styles.todoHeading }>Todo</h2>
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

  private _createTodoItem(inputValue: string): Promise<any> {
    return this.props.dataProvider.createItem(inputValue).then(
      (items: ITodoItem[]) => {
        const newItems = update(this.state.todoItems, { $set: items });
        this.setState({ todoItems: newItems });
      });
  }

  private _completeTodoItem(todoItem: ITodoItem): Promise<any> {
    return this.props.dataProvider.updateItem(todoItem).then(
      (items: ITodoItem[]) => {
        const newItems = update(this.state.todoItems, { $set: items });
        this.setState({ todoItems: newItems });
      });
  }

  private _deleteTodoItem(todoItem: ITodoItem): Promise<any> {
    return this.props.dataProvider.deleteItem(todoItem).then(
      (items: ITodoItem[]) => {
        const newItems = update(this.state.todoItems, { $set: items });
        this.setState({ todoItems: newItems });
      });
  }
}
