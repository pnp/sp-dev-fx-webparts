import * as React from 'react';

import * as strings from 'ChatGptWebPartStrings';
import {
  Stack,
  Text,
} from 'office-ui-fabric-react';

import { useChatGptStyles } from '../ChatGpt/useChatGptStyles';
import { OpenAIImage } from '../OpenAIImage/OpenAIImage';

export interface IHeaderProps {
  isInChat: boolean;
}

export const Header: React.FunctionComponent<IHeaderProps> = (props: React.PropsWithChildren<IHeaderProps>) => {
  const {headerContainertyles ,nameStyles, controlStyles } = useChatGptStyles();
  const { isInChat } = props;
  if (isInChat) return null;
  return (
    <>
      <Stack horizontalAlign="stretch" tokens={{  childrenGap: 10 }} styles={headerContainertyles}>
        <Stack horizontal horizontalAlign="start" tokens={{ padding: 15, childrenGap: 15 }} >
          <OpenAIImage showImageOnly />
          <Stack.Item align="center">
            <Text variant="large" block styles={nameStyles}>
              Open AI
            </Text>
            <Text variant="small" block>
              {strings.ChatGPTAppPoweredByLabel}
            </Text>
          </Stack.Item>
        </Stack>
        <div className={controlStyles.separator} />
      </Stack>
    </>
  );
};
