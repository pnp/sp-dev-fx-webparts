
import {
  Icon,
  Stack,
  DocumentCardTitle,
} from "office-ui-fabric-react";
import styles from "./News.module.scss";
import * as React from "react";

export const NoNews = ():JSX.Element => {
  return (
    <>
      <div className="card">
        <Stack
          style={{ justifyContent: "center", alignItems: "center" }}
          verticalAlign="center"
          tokens={{ childrenGap: 5 }}
        >
          <div>
            <Icon iconName="News" className={styles.nonewsIcon} />
          </div>
          <DocumentCardTitle
            title="No News find at this moment"
            className={styles.nonewsMessage}
          ></DocumentCardTitle>
        </Stack>
      </div>
      <div className="separator"></div>
    </>
  );
};
