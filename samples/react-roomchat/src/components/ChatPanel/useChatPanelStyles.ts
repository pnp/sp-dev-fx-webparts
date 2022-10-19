import {
  IPanelStyles,
  IStackStyles,
} from 'office-ui-fabric-react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useChatPanelStyles = () => {
  const stackChatContainer: IStackStyles = {
    root: {
      width: "100%",
      border: "1px solid #ccc",
      height: "100%",
      paddingBottom: 20,
    },
  };

  const panelStyles: Partial<IPanelStyles> = {
    content: { height: "100%" },
    scrollableContent: { height: "100%" },
  };

  return { stackChatContainer, panelStyles };
};
