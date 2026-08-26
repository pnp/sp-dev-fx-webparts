import { tokens } from '@fluentui/react-components';

/**
 * Pre-processes the calendar SVG:
 * - Replaces the accent colour with the Fluent UI brand token
 */
export const preprocessCalendarSvg = (code: string): string =>
  code.replace(/#6c63ff/gi, tokens.colorBrandBackground);
