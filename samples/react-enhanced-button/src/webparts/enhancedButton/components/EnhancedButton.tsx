import { css } from "@fluentui/react";
import * as React from "react";
import { IEnhancedButtonWebPartProps } from "../EnhancedButtonWebPart";
import styles from "./EnhancedButton.module.scss";

export default function EnhancedButton(
  props: IEnhancedButtonWebPartProps
): React.ReactElement {
  return (
    <>
      <style>
        {`
        .${styles.enhancedButton} {
          --justify-content: ${props.buttonAlignment};
        }
        .${styles.enhancedButton}.customCss {
          ${props.containerStyles}
        }
        .customCss .${styles.link} {
          ${props.buttonStyles}
        }

        .customCss .${styles.link}:hover {
          ${props.buttonOnHoverStyles}
        }
      `}
      </style>
      <div className={css(styles.enhancedButton, "customCss")}>
        <a href={props.link} className={styles.link}>
          {props.label}
        </a>
      </div>
    </>
  );
}
