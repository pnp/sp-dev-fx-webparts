/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { css } from '@emotion/css';
import { FluentProvider, IdPrefixProvider, Spinner, Theme } from '@fluentui/react-components';
import { RenderDialog } from './renderDialog';

const useStyles = (iFrameHeight: number) => { 
  const styles = {
    iframe: css({
      width: "100%",
      height: iFrameHeight,
      border: "none",
      backgroundColor: "transparent",
    }),
    spinnerContainer: css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: iFrameHeight,
    }),
  };
  return { styles };
};

interface IEventData {
  name: string;
  command: string;
  width: number;
  height: number;
}

interface IDialogOptions {
  siteUrl: string;
  listId: string;
  itemId: string | number;
  name: string;
}

interface ShareDialogProps {
  isOpen: boolean;
  options: IDialogOptions;
  onClose: () => void;
  theme: Theme;
}

export const ShareDialog: React.FC<ShareDialogProps> = ({ isOpen, options, onClose, theme }) => {
  const [dialogUrl, setDialogUrl] = useState<string | undefined>(undefined);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iFrameHeight, setIFrameHeight] = useState<number>(400);
  const [isIframeLoading, setIsIframeLoading] = useState<boolean>(true);

  const { siteUrl, listId, itemId, name } = options;
  const { styles } = useStyles(iFrameHeight);

  const closeDialog = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleIframeMessage = useCallback(
    (event: MessageEvent) => {
      const { name, height } = JSON.parse(event.data) as IEventData;
      switch (name) {
        case "share_dismiss":
          closeDialog();
          break;
        case "share_resize":
          setIFrameHeight(height);
          break;
        case "share_scriptsLoaded":
          break;
        case "share_uiReady":
          break;
        case "share_ready":
          break;
        default:
          break;
      }
    },
    [closeDialog]
  );

  useEffect(() => {
    window.addEventListener("message", handleIframeMessage);
    return () => {
      window.removeEventListener("message", handleIframeMessage);
    };
  }, [handleIframeMessage]);

  useEffect(() => {
    if (isOpen) {
      const clientId = "sharePoint";
      const policyTip = 0;
      const folderColor = "";
      const clickTime = new Date().getTime();
      const fullScreenMode = false;
      const origin = encodeURIComponent(window.location.origin);
      const encodeName = encodeURIComponent(name as string);

      const url =
        `${siteUrl}/_layouts/15/sharedialog.aspx` +
        `?listId=${listId}` +
        `&listItemId=${itemId}` +
        `&clientId=${clientId}` +
        `&policyTip=${policyTip}` +
        `&folderColor=${folderColor}` +
        `&clickTime=${clickTime}` +
        `&ma=0` +
        `&fullScreenMode=${fullScreenMode}` +
        `&itemName= ${encodeName}` +
        `&channelId=` +
        `&origin=${origin}`;
      setDialogUrl(url);
    } else {
      setDialogUrl(undefined);
    }
  }, [isOpen, siteUrl, listId, itemId]);

  useEffect(() => {
    if (dialogUrl) {
      setIsIframeLoading(true);
    }
  }, [dialogUrl]);

  return (
    <IdPrefixProvider value="share-dialog">
    <FluentProvider theme={theme} applyStylesToPortals={true}>
    <RenderDialog isOpen={isOpen} onDismiss={closeDialog} maxHeight={"fit-content"} theme={theme}>
      {isIframeLoading && (
        <div className={styles.spinnerContainer}>
          <Spinner size="medium" />
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={dialogUrl || ""}
        className={styles.iframe}
        style={{ display: isIframeLoading ? "none" : undefined }}
        onLoad={() => setIsIframeLoading(false)}
      />
    </RenderDialog>
      </FluentProvider>
      </IdPrefixProvider>
  );
};
