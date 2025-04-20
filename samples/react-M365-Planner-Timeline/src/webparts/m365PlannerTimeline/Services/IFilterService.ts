import { IFilterSettings } from '..';

export interface IFilterService {
  saveFilterSettings(cacheId: string, filterSettings: IFilterSettings): void;

  getFilterSettings(cacheId: string): IFilterSettings;

  removeFilterSettings(cacheId: string): void;
}