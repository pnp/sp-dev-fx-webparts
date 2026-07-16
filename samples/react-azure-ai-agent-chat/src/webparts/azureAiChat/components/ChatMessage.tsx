import * as React from 'react';
import { Card, makeStyles, Text, tokens } from '@fluentui/react-components';

export interface IChatMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
}

const useStyles = makeStyles({
  row: {
    display: 'flex',
    marginBottom: tokens.spacingVerticalS,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  assistantRow: {
    justifyContent: 'flex-start',
  },
  message: {
    maxWidth: '80%',
    padding: tokens.spacingVerticalS,
    whiteSpace: 'pre-wrap',
  },
  userMessage: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  assistantMessage: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
  },
});

const ChatMessage: React.FC<IChatMessageProps> = ({ message }) => {
  const styles = useStyles();
  const isUser = message.role === 'user';

  return (
    <div className={`${styles.row} ${isUser ? styles.userRow : styles.assistantRow}`}>
      <Card className={`${styles.message} ${isUser ? styles.userMessage : styles.assistantMessage}`}>
        <Text>{message.content}</Text>
      </Card>
    </div>
  );
};

export default ChatMessage;
