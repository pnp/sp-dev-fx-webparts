import * as React from 'react';
import styles from './HistoryModal.module.scss';
import { IHistoryModalProps } from "./IHistoryModalProps";
import { IHistoryModalState } from "./IHistoryModalState";
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { ICoronaInfoHistory } from '../../../../models/ICoronaInfoHistory';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IDataPoint } from "./IDataPoint";
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export class HistoryModal extends React.Component<IHistoryModalProps, IHistoryModalState> {

  constructor(props: IHistoryModalProps) {
    super(props);

    this.state = {
      isLoading: true,
      globalError: undefined,
      historyData: undefined
    };
  }

  public componentDidMount() {
    this._loadData();
  }

  public render(): React.ReactElement<IHistoryModalProps> {

    // Is loading
    if (this.state.isLoading) {
      return this._renderSpinner();
    }

    // Global Error
    if (this.state.globalError) {
      return this._renderError();
    }

    // No data found
    if (this.state.historyData === null) {
      return this._renderNoData();
    }

    const mappedData = this._mapHistoryData(this.state.historyData);

    return (
      <div className={styles.historyModalContainer}>
        <div className={styles.countryRow}>
          <div className={styles.country}>
            <Icon className={styles.icon} iconName={"Globe"}/>
            <span className={styles.text}>{this.state.historyData.countryregion}</span>
          </div>
        </div>
        <Pivot>
          <PivotItem className={styles.pivotChart} headerText={"Confirmed cases"}>
            {this._renderChart(mappedData, "confirmed", this.props.confirmedColor, false)}
          </PivotItem>
          <PivotItem headerText={"Deaths"}>
            {this._renderChart(mappedData, "deaths", this.props.deathColor, false)}
          </PivotItem>
          <PivotItem headerText={"Recovered"}>
            {this._renderChart(mappedData, "recovered", this.props.recoveredColor, false)}
          </PivotItem>
          <PivotItem headerText={"All"}>
            {this._renderChart(mappedData, null, null, true)}
          </PivotItem>
        </Pivot>
      </div>
    );
  }

  private _loadData = async (): Promise<void> => {
    this.setState({isLoading: true});
    try {
      const historyData: ICoronaInfoHistory = await this.props._loadHistoryData();
      this.setState({
        isLoading: false,
        historyData
      });
    } catch (error) {
      this.setState({
        historyData: undefined,
        isLoading: false,
        globalError: (error as Error).message
      });
    }
  }

  private _mapHistoryData = (historyData: ICoronaInfoHistory): IDataPoint[] => {
    const dataPoints: IDataPoint[] = new Array();

    for(let key in historyData.timeseries) {
      dataPoints.push({
        date: key,
        confirmed: historyData.timeseries[key].confirmed,
        deaths: historyData.timeseries[key].deaths,
        recovered: historyData.timeseries[key].recovered
      });
    }

    return dataPoints;
  }

  private _renderSpinner = () => {
    return (
      <Spinner
        label={"Loading COVID-19 data...."}
        size={SpinnerSize.medium}
      />
    );
  }
  private _renderError = (): JSX.Element => {
    return (
      <MessageBar messageBarType={MessageBarType.error}>
        {this.state.globalError}
      </MessageBar>
    );
  }
  private _renderNoData = (): JSX.Element => {
    return (
      <MessageBar messageBarType={MessageBarType.info}>
        {`No historical data could be found for country code: '${this.props.countryCode}'`}
      </MessageBar>
    );
  }
  private _renderChart = (data: IDataPoint[], dataKey: string, color: string, showAll: boolean): JSX.Element => {
    if (showAll) {
      return (
        <LineChart
          width={700}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type={"monotone"} dataKey={"confirmed"} stroke={this.props.confirmedColor} />
          <Line type={"monotone"} dataKey={"deaths"} stroke={this.props.deathColor} />
          <Line type={"monotone"} dataKey={"recovered"} stroke={this.props.recoveredColor} />
        </LineChart>
      );
    }
    return (
      <LineChart
        width={700}
        height={300}
        data={data}
      >
        <CartesianGrid />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type={"monotone"} dataKey={dataKey} stroke={color} />
      </LineChart>
    );
  }
}
