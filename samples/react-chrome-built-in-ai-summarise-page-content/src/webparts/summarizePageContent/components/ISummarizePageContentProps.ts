export interface ISummarizePageContentProps {
  useStreaming: boolean;
  summarizerType: string;
  summarizerFormat: string;
  summarizerLength: string;
  sharedContext: string;
  context: string;
  
  // UI Labels
  summarizeButtonText: string;
  stopGeneratingText: string;
  downloadingModelText: string;
  summaryTitle: string;
  disclaimerText: string;
  hideText: string;
  showSummaryText: string;
  regenerateSummaryText: string;
  apiNotSupportedWarning: string;
  waitForEditorText: string;
  
  // Status Messages
  statusInitializing: string;
  statusCheckingCache: string;
  statusPreparingTranslation: string;
  statusDownloadingModel: string;
  statusInitializingModel: string;
  statusFetchingContent: string;
  statusGeneratingSummary: string;
}
