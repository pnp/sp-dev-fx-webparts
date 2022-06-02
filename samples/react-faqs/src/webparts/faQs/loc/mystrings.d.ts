declare interface IFaqsWebPartStrings {
  categoryDataLabel: string;
  categoryPanelHeader: string;
  manageCategoryBtn: string;

  FaqDataLabel: string;
  FaqPanelHeader: string;
  manageFaqsBtn: string;

  questionTitleField: string;
  answerTextField: string;
  answerLinkTitleField: string;
  answerLinkField: string;
  categoryField: string;
  targetField: string;

  targetCurrent: string;
  targetNew: string;

  noFaqsIconText: string;
  noFaqsConfigured: string;
  noFaqsBtn: string;

  Type: string;
}

declare module 'FaqsWebPartStrings' {
  const strings: IFaqsWebPartStrings;
  export = strings;
}
