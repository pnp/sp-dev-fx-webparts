import * as React from 'react';
import styles from './AnalysisChecklist.module.scss';
import { IAnalysisChecklistProps } from '.';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class AnalysisChecklist extends React.Component<IAnalysisChecklistProps, {}> {
  public render(): React.ReactElement<IAnalysisChecklistProps> {
    return (
      <li><Icon iconName={this.props.isValid ? 'StatusCircleCheckmark': 'StatusCircleErrorX'} className={this.props.isValid ?styles.iconGood: styles.iconBad} /> <strong>{this.props.title}:</strong> {this.props.value}</li>
    );
  }
}
