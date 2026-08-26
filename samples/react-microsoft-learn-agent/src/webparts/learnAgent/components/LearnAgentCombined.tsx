import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { ILearnAgentStudioClientProps } from './StudioClient/ILearnAgentStudioClientProps';
import LearnAgentStudioClient from './StudioClient/LearnAgentStudioClient';
import LearnAgentWebChat from './WebChat/LearnAgentWebChat';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { UI_TEXT } from '../../../constants/app.constants';
import styles from './StudioClient/LearnAgentStudioClient.module.scss';

export interface ILearnAgentCombinedProps extends ILearnAgentStudioClientProps {
  useWebChatMode?: boolean;
  directConnectUrl?: string;
}

const LearnAgentCombined: React.FC<ILearnAgentCombinedProps> = (props) => {
  const [error, setError] = useState<string | null>(null);
  
  const {
    userEmail,
    environmentId,
    agentIdentifier,
    tenantId,
    appClientId,
    useWebChatMode = false,
    directConnectUrl,
  } = props;

  // Log props for debugging
  useEffect(() => {
    console.log('LearnAgentCombined props:', {
      useWebChatMode,
      environmentId,
      agentIdentifier,
      tenantId,
      appClientId: appClientId ? '[SET]' : '[NOT SET]',
      userEmail: userEmail ? '[SET]' : '[NOT SET]',
      directConnectUrl
    });
  }, [useWebChatMode, environmentId, agentIdentifier, tenantId, appClientId, userEmail, directConnectUrl]);

  const isConfigured = Boolean(
    appClientId && 
    tenantId && 
    (directConnectUrl || (environmentId && agentIdentifier))
  );

  const handleConfigure = useCallback(() => {
    props.context.propertyPane.open();
  }, []);

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

  if (error) {
    return (
      <div className={styles.errorMessage}>
        <h3>Error Loading Component</h3>
        <p>{error}</p>
        <button onClick={() => setError(null)}>Try Again</button>
      </div>
    );
  }

  try {
    return (
      <div className={styles.chatContainer}>
        {useWebChatMode ? (
          <LearnAgentWebChat
            appClientId={appClientId}
            tenantId={tenantId}
            environmentId={environmentId}
            agentIdentifier={agentIdentifier}
            directConnectUrl={directConnectUrl}
            userEmail={userEmail}
            baseUrl={window.location.origin}
            showTyping={true}
          />
        ) : (
          <LearnAgentStudioClient {...props} />
        )}
      </div>
    );
  } catch (err) {
    console.error('Error rendering LearnAgentCombined:', err);
    setError(err instanceof Error ? err.message : 'Unknown error occurred');
    return (
      <div className={styles.errorMessage}>
        <h3>Component Error</h3>
        <p>Something went wrong loading the agent. Please check the console for details.</p>
      </div>
    );
  }
};

export default LearnAgentCombined;