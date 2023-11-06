import * as React from 'react';

import {
  Body1,
  Body1Strong,
  tokens,
} from '@fluentui/react-components';
import {
  CheckmarkCircle32Regular,
  Info32Regular,
} from '@fluentui/react-icons';
import { Icon } from '@iconify/react';

import { EMessageType } from '../constants/EMessageTypes';
import { IShowMessageProps } from './IShowMessageProps';
import { useShowMessageStyles } from './useShowMessageStyles';

export const ShowMessage: React.FunctionComponent<IShowMessageProps> = (
  props: React.PropsWithChildren<IShowMessageProps>
) => {
  const { messageType, children, message, isShow } = props;
  const styles = useShowMessageStyles();
  const [renderMessageIcon, setRenderMessageIcon] = React.useState<JSX.Element | null>(null);

  const RenderError = React.useCallback(() => {
    return (
      <>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>
            <Icon
              icon="fluent:error-circle-24-regular"
              width="32"
              height="32"
              color={tokens.colorStatusDangerForeground1}
            />
          </div>
          <Body1 style={{ width: "100%" }}>{message}</Body1>
        </div>
      </>
    );
  }, [message]);

  React.useEffect(() => {
    switch (messageType) {
      case EMessageType.SUCCESS:
        setRenderMessageIcon(<CheckmarkCircle32Regular primaryFill={tokens.colorStatusSuccessForeground1} />);
        break;
      case EMessageType.INFO:
        setRenderMessageIcon(<Info32Regular primaryFill={tokens.colorStatusWarningForeground1} />);
        break;
      default:
        break;
    }
  }, [messageType]);

  if (!isShow) {
    return <></>;
  }

  if (messageType === EMessageType.ERROR) {
    return <RenderError />;
  }

  return (
    <>
      <div className={styles.root}>
        {renderMessageIcon}
        <Body1Strong>{messageType}</Body1Strong>
        {children}
      </div>
    </>
  );
};
