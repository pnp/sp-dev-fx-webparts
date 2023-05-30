/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';

import * as strings from 'ChatGptWebPartStrings';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';

import { IOpenAIImageProps } from '../../models/IOpenAIImageProps';
import { useChatGptStyles } from '../ChatGpt/useChatGptStyles';

const logo = require("../../../assets/ChatGPTLogo.png");


export const OpenAIImage: React.FunctionComponent<IOpenAIImageProps> = (
  props: React.PropsWithChildren<IOpenAIImageProps>
) => {
  const { nameStyles, controlStyles } = useChatGptStyles();
  const { showImageOnly, width, height } = props;
  return (
    <Stack tokens={{ childrenGap: 10 }} horizontalAlign="start" verticalAlign="center" horizontal>
      <img
        src={logo}
        alt="Open AI"
        className={controlStyles.imageOPAILogo}
        style={{ width: width ?? 32, height: height ?? 32 }}
      />

      {showImageOnly ? null : (
        <Text variant="large" block styles={nameStyles}>
         {strings.CgatGPTAppOpenAILabel}
        </Text>
      )}
    </Stack>
  );
};
