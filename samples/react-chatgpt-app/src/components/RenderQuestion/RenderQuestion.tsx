import * as React from 'react';

import { format } from 'date-fns';
import {
  FontWeights,
  Stack,
  Text,
} from 'office-ui-fabric-react';

import { IRenderQuestionProps } from '../../models/IRenderQuestionProps';
import { useChatGptStyles } from '../ChatGpt/useChatGptStyles';

export const RenderQuestion: React.FunctionComponent<IRenderQuestionProps> = (
  props: React.PropsWithChildren<IRenderQuestionProps>
) => {
  const { questionStyles } = useChatGptStyles();
  const { question } = props;
  return (
    <>
      <Stack horizontalAlign="end"  >
        <Stack tokens={{ childrenGap: 10 }} styles={questionStyles}>
          <Text variant="small" block styles={{root: {fontWeight: FontWeights.semilight  }}}>
            {format(new Date(), "HH:mm")}
          </Text>
          <Text variant="medium" block>
            {question}
          </Text>
        </Stack>
      </Stack>
    </>
  );
};
