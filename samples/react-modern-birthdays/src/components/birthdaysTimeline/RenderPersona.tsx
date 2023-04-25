import * as React from 'react';

import {
  Stack,
  StackItem,
  Text,
} from 'office-ui-fabric-react';

import { IUser } from '../../models';
import { useBirthdaysTimelineStyles } from './useBirthdaysTimelineStyles';

/* import { useBirthdaysTimelineStyles } from './useBirthdaysTimelineStyles'; */


export interface IRenderPersonaProps {
  user: IUser;

}

export const RenderPersona: React.FunctionComponent<IRenderPersonaProps> = (
  props: React.PropsWithChildren<IRenderPersonaProps>
) => {
  const { user,  } = props;
  const { name, jobTitle, image,   } = user;
  const { personalPrimaryText, personalSecondaryText ,controlStyles} =  useBirthdaysTimelineStyles();

  return (
    <>
         <Stack horizontal horizontalAlign="start"  tokens={{childrenGap:7}}>
          <img src={image} className={controlStyles.imageProfile} />
          <StackItem >
          <Text variant="medium"   styles={personalPrimaryText}> {name}</Text>
          <Text variant="small"   styles={personalSecondaryText} > { jobTitle}</Text>
          </StackItem>
         </Stack>
    </>
  );
};
