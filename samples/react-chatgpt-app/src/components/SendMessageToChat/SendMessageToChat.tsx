import * as React from 'react';

import { useAtom } from 'jotai';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

import { useId } from '@fluentui/react-hooks';

import { globalState } from '../../atoms/globalState';

export interface ISendMessageProps {
onSendMessage: () => void;

}

export const SendMessageToChat: React.FunctionComponent<ISendMessageProps> = (
  props: React.PropsWithChildren<ISendMessageProps>
) => {
  const [appGlobalState] = useAtom(globalState);
  const { hasTeamsContext, chatId,teamsId,channelId,   } = appGlobalState;
  const { onSendMessage } = props;

  const shareIcon: IIconProps = React.useMemo(() => {return  { iconName: "Share" }}, []);
  const calloutProps = React.useMemo(() => { return   { gapSpace: 0 }}, []);
  const tooltipId = useId("tooltip");

  const isInChat = React.useMemo(() => {
    return hasTeamsContext && (chatId || teamsId || channelId);
  }, [chatId,teamsId,channelId, hasTeamsContext]);

  if (!isInChat) {
    return null;
  }

  return (
    <>
      <TooltipHost
        content="Share this answer on chat"
        id={tooltipId}
        calloutProps={calloutProps}
        setAriaDescribedBy={false}
      >
        <IconButton iconProps={shareIcon} aria-label="share" onClick={onSendMessage}/>
      </TooltipHost>
    </>
  );
};
