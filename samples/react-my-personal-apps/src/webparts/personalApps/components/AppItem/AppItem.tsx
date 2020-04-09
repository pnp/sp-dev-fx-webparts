import {
  FontIcon,
  Text,
} from "office-ui-fabric-react";
import { IAppItemProps } from "./IAppItemProps";
import * as React from "react";
import styles from "./AppItem.module.scss";

export const AppItem = (props: IAppItemProps) => {
  return (
    <>
        <div
          className={styles.card}
          onClick={event => {
            event.preventDefault();
            window.open(props.url, "_blank");
          }}
        >
          <div className={styles.imageContainer}>
            <FontIcon
              iconName={props.iconName}
              className={styles.image}
            ></FontIcon>
          </div>
          <div>
            <div className={styles.title}>{props.title}</div>
            <Text variant="small" block>
              {props.description}
            </Text>
          </div>
        </div>
    </>
  );
};
