/**
 * Enterprise Configuration for Custom Action Manager
 * @fileoverview Centralized configuration for enterprise-grade deployment
 * @version 1.0.0
 * @author Custom Action Manager Team
 */

/**
 * Application-wide constants and configuration
 */
export const ENTERPRISE_CONFIG = {
  // Version Information
  VERSION: '1.0.0',
  BUILD_DATE: process.env.BUILD_DATE || 'unknown',

  // Performance Settings
  PERFORMANCE: {
    CACHE_TTL_MINUTES: 5,
    REQUEST_TIMEOUT_MS: 30000,
    MAX_RETRIES: 3,
    DEBOUNCE_DELAY_MS: 300,
    PAGINATION_DEFAULT_SIZE: 25,
    PAGINATION_MAX_SIZE: 100
  },

  // Security Settings
  SECURITY: {
    MAX_FILE_SIZE_MB: 10,
    ALLOWED_FILE_TYPES: ['.js', '.css', '.xml', '.json'],
    CSRF_TOKEN_HEADER: 'X-RequestDigest',
    CORS_ALLOWED_ORIGINS: [],
    SESSION_TIMEOUT_MINUTES: 60
  },

  // Validation Rules
  VALIDATION: {
    TITLE_MIN_LENGTH: 1,
    TITLE_MAX_LENGTH: 255,
    NAME_MIN_LENGTH: 1,
    NAME_MAX_LENGTH: 50,
    DESCRIPTION_MAX_LENGTH: 500,
    SEQUENCE_MIN: 0,
    SEQUENCE_MAX: 65536,
    SEQUENCE_STEP: 100,
    URL_MAX_LENGTH: 2048,
    SCRIPT_MAX_LENGTH: 50000,
    COMMAND_UI_MAX_LENGTH: 100000,
    JSON_MAX_LENGTH: 10000
  },

  // Logging Configuration
  LOGGING: {
    ENABLED: true,
    LEVEL: process.env.NODE_ENV === 'development' ? 'DEBUG' : 'INFO',
    CONSOLE_ENABLED: process.env.NODE_ENV === 'development',
    REMOTE_ENABLED: process.env.NODE_ENV === 'production',
    AUDIT_ENABLED: true,
    PERFORMANCE_LOGGING: true
  },

  // Feature Flags
  FEATURES: {
    ENABLE_CROSS_SITE: true,
    ENABLE_TEMPLATES: true,
    ENABLE_BULK_OPERATIONS: true,
    ENABLE_EXPORT: true,
    ENABLE_IMPORT: true,
    ENABLE_ANALYTICS: true,
    ENABLE_DEBUG_MODE: process.env.NODE_ENV === 'development'
  },

  // SharePoint Integration
  SHAREPOINT: {
    API_VERSION: 'v1',
    ODATA_VERSION: '3.0',
    DEFAULT_LIST_NAME: 'CustomActionTemplates',
    DEFAULT_SITE_TEMPLATE: 'STS#3',
    MAX_BATCH_SIZE: 100,
    RETRY_DELAYS_MS: [1000, 2000, 4000]
  },

  // UI Configuration
  UI: {
    THEME_PRIMARY_COLOR: '#0078d4',
    ANIMATION_DURATION_MS: 200,
    MODAL_Z_INDEX: 1000,
    NOTIFICATION_TIMEOUT_MS: 5000,
    LOADING_DELAY_MS: 500
  },

  // Error Configuration
  ERRORS: {
    CATEGORIES: {
      VALIDATION: 'VALIDATION',
      NETWORK: 'NETWORK',
      PERMISSION: 'PERMISSION',
      CONFIGURATION: 'CONFIGURATION',
      SYSTEM: 'SYSTEM'
    },
    HTTP_STATUS_CODES: {
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      CONFLICT: 409,
      INTERNAL_SERVER_ERROR: 500,
      BAD_GATEWAY: 502,
      SERVICE_UNAVAILABLE: 503
    }
  }
} as const;

/**
 * Environment-specific configuration
 */
export const ENVIRONMENT_CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test'
};

/**
 * Accessibility configuration for WCAG 2.1 AA compliance
 */
export const ACCESSIBILITY_CONFIG = {
  FOCUS_MANAGEMENT: {
    TRAP_FOCUS_IN_MODALS: true,
    RESTORE_FOCUS_ON_CLOSE: true,
    VISIBLE_FOCUS_INDICATORS: true
  },
  ARIA: {
    LIVE_REGIONS_ENABLED: true,
    ROLE_DESCRIPTIONS_ENABLED: true,
    LABEL_REQUIRED_FIELDS: true
  },
  KEYBOARD: {
    ESCAPE_CLOSES_MODALS: true,
    ENTER_SUBMITS_FORMS: true,
    TAB_NAVIGATION_ENABLED: true
  },
  SCREEN_READER: {
    ANNOUNCE_PAGE_CHANGES: true,
    ANNOUNCE_STATUS_UPDATES: true,
    ANNOUNCE_ERROR_MESSAGES: true
  }
} as const;

/**
 * Type definitions for configuration
 */
export type EnterpriseConfigType = typeof ENTERPRISE_CONFIG;
export type EnvironmentConfigType = typeof ENVIRONMENT_CONFIG;
export type AccessibilityConfigType = typeof ACCESSIBILITY_CONFIG;
