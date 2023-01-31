/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

import { Stack } from 'office-ui-fabric-react/lib/Stack';

import {
  DocumentCard,
  FontIcon,
  Text,
} from '@fluentui/react';

import { nobirthdaysImage } from '../../constants/noBrithdaysImage';
/* import { BirthdayUserInfo } from "./BirthdayUserInfo"; */
import { useBirthdaysStyles } from './useBirthdaysStyles';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface INoBirthdaysCardProps {
  noBirthdaysMessage: string;
}

export const NoBirthdayCard: React.FunctionComponent<INoBirthdaysCardProps> = (
  props: React.PropsWithChildren<INoBirthdaysCardProps>
) => {
  const {
    noBirthdaysDocumentCardStyles,
    controlStyles,
    containerUserImageStyles,
    messageContainerStyles,
    noBirthdayMessageTextStyles,
  } = useBirthdaysStyles();

  const { noBirthdaysMessage } = props;

  return (
    <>
      <DocumentCard styles={noBirthdaysDocumentCardStyles}>
        <Stack horizontalAlign="center" horizontal styles={messageContainerStyles}>
          <Text variant="xLargePlus" styles={noBirthdayMessageTextStyles}>
            {noBirthdaysMessage ?? ""}
          </Text>
        </Stack>
        <Stack horizontalAlign="center" tokens={{ childrenGap: 25 }} styles={containerUserImageStyles}>
          <Stack horizontalAlign="center" tokens={{ childrenGap: 0 }}>
            <img src={nobirthdaysImage} className={controlStyles.imageProfile} />
          </Stack>
          <FontIcon iconName="partyWhishtle" className={controlStyles.partyWhishtle} />
        </Stack>
      </DocumentCard>
    </>
  );
};
