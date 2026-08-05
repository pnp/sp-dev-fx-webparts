export type CompatibilityLevel = 'FullySupported' | 'PartiallySupported' | 'Unsupported';

export interface PageMetadata {
  readonly pageId: string;
  readonly title: string;
  readonly pageName: string;
  readonly sourcePageUrl: string;
  readonly description?: string;
  readonly topicHeader?: string;
  readonly bannerImageUrl?: string;
  readonly thumbnailUrl?: string;
  readonly authorName?: string;
  readonly authorEmail?: string;
  readonly lastModifiedDateTime?: string;
  readonly pageLayoutType?: string;
  readonly promotedState?: string;
  readonly firstPublishedDate?: string;
  readonly carriedFields?: Readonly<Record<string, unknown>>;
  readonly unportableColumns?: ReadonlyArray<string>;
  readonly folderPath?: string;
}

export interface AssetReference {
  readonly id: string;
  readonly sourceUrl: string;
  readonly absoluteSourceUrl: string;
  readonly targetUrl?: string;
  readonly sourceType: 'Banner' | 'Image' | 'File' | 'LinkPreview' | 'Unknown';
  readonly fileName: string;
  readonly hashHint?: string;
  readonly discoveredFrom: string;
}

export interface MigrationWarning {
  readonly code: string;
  readonly message: string;
  readonly severity: 'Info' | 'Warning' | 'Error';
  readonly controlId?: string;
}

export interface NormalizedControlPosition {
  readonly sectionIndex: number;
  readonly columnIndex: number;
  readonly controlIndex: number;
  readonly zoneEmphasis?: number;
  readonly sectionTemplate?: string;
}

export interface TextControlModel {
  readonly id: string;
  readonly type: 'Text';
  readonly position: NormalizedControlPosition;
  readonly innerHtml: string;
  readonly assetReferences: ReadonlyArray<AssetReference>;
}

export interface WebPartControlModel {
  readonly id: string;
  readonly type: 'WebPart';
  readonly position: NormalizedControlPosition;
  readonly webPartId: string;
  readonly title?: string;
  readonly instanceId?: string;
  readonly dataVersion?: string;
  readonly compatibility: CompatibilityLevel;
  readonly properties: Record<string, unknown>;
  readonly serverProcessedContent?: Record<string, unknown>;
  readonly dynamicDataPaths?: Record<string, string>;
  readonly rawData: Record<string, unknown>;
}

export type NormalizedControl = TextControlModel | WebPartControlModel;

export interface NormalizedColumn {
  readonly index: number;
  readonly factor: number;
  readonly controls: ReadonlyArray<NormalizedControl>;
}

export interface NormalizedSection {
  readonly index: number;
  readonly emphasis: number;
  readonly template: string;
  readonly columns: ReadonlyArray<NormalizedColumn>;
}

export interface UnsupportedControlSnapshot {
  readonly controlId: string;
  readonly webPartId: string;
  readonly title?: string;
  readonly serializedConfiguration: string;
}

export interface NormalizedPage {
  readonly metadata: PageMetadata;
  readonly rawCanvasContent: string;
  readonly rawLayoutWebpartsContent?: string;
  readonly sections: ReadonlyArray<NormalizedSection>;
  readonly assets: ReadonlyArray<AssetReference>;
  readonly warnings: ReadonlyArray<MigrationWarning>;
  readonly unsupportedControls: ReadonlyArray<UnsupportedControlSnapshot>;
}
