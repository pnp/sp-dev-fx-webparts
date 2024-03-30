import * as React from "react";
import { Text } from "@fluentui/react-components";
import styles from "../webparts/awardRecognition/components/AwardRecognition.module.scss";
import { ContentProps } from "../types/ContentProps"
import { useContext } from "react";
import { WebpartContext } from "../webparts/awardRecognition/components/AwardRecognition";

export const Content = ({ user }: ContentProps): JSX.Element => {
  const contextInfo = useContext(WebpartContext);

  return (
    <section className={styles.contentWrapper}>
      <Text size={600} weight="semibold">
        {contextInfo.webpartTitle}
      </Text>
      <div className={styles.contentDescriptionWrapper}>
        <Text size={400} weight="semibold" className={styles.contentTitle}>
          {contextInfo.contentTitle}
        </Text>
        <Text size={300}>{contextInfo.contentDescription}</Text>
      </div>

      <div className={styles.userInfo}>
        <Text size={800} weight="semibold" className={styles.userName}>
          {user?.Title}
        </Text>
        <Text size={400}>{user?.Designation}</Text>
      </div>
    </section>
  );
};
