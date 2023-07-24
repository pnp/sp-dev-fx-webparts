import * as React from "react";
//import styles from './OurHotelsFinder.module.scss';
import { IOurHotelsFinderProps } from "./IOurHotelsFinderProps";
import MessagesList from "./MessagesList";
import { IChatMessage } from "../models/IChatMessage";
import { DirectionalHint, Icon, Stack, Text, TooltipHost } from "@fluentui/react";
import UserMessage from "./UserMessage";

export default class OurHotelsFinder extends React.Component<
  IOurHotelsFinderProps,
  {}
> {
  public render(): React.ReactElement<IOurHotelsFinderProps> {
    // const {
    //   hasTeamsContext,
    // } = this.props;

    const fakeMessages: IChatMessage[] = [
      {
        role: "user",
        text: "Do you know if using Fluent UI components, you can implement like the usual Chat interface? like the one uses ChatGPT website, or WhatsApp?",
      },
      {
        role: "assistant",
        text: "Glad you asked. This is a common question that I have no idea how to do... bye!",
      },
      {
        role: "user",
        text: "Icon looks a bit small, can I make it a bit bigger?",
      },
      {
        role: "assistant",
        text: "In this example, I have increased the size of the icon to 24 pixels. You can adjust the fontSize value to increase or decrease the size of the icon as needed.",
      },
      { role: "user", text: "Another question" },
      { role: "assistant", text: "In this example alksfh ks" },
    ];

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
          <MessagesList messages={fakeMessages} />
        </Stack.Item>
        <Stack.Item>
          <UserMessage />
        </Stack.Item>
      </Stack>
    );
  }
}
