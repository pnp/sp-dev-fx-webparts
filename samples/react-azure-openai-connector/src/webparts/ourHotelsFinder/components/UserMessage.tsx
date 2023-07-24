import { IconButton, Stack, TextField } from '@fluentui/react';
import * as React from 'react';

export interface IUserMessageProps {
}

export interface IUserMessageState {
    message: string;
}

export default class UserMessage extends React.Component<IUserMessageProps, IUserMessageState> {

    constructor(props: IUserMessageProps) {
        super(props);
        this.state = {
            message: ''
        };
    }

    private _onChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string): void => {
        this.setState({
            message: newText
        });
    }

    public render(): React.ReactElement<IUserMessageProps> {
        return (
            <Stack horizontal tokens={{ childrenGap: 20 }}>
                  <Stack.Item grow={1}>
                      <TextField multiline autoAdjustHeight onChange={this._onChange} label="User message" placeholder="Type user query here." />
                  </Stack.Item>
                  <Stack.Item align="end">
                      <IconButton iconProps={{ iconName: 'Send' }} title="Send" ariaLabel="Send" />
                  </Stack.Item>
              </Stack>
        );
    }
}