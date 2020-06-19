declare interface IKanbanBoardStrings {
  CompleteButton: string;
  IsCompleted: string;
  IsNotCompleted: string;
  AddTask: string;
  OpenDetails: string;
}

declare module 'KanbanBoardStrings' {
  const strings: IKanbanBoardStrings;
  export = strings;
}
