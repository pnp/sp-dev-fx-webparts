import * as React from "react";
import styles from "./CopilotChatTab.module.scss";
import { PrimaryButton, DefaultButton, IconButton } from "@fluentui/react/lib/Button";
import { TextField } from "@fluentui/react/lib/TextField";
import { Toggle } from "@fluentui/react/lib/Toggle";
import { MessageBar, MessageBarType } from "@fluentui/react/lib/MessageBar";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { CopilotChatService } from "../../../../services/CopilotChatService";
import type { CopilotConversation } from "../../../../services/ICopilotChatService";
import PrerequisitesPanel from "../PrerequisitesPanel";
import MarkdownRenderer from "./MarkdownRenderer";
import ReferencesBlock from "./ReferencesBlock";

interface ICopilotChatTabProps {
  userDisplayName: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

interface ICopilotChatTabState {
  conversation: CopilotConversation | null;
  conversationId: string | undefined;
  userMessage: string;
  chatHistory: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  fileUrls: string[];
  newFileUrl: string;
  webSearchEnabled: boolean;
  renderMarkdown: boolean;
}

export default class CopilotChatTab extends React.Component<
  ICopilotChatTabProps,
  ICopilotChatTabState
> {
  constructor(props: ICopilotChatTabProps) {
    super(props);
    this.state = {
      conversation: null,
      conversationId: undefined,
      userMessage: "",
      chatHistory: [],
      isLoading: false,
      error: null,
      fileUrls: [],
      newFileUrl: "",
      webSearchEnabled: false,
      renderMarkdown: false,
    };
  }

  private handleAddFile = (): void => {
    const { newFileUrl, fileUrls } = this.state;
    const url = newFileUrl.trim();
    if (url && !fileUrls.includes(url)) {
      this.setState({
        fileUrls: [...fileUrls, url],
        newFileUrl: "",
      });
    }
  };

  private handleAddFileKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleAddFile();
    }
  };

  private handleRemoveFile = (index: number): void => {
    this.setState((prevState) => ({
      fileUrls: prevState.fileUrls.filter((_, i) => i !== index),
    }));
  };

  private getFileDisplayName(url: string): string {
    try {
      const decoded = decodeURIComponent(url);
      const parts = decoded.split("/");
      return parts[parts.length - 1] || url;
    } catch {
      return url;
    }
  }

  private handleSendMessage = async (): Promise<void> => {
    const {
      userMessage,
      conversationId,
      chatHistory,
      fileUrls,
      webSearchEnabled,
    } = this.state;

    if (!userMessage.trim()) return;

    const userChatMessage: ChatMessage = {
      role: "user",
      text: userMessage,
      timestamp: new Date(),
    };

    this.setState({
      chatHistory: [...chatHistory, userChatMessage],
      isLoading: true,
      userMessage: "",
      error: null,
    });

    try {
      let currentConversationId = conversationId;

      if (!currentConversationId) {
        const conversation =
          await CopilotChatService.CreateCopilotConversation();
        currentConversationId = conversation.id;
        this.setState({ conversationId: currentConversationId });
      }

      const files =
        fileUrls.length > 0
          ? fileUrls.map((uri) => ({ uri }))
          : undefined;

      const response = await CopilotChatService.SendChatMessage(
        currentConversationId,
        userMessage,
        {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          files: files,
          webSearchEnabled: webSearchEnabled,
        },
      );

      const messages = response.messages || [];
      const lastMessage =
        messages.length > 0 ? messages[messages.length - 1] : null;
      const aiResponseText =
        lastMessage?.text || "No response received from Copilot";

      const assistantMessage: ChatMessage = {
        role: "assistant",
        text: aiResponseText,
        timestamp: new Date(),
      };

      this.setState((prevState) => ({
        chatHistory: [...prevState.chatHistory, assistantMessage],
        conversation: response,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      this.setState((prevState) => ({
        chatHistory: [
          ...prevState.chatHistory,
          { role: "assistant", text: `Error: ${errorMessage}`, timestamp: new Date() },
        ],
        error: errorMessage,
        isLoading: false,
      }));
    }
  };

  private handleKeyPress = (
    event: React.KeyboardEvent<HTMLElement>,
  ): void => {
    if (event.key === "Enter" && event.ctrlKey) {
      event.preventDefault();
      this.handleSendMessage().catch(console.error);
    }
  };

  private handleNewConversation = (): void => {
    this.setState({
      chatHistory: [],
      conversationId: undefined,
      conversation: null,
      userMessage: "",
      error: null,
      isLoading: false,
    });
  };

  public render(): React.ReactElement<ICopilotChatTabProps> {
    const {
      conversationId,
      userMessage,
      chatHistory,
      isLoading,
      error,
      fileUrls,
      newFileUrl,
      webSearchEnabled,
      conversation,
      renderMarkdown,
    } = this.state;

    return (
      <div className={styles.chatContainer}>
        {/* API Info Bar */}
        <div className={styles.apiBar}>
          <div className={styles.apiBarLeft}>
            <strong>Copilot Chat API</strong>
            <code style={{ fontSize: "12px" }}>
              POST /beta/copilot/conversations
            </code>
            <span className={`${styles.badge} ${styles.badgeBeta}`}>
              Beta
            </span>
          </div>
          <PrerequisitesPanel
            apiName="Copilot Chat API"
            apiStatus="Beta"
            endpoint="POST /beta/copilot/conversations/{id}/chat"
            description="Create conversations and exchange messages with Microsoft 365 Copilot. Supports file references, web search, and custom instructions."
            prerequisites={[
              {
                category: "Required Permissions",
                items: [
                  "Sites.Read.All",
                  "Mail.Read",
                  "People.Read.All",
                  "OnlineMeetingTranscript.Read.All",
                  "Chat.Read",
                  "ChannelMessage.Read.All",
                  "ExternalItem.Read.All",
                ],
              },
              {
                category: "Licensing",
                items: [
                  "Microsoft 365 Copilot license required for users",
                ],
              },
              {
                category: "Limitations",
                items: [
                  "Beta API — subject to change without notice",
                  "Conversation history is session-based (not persisted)",
                  "Admin consent required for API permissions",
                ],
              },
            ]}
          />
        </div>

        {/* Toolbar */}
        <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
          <DefaultButton
            iconProps={{ iconName: "Add" }}
            text="New Conversation"
            onClick={this.handleNewConversation}
            disabled={isLoading}
          />
          {conversationId && (
            <span style={{ fontSize: "12px", color: "#666" }}>
              ID: {conversationId}
            </span>
          )}
        </div>

        {error && (
          <MessageBar
            messageBarType={MessageBarType.error}
            onDismiss={() => this.setState({ error: null })}
            dismissButtonAriaLabel="Close"
            styles={{ root: { marginBottom: "12px" } }}
          >
            {error}
          </MessageBar>
        )}

        <div className={styles.chatLayout}>
          {/* Chat area */}
          <div className={styles.chatMain}>
            <div className={styles.chatHistory}>
              {chatHistory.length === 0 ? (
                <div className={styles.emptyState}>
                  No messages yet. Type a message below to start chatting with Copilot.
                </div>
              ) : (
                chatHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`${styles.messageBubble} ${msg.role === "user" ? styles.userBubble : styles.assistantBubble}`}
                    >
                      <div className={styles.messageHeader}>
                        <strong style={{ color: msg.role === "user" ? "#0078d4" : "#323130" }}>
                          {msg.role === "user" ? "You" : "Copilot"}
                        </strong>
                        <span className={styles.messageTime}>
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className={styles.messageContent}>
                        {msg.role === "assistant" ? (
                          <>
                            {renderMarkdown ? (
                              <MarkdownRenderer text={msg.text} />
                            ) : (
                              <div className={styles.userMessageText}>{msg.text}</div>
                            )}
                            {renderMarkdown && <ReferencesBlock text={msg.text} />}
                          </>
                        ) : (
                          <div className={styles.userMessageText}>{msg.text}</div>
                        )}
                      </div>
                    </div>
                ))
              )}
              {isLoading && (
                <div className={styles.thinkingBubble}>
                  <Spinner size={SpinnerSize.small} label="Copilot is thinking..." labelPosition="right" />
                </div>
              )}
            </div>

            {/* Input */}
            <TextField
              multiline
              rows={3}
              value={userMessage}
              onChange={(_, val) => this.setState({ userMessage: val || "" })}
              onKeyPress={this.handleKeyPress}
              placeholder="Type your message here... (Ctrl+Enter to send)"
              disabled={isLoading}
              resizable={false}
              styles={{ root: { marginBottom: "8px" } }}
            />
            <PrimaryButton
              text={isLoading ? "Sending..." : "Send"}
              iconProps={{ iconName: "Send" }}
              onClick={this.handleSendMessage}
              disabled={!userMessage.trim() || isLoading}
            />
          </div>

          {/* Sidebar */}
          <div className={styles.chatSidebar}>
            <div className={styles.sidebarCard}>
              <h4 className={styles.sidebarTitle}>Context Options</h4>

              {/* Multi-file references */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontSize: "12px", fontWeight: 600 }}>
                  File References
                </label>
                <div style={{ display: "flex", gap: "4px" }}>
                  <input
                    type="text"
                    value={newFileUrl}
                    onChange={(e) => this.setState({ newFileUrl: e.target.value })}
                    onKeyPress={this.handleAddFileKeyPress}
                    placeholder="Paste SharePoint file URL..."
                    disabled={isLoading}
                    style={{
                      flex: 1,
                      padding: "6px 8px",
                      borderRadius: "4px",
                      border: "1px solid #edebe9",
                      fontSize: "12px",
                      fontFamily: "inherit",
                    }}
                  />
                  <IconButton
                    iconProps={{ iconName: "Add" }}
                    title="Add file"
                    onClick={this.handleAddFile}
                    disabled={!newFileUrl.trim() || isLoading}
                    styles={{
                      root: { height: 30, width: 30 },
                      icon: { fontSize: 12 },
                    }}
                  />
                </div>

                {fileUrls.length > 0 && (
                  <div className={styles.fileList}>
                    {fileUrls.map((url, index) => (
                      <div key={index} className={styles.fileTag} title={url}>
                        <span className={styles.fileTagText}>
                          {this.getFileDisplayName(url)}
                        </span>
                        <span
                          className={styles.fileTagRemove}
                          onClick={() => this.handleRemoveFile(index)}
                          title="Remove"
                        >
                          &times;
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ fontSize: "11px", color: "#666", marginTop: "6px" }}>
                  Add SharePoint/OneDrive file URLs as context for Copilot.
                </div>
              </div>

              {/* Web Search Toggle */}
              <Toggle
                label="Enable Web Search"
                checked={webSearchEnabled}
                onChange={(_, checked) =>
                  this.setState({ webSearchEnabled: !!checked })
                }
                disabled={isLoading}
                inlineLabel
                styles={{ root: { marginBottom: 0 } }}
              />
              <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
                Allow Copilot to search the web for additional context.
              </div>

              <div style={{ marginTop: "10px" }}>
                <Toggle
                  label="Render markdown"
                  checked={renderMarkdown}
                  onChange={(_, checked) =>
                    this.setState({ renderMarkdown: !!checked })
                  }
                  disabled={isLoading}
                  inlineLabel
                  styles={{ root: { marginBottom: 0 } }}
                />
                <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
                  Off = show raw Copilot text. On = render markdown and list extracted references.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Debug */}
        {conversation && (
          <details style={{ marginTop: "20px" }}>
            <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "13px", color: "#0078d4" }}>
              Debug: Last Response JSON
            </summary>
            <pre
              style={{
                backgroundColor: "#1e1e1e",
                color: "#d4d4d4",
                padding: "15px",
                borderRadius: "6px",
                overflow: "auto",
                maxHeight: "300px",
                fontSize: "12px",
                fontFamily: "'Consolas', monospace",
                marginTop: "8px",
              }}
            >
              {JSON.stringify(conversation, null, 2)}
            </pre>
          </details>
        )}
      </div>
    );
  }
}
