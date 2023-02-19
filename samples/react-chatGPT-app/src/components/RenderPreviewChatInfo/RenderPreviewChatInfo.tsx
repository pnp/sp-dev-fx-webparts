import * as React from 'react';

import * as strings from 'ChatGptWebPartStrings';
/* eslint-disable @typescript-eslint/no-var-requires */
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';

import {
  IRenderPreviewChatInfoProps,
} from '../../models/IRenderPreviewChatInfoProps';
import { useChatGptStyles } from '../ChatGpt/useChatGptStyles';

const logo = require("../../../assets/ChatGPTLogo.png");

export const RenderPreviewChatInfo: React.FunctionComponent<IRenderPreviewChatInfoProps> = (
  props: React.PropsWithChildren<IRenderPreviewChatInfoProps>
) => {
  const { controlStyles, messageChatInfoStyles, messageChatInfoContainerStyles} = useChatGptStyles();
  const { isPreviewChatId } = props;

  if (!isPreviewChatId) { return null; }

  return (
    <>
      <Stack verticalAlign="center" tokens={{ childrenGap: 30 }} styles={messageChatInfoContainerStyles}>
        <Stack.Item align="center">
          <img src={logo} className={controlStyles.bigLogo} alt="Open AI" />
        </Stack.Item>
        <Stack.Item align="center">
          <Text variant="mediumPlus" styles={messageChatInfoStyles}>
           {strings.ChatGPTAppPreviewChatInfoMessage}
          </Text>
        </Stack.Item>
      </Stack>
    </>
  );
};
