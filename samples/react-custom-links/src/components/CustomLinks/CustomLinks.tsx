import * as React from "react";
import styles from "./CustomLinks.module.scss";
import { ICustomLinksProps } from "./ICustomLinksProps";
import { ICustomLinksState } from "./ICustomLinksState";
import { escape } from "@microsoft/sp-lodash-subset";
import { ILink } from "../../entities/ILink";
import { Stack, FontIcon, Link, ILinkStyles } from "office-ui-fabric-react";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export default class CustomLinks extends React.Component<
  ICustomLinksProps,
  {}
> {
  constructor(props: ICustomLinksProps) {
    super(props);
  }

  public componentDidMount = (): void => {};

  public componentDidUpdate = (
    prevProps: ICustomLinksProps,
    prevState: ICustomLinksState
  ): void => {}

  public render(): React.ReactElement<ICustomLinksProps> {
    console.log(this.props);
    const {
      links,
      color,
      backgroundColor,
      maxHeight,
      maxWidth,
      fontSize,
      title,
      themeVariant,
    } = this.props;

    if (links.length === 0) {
      return (
        <Placeholder
          iconName="Edit"
          iconText="Configure your custom links web part"
          description="Please configure the web part."
          buttonLabel="Configure"
          onConfigure={this.props.onConfigure}
        />
      );
    }

    return (
      <div className={styles.CustomLinks}>
        <div
          className={styles.container}
          style={{
            backgroundColor: backgroundColor
              ? backgroundColor
              : themeVariant.palette.themePrimary,
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            overflow: "auto",
          }}
        >
          <Stack verticalAlign="start" tokens={{ childrenGap: 15 }}>
            <span style={{ color: color }} className={styles.title}>
              {title}
            </span>
            {links &&
              links.map((link: ILink, i: number) => {
                return (
                  <Stack
                    key={i}
                    horizontal
                    verticalAlign="center"
                    tokens={{ childrenGap: 10 }}
                    style={{ marginRight: 25 }}
                  >
                    <FontIcon
                      iconName={link.linkIcon ? link.linkIcon : "link"}
                      style={{
                        width: fontSize + 8,
                        height: fontSize + 8,
                        fontSize: fontSize + 8,
                        color: color,
                      }}
                    ></FontIcon>
                    <Link
                      styles={{
                        root: {
                          color: color,
                          fontSize: fontSize,
                          width: "100%",
                          selectors: {
                            [":hover"]: {
                              color: color,
                              textDecoration: "underline",
                            },
                            [":visited"]: { color: color },
                            [":focus"]: { color: color },
                            [":active"]: { color: color },
                          },
                        },
                      }}
                      href={link.linkURL}
                      target="_blank"
                      title={link.linkName}
                    >
                      <div
                        className={styles.label}
                        style={{ fontSize: fontSize }}
                      >
                        {link.linkName}
                      </div>
                    </Link>
                  </Stack>
                );
              })}
          </Stack>
        </div>
      </div>
    );
  }
}
