import * as React from 'react';
import { TextField, PrimaryButton, Spinner, SpinnerSize, IconButton } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import { AadTokenProvider } from '@microsoft/sp-http';
import { marked } from 'marked';
import * as DOMPurify from 'dompurify';
import styles from './ChatInterface.module.scss';

interface IChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface IChatInterfaceProps {
  azFunctionUrl: string;
  azureFunctionAppId: string;
  tokenProvider: AadTokenProvider;
}

export const ChatInterface: React.FC<IChatInterfaceProps> = (props) => {
  const [chatHistory, setChatHistory] = React.useState<IChatMessage[]>([]);
  const [inputMessage, setInputMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isStreaming, setIsStreaming] = React.useState<boolean>(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] = React.useState<string>('');
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  // Configure marked options
  React.useEffect(() => {
    marked.setOptions({
      breaks: true,
      gfm: true
    });
  }, []);
 
  const scrollToBottom = (): void => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
 React.useEffect(() => {
    scrollToBottom();
  }, [chatHistory, currentStreamingMessage]);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    setInputMessage(newValue || '');
  };

  const streamChatResponse = async (message: string): Promise<void> => {
    // Trim trailing slash from azFunctionUrl
    const baseUrl = props.azFunctionUrl.replace(/\/$/, '');
    const endpoint = `${baseUrl}/api/HttpChat`;

    try {
      // Get the access token using the token provider
      const token = await props.tokenProvider.getToken(props.azureFunctionAppId);
      
      // Use fetch for SSE as AadHttpClient doesn't support streaming
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let streamedContent = '';

      if (!reader) {
        throw new Error('No reader available');
      }

      setIsLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.indexOf('data: ') === 0) {
            const data = line.substring(6);
            try {
              const parsed = JSON.parse(data);
              
              if (parsed.type === 'content') {
                streamedContent += parsed.content;
                setCurrentStreamingMessage(streamedContent);
              } else if (parsed.type === 'complete') {
                const assistantMessage: IChatMessage = {
                  role: 'assistant',
                  content: streamedContent,
                  timestamp: new Date()
                };
                setChatHistory(prevHistory => [...prevHistory, assistantMessage]);
                setIsStreaming(false);
                setCurrentStreamingMessage('');
              } else if (parsed.type === 'error') {
                throw new Error(parsed.error);
              }
            } catch (parseError) {
              console.error('Error parsing SSE data:', parseError);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in SSE stream:', error);
      setIsLoading(false);
      setIsStreaming(false);
      setCurrentStreamingMessage('');
      throw error;
    }
  };

  const handleSendMessage = async (): Promise<void> => {
    if (!inputMessage.trim()) {
      return;
    }

    const userMessage: IChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setChatHistory(prevHistory => [...prevHistory, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsStreaming(true);
    setCurrentStreamingMessage('');

    try {
      await streamChatResponse(inputMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: IChatMessage = {
        role: 'assistant',
        content: 'Sorry, an error occurred while processing your message.',
        timestamp: new Date()
      };
      setChatHistory(prevHistory => [...prevHistory, errorMessage]);
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = (): void => {
    setChatHistory([]);
    setInputMessage('');
    setIsLoading(false);
    setIsStreaming(false);
    setCurrentStreamingMessage('');
  };

  const renderChatHeader = (): JSX.Element => {
    return (
      <div className={styles.chatHeader}>
        <Icon iconName="Chat" className={styles.chatIcon} />
        <span className={styles.chatTitle}>Chat with Semantic Kernel</span>
        {chatHistory.length > 0 && (
          <IconButton
            iconProps={{ iconName: 'Delete' }}
            title="Clear chat"
            ariaLabel="Clear chat"
            onClick={clearChat}
            className={styles.clearButton}
          />
        )}
      </div>
    );
  };

  const renderEmptyState = (): JSX.Element => {
    return (
      <div className={styles.emptyState}>
        <Icon iconName="Robot" className={styles.emptyIcon} />
        <p>Start a conversation with the AI assistant</p>
      </div>
    );
  };

  const renderMessageIcon = (role: 'user' | 'assistant'): JSX.Element => {
    return (
      <div className={styles.messageIcon}>
        <Icon iconName={role === 'user' ? 'Contact' : 'Robot'} />
      </div>
    );
  };

  const renderMarkdown = (content: string): string => {
    const rawHtml = marked.parse(content) as string;
    return rawHtml;
    return DOMPurify.sanitize(rawHtml);
  };

  const renderMessage = (message: IChatMessage, index: number): JSX.Element => {
    const htmlContent = renderMarkdown(message.content);
    
    return (
      <div key={index} className={`${styles.message} ${styles[message.role]}`}>
        {renderMessageIcon(message.role)}
        <div className={styles.messageContent}>
          <div 
            className={styles.messageText}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          <div className={styles.messageTime}>
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
  };

  const renderStreamingMessage = (): JSX.Element => {
    const htmlContent = renderMarkdown(currentStreamingMessage);
    
    return (
      <div className={`${styles.message} ${styles.assistant}`}>
        {renderMessageIcon('assistant')}
        <div className={styles.messageContent}>
          <div 
            className={styles.messageText}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          <Spinner size={SpinnerSize.xSmall} className={styles.streamingIndicator} />
        </div>
      </div>
    );
  };

  const renderLoadingMessage = (): JSX.Element => {
    return (
      <div className={`${styles.message} ${styles.assistant}`}>
        {renderMessageIcon('assistant')}
        <div className={styles.messageContent}>
          <Spinner size={SpinnerSize.small} label="Thinking..." />
        </div>
      </div>
    );
  };

  const renderInputArea = (): JSX.Element => {
    return (
      <div className={styles.inputContainer}>
        <TextField
          placeholder="Type your message..."
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          multiline
          rows={3}
          disabled={isLoading || isStreaming}
          className={styles.messageInput}
        />
        <PrimaryButton
          iconProps={{ iconName: 'Send' }}
          text="Send"
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading || isStreaming}
          className={styles.sendButton}
        />
      </div>
    );
  };

  return (
    <div className={styles.chatWrapper}>
      {renderChatHeader()}
      
      <div className={styles.chatContainer} ref={chatContainerRef}>
        {chatHistory.length === 0 && renderEmptyState()}
        {chatHistory.map(renderMessage)}
        {isStreaming && currentStreamingMessage && renderStreamingMessage()}
        {isLoading && !currentStreamingMessage && renderLoadingMessage()}
      </div>
      
      {renderInputArea()}
    </div>
  );
};
