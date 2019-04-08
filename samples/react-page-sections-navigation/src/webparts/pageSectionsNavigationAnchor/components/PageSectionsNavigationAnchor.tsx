import * as React from 'react';
import styles from './PageSectionsNavigationAnchor.module.scss';
import { DisplayMode } from '@microsoft/sp-core-library';
import * as strings from 'PageSectionsNavigationStrings';
import { css, ICssInput } from 'office-ui-fabric-react/lib/Utilities';
import { NavPosition } from '../../../common/types';

export interface IPageSectionsNavigationAnchorProps {
  displayMode: DisplayMode;
  title: string;
  updateProperty: (value: string) => void;
  showTitle: boolean;
  anchorElRef: (el: HTMLDivElement) => void;
  navPosition: NavPosition;
}

export class PageSectionsNavigationAnchor extends React.Component<IPageSectionsNavigationAnchorProps, {}> {
  constructor(props: IPageSectionsNavigationAnchorProps) {
    super(props);

    this._onChange = this._onChange.bind(this);
  }

  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IPageSectionsNavigationAnchorProps> {
    const { title, displayMode, showTitle, anchorElRef, navPosition } = this.props;

    const anchorElClassNames: ICssInput = {};
    anchorElClassNames[styles.anchorEl] = true;
    if (navPosition === 'section') {
      anchorElClassNames[styles.offset] = true;
    }

    if (displayMode === DisplayMode.Edit || showTitle) {
      return (
        <div className={css(styles.webPartTitle, styles.visible, 'psn-anchorTitle')}>
          <div className={css(anchorElClassNames)} ref={anchorElRef}></div>
          {
            displayMode === DisplayMode.Edit
              ? <textarea
                placeholder={strings.AnchorTitlePlaceholder}
                aria-label={strings.AnchorTitlePlaceholder}
                onChange={this._onChange}
                defaultValue={title}></textarea>
              : <span className={'psn-anchorTitleText'}>{title}</span>}
        </div>
      );
    }
    else {
      return (
        <div className={styles.webPartTitle}>
          <div className={css(anchorElClassNames)} ref={anchorElRef}></div>
        </div>
      );
    }
  }

  /**
   * Process the text area change
   */
  private _onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.props.updateProperty(event.target.value as string);
  }
}
