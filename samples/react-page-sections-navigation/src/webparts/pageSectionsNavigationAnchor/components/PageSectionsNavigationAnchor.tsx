import * as React from 'react';
import styles from './PageSectionsNavigationAnchor.module.scss';
import { DisplayMode } from '@microsoft/sp-core-library';
import * as strings from 'PageSectionsNavigationAnchorWebPartStrings';

export interface IPageSectionsNavigationAnchorProps {
  displayMode: DisplayMode;
  title: string;
  updateProperty: (value: string) => void;
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
    if (this.props.displayMode === DisplayMode.Edit) {
      return (
        <div className={styles.webPartTitle}>
          <textarea
            placeholder={strings.AnchorTitlePlaceholder}
            aria-label={strings.AnchorTitlePlaceholder}
            onChange={this._onChange}
            defaultValue={this.props.title}></textarea>
        </div>
      );
    }
    return null;
  }

  /**
   * Process the text area change
   */
  private _onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.props.updateProperty(event.target.value as string);
  }
}
