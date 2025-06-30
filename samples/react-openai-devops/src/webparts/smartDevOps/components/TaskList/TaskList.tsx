import * as React from "react";
import styles from "./TaskList.module.scss";
import { IWorkItemDetails } from "../../../../interfaces/webpart.types";
//import { MdOutlineTask } from "react-icons/md/";
//import parse from "html-react-parser";
import { Header, List } from "semantic-ui-react";
import { getRelativeTime, stripHtml } from "../../../../helpers/UtilityHelper";

interface ITaskListProps {
  tasks: IWorkItemDetails[];
}

const TaskList = ({ tasks }: ITaskListProps) => {
  const taskItems = tasks.map((task: IWorkItemDetails, index: number) => {
    return (
      <List key={index} divided celled animated>
        <List.Item>
          <List.Icon
            name="check square outline"
            size="large"
            verticalAlign="middle"
          />
          <List.Content>
            <List.Header
              className={styles.header}
              as="a"
              target="_blank"
              data-interception="off"
              href={task.url}
            >
              {task.title}
            </List.Header>
            <List.Description>{stripHtml(task.description)}</List.Description>
            <List.Description>
              {getRelativeTime(task.createdDate)}
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
    );
  });
  return (
    <div>
      <Header as="h2">
        Tasks
        <Header.Subheader>Tasks assigned to me </Header.Subheader>
      </Header>
      <div className={styles.taskList}>{taskItems}</div>
    </div>
  );
};

export default TaskList;
