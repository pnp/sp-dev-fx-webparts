import * as React from "react";
//import styles from './OurHotelsFinder.module.scss';
import { IOurHotelsFinderProps } from "./IOurHotelsFinderProps";
import MessagesList from "./MessagesList";
import { DirectionalHint, Icon, Stack, Text, TooltipHost } from "@fluentui/react";
import UserMessage from "./UserMessage";
import { IOurHotelsFinderState } from "./IOurHotelsFinderState";
import CompletionsService from "../services/CompletionsService";
import { ICompletionsResponse } from "../models/ICompletionsResponse";

export default class OurHotelsFinder extends React.Component<IOurHotelsFinderProps, IOurHotelsFinderState> {

  constructor(props: IOurHotelsFinderProps) {
    super(props);

    this.state = {
      userQuery: '',
      sessionMessages: []
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
      sessionMessages: tempMessages
    });
  }

  public render(): React.ReactElement<IOurHotelsFinderProps> {

    return (
      <Stack tokens={{ childrenGap: 20 }} style={{ minHeight: "100%" }}>
        <Stack.Item>
          <Stack
            horizontal
            tokens={{ childrenGap: 10 }}
            verticalAlign="center"
            styles={{
              root: {
                backgroundColor: "#D4AF37",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
              },
            }}
          >
            <Icon iconName="Hotel" styles={{ root: { fontSize: "20px" } }} />
            <Text variant="large" styles={{ root: { fontWeight: "bold" } }}>
              Our Hotels
            </Text>
            <TooltipHost
                content="This webpart allows you to find Hotels in our Database"
                directionalHint={DirectionalHint.bottomCenter}>
                  <Icon iconName="Info" styles={{ root: { fontSize: '16px', marginLeft: '10px' } }}/>
            </TooltipHost>
          </Stack>
        </Stack.Item>
        <Stack.Item
          grow={1}
          styles={{
            root: { minHeight: "200px", height: "100%", position: "relative" },
          }}
        >
          <MessagesList messages={this.state.sessionMessages} />
        </Stack.Item>
        <Stack.Item>
          <UserMessage onMessageChange={this._onUserQueryChange} sendQuery={this._onQuerySent} />
        </Stack.Item>
      </Stack>
    );
  }
}
