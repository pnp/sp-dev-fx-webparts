export interface IErrorInfo {
  message: string;
  code?: string;
  details?: string;
  userFriendlyMessage: string;
}

export class ErrorHandler {
  public static handleError(error: unknown): IErrorInfo {
    if (error instanceof Error) {
      return this.categorizeError(error);
    }

    return {
      message: 'An unknown error occurred',
      userFriendlyMessage: 'Something went wrong. Please try again.'
    };
  }

  private static categorizeError(error: Error): IErrorInfo {
    const message = error.message.toLowerCase();

    // SharePoint API errors
    if (message.includes('unauthorized') || message.includes('403')) {
      return {
        message: error.message,
        code: 'UNAUTHORIZED',
        userFriendlyMessage: 'You don\'t have permission to perform this action. Please contact your administrator.'
      };
    }

    if (message.includes('not found') || message.includes('404')) {
      return {
        message: error.message,
        code: 'NOT_FOUND',
        userFriendlyMessage: 'The requested item could not be found. It may have been deleted or moved.'
      };
    }

    if (message.includes('network') || message.includes('fetch')) {
      return {
        message: error.message,
        code: 'NETWORK_ERROR',
        userFriendlyMessage: 'Network connection failed. Please check your internet connection and try again.'
      };
    }

    if (message.includes('validation') || message.includes('invalid')) {
      return {
        message: error.message,
        code: 'VALIDATION_ERROR',
        userFriendlyMessage: 'The information provided is not valid. Please check your input and try again.'
      };
    }

    // Default error
    return {
      message: error.message,
      code: 'GENERAL_ERROR',
      userFriendlyMessage: 'An unexpected error occurred. Please try again, and if the problem persists, contact support.'
    };
  }

  public static logError(error: IErrorInfo, context?: string): void {
    console.error(`[${context || 'Unknown'}] ${error.code || 'ERROR'}:`, error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }
  }
}