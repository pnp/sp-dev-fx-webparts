import * as React from "react";
import styles from "./CreateTask.module.scss";
import { ICreateTaskProps } from "./ICreateTaskProps";
import { ITodoList, ITodoListItem } from "../models/ITodo";
import { ICreateTaskState } from "./ICreateTaskState";
import {
  Stack,
  Dropdown,
  IDropdownOption,
  Label,
  TextField,
  IStackTokens,
  IDropdownStyles,
  PrimaryButton,
  MessageBar,
  Link,
  MessageBarType
} from "office-ui-fabric-react";

export default class CreateTask extends React.Component<
  ICreateTaskProps,
  ICreateTaskState
> {
  constructor(props: ICreateTaskProps) {
    super(props);

    this.state = {
      listItemAdded: false,
      selectedList: undefined,
      todoLists: [],
      newTaskTitle: this.props.context.item ? this.props.context.item.subject : "New Task title here!",
      showSelectListError: false
    };

    this._onDropdownChange = this._onDropdownChange.bind(this);
    this._onChangeNewTaskTitle = this._onChangeNewTaskTitle.bind(this);
    this._createTask = this._createTask.bind(this);
  }

  private async _getTodoLists(): Promise<ITodoList[]> {
    const endpoint: string = "https://graph.microsoft.com/beta/me/todo/lists";
    const response: any = await this.props.context.graphHttpClient
      .api(endpoint)
      .get();
    const graphResponse: any = response.value;

    const todoLists: ITodoList[] = graphResponse.map((item) => {
      const list: ITodoList = { id: item.id, displayName: item.displayName };
      return list;
    });

    return todoLists;
  }

  public async componentDidMount(): Promise<void> {
    const lists: ITodoList[] = await this._getTodoLists();
    this.setState({
      todoLists: lists,
    });
  }

  public render(): React.ReactElement<ICreateTaskProps> {
    if (this.state.todoLists.length <= 0) {
      return <div>Loading to-do lists...</div>;
    }

    const options: IDropdownOption[] = this.state.todoLists.map((item) => {
      const dropdownOption: IDropdownOption = {
        key: item.id,
        text: item.displayName,
      };
      return dropdownOption;
    });

    const horizontalGapStackTokens: IStackTokens = {
      childrenGap: 10,
    };

    const dropdownStyles: Partial<IDropdownStyles> = {
      dropdown: { width: 200 },
    };

    const ActionInfo =
      <MessageBar messageBarType={MessageBarType.success}>
        Your task has been added!
        <Link href="https://to-do.office.com/tasks" target="_blank">
          Open To Do App
        </Link>
      </MessageBar>
    ;

    return (
      <Stack verticalAlign="end" tokens={horizontalGapStackTokens} styles={{root: {padding: '10px'}}}>
        <Label styles={{root: {fontSize:'18px', fontWeight:'bold'}}}>To Do Outlook SPFx Add-in</Label>
        <Stack>
          <Dropdown
            placeholder="Select a to-do list"
            options={options}
            onChange={this._onDropdownChange}
            styles={dropdownStyles}
            errorMessage={this.state.showSelectListError ? 'Please select a To Do list' : undefined}
          />
        </Stack>
        <Stack styles={{ root: { width: "100%" } }}>
          <TextField
            value={this.state.newTaskTitle}
            onChange={this._onChangeNewTaskTitle}
          />
        </Stack>
        <Stack>
          <PrimaryButton text="Add Task" onClick={this._createTask} />
        </Stack>
        <Stack>
          {this.state.listItemAdded ? ActionInfo : null}
        </Stack>
      </Stack>
    );
  }

  private _onDropdownChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    const selectedList: ITodoList = this.state.todoLists.filter(
      (i) => i.id === item.key
    )[0];

    this.setState({
      selectedList: selectedList,
      showSelectListError: false
    });
  }

  private _onChangeNewTaskTitle(
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) {
    if (newValue) {
      this.setState({
        newTaskTitle: newValue,
      });
    }
  }

  private async _createTask(): Promise<void> {
    try {

      if (!this.state.selectedList) {
        this.setState({
          showSelectListError: true
        });
        return;
      }

      const listId: string = this.state.selectedList.id;
      const taskTitle: string = this.state.newTaskTitle;

      const endpoint: string = `https://graph.microsoft.com/beta/me/todo/lists/${listId}/tasks`;

      const body: ITodoListItem = {
        importance: "high",
        status: "notStarted",
        title: taskTitle,
        body: {
          content: this._composeBody(this.props.context.item.body),
          contentType: "html",
        },
      };

      var response: any = await this.props.context.graphHttpClient
        .api(endpoint)
        .post(body);

      this.setState({
        listItemAdded: true
      });

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  private _composeBody(emailBody: string): string {
    const id: string = encodeURIComponent(this.props.context.item.id);
    const link: string = `<a href='https://outlook.office365.com/owa/?ItemID=${id}&exvsurl=1&viewmodel=ReadMessageItem'>Open in Outlook</a>`;
    return `${emailBody}<p style='font-size: large; padding-top: 10px;'>${link}</p>`;
  }
}
