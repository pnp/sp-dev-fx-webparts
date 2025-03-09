export interface IFAQItem {
  ID: number;
  Title: string;
  Answer: string;
  Category?: string;
  // Allow additional dynamic fields, but use unknown for type safety.
  [key: string]: unknown;
}
