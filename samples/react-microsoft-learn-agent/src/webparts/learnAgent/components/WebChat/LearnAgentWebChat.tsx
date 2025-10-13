import * as React from 'react';
import { useEffect, useState } from 'react';
import { Components } from 'botframework-webchat';
import { FluentThemeProvider } from 'botframework-webchat-fluent-theme';
import { ConnectionSettings, CopilotStudioClient, CopilotStudioWebChat, CopilotStudioWebChatConnection } from '@microsoft/agents-copilotstudio-client';
import { ILearnAgentWebChatProps } from './ILearnAgentWebChatProps';
import styles from '../Shared/LearnAgent.module.scss';
import { acquireToken } from '../../../../helpers/UnifiedAuth';

const { BasicWebChat, Composer } = Components;

export interface IChatProps extends Pick<ILearnAgentWebChatProps, 'appClientId' | 'tenantId' | 'environmentId' | 'agentIdentifier' | 'userEmail'> {
  directConnectUrl?: string;
  showTyping?: boolean;
  baseUrl?: string;
}

interface ChatMessageProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'error';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ children, type = 'info' }) => {
  const styles = {
    info: { padding: 16 },
    warning: { padding: 16, color: '#8a6d3b', backgroundColor: '#fcf8e3' },
    error: { padding: 16, color: '#a94442', backgroundColor: '#f2dede' }
  };

  return <div style={styles[type]}>{children}</div>;
};

interface WebChatRendererProps {
  connection: CopilotStudioWebChatConnection;
}

const WebChatRenderer: React.FC<WebChatRendererProps> = ({ connection }) => {
  const [renderError, setRenderError] = useState<string | null>(null);

  useEffect(() => {
    // Reset error when connection changes
    setRenderError(null);
  }, [connection]);

  // Inject custom CSS to ensure input stability
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Ensure WebChat input area is always visible */
      .webchat__send-box {
        position: relative !important;
        z-index: 100 !important;
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        min-height: 60px !important;
        background-color: white !important;
        border-top: 1px solid #e1e5e9 !important;
      }
      
      /* Style connection modals to not interfere */
      .webchat__modal {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        z-index: 10000 !important;
        max-width: 500px !important;
        width: 90% !important;
        background: white !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
      }
      
      /* Ensure backdrop doesn't affect layout */
      .webchat__modal-backdrop {
        z-index: 9999 !important;
        background-color: rgba(0,0,0,0.3) !important;
      }
      
      /* Keep message list properly sized */
      .webchat__message-list {
        flex: 1 !important;
        margin-bottom: 0px !important;
        padding-bottom: 10px !important;
      }
      
      /* Ensure root layout is stable */
      .webchat__root {
        display: flex !important;
        flex-direction: column !important;
        height: 100% !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (renderError) {
    return (
      <ChatMessage type="error">
        <h3>WebChat Render Error</h3>
        <p>{renderError}</p>
        <button onClick={() => setRenderError(null)}>Try Again</button>
      </ChatMessage>
    );
  }

  try {
    return (
      <FluentThemeProvider>
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          position: 'relative',
          minHeight: '400px' // Ensure minimum height
        }}>
          <Composer 
            directLine={connection}
            styleOptions={{
              rootHeight: '100%',
              rootWidth: '100%',
              backgroundColor: '#f8fafc',
              // Ensure input box is always visible and stable
              sendBoxHeight: 60,
              paddingRegular: 12,
              // Critical: Keep sendBox always visible
              sendBox: {
                position: 'relative', // Changed from sticky to relative
                bottom: 'auto',
                zIndex: 100, // Lower than modal but still visible
                backgroundColor: 'white',
                borderTop: '1px solid #e1e5e9',
                minHeight: '60px', // Ensure consistent height
                display: 'flex !important', // Force display even during modals
                visibility: 'visible !important' // Force visibility
              },
              // Ensure message list has proper scrolling and space for input
              messageList: {
                flexGrow: 1,
                overflowY: 'auto',
                paddingBottom: '10px',
                marginBottom: '0px' // Remove any margin that might hide input
              },
              // Style the connection modal to not interfere with input
              modal: {
                zIndex: 10000,
                position: 'fixed', // Fixed positioning to not affect layout
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                maxWidth: '500px',
                width: '90%'
              },
              // Ensure backdrop doesn't hide input
              modalBackdrop: {
                zIndex: 9999,
                backgroundColor: 'rgba(0,0,0,0.3)'
              },
              // Additional styles to keep input visible
              root: {
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }
            }}
          >
            <BasicWebChat />
          </Composer>
        </div>
      </FluentThemeProvider>
    );
  } catch (err) {
    console.error('WebChat render error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown render error';
    setRenderError(errorMessage);
    
    return (
      <ChatMessage type="error">
        <h3>WebChat Render Error</h3>
        <p>{errorMessage}</p>
        <button onClick={() => setRenderError(null)}>Try Again</button>
      </ChatMessage>
    );
  }
};

