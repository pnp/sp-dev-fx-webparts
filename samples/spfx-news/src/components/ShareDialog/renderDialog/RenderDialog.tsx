/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import { css } from '@emotion/css';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  
  Theme
} from '@fluentui/react-components';
 

export interface IRenderDialogProps {
  isOpen: boolean;
  dialogTitle?: string | React.ReactNode;
  dialogActions?: JSX.Element;
  onDismiss?: (open?: boolean) => void;
  minWidth?: number | string;
  maxWidth?: number | string;
  className?: string;
  minHeight?: number | string;
  maxHeight?: number | string;
  theme?: Theme;
}

const DEFAULT_MIN_WIDTH = 200;

const DEFAULT_MIN_HEIGHT = 200;

const useStyles = (props:IRenderDialogProps) => {
  const styles = {
    dialog: css({
      width: "100%",
      height: "100%",
      overflow: "hidden" as never,
      maxHeight: "600px",
      padding: 0 as never,
    }),
    dialogBody: css({
      height: "calc(100% - 200px)",
    }),
  };
  return { styles };
};

export const RenderDialog: React.FunctionComponent<IRenderDialogProps> = (
  props: React.PropsWithChildren<IRenderDialogProps>
) => {
  const { isOpen, dialogTitle, dialogActions, children, maxWidth, className, minHeight, minWidth, maxHeight,   } = props;
  const {styles} = useStyles(props);
  if (!isOpen) return <></>;
  return (
    
    <Dialog open={isOpen} modalType="alert">
      <DialogSurface
        className={css(styles.dialog, className)}
        style={{
          maxWidth: maxWidth,
          minWidth: minWidth ?? DEFAULT_MIN_WIDTH,
          minHeight: minHeight ?? DEFAULT_MIN_HEIGHT,
          height: "fit-content",
          maxHeight: maxHeight ?? "",
        }}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogBody className={styles.dialogBody}>
          <DialogContent>{children}</DialogContent>
        </DialogBody>
        <DialogActions fluid position="end">
          {dialogActions}
        </DialogActions>
      </DialogSurface>
    </Dialog>
 
);
};
