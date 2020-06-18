declare interface IKanbanBoardStrings {
  CompleteButton: string;
  IsCompleted: string;
  IsNotCompleted: string;
  AddTask: string;
}

declare module 'KanbanBoardStrings' {
  const strings: IKanbanBoardStrings;
  export = strings;
}
