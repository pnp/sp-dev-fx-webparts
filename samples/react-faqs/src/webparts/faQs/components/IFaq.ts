export interface IFaq {
    questionTitle: string;
    answerText: string;
    answerLink: string;
    answerLinkTitle: string;
    category: string;
  }
  
  export enum FaqTarget {
    parent = "",
    blank = "_blank"
  }
  