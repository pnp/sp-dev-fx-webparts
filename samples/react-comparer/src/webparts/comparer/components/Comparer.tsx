import * as React from 'react';

// Styles
import styles from './Comparer.module.scss';

// Our props and state
import { IComparerProps, IComparerState } from './Comparer.types';

// Used to make a draggable slider
import Draggable, { DraggableData } from 'react-draggable';

// Used for dynamic CSS classname
import { css } from "@uifabric/utilities/lib/css";

// Used to create an image that covers the entire area
import BlockImage from 'react-block-image';

// Localization
import * as strings from 'ComparerWebPartStrings';

// Needed to know if the web part is editable and show the title control
import { DisplayMode } from "@microsoft/sp-core-library";

// PnP controls rock!
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

export default class Comparer extends React.Component<IComparerProps, IComparerState> {
  /**
   * Keep track of the labels so we can retrieve their positions
   */
  private _beforeLabelElem: HTMLDivElement = undefined;
  private _afterLabelElem: HTMLDivElement = undefined;

  /**
   * Keep track of the top parent so we can get relative positions
   */
  private _topElem: HTMLDivElement = undefined;
  constructor(props: IComparerProps) {
    super(props);
    this.state = {
      sliderPositionX: (this.props.startPosition / 100 * this.props.width),
      sliderPosition: (this.props.startPosition),
      showChooseImagePanel: false,
      hasLabels: this._checkHasLabels(this.props)
    };
  }

  public componentDidUpdate(prevProps: IComparerProps, prevState: IComparerState): void {
    // If we updated the slider position, forget the current state and recalculate position
    if (prevProps.startPosition !== this.props.startPosition) {
      this.setState({
        sliderPositionX: (this.props.startPosition / 100 * this.props.width),
        sliderPosition: (this.props.startPosition),
      });
    }

    // If we added/removed labels, change the state
    const hasLabels: boolean = this._checkHasLabels(this.props);
    if (this._checkHasLabels(prevProps) !== hasLabels) {
      this.setState({
        hasLabels: hasLabels
      });
    }
  }

  public render(): React.ReactElement<IComparerProps> {
    const {
      beforeImg,
      afterImg,
      className,
      beforeClassName,
      afterClassName,
      handleClassName,
      width,
      height
    } = this.props;

    const {
      sliderPosition,
      hasLabels
    } = this.state;

    if (!this.props.beforeImg || !this.props.afterImg) {
      return this._renderPlaceholders();
    }
    const sliderPositionX: number = (sliderPosition / 100 * this.props.width);


    return (
      <React.Fragment>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.onUpdateTitle} />
        <div
          className={css(styles.comparer, hasLabels ? styles.withLabel : undefined, className)}
          style={{
            width,
            height
          }}
          ref={this._linkTop}
        >

          <Draggable
            bounds={"parent"}
            disabled={false}
            allowAnyClick={false}
            enableUserSelectHack={true}
            axis={"x"}
            defaultClassName={styles.comparerSlider}
            defaultPosition={{ x: sliderPositionX, y: 0 }}
            position={{ x: sliderPositionX, y: 0 }}
            onDrag={(e, data: DraggableData) => this._handleDrag(e, data)}>
            <div className={handleClassName}></div>
          </Draggable>
          <div
            className={styles.afterWrapper}
            style={{
              width: `${sliderPositionX}px`
            }}
          >
            <BlockImage
              role={"Image"}
              aria-label={this.props.afterAlternateText}
              src={afterImg}
              className={css(styles.comparerAfter, afterClassName)}
              style={{ width }}
            />
            <div
              className={css(styles.comparerLabel, styles.comparerLabelAfter)}
              ref={this._linkAfterLabel}>{this.props.afterLabel}</div>
          </div>
          <BlockImage
            role={"Image"}
            aria-label={this.props.beforeAlternateText}
            src={beforeImg}
            className={css(styles.comparerBefore, beforeClassName)}
          />
          <div
            className={css(styles.comparerLabel, styles.comparerLabelBefore)}
            ref={this._linkBeforeLabel}>{this.props.beforeLabel}</div>
        </div>

      </React.Fragment>
    );
  }

  /**
   * If the web part isn't configured, renders a placeholder
   */
  private _renderPlaceholders = (): JSX.Element => {
    const {
      onConfigure
    } = this.props;

    if (this.props.displayMode === DisplayMode.Edit) {
      return <div
        className={styles.comparer}>
        <Placeholder iconName='PhotoCollection'
          iconText={strings.PlaceholderIconText}
          description={strings.PlaceholderDescription}
          buttonLabel={strings.PlaceholderButtonLabel}
          onConfigure={onConfigure} />
      </div>;
    } else {
      return undefined;
    }
  }

  /**
   * Verifies if labels were specified or now
   */
  private _checkHasLabels = (props: IComparerProps): boolean => {
    return props.beforeLabel!.length > 0 || props.afterLabel!.length > 0;
  }

  /**
   * Called when user drags the slider
   */
  private _handleDrag(_e, data: DraggableData) {
    const { sliderPositionX } = this.state;
    const { width } = this.props;

    this.setState({
      sliderPositionX: data.x,
      sliderPosition: sliderPositionX / width * 100
    });

    // If we have no labels, don't do anything else
    if (!this.state.hasLabels) {
      return;
    }

    // We DO have labels, we need to move some labels, and maybe hide them
    // otherwise they get squished when the slider goes too far to the left or right

    // Get the position of the right label and see if we need to hide it
    const parentPos: ClientRect = this._topElem.getBoundingClientRect();
    const labelPos: ClientRect = this._beforeLabelElem.getBoundingClientRect();
    const labelX: number = labelPos.left - parentPos.left;

    // Is the slider past the label?
    if (labelX < data.x) {
      // Hide the label
      this._beforeLabelElem.style.opacity = "0";
    }
    else {
      // Show the label
      this._beforeLabelElem.style.opacity = "1";
    }

    // Get the right-most position of the left label
    const afterLabelPos: ClientRect = this._afterLabelElem.getBoundingClientRect();
    const afterLabelX: number = afterLabelPos.left - parentPos.left + afterLabelPos.width;

    // If the slider is to the left of the label
    if (data.x < afterLabelX) {
      // Hide it
      this._afterLabelElem.style.opacity = "0";
    }
    else {
      // Show it
      this._afterLabelElem.style.opacity = "1";
    }
  }

  /**
   * link to the top element
   */
  private _linkTop = (e: any) => {
    this._topElem = e;
  }

  /**
   * Link to the right label
   */
  private _linkBeforeLabel = (e: any) => {
    this._beforeLabelElem = e;
  }

  /**
   * Link to the left label
   */
  private _linkAfterLabel = (e: any) => {
    this._afterLabelElem = e;
  }
}
