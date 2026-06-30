import * as React from 'react';
import styles from './OfficeBreakOut.module.scss';
import type { IOfficeBreakOutProps } from './IOfficeBreakOutProps';

import { OfficeBreakout } from '../../../officebreakout/OfficeBreakout';


// Functional component wrapper to ensure proper hook context
const OfficeBreakoutWrapper: React.FC<IOfficeBreakOutProps> = (props) => {
  const {
    hasTeamsContext,
  } = props;

  return (
    <section className={`${styles.officeBreakOut} ${hasTeamsContext ? styles.teams : ''}`}>
      <OfficeBreakout /> 
    </section>
  );
};

export default class OfficeBreakOutWP extends React.Component<IOfficeBreakOutProps> {
  public render(): React.ReactElement<IOfficeBreakOutProps> {
    return <OfficeBreakoutWrapper {...this.props} />;
  }
}
