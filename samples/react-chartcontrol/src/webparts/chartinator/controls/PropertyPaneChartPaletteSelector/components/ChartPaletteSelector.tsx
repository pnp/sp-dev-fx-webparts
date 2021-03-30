import * as React from 'react';
import {
  Dropdown,
  IDropdownOption
} from '@fluentui/react/lib/Dropdown';
import { TooltipHost, DirectionalHint } from '@fluentui/react/lib/Tooltip';

import styles from './ChartPaletteSelector.module.scss';
import { IChartPaletteSelectorProps, IChartPaletteSelectorState } from './ChartPaletteSelector.types';

/**
 * Displays a list of palette colours
 */
export  class ChartPaletteSelector extends React.Component<IChartPaletteSelectorProps, IChartPaletteSelectorState> {
  constructor(props: IChartPaletteSelectorProps) {
    super(props);
    this.state = {
      selectedKey: this.props.selectedKey
    };
  }
  public render(): JSX.Element {
    return (
      <div className={styles.chartPaletteSelector}>
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
    const paletteName: string = option.key as string;

    // Get the colors
    const colors: string[] = option.data.colors;

    return (
      <TooltipHost
        calloutProps={{ isBeakVisible: false }}
        tooltipProps={{
          onRenderContent: () => {
            return (
              <div>
                <strong>{option.text}</strong>
                <br />
                {option.data.description}
              </div>
            );
          }
        }}
        id={`${paletteName}_tooltip`}
        directionalHint={DirectionalHint.bottomCenter}
      >
        <div className={styles.colorChoice} aria-describedby={`${paletteName}_tooltip`}>
          {colors.map((colorValue: string, index: number) => {
            return <div
              className={styles.colorCell}
              key={`${paletteName}_${index}`}
            >
              <svg
                className={styles.svg}
                viewBox="0 0 20 20"
                fill={colorValue} focusable="false"><rect width="100%" height="100%"></rect></svg>
            </div>;
          })}

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
