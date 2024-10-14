import { IPartialTheme, ITheme } from '@fluentui/react/lib/Styling';

/**
 * Used to display a placeholder in case of no or temporary content. Button is optional.
 *
 */
export interface IPlaceholderProps {

  /**
   * Text description or component for the placeholder. Appears bellow the Icon and IconText.
   */
  description: string | ((defaultClassNames: string) => React.ReactElement);
  /**
   * Icon name used for the className from the MDL2 set. Example: 'Add'.
   */
  iconName: string;
  /**
   * Heading displayed against the Icon.
   */
  iconText: string | ((defaultClassNames: string) => React.ReactElement);
  /**
   * Text label to be displayed on button below the description.
   * Optional: As the button is optional.
   */
  buttonLabel?: string;
  /**
   * This className is applied to the root element of content. Use this to
   * apply custom styles to the placeholder.
   */
  contentClassName?: string;
  /**
   * Specify if you want to hide the config button
   */
  hideButton?: boolean;
  /**
   * onConfigure handler for the button.
   * Optional: As the button is optional.
   */
  onConfigure?: () => void;

  /**
   * Set Fluent UI Theme.
   * If not set or set to null or not defined, the theme passed through context will be used, or the default theme of the page will be loaded.
   */
   theme?: IPartialTheme | ITheme;
}

export interface IPlaceholderState {
  width: number;
}


import { ThemeContext } from '@fluentui/react-theme-provider/lib/ThemeContext';
import { Theme } from '@fluentui/react-theme-provider/lib/types';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Icon } from '@fluentui/react/lib/Icon';
import * as React from 'react';
import { getFluentUIThemeOrDefault } from './ThemeUtility';
import { getClassNames } from './PlaceholderComponent.styles';


/**
 * Placeholder component
 */
export class Placeholder extends React.Component<IPlaceholderProps, IPlaceholderState> {
  private _crntElm: HTMLDivElement = null;

  /**
   * Constructor
   */
  constructor(props: IPlaceholderProps) {
    super(props);

    this.state = {
      width: null
    };

    
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    this._setZoneWidth();
  }

  /**
   * componentDidUpdate lifecycle hook
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IPlaceholderProps, prevState: IPlaceholderState): void {
    this._setZoneWidth();
  }

  /**
   * shouldComponentUpdate lifecycle hook
   * @param nextProps
   * @param nextState
   */
  public shouldComponentUpdate(nextProps: IPlaceholderProps, nextState: IPlaceholderState): boolean {
    /*
    * compare the props object for changes in primative values
    * Return/re-render, bexeting the function, if the props change
    */
    for (const property in nextProps) {
      if (property !== '_onConfigure') {
        if (nextProps[property as keyof IPlaceholderProps] !== this.props[property as keyof IPlaceholderProps]) {
          return true;
        }
      }
    }
    return this.state.width !== nextState.width || this.props.hideButton !== nextProps.hideButton;
  }

  /**
   * Execute the onConfigure function
   */
  private _handleBtnClick = (event?: React.MouseEvent<HTMLButtonElement>): void => {
    this.props.onConfigure();
  }

  /**
   * Set the current zone width
   */
  private _setZoneWidth = (): void => {
    this.setState({
      width: this._crntElm.clientWidth
    });
  }

  /**
   * Stores the current element
   */
  private _linkElm = (e: HTMLDivElement): void => {
    this._crntElm = e;
  }

  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IPlaceholderProps> {

    const {
      iconName,
      iconText,
      description,
      children,
      buttonLabel,
      hideButton,
      theme
    } = this.props;


    return (
      <ThemeContext.Consumer>
        {(contextTheme: Theme | undefined) => {

          const themeToApply = getFluentUIThemeOrDefault((theme) ? theme : contextTheme);
          const styles = getClassNames(themeToApply);

          const iconTextClassNames = `${styles.placeholderText} ${(this.state.width && this.state.width <= 380) ? styles.hide : ""}`;
          const iconTextEl = typeof iconText === 'string' ? <span className={iconTextClassNames}>{this.props.iconText}</span> : iconText(iconTextClassNames);
          const descriptionEl = typeof description === 'string' ? <span className={styles.placeholderDescriptionText}>{this.props.description}</span> : description(styles.placeholderDescriptionText);

          return (
            <div className={`${styles.placeholder} ${this.props.contentClassName ? this.props.contentClassName : ''}`} ref={this._linkElm}>
              <div className={styles.placeholderContainer}>
                <div className={styles.placeholderHead}>
                  <div className={styles.placeholderHeadContainer}>
                    {
                      iconName && <Icon iconName={iconName} className={styles.placeholderIcon} />
                    }
                    {iconTextEl}
                  </div>
                </div>
                <div className={styles.placeholderDescription}>
                  {descriptionEl}
                </div>
                {children}
                <div className={styles.placeholderDescription}>
                  {
                    (buttonLabel && !hideButton) &&
                    <PrimaryButton
                      text={buttonLabel}
                      ariaLabel={buttonLabel}
                      ariaDescription={typeof description === 'string' ? description : ''}
                      onClick={this._handleBtnClick}
                      theme={themeToApply} />
                  }
                </div>
              </div>
            </div>);
        }}
      </ThemeContext.Consumer>
    );
  }
}