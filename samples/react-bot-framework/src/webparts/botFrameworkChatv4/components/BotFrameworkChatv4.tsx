import * as React from 'react';
import styles from './BotFrameworkChatv4.module.scss';
import { IBotFrameworkChatv4Props } from './IBotFrameworkChatv4Props';
import { escape } from '@microsoft/sp-lodash-subset';
import ReactWebChat from 'botframework-webchat';
import styleSetOptions from 'botframework-webchat';
import { DirectLine } from 'botframework-directlinejs';

export interface IBotFrameworkChatv4State {
  directLine: any;
  styleSetOptions: any;
}

export default class BotFrameworkChatv4 extends React.Component<IBotFrameworkChatv4Props, IBotFrameworkChatv4State> {
  constructor(props) {
    super(props);
    const styleOptions = {
      backgroundColor: this.props.backgroundColor,
      botAvatarImage: this.props.botAvatarImage,
      userAvatarImage: this.props.userAvatarImage,
      hideUploadButton: this.props.hideUploadButton,
      sendBoxBackground: this.props.sendBoxBackground,
      sendBoxTextColor: this.props.sendBoxTextColor,
      bubbleBackground: this.props.bubbleBackground,
      bubbleTextColor: this.props.bubbleTextColor,
      bubbleFromUserTextColor: this.props.bubbleFromUserTextColor,
      bubbleFromUserBackground: this.props.bubbleFromUserBackground,
      userAvatarInitials: this.props.userAvatarInitials,
      botAvatarInitials: this.props.botAvatarInitials
      };
    this.state = {
      directLine: new DirectLine({
        secret: this.props.directLineSecret
      }),
      styleSetOptions: styleOptions
    };

    
  }
  public render(): React.ReactElement<IBotFrameworkChatv4Props> {    
    return (
      <div className={styles.botFrameworkChatv4} style={{ height: 700 }}>
        <ReactWebChat directLine={this.state.directLine} styleOptions={this.state.styleSetOptions} />
      </div>
    );
  }
}
