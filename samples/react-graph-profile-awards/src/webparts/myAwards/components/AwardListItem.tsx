import * as React from "react";
import { IAwardBaseProps } from "./IAwardBaseProps";
import styles from './Awards.module.scss';

export default class AwardListItem extends React.Component<
  IAwardBaseProps,
  {}
> {
  constructor(props: IAwardBaseProps) {
    super(props);
  }

  public render(): React.ReactElement<IAwardBaseProps> {
    const {
      id,
      displayName,
      description,
      issuedDate,
      issuingAuthority,
      thumbnailUrl,
      webUrl,
    } = this.props.award;

    return (
      <div className={styles.award_list_item} id={id}>
        <div className={styles.award_list_item_img}>
          <img src={thumbnailUrl} alt={displayName} />
        </div>
        <div className={styles.award_list_item_content}>
          <div className={styles.award_issuedby}>{issuingAuthority}</div>
          <div className={styles.award_title}>{displayName}</div>
          <div><p>{description}</p></div>
          <div className={styles.award_footer}>
            <div className={styles.award_when}>{issuedDate}</div>
            <div className={styles.award_details}>
              <a href={webUrl} target="_blank">
                View details
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
