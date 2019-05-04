import * as React from 'react';
import styles from '../GraphReports.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { escape } from '@microsoft/sp-lodash-subset';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';

import { MenuItem } from '@material-ui/core';
import { ServiceScope } from '@microsoft/sp-core-library';
import { css } from '@uifabric/utilities';
import GetOneDriveUsageFileCounts from './GetOneDriveUsageFileCounts/GetOneDriveUsageFileCounts';


export interface IOneDriveReportsProps {
    customServiceScope: ServiceScope;
}

export interface IOneDriveReportsState {
    data: [];
}

export default class OneDriveReports extends React.Component<IOneDriveReportsProps, IOneDriveReportsState> {
    /**
       *
       */
    constructor(props: IOneDriveReportsProps, state: IOneDriveReportsState) {
        super(props);

      
    }


   



    public render(): React.ReactElement<IOneDriveReportsProps> {

        return (
            <div className={styles.oneDriveDashboard}>
                <Grid item xs={12} className={styles.header}>
                    <GetOneDriveUsageFileCounts customServiceScope={this.props.customServiceScope} />
                </Grid>

            </div>
        );
    }
}
