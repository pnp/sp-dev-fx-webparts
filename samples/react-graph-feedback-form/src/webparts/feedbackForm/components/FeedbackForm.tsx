import * as React from 'react';
import { IFeedbackFormProps } from './IFeedbackFormProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

// https://developer.microsoft.com/en-us/fabric#/controls/web
import {
  TextField,
  DefaultButton,
  MessageBar,
  MessageBarType,
  MessageBarButton,
  Stack
} from 'office-ui-fabric-react';

import {
  Logger,
  LogLevel
} from "@pnp/logging";
const LOG_SOURCE: string = 'FeedbackForm';

export interface IFeedbackFormState {
  isBusy: boolean;
  messageWasSended: boolean;
  messageText: string;
}

export default class FeedbackForm extends React.Component<IFeedbackFormProps, IFeedbackFormState> {

  constructor(props){
    super(props);

    this.state = {
      isBusy: false,
      messageWasSended: false,
      messageText: '',
    };
  }

  public render(): React.ReactElement<IFeedbackFormProps> {

    return (
      <div>
        {this.props.targetEmail ? '' : this.notConfiguredAlert}
        {this.state.messageWasSended ? this.messageBar : this.feedbackForm}
      </div>
    );
  }

  private get feedbackForm(): JSX.Element {

    const { messageText, isBusy } = this.state;
    const { targetEmail, maxMessageLength } = this.props;

    return(
      <Stack gap={5} styles={{ root: { width: 650, margin: "0 auto" } }}>
        <TextField
          disabled={isBusy}
          label="Feedback"
          maxLength={maxMessageLength}
          multiline
          rows={3}
          value={messageText}
          onChange={this.onTextFieldChangeHandler}
        />
        <p>{messageText.length} of {maxMessageLength}</p>
        <div>
          <DefaultButton
            disabled={isBusy || !targetEmail}
            onClick={this.sendMessageHandler}
          >Send Message</DefaultButton>
        </div>
      </Stack>
    );
  }

  private get messageBar(): JSX.Element {
    Logger.write(`[${LOG_SOURCE}] renderMessageBar()`);
    return(
      <MessageBar
        actions = {
          <div>
            <MessageBarButton onClick={this.messageBarButtonOnClickHandler}>I want to send more!</MessageBarButton>
          </div>
          }
          messageBarType={MessageBarType.success}
          isMultiline={false}
        >
          Message was sent!
      </MessageBar>
    );
  }

  private get notConfiguredAlert(): JSX.Element {
    Logger.write(`[${LOG_SOURCE}] renderNotConfiguredAlert()`);
    return(
      <MessageBar messageBarType={MessageBarType.warning}>Target email is empty! Please configure this web part first.</MessageBar>
    );
  }

  private onTextFieldChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const messageText = event.target.value;
    this.setState({messageText});
  }

  private sendMessageHandler = async(): Promise<void> => {
    Logger.write(`[${LOG_SOURCE}] sendMessageHandler()`);

    const { graphClient, targetEmail, subject } = this.props;
    const { messageText } = this.state;
    this.setState({ isBusy:true });

    Logger.write(`[${LOG_SOURCE}] composing message`);
    const message: MicrosoftGraph.Message = {
      subject: escape(subject),
      importance:"low",
      body: {
        contentType:"html",
        content: escape(messageText)
      },
      toRecipients: [
        {
          emailAddress: {
            address: targetEmail
          }
        }
      ]
    };

    let messageWasSended = false;

    try {

      Logger.write(`[${LOG_SOURCE}] trying send email to ${this.props.targetEmail}`);

      await graphClient.api('/me/sendMail').post({message});
      messageWasSended = true;
    } catch (error) {

      Logger.writeJSON(error, LogLevel.Error);

    } finally {

      this.setState({
        isBusy:false,
        messageWasSended
      });
    }
  }

  private messageBarButtonOnClickHandler = (): void => {

    this.setState({ 
      messageWasSended:false,
      messageText: '',
     });
  }
}
