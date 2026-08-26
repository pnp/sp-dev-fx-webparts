import * as React from 'react';
import {
  MessageBar,
  MessageBarType,
  Stack,
  StackItem,
  Label
} from '@fluentui/react';
import { ICamlValidatorProps, IValidationResult } from './ICamlValidatorProps';

/**
 * Component that validates CAML queries and provides feedback
 */
const CamlValidator: React.FunctionComponent<ICamlValidatorProps> = (props) => {
  const { query } = props;
  const [validationResult, setValidationResult] = React.useState<IValidationResult>(null);

  /**
   * Validates a CAML query for common issues and syntax errors
   */
  const validateCamlQuery = (camlQuery: string): void => {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Check if valid XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(camlQuery, 'text/xml');

      // Check for XML parsing errors
      const parserErrors = xmlDoc.getElementsByTagName('parsererror');
      if (parserErrors.length > 0) {
        errors.push('Invalid XML syntax: ' + parserErrors[0].textContent);
        setValidationResult({ isValid: false, errors, warnings });
        return;
      }

      // Check for basic CAML structure
      const viewElement = xmlDoc.getElementsByTagName('View')[0];
      if (!viewElement) {
        errors.push('Missing required <View> element');
      }

      // Check for Query element
      const queryElement = xmlDoc.getElementsByTagName('Query')[0];
      if (!queryElement && viewElement) {
        warnings.push('<Query> element is missing but may not be required for some simple queries');
      }

      // Check for Where element
      const whereElement = queryElement?.getElementsByTagName('Where')[0];
      if (queryElement && !whereElement) {
        warnings.push('<Where> element is missing. This is optional but commonly used for filtering.');
      }

      // Check for FieldRef elements
      const fieldRefs = xmlDoc.getElementsByTagName('FieldRef');
      if (fieldRefs.length === 0 && whereElement) {
        warnings.push('No <FieldRef> elements found in the query conditions');
      }

      // Check for Value elements
      const valueElements = xmlDoc.getElementsByTagName('Value');
      for (let i = 0; i < valueElements.length; i++) {
        const valueElem = valueElements[i];
        const typeAttr = valueElem.getAttribute('Type');
        
        if (!typeAttr) {
          warnings.push('<Value> element is missing the Type attribute');
        }
      }

      // Check for OrderBy
      const orderByElement = queryElement?.getElementsByTagName('OrderBy')[0];
      if (orderByElement) {
        const orderByFieldRefs = orderByElement.getElementsByTagName('FieldRef');
        if (orderByFieldRefs.length === 0) {
          errors.push('<OrderBy> element must contain at least one <FieldRef>');
        }
      }

      // Check for RowLimit
      const rowLimitElement = viewElement?.getElementsByTagName('RowLimit')[0];
      if (rowLimitElement) {
        const rowLimitValue = parseInt(rowLimitElement.textContent || '0', 10);
        if (isNaN(rowLimitValue) || rowLimitValue <= 0) {
          errors.push('<RowLimit> must contain a positive integer value');
        } else if (rowLimitValue > 5000) {
          warnings.push('RowLimit is set to more than 5000 items, which may exceed SharePoint list view threshold');
        }
      }

      // Check for common CAML operators
      const operators = [
        'Eq', 'Neq', 'Gt', 'Geq', 'Lt', 'Leq', 'BeginsWith', 'Contains', 
        'IsNull', 'IsNotNull', 'And', 'Or', 'In', 'NotIn'
      ];
      
      let foundOperator = false;
      for (const op of operators) {
        if (xmlDoc.getElementsByTagName(op).length > 0) {
          foundOperator = true;
          break;
        }
      }
      
      if (!foundOperator && whereElement) {
        errors.push('No valid CAML operator found in the Where clause');
      }

      // Find if there are nested AND/OR conditions that might be problematic
      const andElements = xmlDoc.getElementsByTagName('And');
      const orElements = xmlDoc.getElementsByTagName('Or');
      
      let nestedLevel = 0;
      const checkNesting = (element: Element, level: number): number => {
        let maxLevel = level;
        for (let i = 0; i < element.children.length; i++) {
          const child = element.children[i];
          if (child.tagName === 'And' || child.tagName === 'Or') {
            maxLevel = Math.max(maxLevel, checkNesting(child, level + 1));
          }
        }
        return maxLevel;
      };
      
      for (let i = 0; i < andElements.length; i++) {
        nestedLevel = Math.max(nestedLevel, checkNesting(andElements[i], 1));
      }
      
      for (let i = 0; i < orElements.length; i++) {
        nestedLevel = Math.max(nestedLevel, checkNesting(orElements[i], 1));
      }
      
      if (nestedLevel > 3) {
        warnings.push(`Complex query with ${nestedLevel} levels of nested AND/OR conditions may be difficult to maintain`);
      }

      setValidationResult({
        isValid: errors.length === 0,
        errors,
        warnings
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`Error validating CAML query: ${errorMessage}`);
      setValidationResult({
        isValid: false,
        errors,
        warnings
      });
    }
  };

  // Run validation when query changes
  React.useEffect(() => {
    if (!query) {
      setValidationResult(null);
      return;
    }

    validateCamlQuery(query);
  }, [query]);

  if (!validationResult) {
    return null;
  }

  return (
    <Stack tokens={{ childrenGap: 8 }}>
      {validationResult.errors.length > 0 && (
        <StackItem>
          <MessageBar
            messageBarType={MessageBarType.severeWarning}
            isMultiline={true}
          >
            <Label>Query validation errors:</Label>
            <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
              {validationResult.errors.map((error, index) => (
                <li key={`error-${index}`}>{error}</li>
              ))}
            </ul>
          </MessageBar>
        </StackItem>
      )}
      
      {validationResult.warnings.length > 0 && (
        <StackItem>
          <MessageBar
            messageBarType={MessageBarType.warning}
            isMultiline={true}
          >
            <Label>Query validation warnings:</Label>
            <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
              {validationResult.warnings.map((warning, index) => (
                <li key={`warning-${index}`}>{warning}</li>
              ))}
            </ul>
          </MessageBar>
        </StackItem>
      )}
      
      {validationResult.isValid && validationResult.warnings.length === 0 && (
        <StackItem>
          <MessageBar
            messageBarType={MessageBarType.success}
          >
            Query validation passed. No issues detected.
          </MessageBar>
        </StackItem>
      )}
    </Stack>
  );
};

export default CamlValidator;