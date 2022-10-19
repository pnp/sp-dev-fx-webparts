import * as React from 'react';

import {
  IDialogContentStyles,
  IModalStyles,
  ITextStyles,
} from 'office-ui-fabric-react';

interface IJoinUserStyles {
  dialogContentStyles: IDialogContentStyles;
  modalStyles: IModalStyles;
  textAvatarLabelStyles: ITextStyles;
}
export const useJoinUserStyles = (): IJoinUserStyles => {
  const dialogContentStyles: IDialogContentStyles = React.useMemo(() => {
    return {
      subText: { marginBottom: 10 },
    } as IDialogContentStyles;
  }, []);

  const modalStyles: IModalStyles = React.useMemo(() => {
    return {
      main: { maxWidth: 450 },
    } as IModalStyles;
  }, []);

  const textAvatarLabelStyles: ITextStyles = React.useMemo(() => {
    return {
      root: { fontWeight: 600 },
    } as ITextStyles;
  }, []);

  return { dialogContentStyles, modalStyles, textAvatarLabelStyles };
};
