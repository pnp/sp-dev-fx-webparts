import * as React from 'react';
import styles from './AzureAiChat.module.scss';
import type { IAzureAiChatProps } from './IAzureAiChatProps';
import { Button, FluentProvider, makeStyles, Spinner, Text, tokens, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import * as strings from 'AzureAiChatStrings';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import AgentService, { IAgentMessage } from '../services/AgentService';

const useStyles = makeStyles({
  chat: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    minHeight: '360px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
  },
  messages: {
    flexGrow: 1,
    minHeight: '240px',
    overflowY: 'auto',
    padding: tokens.spacingVerticalS,
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  error: {
    color: tokens.colorPaletteRedForeground1,
  },
});

const AzureAiChat: React.FC<IAzureAiChatProps> = ({ agentName, connectionString, webPartTitle, isDarkTheme }) => {
  const fluentStyles = useStyles();
  const serviceRef = React.useRef<AgentService>();
  if (!serviceRef.current) {
    serviceRef.current = new AgentService();
  }

  const [messages, setMessages] = React.useState<IAgentMessage[]>([]);
  const [isConnected, setIsConnected] = React.useState(false);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    setIsConnected(false);
    serviceRef.current?.disconnect();
  }, [connectionString]);

  const connect = async (): Promise<void> => {
    setIsConnecting(true);
    setError(undefined);

    try {
      await serviceRef.current!.connect(connectionString);
      setIsConnected(true);
    } catch (connectError) {
      setError(connectError instanceof Error ? connectError.message : String(connectError));
    } finally {
      setIsConnecting(false);
    }
  };

  const sendMessage = async (content: string): Promise<void> => {
    setMessages((currentMessages) => [...currentMessages, { role: 'user', content }]);
    setIsSending(true);
    setError(undefined);

    try {
      const responses = await serviceRef.current!.sendMessage(agentName, content);
      setMessages((currentMessages) => [...currentMessages, ...responses]);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : String(sendError));
    } finally {
      setIsSending(false);
    }
  };

    return (
      <FluentProvider theme={isDarkTheme ? webDarkTheme : webLightTheme}>
      <section className={styles.azureAiChat} data-theme={isDarkTheme ? 'dark' : 'light'}>
        <div className={fluentStyles.chat}>
          <div className={fluentStyles.header}>
            <Text as="h2" size={500} weight="semibold">{webPartTitle || strings.ChatTitle}</Text>
            <Button appearance="primary" disabled={isConnected || isConnecting} onClick={connect}>
              {isConnecting ? strings.ConnectingLabel : isConnected ? strings.ConnectedLabel : strings.ConnectButton}
            </Button>
          </div>
          {!agentName && <Text>{strings.ConfigureAgentLabel}</Text>}
          <div className={fluentStyles.messages} aria-live="polite">
            {messages.map((message, index) => <ChatMessage key={`${message.role}-${index}`} message={message} />)}
            {isSending && <div className={fluentStyles.status}><Spinner size="tiny" /><Text>{strings.SendingLabel}</Text></div>}
          </div>
          {error && <Text className={fluentStyles.error} role="alert">{error}</Text>}
          <ChatInput disabled={!isConnected || isSending || !agentName} onSend={sendMessage} />
        </div>
      </section>
      </FluentProvider>
  );
};

export default AzureAiChat;
