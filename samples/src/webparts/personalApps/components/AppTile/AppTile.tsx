import { FontIcon, Text } from "office-ui-fabric-react";
import { IAppTileProps } from "./IAppTileProps";
import * as React from "react";
import * as ReactDom from "react-dom";
import styles from "./AppTile.module.scss";
import { PropertyFieldCollectionDataHost } from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";

export const AppTile = (props: IAppTileProps) => {
  return (
    <>
      <div
        className={styles.tile}
        title={props.description}
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
        </div>
      </div>
    </>
  );
};
