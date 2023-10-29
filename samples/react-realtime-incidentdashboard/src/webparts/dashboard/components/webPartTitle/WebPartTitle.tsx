import * as React from "react";
import type { IReadonlyTheme } from "@microsoft/sp-component-base";
import styles from "./WebPartTitle.module.scss";

export interface IWebPartTitleProps {
  title?: string;
  titleIcon?: string;
  description?: string;
  className?: string;
  placeholder?: string;
  moreLink?: JSX.Element | (() => React.ReactNode);
  themeVariant?: IReadonlyTheme;
}

/**
 * Web Part Title component
 */
export class WebPartTitle extends React.Component<IWebPartTitleProps, {}> {
  /**
   * Constructor
   */
  constructor(props: IWebPartTitleProps) {
    super(props);
  }

  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IWebPartTitleProps> {
    const color: string =
      (!!this.props.themeVariant &&
        this.props.themeVariant?.semanticColors?.bodyText) ||
      "";

    if (this.props.title || this.props.titleIcon || this.props.description) {
      return (
        <div
          className={`${styles.webPartHeader} ${
            this.props.className ? this.props.className : ""
          }`}
        >
          <div className={styles.webPartTitle} style={{ color: color }}>
            <h2>{this.props.title && this.props.title}</h2>
          </div>
          {this.props.description && (
            <div className={styles.webpartDescription}>
              {this.props.description && this.props.description}
            </div>
          )}
          {this.props.moreLink && (
            <span className={styles.moreLink}>
              {typeof this.props.moreLink === "function"
                ? this.props.moreLink()
                : this.props.moreLink}
            </span>
          )}
        </div>
      );
    }
    return <></>;
  }
}
