import { IYammerProvider } from '../yammer/IYammerProvider';

export interface IReactYammerApiProps {
  yammer: IYammerProvider;
  defaultSearchQuery: string;
  strings: IReactYammerApiStrings;
}
