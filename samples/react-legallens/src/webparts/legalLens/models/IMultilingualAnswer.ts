export interface IMultilingualAnswer {
  question: string;
  questionLanguage: string;
  answer: string;
  answerLanguage: string;
  citedClauses: string[];
  confidence: number;
}
