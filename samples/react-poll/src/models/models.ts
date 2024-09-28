export interface IQuestion {
  id: number;
  question: string;
  options:IOption[];
  answer?:IAnswer;
  selectedOption?:string;
  
}

export interface IOption {
  key: string;
  text: string;
}

export interface IAnswer{
  allAnswers:number[];
  isCurrentUserAnswered:boolean;
}

export interface ISelectedOption{
  selectedQuestionId:number;
  selectedOption:string;
}
