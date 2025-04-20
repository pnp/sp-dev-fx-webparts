import { ICamlCondition } from '../models/ICamlCondition';

/**
 * Helper class for generating and manipulating CAML queries
 */
export class CamlHelpers {
  /**
   * Encodes special XML characters to prevent XML injection
   */
  public static encodeXmlEntities(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Generates XML for a single CAML condition
   */
  public static generateConditionXml(condition: ICamlCondition): string {
    const { operator, fieldName, value, valueType, lookupId, isRaw } = condition;
    
    // Special case for IsNull and IsNotNull operators
    if (operator === 'IsNull' || operator === 'IsNotNull') {
      return `<${operator}>
        <FieldRef Name="${fieldName}" ${lookupId ? 'LookupId="TRUE"' : ''} />
      </${operator}>`;
    }
    
    // Special case for In operator
    if (operator === 'In') {
      const values = value.split(',').map(v => v.trim());
      return `<In>
        <FieldRef Name="${fieldName}" ${lookupId ? 'LookupId="TRUE"' : ''} />
        <Values>
          ${values.map(v => `<Value Type="${valueType}">${v}</Value>`).join('\n          ')}
        </Values>
      </In>`;
    }
    
    // Standard operators
    return `<${operator}>
        <FieldRef Name="${fieldName}" ${lookupId ? 'LookupId="TRUE"' : ''} />
        <Value Type="${valueType}">${isRaw ? value : this.encodeXmlEntities(value)}</Value>
      </${operator}>`;
  }

  /**
   * Generates XML for multiple CAML conditions using a logical operator
   */
  public static generateMultipleConditionsXml(conditions: ICamlCondition[], operator: string, level = 0): string {
    if (conditions.length === 0) {
      return '';
    }
    
    if (conditions.length === 1) {
      return this.generateConditionXml(conditions[0]);
    }
    
    const indent = ' '.repeat(level * 2);
    
    // Take first two conditions
    const firstCondition = conditions[0];
    const remainingConditions = conditions.slice(1);
    
    // If we have just two conditions, generate a simple AND/OR
    if (remainingConditions.length === 1) {
      return `<${operator}>
${indent}  ${this.generateConditionXml(firstCondition)}
${indent}  ${this.generateConditionXml(remainingConditions[0])}
${indent}</${operator}>`;
    }
    
    // For more than two conditions, recursively nest them
    return `<${operator}>
${indent}  ${this.generateConditionXml(firstCondition)}
${indent}  ${this.generateMultipleConditionsXml(remainingConditions, operator, level + 1)}
${indent}</${operator}>`;
  }

  /**
   * Formats a CAML query with proper indentation
   */
  public static formatCamlQuery(query: string): string {
    try {
      // Simple XML formatter
      let formatted = '';
      let indent = 0;
      const lines = query.trim().split(/>\s*</);
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.match(/^\/\w/)) {
          // Closing tag
          indent--;
        }
        
        formatted += i === 0 ? line : '  '.repeat(Math.max(0, indent)) + '<' + line + '>';
        formatted += '\n';
        
        if (!line.match(/^\//) && !line.match(/\/>/)) {
          // Not a closing tag or self-closing tag
          indent++;
        }
      }
      
      return formatted;
    } catch (error) {
      console.error('Error formatting CAML query:', error);
      return query;
    }
  }
}