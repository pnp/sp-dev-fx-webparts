import { IconButton, Stack, TextField } from '@fluentui/react';
import * as React from 'react';
import styles from './ChatStreaming.module.scss';

export interface IUserMessageProps {
    onMessageChange: (query: string) => void;
    sendQuery: () => Promise<void>;
    controller: AbortController;
    textFieldValue: string;
    disableMarkdown?: boolean;
    toggleMarkdown: () => void;
}

export default class UserMessage extends React.Component<IUserMessageProps, {}> {
  private _onChange = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newText: string
  ): void => {
    this.props.onMessageChange(newText);
  };

  private _handleClick = async (): Promise<void> => {
    await this.props.sendQuery();
  };


  private _keyDownHandler = async (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): Promise<void> => {
    if(!event.shiftKey && event.key === "Enter") {
      //Submits message when a user hits return (but still allows newlines for shift+enter)
      event.preventDefault();
      return this._handleClick();
    }
  };

  public render(): React.ReactElement<IUserMessageProps> {
    return (
      <Stack horizontal className={styles.userMessage}>
        <Stack.Item grow>
          <TextField
            multiline
            autoAdjustHeight
            rows={5}
            value={this.props.textFieldValue}
            onChange={this._onChange}
            onKeyDown={this._keyDownHandler}
            placeholder={'Talk to our super cool AI system!\n(Shift + Enter for new line)'}
          />
        </Stack.Item>
        <Stack verticalAlign='end'>
          <IconButton
            iconProps={{ iconName: "Send" }}
            title="Send"
            ariaLabel="Send"
            onClick={this._handleClick}
          />
          <IconButton
            iconProps={{ iconName: 'Stop' }}
            title="Stop generating"
            ariaLabel="Stop"
            onClick={() => this.props.controller.abort()}
          />
          <IconButton
            toggle
            checked={!this.props.disableMarkdown}
            onClick={this.props.toggleMarkdown}
            title="Toggle Markdown"
            ariaLabel="Markdown"
            iconProps={{iconName:'MarkDownLanguage'}}/>
        </Stack>
      </Stack>
    );
  }
}