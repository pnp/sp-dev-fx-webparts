import * as React from 'react';
import styles from './FeedbackForm.module.scss';
import { IFeedbackFormProps } from './IFeedbackFormProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  TextField,
  DefaultButton,
  MessageBar,
  MessageBarType,
  MessageBarButton
} from 'office-ui-fabric-react';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

export interface IFeedbackFormState {
  isBusy: boolean;
  message: string;
  messageSended: boolean;
}

export default class FeedbackForm extends React.Component<IFeedbackFormProps, IFeedbackFormState> {

  constructor(props){
    super(props);

    this.state = {
      isBusy: false,
      message: '',
      messageSended: false
    };
  }

  public render(): React.ReactElement<IFeedbackFormProps> {
    return (
      <div className={ styles.feedbackForm }>
        {this.props.targetEmail ? '' : (
          <MessageBar messageBarType={MessageBarType.warning}>Target email is empty! Please configure this web part first.</MessageBar>
        )}
        {this.state.messageSended ? (
          <MessageBar
            actions={
              <div>
                <MessageBarButton onClick={()=>{
                  this.setState({
                    messageSended:false
                  });
                }}>I want to send more!</MessageBarButton>
              </div>
            }
            messageBarType={MessageBarType.success}
            isMultiline={false}
          >
            Message was sent!
          </MessageBar>
        ) :
        (
            <>
              <TextField disabled={this.state.isBusy} label="Feedback" multiline rows={3} name="text" value={this.state.message} onChange={this._onChange} />
              <div className={ styles.formActions }>
                <DefaultButton disabled={this.state.isBusy || !this.props.targetEmail} onClick={this._sendMessage}>Send</DefaultButton>
              </div>
            </>
        )}
      </div>
    );
  }

  private _onChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    this.setState({message:event.target.value});
  }

  private _sendMessage = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) : Promise<void> => {
    this.setState({isBusy:true});

    const msg = {
      subject: escape(this.props.subject),
      importance:"low",
      body:{
          contentType:"html",
          content: escape(this.state.message)
      },
      toRecipients:[
          {
              emailAddress:{
                  address: this.props.targetEmail
              }
          }
      ]
  } as MicrosoftGraph.Message;

  await this.props.graphClient.api('/me/sendMail')
    .post({
      message : msg
    }).then(() => {
      this.setState({
        isBusy:false,
        message: '',
        messageSended: true
      });
    },(error: any) => {
      console.log(error);
    });
  }
}
