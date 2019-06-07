import * as React from 'react';
import styles from '../GraphReports.module.scss';
import { ISharePointReportsProps } from './ISharePointReportsProps';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { ISharePointReportsState } from './ISharePointReportsState';
import { MenuItem } from '@material-ui/core';
import GetSharePointSiteUsagePages from './GetSharePointSiteUsagePages/GetSharePointSiteUsagePages';
import GetSharePointSiteUsageSiteCounts from './GetSharePointSiteUsageSiteCounts/GetSharePointSiteUsageSiteCounts';
import GetSharePointActivityFileCounts from './GetSharePointActivityFileCounts/GetSharePointActivityFileCounts';

export default class SharePointReports extends React.Component<ISharePointReportsProps, ISharePointReportsState> {
  /**
     *
     */
  constructor(props: ISharePointReportsProps) {
    super(props);

    this.state = {
      selectedReport: "sharePoint-site-usage"
    };
    this.handleChange = this.handleChange.bind(this);
  }


  public handleChange(event: any): void {

    this.setState({
      selectedReport: event.target.value
    });

  }


  private _renderSelectedReports(param) {
    switch (param) {
      case 'sharePoint-site-usage':
        return (
          <div>
            <GetSharePointSiteUsagePages customServiceScope={this.props.customServiceScope} />
            <GetSharePointSiteUsageSiteCounts customServiceScope={this.props.customServiceScope} />
          </div>
        );
      case 'sharepoint-activity':
        return <GetSharePointActivityFileCounts customServiceScope={this.props.customServiceScope} />;
      default:
        return 'sharePoint-site-usage';
    }
  }

  public render(): React.ReactElement<ISharePointReportsProps> {



    const reports = [
      {
        value: 'sharePoint-site-usage',
        label: 'SharePoint Site Usage'
      },
      {
        value: 'sharepoint-activity',
        label: 'SharePoint Activity'
      }
    ];




    return (
      <div className={styles.sharepointDashboard}>

        <Grid item xs={6}>
          <TextField
            id="outlined-select-currency"
            select
            label="Analytics Reports"
            // className={classes.textField}
            value={this.state.selectedReport}
            onChange={(e) => this.handleChange(e)}
            // SelectProps={{
            //   MenuProps: {
            //     className: classes.menu,
            //   },
            // }}
            // helperText="Please select report"
            margin="normal"
            variant="outlined"
          >
            {reports.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>       

        {this._renderSelectedReports(this.state.selectedReport)}






      </div>
    );
  }
}
