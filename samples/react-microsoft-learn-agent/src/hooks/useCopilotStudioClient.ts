import { useState, useCallback } from 'react';
import { ConnectionSettings, CopilotStudioClient } from '@microsoft/agents-copilotstudio-client';
import { unifiedAuth, IUnifiedAuthSettings } from '../helpers/UnifiedAuth';
import { ERROR_MESSAGES, CHAT_CONSTANTS } from '../constants';

export interface UseCopilotStudioClientOptions {
    connectionSettings: ConnectionSettings;
    userEmail: string;
}

interface CopilotMessage {
    type: string;
    text?: string;
}

interface UseCopilotStudioClientReturn {
    copilotClient: CopilotStudioClient | undefined;
    conversationId: string;
    isInitializing: boolean;
    isRefreshing: boolean;
    isAsking: boolean;
    init: () => Promise<void>;
    error: string | undefined;
    refreshConversationId: () => Promise<void>;
    askQuestion: (question: string) => Promise<string>;
    hasValidToken: boolean;
}

export const useCopilotStudioClient = ({ connectionSettings, userEmail }: UseCopilotStudioClientOptions): UseCopilotStudioClientReturn => {
    const [copilotClient, setCopilotClient] = useState<CopilotStudioClient | undefined>(undefined);
    const [conversationId, setConversationId] = useState<string>('');
    const [isInitializing, setIsInitializing] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isAsking, setIsAsking] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [hasValidToken, setHasValidToken] = useState<boolean>(false);

    const getBasicAuthSettings = (): IUnifiedAuthSettings => ({
        appClientId: connectionSettings.appClientId,
        tenantId: connectionSettings.tenantId,
        currentUserLogin: userEmail,
        redirectUri: window.location.origin
    });

    const init = useCallback(async (): Promise<void> => {
        setIsInitializing(true);
        setError(undefined);
        setHasValidToken(false);
        
        try {
            console.log('Enhanced Custom UI: Starting authentication...');
            
            // Get basic Power Platform token
            const basicAuthSettings = getBasicAuthSettings();
            const tokenResult = await unifiedAuth.acquireToken(basicAuthSettings);
            
            if (!tokenResult?.accessToken) {
                throw new Error(ERROR_MESSAGES.FAILED_TO_FETCH_TOKEN);
            }

            console.log(`Enhanced Custom UI: Basic token acquired ${tokenResult.fromCache ? 'from cache' : 'interactively'}`);
            
            setHasValidToken(true);

            // Initialize Copilot client
            const client = new CopilotStudioClient(connectionSettings, tokenResult.accessToken);
            setCopilotClient(client);
            
            const activity = await client.startConversationAsync();
            setConversationId(activity.conversation?.id || '');
            
            console.log('Enhanced Custom UI: Copilot client initialized successfully');
        } catch (err) {
            console.error('Enhanced Custom UI: Initialization failed:', err);
            setError(err instanceof Error ? err.message : ERROR_MESSAGES.UNKNOWN_ERROR);
            setHasValidToken(false);
        } finally {
            setIsInitializing(false);
        }
    }, [connectionSettings, userEmail]);

    const refreshConversationId = useCallback(async (): Promise<void> => {
        if (!copilotClient) {
            setError(ERROR_MESSAGES.COPILOT_CLIENT_NOT_INITIALIZED);
            return;
        }

        setIsRefreshing(true);
        setError(undefined);
        
        try {
            // Try to refresh basic token first
            const basicAuthSettings = getBasicAuthSettings();
            const tokenResult = await unifiedAuth.refreshToken(basicAuthSettings);
            
            if (tokenResult?.accessToken) {
                // Update client with fresh token
                const freshClient = new CopilotStudioClient(connectionSettings, tokenResult.accessToken);
                setCopilotClient(freshClient);
                
                const activity = await freshClient.startConversationAsync();
                setConversationId(activity.conversation?.id || '');
                setHasValidToken(true);
                
                console.log('Enhanced Custom UI: Conversation refreshed with new token');
            } else {
                // Fall back to existing client
                const activity = await copilotClient.startConversationAsync();
                setConversationId(activity.conversation?.id || '');
                console.log('Enhanced Custom UI: Conversation refreshed with existing client');
            }
        } catch (err) {
            console.error('Enhanced Custom UI: Refresh failed:', err);
            setError(err instanceof Error ? err.message : ERROR_MESSAGES.UNKNOWN_ERROR);
            setHasValidToken(false);
        } finally {
            setIsRefreshing(false);
        }
    }, [copilotClient, connectionSettings, userEmail]);

    const askQuestion = useCallback(async (question: string): Promise<string> => {
        if (!copilotClient || !conversationId) {
            const errorMsg = !copilotClient 
                ? ERROR_MESSAGES.COPILOT_CLIENT_NOT_INITIALIZED
                : 'Conversation not initialized';
            setError(errorMsg);
            throw new Error(errorMsg);
        }

        setIsAsking(true);
        setError(undefined);
        
        try {
            console.log('Enhanced Custom UI: Sending question:', question);
            const replies: CopilotMessage[] = await copilotClient.askQuestionAsync(question, conversationId);
            
            if (!replies || replies.length === 0) {
                throw new Error('No response received from Copilot Studio');
            }

            // Extract text from response activities
            let responseText = '';
            replies.forEach((act: CopilotMessage) => {
                if (act.type === CHAT_CONSTANTS.MESSAGE_TYPES.MESSAGE || act.type === CHAT_CONSTANTS.MESSAGE_TYPES.END_OF_CONVERSATION) {
                    responseText += act.text || '';
                }
            });

            console.log('Enhanced Custom UI: Received response:', responseText);
            return responseText || 'No response text available';
        } catch (err) {
            console.error('Enhanced Custom UI: Question failed:', err);
            const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.UNKNOWN_ERROR;
            
            setError(errorMessage);
            
            // If it's an auth error, try to refresh
            if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
                console.log('Enhanced Custom UI: Auth error detected, attempting token refresh...');
                try {
                    const basicAuthSettings = getBasicAuthSettings();
                    const tokenResult = await unifiedAuth.refreshToken(basicAuthSettings);
                    if (tokenResult?.accessToken) {
                        const freshClient = new CopilotStudioClient(connectionSettings, tokenResult.accessToken);
                        setCopilotClient(freshClient);
                        setHasValidToken(true);
                        console.log('Enhanced Custom UI: Token refreshed, please retry your question');
                        setError('Token refreshed. Please try your question again.');
                    }
                } catch (refreshErr) {
                    console.error('Enhanced Custom UI: Token refresh failed:', refreshErr);
                    setHasValidToken(false);
                }
            }
            
            throw new Error(errorMessage);
        } finally {
            setIsAsking(false);
        }
    }, [copilotClient, conversationId, connectionSettings, userEmail]);

    return {
        copilotClient,
        conversationId,
        isInitializing,
        isRefreshing,
        isAsking,
        init,
        error,
        refreshConversationId,
        askQuestion,
        hasValidToken
    };
};