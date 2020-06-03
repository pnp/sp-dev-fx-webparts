import * as React from 'react';
import styles from './Covid19Info.module.scss';
import { ICovid19InfoProps } from './ICovid19InfoProps';
import { ICovid19InfoState } from './ICovid19InfoState';
import { DisplayMode } from '@microsoft/sp-core-library';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Modal, IModalStyleProps, IModalStyles } from 'office-ui-fabric-react/lib/Modal';
import { mergeStyleSets, IStyle } from "office-ui-fabric-react/lib/Styling";
import { ICoronaService } from '../../../services/ICoronaService';
import { CoronaService } from '../../../services/CoronaService';
import { HistoryModal } from "./HistoryModal/HistoryModal";
import CountUp from "react-countup";
import { ICoronaInfoHistory } from '../../../models/ICoronaInfoHistory';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export default class Covid19Info extends React.Component<ICovid19InfoProps, ICovid19InfoState> {

  private coronaService: ICoronaService;

  constructor(props: ICovid19InfoProps) {
    super(props);

    this.coronaService = new CoronaService(props.httpClient);

    this.state = {
      isLoading: true,
      coronaInfo: undefined,
      globalError: undefined,
      showHistoryModal: false
    };
  }

  public componentDidMount() {
    this._loadData();
  }

  public componentDidUpdate(prevProps: ICovid19InfoProps) {
    if (prevProps.countryCode !== this.props.countryCode) {
      this._loadData();
    }
  }

  public render(): React.ReactElement<ICovid19InfoProps> {

    // No country code specified
    if (!this.props.countryCode) {
      if (this.props.displayMode === DisplayMode.Read) {
        return this._renderNoCountryCode();
      } else {
        return this._renderPlaceHolder();
      }
    }

    // Is loading
    if (this.state.isLoading) {
      return this._renderSpinner();
    }

    // Global Error
    if (this.state.globalError) {
      return this._renderError();
    }

    // No data found
    if (this.state.coronaInfo === null) {
      return this._renderNoData();
    }
    const confirmedColor: string = this.props.confirmedColor
      ? this.props.confirmedColor
      : "#69797e";

    const deathColor: string = this.props.deathColor
      ? this.props.deathColor
      : "#d13438";

    const recoveredColor: string = this.props.recoveredColor
      ? this.props.recoveredColor
      : "#498205";

    return (
      <div className={styles.covid19Info}>
        <div className={styles.container}>
          {this.props.showHistory && (
            <IconButton
              className={styles.historyIcon}
              iconProps={{iconName: "Chart"}}
              label={"View history"}
              onClick={() => this._showHistoryModal()}
            />
          )}
          <IconButton
            className={styles.refreshIcon}
            iconProps={{iconName: "Refresh"}}
            label={"Refresh data"}
            onClick={() => this._loadData()}
          />
          <div className={styles.countryRow}>
            <div className={styles.country}>
              <Icon className={styles.icon} iconName={"Globe"}/>
              <span className={styles.text}>{this.state.coronaInfo.countryregion}</span>
            </div>
          </div>
          <div className={styles.detailsRow}>
            <div className={styles.infoColumn}>
              <div className={styles.label}>{"Confirmed Cases"}</div>
              <div className={styles.number} style={{ color: confirmedColor}}>
                <CountUp
                  end={this.state.coronaInfo.confirmed}
                  duration={this.props.countUpTime}
                />
              </div>
            </div>
            <div className={styles.infoColumn}>
              <div className={styles.label}>{"Deaths"}</div>
              <div className={styles.number} style={{ color: deathColor}}>
                <CountUp
                  end={this.state.coronaInfo.deaths}
                  duration={this.props.countUpTime}
                />
              </div>
            </div>
            <div className={styles.infoColumn}>
              <div className={styles.label}>{"Recovered"}</div>
              <div className={styles.number} style={{ color: recoveredColor}}>
                <CountUp
                  end={this.state.coronaInfo.recovered}
                  duration={this.props.countUpTime}
                />
              </div>
            </div>
          </div>
          <div className={styles.lastUpdatedRow}>
            <div className={styles.lastUpdated}>
              {`Last updated:
                ${new Date(this.state.coronaInfo.lastupdate).toLocaleDateString()}
                ${new Date(this.state.coronaInfo.lastupdate).toLocaleTimeString()}`
              }
              {this.props.viewMoreLink &&
                <span> - <Link target={"_blank"} href={this.props.viewMoreLink}>View more statistics</Link></span>
              }
            </div>
          </div>
          <Modal
            isOpen={this.state.showHistoryModal}
            onDismiss={this._closeHistoryModal}
            isBlocking={false}
            styles={this._getModalStyles()}
          >

            <HistoryModal
              countryCode={this.props.countryCode}
              confirmedColor={confirmedColor}
              deathColor={deathColor}
              recoveredColor={recoveredColor}
              _loadHistoryData={this._loadHistoryData}
            />
          </Modal>
        </div>
      </div>
    );
  }

  private _loadData = async (): Promise<void> => {
    this.setState({isLoading: true});
    try {
      const coronaInfo = await this.coronaService.getCountryInfo(this.props.countryCode);
      this.setState({
        isLoading: false,
        coronaInfo
      });
    } catch (error) {
      this.setState({
        coronaInfo: undefined,
        isLoading: false,
        globalError: (error as Error).message
      });
    }
  }
  private _loadHistoryData = async (): Promise<ICoronaInfoHistory> => {
    return await this.coronaService.getCountryHistory(this.props.countryCode);
  }
  private _showHistoryModal = (): void => {
    this.setState({
      showHistoryModal: true
    });
  }
  private _closeHistoryModal = (): void => {
    this.setState({
      showHistoryModal: false
    });
  }

  private _renderNoCountryCode = (): JSX.Element => {
    return (
      <MessageBar messageBarType={MessageBarType.warning}>
        {"Please provide a country code in the web part properties!"}
      </MessageBar>
    );
  }
  private _renderPlaceHolder = (): JSX.Element => {
    return (
      <Placeholder
        iconName='Edit'
        iconText='Configure your web part'
        description='Please provide a country code in the web part properties'
        buttonLabel='Configure'
        onConfigure={this.props.onConfigure} />
    );
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
        {`No COVID-19 data could be found for country code: '${this.props.countryCode}'`}
      </MessageBar>
    );
  }

  private _getModalStyles = (): IStyleFunctionOrObject<IModalStyleProps, IModalStyles> => {
    const modalStyles: IStyleFunctionOrObject<IModalStyleProps, IModalStyles> = {
      main: {
        width: "750px",
        height: "500px",
        padding: "15px"
      }
    };

    return modalStyles;
  }
}
