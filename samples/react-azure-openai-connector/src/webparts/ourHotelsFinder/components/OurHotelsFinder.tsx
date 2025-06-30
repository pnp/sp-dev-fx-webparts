import * as React from "react";
import { IOurHotelsFinderProps } from "./IOurHotelsFinderProps";
import MessagesList from "./MessagesList";
import { Spinner, SpinnerSize, Stack } from "@fluentui/react";
import UserMessage from "./UserMessage";
import { IOurHotelsFinderState } from "./IOurHotelsFinderState";
import CompletionsService from "../services/CompletionsService";
import { ICompletionsResponse } from "../models/ICompletionsResponse";

export default class OurHotelsFinder extends React.Component<IOurHotelsFinderProps, IOurHotelsFinderState> {

  constructor(props: IOurHotelsFinderProps) {
    super(props);

    this.state = {
      userQuery: '',
      sessionMessages: [],
      findingHotels: false
    };
  }

  private _onUserQueryChange = (newQuery: string): void => {
    this.setState({
      userQuery: newQuery
    });
  }

  private _onQuerySent = async (): Promise<void> => {
    console.log(this.state.userQuery);
    console.log(this.state.sessionMessages);

    this.setState({
      findingHotels: true
    });

    const completionsService: CompletionsService = new CompletionsService(this.props.httpClient);

    const response: ICompletionsResponse =
      await completionsService.getCompletions(this.state.sessionMessages, this.state.userQuery);

    console.log(response);

    const responseMessages = response.choices[0].messages.filter(m => {
      return m.role === 'assistant';
    });

    const message = responseMessages[0];

    const tempMessages = this.state.sessionMessages;
    tempMessages.push({
      role: 'user', text: this.state.userQuery
    });
    tempMessages.push({
      role: 'assistant', text: message.content
    });

    this.setState({
      sessionMessages: tempMessages,
      userQuery: '',
      findingHotels: false
    });
  }

  public render(): React.ReactElement<IOurHotelsFinderProps> {

    return (
      <Stack tokens={{ childrenGap: 20 }} style={{ minHeight: "100%" }}>
        <Stack.Item
          grow={1}
          styles={{
            root: { minHeight: "200px", height: "100%", position: "relative" },
          }}
        >
          <MessagesList messages={this.state.sessionMessages} />
        </Stack.Item>
        {this.state.findingHotels && (
          <Stack.Item>
            <Spinner size={SpinnerSize.large} label="Wait till our super cool AI system is finding you the best hotels..." ariaLive="assertive" labelPosition="right" />
          </Stack.Item>
        )}
        <Stack.Item>
          <UserMessage
            textFieldValue={this.state.userQuery}
            onMessageChange={this._onUserQueryChange}
            sendQuery={this._onQuerySent}
          />
        </Stack.Item>
      </Stack>
    );
  }
}
