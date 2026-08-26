export interface IValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface IValidationRule<T> {
  validate(value: T): string | null;
}

export class ValidationUtils {
  public static validateRequired(value: string | undefined | null, fieldName: string): string | null {
    if (!value || value.trim().length === 0) {
      return `${fieldName} is required`;
    }
    return null;
  }

  public static validateEmail(email: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  }

  public static validateUrl(url: string): string | null {
    const trimmed = url?.trim() ?? '';
    if (trimmed.length === 0) {
      return null;
    }

    const lower = trimmed.toLowerCase();
    const relativePrefixes = [
      '/',
      './',
      '../',
      '~',
      '~/',
      '~site',
      '~site/',
      '~sitecollection',
      '~sitecollection/',
      '~tenant',
      '~tenant/'
    ];
    if (relativePrefixes.some(prefix => lower.startsWith(prefix))) {
      return null;
    }

    try {
      new URL(trimmed);
      return null;
    } catch {
      return 'Please enter a valid URL or SharePoint-relative path';
    }
  }

  public static validateGuid(guid: string): string | null {
    const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!guidRegex.test(guid)) {
      return 'Please enter a valid GUID format (e.g., 12345678-1234-1234-1234-123456789abc)';
    }
    return null;
  }

  public static validateCustomActionName(name: string): string | null {
    if (!name || name.trim().length === 0) {
      return 'Name is required';
    }

    const nameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (!nameRegex.test(name)) {
      return 'Name must start with a letter and contain only letters, numbers, and underscores';
    }

    if (name.length > 50) {
      return 'Name must be 50 characters or less';
    }

    return null;
  }

  public static validateSequence(sequence: number): string | null {
    if (sequence < 0 || sequence > 65536) {
      return 'Sequence must be between 0 and 65536';
    }
    return null;
  }

  public static validateJson(jsonString: string): string | null {
    if (!jsonString.trim()) {
      return null; // Empty JSON is allowed
    }

    try {
      JSON.parse(jsonString);
      return null;
    } catch {
      return 'Please enter valid JSON format';
    }
  }

  public static validateXml(xmlString: string): string | null {
    if (!xmlString.trim()) {
      return null; // Empty XML is allowed
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlString, 'text/xml');
      const errorNode = doc.querySelector('parsererror');
      if (errorNode) {
        return 'Please enter valid XML format';
      }
      return null;
    } catch {
      return 'Please enter valid XML format';
    }
  }

  public static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove < and > to prevent basic XSS
      .trim();
  }

  public static validateFileSize(file: File, maxSizeInMB: number): string | null {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return `File size must be less than ${maxSizeInMB}MB`;
    }
    return null;
  }

  public static validateFileType(file: File, allowedTypes: string[]): string | null {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const normalizedAllowed = allowedTypes.map(type => type.replace(/^\./, '').toLowerCase());

    if (!fileExtension || !normalizedAllowed.includes(fileExtension)) {
      return `File type must be one of: ${allowedTypes.join(', ')}`;
    }
    return null;
  }

  public static combineValidations<T>(value: T, ...validators: Array<(val: T) => string | null>): IValidationResult {
    const errors: string[] = [];

    for (const validator of validators) {
      const error = validator(value);
      if (error) {
        errors.push(error);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Legacy methods for backward compatibility
  public static isValidGuid(value: string): boolean {
    return this.validateGuid(value) === null;
  }

  public static isValidUrl(value: string): boolean {
    return this.validateUrl(value) === null;
  }

  public static isValidName(value: string): boolean {
    return this.validateCustomActionName(value) === null;
  }

  public static isValidJson(value: string): boolean {
    return this.validateJson(value) === null;
  }

  public static sanitizeHtml(input: string): string {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  public static truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength - 3) + '...';
  }
}
