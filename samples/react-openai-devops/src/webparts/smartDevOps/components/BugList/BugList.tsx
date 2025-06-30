import * as React from "react";
import styles from "./BugList.module.scss";
import { IWorkItemBug } from "../../../../interfaces/webpart.types";
import { Header, Label, List } from "semantic-ui-react";
import { getRelativeTime, stripHtml } from "../../../../helpers/UtilityHelper";

interface IBugListProps {
  bugs: IWorkItemBug[];
}

const BugList = ({ bugs }: IBugListProps) => {
  const bugItems = bugs.map((bug: IWorkItemBug, index: number) => {
    return (
      <List key={index} selection size="mini">
        <List.Item>
          <List.Icon name="bug" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header
              className={styles.header}
              as="a"
              target="_blank"
              data-interception="off"
              href={bug.url}
            >
              {bug.title}
            </List.Header>
            <List.Description>{stripHtml(bug.description)}</List.Description>
            <List.Description className={styles.dateFormat}>
              <List.Item>
                <Label horizontal>Created</Label>
                {getRelativeTime(bug.createdDate)}
                <Label style={{ marginLeft: "5px" }} horizontal>
                  Priority
                </Label>
                {bug.priority}
              </List.Item>
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
    );
  });
  return (
    <div>
      <Header as="h2">
        Bugs
        <Header.Subheader>Bugs assigned to me</Header.Subheader>
      </Header>
      <div className={styles.bugList}>{bugItems}</div>
    </div>
  );
};

export default BugList;
