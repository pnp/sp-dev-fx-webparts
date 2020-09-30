import * as React from 'react';
import styles from '../GraphReports.module.scss';
import Grid from '@material-ui/core/Grid';
import { ServiceScope } from '@microsoft/sp-core-library';
import GetEmailActivityUserDetail from './GetEmailActivityUserDetail/GetEmailActivityUserDetail';




export interface IOutlookReportsProps {
  customServiceScope: ServiceScope;
}
export interface IOutlookReportsState {
  data: any[];
  period: number;

}

export default class OutlookReports extends React.Component<IOutlookReportsProps, IOutlookReportsState> {
  /**
     *
     */
  constructor(props: IOutlookReportsProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }


  public handleChange(): void {

    // this.setState({
    //   selectedReport: event.target.value
    // });

  }



  public render(): React.ReactElement<IOutlookReportsProps> {

    return (
      <div className={styles.sharepointDashboard}>

        <Grid item xs={12} className={styles.header}>
          <GetEmailActivityUserDetail customServiceScope={this.props.customServiceScope} />
        </Grid>

      </div>
    );
  }
}
