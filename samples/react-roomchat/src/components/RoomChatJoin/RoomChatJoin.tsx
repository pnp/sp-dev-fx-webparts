/* eslint-disable @microsoft/spfx/no-async-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
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

import { EScreens } from '../../constants/EScreens';
import {
  EActionTypes,
  GlobalStateContext,
  IGlobalStateContext,
} from '../../globalStateProvider';
import { useAcsApi } from '../../hooks';
import { IChatModeratorInfo } from '../../models/IChatModeratorInfo';
import { IErrorInfo } from '../../models/IErrorInfo';
import { JoinUser } from '../JoinUser/JoinUser';
import { useRoomChatStyles } from '../RoomChat/useRoomChatStyles';

export interface IRoomChatJoinProps {}

export const RoomChatJoin: React.FunctionComponent<IRoomChatJoinProps> = (
) => {
  const { GlobalState, setGlobalState } = React.useContext<IGlobalStateContext>(GlobalStateContext);
  const { topic, showScreen, acsConnectString } = GlobalState;
  const { documentCardStyles, stackContainerStyles, textStyles, previewIconStyles, iconStyles } = useRoomChatStyles();
  const { createChatThread } = useAcsApi();
  const [openJoinUserDialog, setOpenJoinUserDialog] = React.useState<boolean>(false);
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

  React.useEffect(() => {
    (async () => {
      if (acsConnectString?.trim().length > 0) {
        try {
          setGlobalState({
            type: EActionTypes.SET_ERROR_INFO,
            payload: { hasError: false, error: undefined } as IErrorInfo,
          });

          const chatModeratorInfo: IChatModeratorInfo = await createChatThread();

          setGlobalState({
            type: EActionTypes.SET_CHAT_THREAD_ID,
            payload: chatModeratorInfo?.threadId ?? "",
          });

          setGlobalState({
            type: EActionTypes.SET_MODERATOR_INFO,
            payload: chatModeratorInfo,
          });
        } catch (error) {
          setGlobalState({
            type: EActionTypes.SET_ERROR_INFO,
            payload: { hasError: true, error } as IErrorInfo,
          });
          setGlobalState({
            type: EActionTypes.SET_SHOW_SCREEN,
            payload: EScreens.RoomChatError,
          });

          console.error(error);
        }
      } else {
        setGlobalState({
          type: EActionTypes.SET_SHOW_SCREEN,
          payload: EScreens.RoomChatConfig,
        });
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acsConnectString]);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(() => {
    setOpenJoinUserDialog(true);
  }, []);

  const onDismiss: () => void = React.useCallback(() => {
    setOpenJoinUserDialog(false);
  }, []);

  if (showScreen === EScreens.RoomChatJoin) {
    return (
      <>
        <Stack tokens={{ childrenGap: 10 }} horizontalAlign={"center"}>
          <DocumentCard aria-label="Room Chat" type={DocumentCardType.compact} styles={documentCardStyles}>
            <DocumentCardPreview {...previewPropsUsingIcon} />
            <DocumentCardDetails>
              <Stack horizontalAlign="center" tokens={{ childrenGap: 10 }} styles={stackContainerStyles}>
                <Text variant="mediumPlus" styles={textStyles}>
                  {topic}
                </Text>
                <PrimaryButton onClick={onClick}>{strings.ButtonLabelJoin}</PrimaryButton>
              </Stack>
            </DocumentCardDetails>
          </DocumentCard>
        </Stack>
        <JoinUser isOpen={openJoinUserDialog} onDismiss={onDismiss} />
      </>
    );
  }
  return null;
};
