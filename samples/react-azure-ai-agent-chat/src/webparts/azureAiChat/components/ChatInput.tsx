import * as React from 'react';
import { Button, makeStyles, Textarea, tokens } from '@fluentui/react-components';
import { SendRegular } from '@fluentui/react-icons';
import * as strings from 'AzureAiChatStrings';

export interface IChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

const useStyles = makeStyles({
  input: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalS,
  },
  textarea: {
    flexGrow: 1,
  },
});

const ChatInput: React.FC<IChatInputProps> = ({ onSend, disabled = false }) => {
  const styles = useStyles();
  const [text, setText] = React.useState('');

  const send = (): void => {
    const message = text.trim();
    if (!message || disabled) {
      return;
    }

    onSend(message);
    setText('');
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.ctrlKey && event.key === 'Enter') {
      event.preventDefault();
      send();
    }
  };

  return (
    <div className={styles.input}>
      <Textarea
        aria-label={strings.MessageInputLabel}
        className={styles.textarea}
        disabled={disabled}
        onChange={(_event, data) => setText(data.value)}
        onKeyDown={onKeyDown}
        placeholder={strings.MessageInputPlaceholder}
        value={text}
      />
      <Button appearance="primary" disabled={disabled || !text.trim()} icon={<SendRegular />} onClick={send}>
        {strings.SendButton}
      </Button>
    </div>
  );
};

export default ChatInput;
