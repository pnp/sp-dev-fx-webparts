interface SummarizerOptions {
  type?: 'key-points' | 'tldr' | 'teaser' | 'headline';
  format?: 'markdown' | 'plain-text';
  length?: 'short' | 'medium' | 'long';
  sharedContext?: string;
  expectedInputLanguages?: string[];
  outputLanguage?: string;
  expectedContextLanguages?: string[];
  monitor?: (monitor: any) => void;
}

interface SummarizeOptions {
  context?: string;
}

interface Summarizer {
  summarize(input: string, options?: SummarizeOptions): Promise<string>;
  summarizeStreaming(input: string, options?: SummarizeOptions): ReadableStream;
  destroy(): void;
}

interface SummarizerStatic {
  availability(): Promise<'available' | 'unavailable' | 'downloadable'>;
  create(options?: SummarizerOptions): Promise<Summarizer>;
}

interface Window {
  Summarizer: SummarizerStatic;
}
