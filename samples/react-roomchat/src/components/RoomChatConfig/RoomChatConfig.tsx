import * as React from 'react';

import {
  DocumentCard,
  DocumentCardDetails,
  DocumentCardPreview,
  DocumentCardType,
  IDocumentCardPreviewProps,
  PrimaryButton,
  Stack,
  Text,
} from 'office-ui-fabric-react';
import * as strings from 'RoomChatWebPartStrings';

import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import { EScreens } from '../../constants/EScreens';
import {
  GlobalStateContext,
  IGlobalStateContext,
} from '../../globalStateProvider';
import { useRoomChatStyles } from '../RoomChat/useRoomChatStyles';

export interface IRoomChatConfigProps {

}

export const RoomChatConfig: React.FunctionComponent<IRoomChatConfigProps> = (
  props: React.PropsWithChildren<IRoomChatConfigProps>
) => {

  const { documentCardStyles, stackContainerStyles, textStyles, previewIconStyles, iconStyles } = useRoomChatStyles();
  const { GlobalState } = React.useContext<IGlobalStateContext>(GlobalStateContext);
  const {showScreen, context } = GlobalState;


  const onClick: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement > =  React.useCallback((ev) => {
    ev.preventDefault();

       (context as WebPartContext).propertyPane.open();
  }, [context]);


  const previewPropsUsingIcon: IDocumentCardPreviewProps = React.useMemo(() => {
    return {
      previewImages: [
        {
          previewIconProps: {
            iconName: "ChatInviteFriend",
            styles: iconStyles,
          },
          width: 110,
        },
      ],
      styles: previewIconStyles,
    };
  }, [iconStyles, previewIconStyles]);
  if (showScreen === EScreens.RoomChatConfig) {
    return (
      <>
        <Stack tokens={{ childrenGap: 10 }} horizontalAlign={"center"}>
          <DocumentCard aria-label="Room Chat Config" type={DocumentCardType.compact} styles={documentCardStyles}>
            <DocumentCardPreview {...previewPropsUsingIcon} />
            <DocumentCardDetails>
              <Stack horizontalAlign="center" tokens={{ childrenGap: 15 }} styles={stackContainerStyles}>
                <Text variant="mediumPlus" styles={textStyles}>
                  {strings.ConfigureMessageLabel}
                </Text>
                  {DisplayMode.Edit && ( <PrimaryButton onClick={onClick}>{strings.ButtonLabelConfigure}</PrimaryButton>)}
              </Stack>
            </DocumentCardDetails>
          </DocumentCard>
        </Stack>
      </>
    );
  }
  return null;
};
