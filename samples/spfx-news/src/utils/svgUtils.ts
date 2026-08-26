import { tokens } from '@fluentui/react-components';

/**
 * Pre-processes the undraw news SVG:
 * - Replaces the accent colour with the Fluent UI brand token
 * - Removes the hardcoded height attribute so the SVG scales from its viewBox
 */
export const preprocessNewsSvg = (code: string): string =>
  code.replace(/#6c63ff/gi, tokens.colorBrandBackground);
