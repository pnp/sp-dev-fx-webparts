import * as React from 'react';
import styles from './CopilotChat.module.scss';
import type { ICopilotChatProps } from './ICopilotChatProps';
import { IconButton, PrimaryButton, Spinner, SpinnerSize } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';


interface ICopilotChatState {
  userPrompt: string;
  aiResponse: string;
  isLoading: boolean;
  conversationId: string | null;
}

export default class CopilotChat extends React.Component<ICopilotChatProps, ICopilotChatState> {
  
  constructor(props: ICopilotChatProps) {
    super(props);
    this.state = {
      userPrompt: '',
      aiResponse: '',
      isLoading: false,
      conversationId: null
    };
  }

  private handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ userPrompt: event.target.value });
  };

  private handleSendPrompt = async (): Promise<void> => {
    const { userPrompt, conversationId } = this.state;
    const { copilotChatService } = this.props;
    
    if (!userPrompt.trim()) {
      return;
    }

    if (!copilotChatService) {
      this.setState({
        aiResponse: 'Error: Copilot Chat service is not available',
        isLoading: false
      });
      return;
    }

    this.setState({ isLoading: true, aiResponse: '' });

    try {
      let currentConversationId = conversationId;

      // Initialize conversation if not already created
      if (!currentConversationId) {
        const conversation = await copilotChatService.CreateCopilotConversation();
        currentConversationId = conversation.id;
        this.setState({ conversationId: currentConversationId });
      }

      // Prepare additional context from additionalInstructions if provided
      const additionalContext = this.props.additionalInstructions?.trim() 
        ? [{ text: this.props.additionalInstructions.trim() }]
        : undefined;

      // Send the chat message
      const response = await copilotChatService.SendChatMessage(
        currentConversationId,
        userPrompt,
        {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          additionalContext: additionalContext
        }
      );

      // Extract the AI response from the conversation messages
      const messages = response.messages || [];
      const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
      const aiResponseText = lastMessage?.text || 'No response received from AI';
            
      this.setState({
        aiResponse: aiResponseText,
        isLoading: false
      });
    } catch (error) {
      console.error('Error communicating with Copilot Chat:', error);
      this.setState({
        aiResponse: `Error: Failed to get response from AI - ${error instanceof Error ? error.message : 'Unknown error'}`,
        isLoading: false
      });
    }
  };

  private handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      this.handleSendPrompt();
    }
  };

  public render(): React.ReactElement<ICopilotChatProps> {
    const { hasTeamsContext } = this.props;
    const { userPrompt, aiResponse, isLoading } = this.state;

    return (
      <section className={`${styles.copilotChat} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <Icon iconName="Robot" className={styles.headerIcon} />
            <h2 className={styles.chatTitle}>AI Microsoft 365 Copilot Chat</h2>
          </div>

          {/* Response Display Area */}
          <div className={styles.responseArea}>
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <Spinner size={SpinnerSize.large} label="Getting response..." />
              </div>
            ) : aiResponse ? (
              <div className={styles.responseContent}>
                <div className={styles.responseHeader}>
                  <Icon iconName="ChatBot" className={styles.responseIcon} />
                  <span className={styles.responseLabel}>AI Response</span>
                </div>
                <div className={styles.responseText}>{aiResponse}</div>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <Icon iconName="Comment" className={styles.emptyStateIcon} />
                <p>Ask me anything! Type your question below and press send.</p>
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
