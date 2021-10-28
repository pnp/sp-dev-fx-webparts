import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IAdaptiveCardActionResult } from './IAdaptiveCardActionResult';

export interface IAdaptiveCardProps {
  /**
   * The theme variant of the current host section
   */
  themeVariant?: IReadonlyTheme | undefined;

  /**
   * The Adaptive Card template
   */
  template: string;

  /**
   *  The data JSON, if using Adapive Card templating
   */
  data: string;

  /**
   * Whether we should use Adaptive Card templating?
   * True will use the data property, false will use the template property
   */
  useTemplating: boolean;

  /**
   *  The CSS classname to use for the rendering the Adaptive Card
   */
  className?: string;

  /**
   * If an action is triggered, this will be the result of the action
   */
  onExecuteAction?: (action: IAdaptiveCardActionResult) => void;

  /**
   * Get notified where an error is found in the Adaptive Card
   */
  onParseError?: (errors: Array<string>) => void;

  /**
   * The template or function to use when an error is found in the Adaptive Card
   */
  errorTemplate?: JSX.Element | Function;
}
