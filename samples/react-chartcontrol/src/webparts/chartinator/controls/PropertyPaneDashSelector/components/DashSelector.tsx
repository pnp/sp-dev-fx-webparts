import * as React from 'react';
import {
  Dropdown,
  IDropdownOption
} from '@fluentui/react/lib/Dropdown';
import { TooltipHost, DirectionalHint } from '@fluentui/react/lib/Tooltip';

import styles from './DashSelector.module.scss';
import { IDashSelectorProps, IDashSelectorState } from './DashSelector.types';

/**
 * Displays a list of dash options.
 *
 */
export  class DashSelector extends React.Component<IDashSelectorProps, IDashSelectorState> {
  /**
   *
   */
  constructor(props: IDashSelectorProps) {
    super(props);
    this.state = {
      selectedKey: this.props.selectedKey
    };
  }

  /** Renders the dash selector */
  public render(): JSX.Element {
    return (
      <div className={styles.dashSelector}>
        <Dropdown label={this.props.label}
          disabled={this.props.disabled}
          selectedKey={this.state.selectedKey}
          options={this.props.options}
          onRenderOption={this._onRenderOption}
          onRenderTitle={this._onRenderTitle}
          onChanged={(option: IDropdownOption, index: number) => this._onChanged(option, index)} />
      </div>
    );
  }

  /**
   * Renders a drop down option
   */
  private _onRenderOption = (option: IDropdownOption): JSX.Element => {
    // Get the palette name
    const dashName: string = option.key as string;

    // Get the colors
    const strokes: number[] = option.data.strokes;

    // Build a string describing the dash
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
    let dashString: string = "";
    strokes.forEach((dashValue: number, index: number) => {
      if (index > 0) {
        dashString = dashString + ', ';
      }
      dashString = dashString + `${dashValue}px`;
    });

    return (
      <TooltipHost
        calloutProps={{ isBeakVisible: false }}
        tooltipProps={{
          onRenderContent: () => {
            return (
              <div>{option.text}</div>
            );
          }
        }}
        id={`${dashName}_tooltip`}
        directionalHint={DirectionalHint.bottomCenter}
      >
        <div className={styles.dashChoice} aria-describedby={`${dashName}_tooltip`}>
          <div
            className={styles.dashCell}
            key={`${dashName}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              className={styles.svg}
              width="350" height="20" version="1.1">
              <line stroke-dasharray={dashString} x1="0" y1="10" x2="350" y2="10" />
            </svg>
          </div>
        </div>
      </TooltipHost>
    );
  }

  /**
   * Render the palette that gets displayed when the drop down isn't expanded
   */
  private _onRenderTitle = (options: IDropdownOption[]): JSX.Element => {
    const option = options[0];

    return this._onRenderOption(option);
  }

  /**
   * Selection has changed
   * @param option Selected option
   * @param index
   */
  private _onChanged(option: IDropdownOption, index?: number): void {
    this.setState({
      selectedKey: option.key
    });
    if (this.props.onChanged) {
      this.props.onChanged(option, index);
    }
  }
}
