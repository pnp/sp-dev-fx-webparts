import * as React from 'react';
import styles from './CopilotChat.module.scss';
import type { ICopilotChatProps } from './ICopilotChatProps';
import { PrimaryButton, DefaultButton, Spinner, SpinnerSize } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface ICopilotChatState {
  userPrompt: string;
  chatHistory: ChatMessage[];
  isLoading: boolean;
  conversationId: string | undefined;
}

export default class CopilotChat extends React.Component<ICopilotChatProps, ICopilotChatState> {
  
  private chatEndRef: React.RefObject<HTMLDivElement>;

  constructor(props: ICopilotChatProps) {
    super(props);
    this.state = {
      userPrompt: '',
      chatHistory: [],
      isLoading: false,
      conversationId: undefined
    };
    this.chatEndRef = React.createRef<HTMLDivElement>();
  }

  private handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ userPrompt: event.target.value });
  };

  private handleSendPrompt = async (): Promise<void> => {
    const { userPrompt, conversationId, chatHistory } = this.state;
    const { copilotChatService } = this.props;
    
    if (!userPrompt.trim()) {
      return;
    }

    if (!copilotChatService) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        text: 'Error: Copilot Chat service is not available',
        timestamp: new Date()
      };
      this.setState({
        chatHistory: [...chatHistory, errorMessage],
        isLoading: false
      });
      return;
    }

    // Add user message to chat history
    const userMessage: ChatMessage = {
      role: 'user',
      text: userPrompt,
      timestamp: new Date()
    };

    this.setState({ 
      chatHistory: [...chatHistory, userMessage],
      isLoading: true, 
      userPrompt: '' 
    }, () => {
      this.scrollToBottom();
    });

    try {
      let currentConversationId = conversationId;

      // Initialize conversation if not already created
      if (!currentConversationId) {
        const conversation = await copilotChatService.CreateCopilotConversation();
        currentConversationId = conversation.id;
        this.setState({ conversationId: currentConversationId });
      }

      // Prepare additional context from additionalContext if provided
      const additionalContext = this.props.additionalContext?.trim() 
        ? [{ text: this.props.additionalContext.trim() }]
        : undefined;

      // Parse files from comma-separated URLs
      const fileReferences = this.props.files?.trim()
        ? this.props.files.split(',').map(url => url.trim()).filter(url => url).map(url => ({ uri: url }))
        : undefined;

      // Send the chat message
      const response = await copilotChatService.SendChatMessage(
        currentConversationId,
        userPrompt,
        {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          additionalContext: additionalContext,
          files: fileReferences,
          webSearchEnabled: this.props.webSearchEnabled
        }
      );

      // Extract the AI response from the conversation messages
      const messages = response.messages || [];
      const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
      const aiResponseText = lastMessage?.text || 'No response received from AI';
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        text: aiResponseText,
        timestamp: new Date()
      };
            
      this.setState((prevState) => ({
        chatHistory: [...prevState.chatHistory, assistantMessage],
        isLoading: false
      }), () => {
        this.scrollToBottom();
      });
    } catch (error) {
      console.error('Error communicating with Copilot Chat:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        text: `Error: Failed to get response from AI - ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date()
      };
      this.setState((prevState) => ({
        chatHistory: [...prevState.chatHistory, errorMessage],
        isLoading: false
      }), () => {
        this.scrollToBottom();
      });
    }
  };

  private handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      this.handleSendPrompt().catch((error) => {
        console.error('Error sending prompt:', error);
      });
    }
  };

  private handleNewConversation = (): void => {
    this.setState({
      chatHistory: [],
      conversationId: undefined,
      userPrompt: '',
      isLoading: false
    });
  };

  private scrollToBottom = (): void => {
    this.chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  public render(): React.ReactElement<ICopilotChatProps> {
    const { hasTeamsContext } = this.props;
    const { userPrompt, chatHistory, isLoading } = this.state;

    return (
      <section className={`${styles.copilotChat} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <div className={styles.headerLeft}>
              <Icon iconName="Robot" className={styles.headerIcon} />
              <h2 className={styles.chatTitle}>AI Microsoft 365 Copilot Chat</h2>
            </div>
            <DefaultButton
              text="New Conversation"
              iconProps={{ iconName: 'Add' }}
              onClick={this.handleNewConversation}
              className={styles.newConversationButton}
              disabled={isLoading}
            />
          </div>

          {/* Chat History Display Area */}
          <div className={styles.responseArea}>
            {chatHistory.length === 0 && !isLoading ? (
              <div className={styles.emptyState}>
                <Icon iconName="Comment" className={styles.emptyStateIcon} />
                <p>Ask me anything! Type your question below and press send.</p>
              </div>
            ) : (
              <div className={styles.chatHistoryContainer}>
                {chatHistory.map((message, index) => (
                  <div 
                    key={index} 
                    className={message.role === 'user' ? styles.userMessage : styles.assistantMessage}
                  >
                    <div className={styles.messageHeader}>
                      <Icon 
                        iconName={message.role === 'user' ? 'Contact' : 'ChatBot'} 
                        className={styles.messageIcon} 
                      />
                      <span className={styles.messageRole}>
                        {message.role === 'user' ? 'You' : 'AI Assistant'}
                      </span>
                      <span className={styles.messageTimestamp}>
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className={styles.messageContent}>
                      {message.role === 'user' ? (
                        <p className={styles.userMessageText}>{message.text}</p>
                      ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.text}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className={styles.assistantMessage}>
                    <div className={styles.messageHeader}>
                      <Icon iconName="ChatBot" className={styles.messageIcon} />
                      <span className={styles.messageRole}>AI Assistant</span>
                    </div>
                    <div className={styles.messageContent}>
                      <Spinner size={SpinnerSize.small} label="Thinking..." />
                    </div>
                  </div>
                )}
                <div ref={this.chatEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className={styles.inputArea}>
            <div className={styles.textareaContainer}>
              <textarea
                className={styles.promptTextarea}
                placeholder="Type your message here... (Ctrl+Enter to send)"
                value={userPrompt}
                onChange={this.handlePromptChange}
                onKeyPress={this.handleKeyPress}
                rows={3}
                disabled={isLoading}
              />
            </div>
            <div className={styles.buttonContainer}>
              <PrimaryButton
                text="Send"
                iconProps={{ iconName: 'Send' }}
                onClick={this.handleSendPrompt}
                disabled={!userPrompt.trim() || isLoading}
                className={styles.sendButton}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }


}
