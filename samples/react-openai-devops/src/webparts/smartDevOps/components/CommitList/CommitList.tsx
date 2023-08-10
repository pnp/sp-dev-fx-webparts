import * as React from "react";
import styles from "./CommitList.module.scss";
import { List, Image, Header, Label } from "semantic-ui-react";
import { ICommitDetail } from "../../../../interfaces/webpart.types";
import { getInitials } from "../../../../helpers/UtilityHelper";

interface ICommitListProps {
  commits: ICommitDetail[];
  respositoryName?: string;
}

const CommitList = ({ commits, respositoryName }: ICommitListProps) => {
  const recentCommits = commits.map((commit: ICommitDetail, index: number) => {
    return (
      <List key={commit.commitId} selection size="medium">
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
          />
          <List.Content>
            <List.Header
              className={styles.header}
              as="a"
              target="_blank"
              data-interception="off"
              href={commit.remoteUrl}
            >
              {commit.comment}
            </List.Header>
            <List.Description>
              <List.Item>
                {/* <Label basic horizontal>
                  Created
                </Label> */}
                {commit.committer.date}
                <Label as="a" style={{ marginLeft: "5px" }} horizontal>
                  {commit.commitId}
                </Label>
                <Label
                  as="a"
                  color="teal"
                  style={{ marginLeft: "5px" }}
                  horizontal
                >
                  {getInitials(commit.committer.name)}
                </Label>
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
        Recent commits
        <Header.Subheader>
          Recent commits from DevOps git repository - {respositoryName}
        </Header.Subheader>
      </Header>
      <div className={styles.commitList}>{recentCommits}</div>
    </div>
  );
};

export default CommitList;
