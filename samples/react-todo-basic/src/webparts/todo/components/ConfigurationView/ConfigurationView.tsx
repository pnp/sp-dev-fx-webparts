import * as React from 'react';
import {
  TextField,
  Button,
  ButtonType
} from 'office-ui-fabric-react';
import styles from './ConfigurationView.module.scss';
import IConfigurationViewState from './IConfigurationViewState';
import IConfigurationViewProps from './IConfigurationViewProps';

export default class ConfigurationView extends React.Component<IConfigurationViewProps, IConfigurationViewState>{

  private _placeHolderText: string = 'Enter your todo';

  constructor(props: IConfigurationViewProps) {
    super(props);

    this.state = {
      inputValue: ''
    };

    this._handleConfigureButtonClick = this._handleConfigureButtonClick.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className="Placeholder">
          <div className="Placeholder-container ms-Grid">
              <div className="Placeholder-head ms-Grid-row">
                  <div className="ms-Grid-col ms-u-hiddenSm ms-u-md3"></div>
                  <div className="Placeholder-headContainer ms-Grid-col ms-u-sm12 ms-u-md6">
                    <i className={"Placeholder-icon ms-fontSize-su ms-Icon " + (this.props.icon)}></i><span className="Placeholder-text ms-fontWeight-light ms-fontSize-xxl">{this.props.iconText}</span></div>

                    
                  <div className="ms-Grid-col ms-u-hiddenSm ms-u-md3"></div>
              </div>
              <div className="Placeholder-description ms-Grid-row"><span className="Placeholder-descriptionText">{this.props.description}</span></div>
              <div className="Placeholder-description ms-Grid-row">
                  <Button
                    className={ styles.configureButton }
                    buttonType={ ButtonType.primary }
                    ariaLabel={ this.props.buttonLabel }
                    onClick={this._handleConfigureButtonClick}>
                    {this.props.buttonLabel}
                  </Button>
              </div>
          </div>
      </div>
    );
  }

  private _handleConfigureButtonClick(event?: React.MouseEvent<HTMLButtonElement>) {
    this.props.onConfigure();
  }
}
