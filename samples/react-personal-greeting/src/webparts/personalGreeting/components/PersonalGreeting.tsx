import * as React from 'react';
import styles from './PersonalGreeting.module.scss';
import { IPersonalGreetingProps } from './IPersonalGreetingProps';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export default class PersonalGreeting extends React.Component<IPersonalGreetingProps, {}> {
  public render(): React.ReactElement<IPersonalGreetingProps> {

    const custStyles = {
      'text-align': this.props.position,
      'color': this.props.textColor,
      'fontSize': this.props.fontSize
    } as React.CSSProperties;

    return (
      <div className={ styles.personalGreeting }>
        {this.props.greetingText == null ?
        <Placeholder iconName='Edit' iconText='Configure the web part' description='Please configure the web part' buttonLabel='Configure' onConfigure={this._onConfigure}  />
        : <div className={ styles.title } style={custStyles}>{this.props.greetingText} {this.props.context.pageContext.user.displayName}</div>
        }
      </div>
    );
  }

  private _onConfigure = (): void => {
    this.props.context.propertyPane.open();
  }

}

