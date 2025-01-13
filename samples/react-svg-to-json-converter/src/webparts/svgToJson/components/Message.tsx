// Message.tsx
import * as React from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';

interface MessageProps {
  message: string | null;
  messageType: MessageBarType;
}

const Message: React.FC<MessageProps> = ({ message, messageType }) => {
  if (!message) return null;

  return <MessageBar messageBarType={messageType}>{message}</MessageBar>;
};

export default Message;