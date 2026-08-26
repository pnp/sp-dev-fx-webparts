/**
 * Application constants for Microsoft Learn Agent
 */

// API Scopes
export const API_SCOPES = {
    POWER_PLATFORM: ['https://api.powerplatform.com/.default'],
};

// Error Messages
export const ERROR_MESSAGES = {
    FAILED_TO_FETCH_TOKEN: 'Failed to fetch access token.',
    COPILOT_CLIENT_NOT_INITIALIZED: 'CopilotStudioClient not initialized.',
    UNKNOWN_ERROR: 'Unknown error',
    NO_USERS_SIGNED_IN: 'No users are signed in',
} as const;

// Chat Constants
export const CHAT_CONSTANTS = {
    MESSAGE_TYPES: {
        MESSAGE: 'message',
        END_OF_CONVERSATION: 'endOfConversation',
    },
    MAX_INPUT_LENGTH: 2000,
} as const;

// Configuration Property Names
export const CONFIG_PROPERTIES = {
    ENVIRONMENT_ID: 'environmentId',
    AGENT_IDENTIFIER: 'agentIdentifier',
    TENANT_ID: 'tenantId',
    APP_CLIENT_ID: 'appClientId',
} as const;

// UI Text
export const UI_TEXT = {
    CONFIGURE_WEB_PART: 'Configure your web part',
    PLEASE_CONFIGURE: 'Please configure the web part.',
    CONFIGURE_BUTTON: 'Configure',
    INITIALIZING_MESSAGE: 'Initializing Microsoft Learn Agent...',
    TYPING_PLACEHOLDER: 'Type your message...',
    SEND_MESSAGE_TITLE: 'Send message',
    REFRESH_CONVERSATION_TITLE: 'Refresh conversation',
    WELCOME_TITLE: 'Welcome to Microsoft Learn Agent',
    WELCOME_LEARN_TITLE: 'What is Microsoft Learn Agent?',
    WELCOME_LEARN_MESSAGE: 'Microsoft Learn Agent is a platform that provides documentation, training, and learning resources for Microsoft technologies and services.',
    WELCOME_MESSAGE: 'Ask me anything about Microsoft technologies, and I\'ll help you learn!',
} as const;

// Message senders
export const MESSAGE_SENDERS = {
    USER: 'user',
    AGENT: 'agent',
} as const;

// Input validation
export const INPUT_VALIDATION = {
    MAX_LENGTH: 2000,
} as const;

// Keyboard events
export const KEYBOARD_EVENTS = {
    ENTER: 'Enter',
} as const;

// HTML input types
export const INPUT_TYPES = {
    TEXT: 'text',
} as const;

// Button types
export const BUTTON_TYPES = {
    BUTTON: 'button',
} as const;

// Scroll behavior
export const SCROLL_BEHAVIOR = {
    SMOOTH: 'smooth',
} as const;

// Citation constants
export const CITATION_CONSTANTS = {
    REFERENCES_TITLE: 'References',
    CITATION_PATTERN: /\[(\d+)\]/g,
    LINK_PATTERN: /https?:\/\/[^\s\]]+/g,
} as const;
