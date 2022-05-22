import * as React from "react";
import styles from "./MyAwards.module.scss";
import { IAward } from "../../../models/IAward";

export interface IAwardProps {
  award: IAward;
}

export default class MyAwards extends React.Component<IAwardProps, {}> {
  public render(): React.ReactElement<IAwardProps> {
    const {
      displayName,
      description,
      issuedDate,
      issuingAuthority,
      thumbnailUrl,
      webUrl,
    } = this.props.award;

    return (
      <div>
        <div className={styles.award}>
          <div className={styles.awardPreview}>
            <h6>{issuingAuthority}</h6>
            <img
              src={thumbnailUrl}
              alt="Award"
            />
            <a href={webUrl}>
              View details
            </a>
          </div>
          <div className={styles.awardInfo}>
            <h6>{issuedDate}</h6>
            <h2>{displayName}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }
}