const LearnAgentWebChat: React.FC<IChatProps> = ({
  appClientId,
  tenantId,
  environmentId,
  agentIdentifier,
  directConnectUrl,
  userEmail,
  baseUrl,
  showTyping = true
}) => {
  const [connection, setConnection] = useState<CopilotStudioWebChatConnection | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const isConfigured = appClientId && tenantId && (directConnectUrl || (environmentId && agentIdentifier));

  useEffect(() => {
    if (!isConfigured) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const initializeWebChat = async (): Promise<void> => {
      try {
        console.log('WebChat: Starting initialization...');
        
        // Step 1: Acquire authentication token
        const token = await acquireToken({
          appClientId,
          tenantId,
          currentUserLogin: userEmail,
          redirectUri: baseUrl || window.location.origin
        });
        
        if (!token) {
          throw new Error('Unable to acquire authentication token');
        }
        
        console.log('WebChat: Authentication successful');

        // Step 2: Create connection settings
        const settings = new ConnectionSettings({
          appClientId,
          tenantId,
          environmentId: environmentId || '',
          agentIdentifier: agentIdentifier || '',
          directConnectUrl: directConnectUrl || ''
        });

        console.log('WebChat: Connection settings created');

        // Step 3: Initialize Copilot Studio client
        const client = new CopilotStudioClient(settings, token);
        
        // Step 4: Create WebChat connection with enhanced settings
        const webchatSettings = { 
          showTyping: true,
          hideUploadButton: false,
          enableIncomingActivityMiddleware: true,
          typingAnimationDuration: 5000,
          typingIndicatorTimeout: 30000
        };
        
        const webchatConnection = CopilotStudioWebChat.createConnection(client, webchatSettings);
        
        if (!cancelled) {
          setConnection(webchatConnection);
          setIsLoading(false);
          console.log('WebChat: Initialization completed successfully');
        }
      } catch (err) {
        if (!cancelled) {
          console.error('WebChat initialization error:', err);
          
          // Better error handling for debugging
          let errorMessage = 'Failed to initialize WebChat';
          if (err instanceof Error) {
            errorMessage = err.message;
            console.error('Error details:', {
              name: err.name,
              message: err.message,
              stack: err.stack
            });
          } else {
            console.error('Non-Error object thrown:', err);
            console.error('Error type:', typeof err);
            console.error('Error stringified:', JSON.stringify(err));
          }
          
          setError(errorMessage);
          setIsLoading(false);
        }
      }
    };

    initializeWebChat().catch(console.error);

    return () => {
      cancelled = true;
    };
  }, [isConfigured, appClientId, tenantId, environmentId, agentIdentifier, directConnectUrl, userEmail, baseUrl]);

  if (!isConfigured) {
    return (
      <ChatMessage type="warning">
        Configure appClientId, tenantId, and either directConnectUrl or (environmentId and agentIdentifier) in the manifest properties.
      </ChatMessage>
    );
  }

  if (error) {
    return <ChatMessage type="error">Error: {error}</ChatMessage>;
  }

  if (isLoading) {
    return <ChatMessage>Connecting to Copilot Studio...</ChatMessage>;
  }

  if (!connection) {
    return (
      <ChatMessage type="error">
        Failed to establish WebChat connection. Please check your configuration.
      </ChatMessage>
    );
  }

  // Render the actual WebChat interface
  return (
    <div className={styles.chatContainer} style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '500px' // Ensure sufficient height
    }}>
      <div className={styles.chatHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerTitle}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>Microsoft Learn Agent (WebChat)</h1>
              <span className={styles.subtitle}>Optimized for SharePoint data sources</span>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: 0, // Important for flex children
        position: 'relative'
      }}>
        <WebChatRenderer connection={connection} />
      </div>
    </div>
  );
};

export default LearnAgentWebChat;