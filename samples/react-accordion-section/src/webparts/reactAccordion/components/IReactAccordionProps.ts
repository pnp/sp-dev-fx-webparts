import { DisplayMode } from '@microsoft/sp-core-library';

export interface IReactAccordionProps {
  listId: string;
  accordionTitle: string;
  allowZeroExpanded: boolean;
  allowMultipleExpanded: boolean;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  onConfigure: () => void;
}
