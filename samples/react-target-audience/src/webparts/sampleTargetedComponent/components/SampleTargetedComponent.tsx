import * as React from "react";
import styles from "./SampleTargetedComponent.module.scss";
import { ISampleTargetedComponentProps } from "./ISampleTargetedComponentProps";
import TargetAudience, {
  ITargetAudienceState
} from "../../../common/TargetAudience";
export interface ISampleTargetedComponentState extends ITargetAudienceState {
  description?: string;
}
export default class SampleTargetedComponent extends React.Component<ISampleTargetedComponentProps,ISampleTargetedComponentState> {
  constructor(props: ISampleTargetedComponentProps) {
    super(props);
    this.state = {
      description: this.props.description
    };
  }

  public render(): JSX.Element {
    return (
    <TargetAudience pageContext={this.props.pageContext} groupIds={this.props.groupIds}>
     <div className={styles.sampleTargetedComponent}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Sample webpart</span>
              <p className={styles.subTitle}>{this.state.description}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </TargetAudience>
    );
  }
}
