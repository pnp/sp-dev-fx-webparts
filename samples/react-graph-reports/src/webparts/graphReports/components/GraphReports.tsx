import * as React from 'react';
import styles from './GraphReports.module.scss';
import { IGraphReportsProps } from './IGraphReportsProps';
import { withStyles } from '@material-ui/core/styles';
import { escape } from '@microsoft/sp-lodash-subset';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { IGraphReportsState } from './IGraphReportsState';
import SharePointReports from './SharePointReports/SharePointReports';
import OneDriveReports from './OneDriveReports/OneDriveReports';
import OutlookReports from './OutlookReports/OutlookReports';

export default class GraphReports extends React.Component<IGraphReportsProps, IGraphReportsState> {

  /**
   *
   */

  constructor(props: IGraphReportsProps, state: IGraphReportsState) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);

  }


  public handleChange(event: React.ChangeEvent<{}>, value: any): void {

    this.setState({
      value: value
    });

  }


  public render(): React.ReactElement<IGraphReportsProps> {

   
    return (
      <div className={styles.graphReports}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1 className={styles.topHeader}>Office 365 usage reports</h1>
            <Paper className={styles.paper}>
              <AppBar position="static">
                <Tabs className={styles.tabBackground}  value={this.state.value} onChange={this.handleChange}>
                  <Tab label="SharePoint" />
                  <Tab label="OneDrive" />
                  <Tab label="Outlook" />
                </Tabs>
              </AppBar>
              {this.state.value === 0 && <SharePointReports customServiceScope={this.props.customServiceScope} />}
              {this.state.value === 1 && <OneDriveReports customServiceScope={this.props.customServiceScope} />}
              {this.state.value === 2 && <OutlookReports customServiceScope={this.props.customServiceScope} />}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  
}


