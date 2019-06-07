import * as React from 'react';
import { DisplayMode } from '@microsoft/sp-core-library';
import styles from './ChartTitle.module.scss';
import { IChartTitleProps } from './ChartTitle.types';
import { css } from "office-ui-fabric-react/lib/Utilities";

/**
 * Chart Title component -- designed to mimic the Quick Chart title component.
 * Unfortunately, the PnP WebParttitle control doesn't allow you to specify a placeholder.
 * PR is coming up!
 */
export class ChartTitle extends React.Component<IChartTitleProps, {}> {
  /**
   * Process the text area change
   */
  private _onChange = (event) => {
    this.props.updateTitle(event.target.value);
  }

  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IChartTitleProps> {
    if (this.props.title || this.props.displayMode === DisplayMode.Edit) {
      return (
        <div className={css(styles.chartTitle, this.props.className) }>
          {
            this.props.displayMode === DisplayMode.Edit && <textarea placeholder={this.props.placeholder} onChange={this._onChange} defaultValue={this.props.title}></textarea>
          }
          {
            this.props.displayMode !== DisplayMode.Edit && this.props.title && <span role="heading" aria-level={2}>{this.props.title}</span>
          }
        </div>
      );
    }

    return null;
  }
}
