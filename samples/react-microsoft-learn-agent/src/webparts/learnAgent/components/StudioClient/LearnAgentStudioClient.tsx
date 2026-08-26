

import { useState, useCallback, useMemo, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './LearnAgentStudioClient.module.scss';
import type { ILearnAgentStudioClientProps } from './ILearnAgentStudioClientProps';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { useCopilotStudioClient } from '../../../../hooks/useCopilotStudioClient';
import { CopilotHelper } from '../../../../helpers/CopilotHelper';
import * as React from 'react';
import * as remarkGfm from 'remark-gfm';
import { Send, RefreshCw, User, Bot } from 'lucide-react';
import clsx from 'clsx';
import {
  UI_TEXT,
  MESSAGE_SENDERS,
  INPUT_VALIDATION,
  KEYBOARD_EVENTS,
  INPUT_TYPES,
  BUTTON_TYPES
} from '../../../../constants/app.constants';
import { CitationParser, ParsedResponse } from '../../../../utils/CitationParser';
import { CitationComponent } from '../Shared/CitationComponent';
import { TextWithCitations } from '../Shared/TextWithCitations';

const LearnAgentStudioClient: React.FC<ILearnAgentStudioClientProps> = (props) => {
  const {
    userEmail,
    environmentId,
    agentIdentifier,
    tenantId,
    appClientId,
  } = props;

  const isConfigured = Boolean(environmentId && agentIdentifier && tenantId && appClientId);

  const handleConfigure = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).propertyPane) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).propertyPane.open();
    }
  }, []);

  const connectionSettings = useMemo(() => CopilotHelper.getConnectionSettings(props), [environmentId, agentIdentifier, tenantId, appClientId]);

  const [messages, setMessages] = useState<Array<{
    sender: string;
    text: string;
    timestamp: Date;
    parsedResponse?: ParsedResponse;
  }>>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const {
    isInitializing,
    isRefreshing,
    isAsking,
    error,
    refreshConversationId,
    askQuestion,
    init,
  } = useCopilotStudioClient({
    connectionSettings,
    userEmail,
  });

  // Initialize Copilot client when configured
  useEffect(() => {
    if (isConfigured && userEmail) {
      init().catch(console.error);
    }
    // Only run when config/user changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfigured, userEmail]);

  // Reset messages when configuration changes
  useEffect(() => {
    if (isConfigured) {
      setMessages([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfigured, userEmail, environmentId, agentIdentifier, tenantId, appClientId]);

  const handleSend = useCallback(async (): Promise<void> => {
    if (!input.trim() || isAsking) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: MESSAGE_SENDERS.USER, text: userMessage, timestamp: new Date() }]);
    setIsTyping(true);

    try {
      const response = await askQuestion(userMessage);
      setIsTyping(false);
      const parsedResponse = CitationParser.parseResponse(response);
      setMessages(prev => [...prev, {
        sender: MESSAGE_SENDERS.AGENT,
        text: response,
        timestamp: new Date(),
        parsedResponse
      }]);
    } catch (error) {
      setIsTyping(false);
      console.error('Error asking question:', error);
    }
  }, [input, askQuestion, isAsking]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === KEYBOARD_EVENTS.ENTER && !e.shiftKey) {
      e.preventDefault();
      handleSend().catch(console.error);
    }
  }, [handleSend]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  }, []);

  const handleRefresh = useCallback(async (): Promise<void> => {
    await refreshConversationId();
    setMessages([]);
  }, [refreshConversationId]);

  if (!isConfigured) {
    return (
      <Placeholder
        iconName="Edit"
        iconText={UI_TEXT.CONFIGURE_WEB_PART}
        description={UI_TEXT.PLEASE_CONFIGURE}
        buttonLabel={UI_TEXT.CONFIGURE_BUTTON}
        onConfigure={handleConfigure}
      />
    );
  }

  return (
    <div className={styles.chatContainer}>
      {/* Loading Overlay */}
      {isInitializing && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner} />
          <div className={styles.loadingText}>Initializing Microsoft Learn Agent...</div>
        </div>
      )}

      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerTitle}>
            <Bot size={24} className={styles.headerIcon} />
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>Microsoft Learn Agent (Copilot Studio API)</h1>              
            </div>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={styles.refreshButton}
            title="Reset conversation"
          >
            <RefreshCw size={18} className={clsx(styles.refreshIcon, { [styles.spinning]: isRefreshing })} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div className={styles.welcomeMessage}>
            <div className={styles.welcomeContent}>
              <h2>{UI_TEXT.WELCOME_LEARN_TITLE}</h2>
              <p>{UI_TEXT.WELCOME_LEARN_MESSAGE}</p>
            </div>
          </div>
        ) : (
          <div className={styles.messagesList}>
            {messages.map((msg, idx) => (
              <div key={idx} className={clsx(styles.messageGroup, {
                [styles.userMessage]: msg.sender === MESSAGE_SENDERS.USER,
                [styles.agentMessage]: msg.sender === MESSAGE_SENDERS.AGENT
              })}>
                <div className={styles.messageAvatar}>
                  {msg.sender === MESSAGE_SENDERS.USER ? (
                    <User size={20} />
                  ) : (
                    <Bot size={20} />
                  )}
                </div>
                <div className={styles.messageContent}>
                  <div className={styles.messageBubble}>
                    {msg.sender === MESSAGE_SENDERS.AGENT ? (
                      <>
                        {msg.parsedResponse && msg.parsedResponse.citations.length > 0 ? (
                          <TextWithCitations
                            text={msg.parsedResponse.text}
                            onCitationClick={(citationNumber) => {
                              const citation = msg.parsedResponse?.citations.find(c => c.number === citationNumber);
                              if (citation?.url) {
                                window.open(citation.url, '_blank', 'noopener,noreferrer');
                              }
                            }}
                          />
                        ) : (
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                        )}
                        {msg.parsedResponse && msg.parsedResponse.citations.length > 0 && (
                          <CitationComponent citations={msg.parsedResponse.citations} />
                        )}
                      </>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              </div>
            ))}
            {/* Typing Indicator */}
            {isTyping && (
              <div className={clsx(styles.messageGroup, styles.agentMessage, styles.typingMessage)}>
                <div className={styles.messageAvatar}>
                  <Bot size={20} />
                </div>
                <div className={styles.messageContent}>
                  <div className={clsx(styles.messageBubble, styles.typingBubble)}>
                    <div className={styles.typingIndicator}>
                      <div className={styles.typingDot} />
                      <div className={styles.typingDot} />
                      <div className={styles.typingDot} />
                    </div>
                    <span className={styles.typingText}>AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <input
            type={INPUT_TYPES.TEXT}
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={UI_TEXT.TYPING_PLACEHOLDER}
            className={styles.messageInput}
            disabled={isAsking}
            maxLength={INPUT_VALIDATION.MAX_LENGTH}
          />
          <button
            type={BUTTON_TYPES.BUTTON}
            onClick={handleSend}
            disabled={isAsking || !input.trim()}
            className={styles.sendButton}
            title={UI_TEXT.SEND_MESSAGE_TITLE}
          >
            <Send size={20} />
          </button>
        </div>
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnAgentStudioClient;
