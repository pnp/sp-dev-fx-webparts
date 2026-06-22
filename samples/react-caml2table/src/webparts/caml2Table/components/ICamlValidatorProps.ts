export interface ICamlValidatorProps {
    query: string;
  }
  export interface IValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }