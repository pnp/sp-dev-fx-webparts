import { IPropertyPaneAccessor } from                      '@microsoft/sp-webpart-base';
import { DisplayMode } from                                '@microsoft/sp-core-library';

import { FeedServiceOption, FeedLayoutOption } from        '../../../../models';

import { BaseTemplateService } from                        '../../../../services/TemplateService';

export interface IRssReaderProps {
  feedUrl: string;
  feedService: FeedServiceOption;
  feedServiceUrl?: string;
  feedServiceApiKey?: string;
  useCorsProxy?: boolean;
  corsProxyUrl?: string;
  disableCorsMode?: boolean;
  maxCount: number;

  cacheResults?: boolean;
  cacheResultsMinutes?: number;
  cacheStorageKeyPrefix?: string;

  feedLoadingLabel?: string;

  //rendering / layout
  selectedLayout: FeedLayoutOption;
  externalTemplateUrl?: string;
  inlineTemplateText?: string;

  feedViewAllLink: string;
  feedViewAllLinkLabel?: string;

  showDesc: boolean;
  showPubDate: boolean;
  descCharacterLimit: number;
  titleLinkTarget: string;
  dateFormat: string;
  //dateFormatLang: string;

  backgroundColor: string;
  fontColor: string;

  propertyPane?: IPropertyPaneAccessor;

  title: string;
  displayMode: DisplayMode;

  /**
   * The template helper instance
   */
  templateService: BaseTemplateService;

  /**
   * The template raw content to display
   */
  templateContent: string;

  updateProperty: (value: string) => void;
}
