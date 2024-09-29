import { css } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import * as React from "react";
import { IEnhancedButtonWebPartProps } from "../EnhancedButtonWebPart";
import styles from "./EnhancedButton.module.scss";

export default function EnhancedButton(
  props: IEnhancedButtonWebPartProps
): React.ReactElement {
  const id = useId();

  return (
    <>
      <style>
        {`
        #${id}.${styles.enhancedButton} {
          --justify-content: ${props.buttonAlignment};
          --width: ${props.width || "auto"};
          --height: ${props.height || "auto"};
          --border-radius: ${props.borderRadius || "4px"};
        }
        #${id}.${styles.enhancedButton}.customCss {
          ${props.containerStyles}
        }
        #${id}.customCss .${styles.link} {
          ${props.buttonStyles}
        }

        #${id}.customCss .${styles.link}:hover {
          ${props.buttonOnHoverStyles}
        }
      `}
      </style>
      <div id={id} className={css(styles.enhancedButton, "customCss")}>
        <a
          rel="noopener noreferrer"
          href={props.link}
          className={styles.link}
          target={props.linkBehaviour}
        >
          {props.label}
        </a>
      </div>
    </>
  );
}
