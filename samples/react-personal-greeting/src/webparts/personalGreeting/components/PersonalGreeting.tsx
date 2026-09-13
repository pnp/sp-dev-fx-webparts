import * as React from 'react';
import styles from './PersonalGreeting.module.scss';
import { IPersonalGreetingProps } from './IPersonalGreetingProps';
import { DefaultButton, Icon } from '@fluentui/react';

export default class PersonalGreeting extends React.Component<IPersonalGreetingProps, {}> {
  public render(): React.ReactElement<IPersonalGreetingProps> {

    const custStyles = {
      'text-align': this.props.position,
      'color': this.props.textColor,
      'fontSize': this.props.fontSize
    } as React.CSSProperties;

    return (
      <div className={ styles.personalGreeting }>
        {this.props.greetingText === undefined || this.props.greetingText === null ?
        <div className={styles.placeholder}>
          <Icon className={styles.placeholderIcon} iconName='Edit' />
          <div className={styles.placeholderTitle}>Configure the web part</div>
          <div className={styles.placeholderDescription}>Please configure the web part</div>
          <DefaultButton text='Configure' onClick={this._onConfigure} />
        </div>
        : <div className={ styles.title } style={custStyles}>{this.props.greetingText} {this.props.context.pageContext.user.displayName}</div>
        }
      </div>
    );
  }

  private _onConfigure = (): void => {
    this.props.context.propertyPane.open();
  };

}
