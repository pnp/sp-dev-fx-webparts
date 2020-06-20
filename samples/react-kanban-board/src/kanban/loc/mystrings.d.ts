declare interface IKanbanBoardStrings {
  CompleteButton: string;
  IsCompleted: string;
  IsNotCompleted: string;
  AddTask: string;
  OpenDetails: string;
  EditTaskBtn:string;
  SaveTaskBtn:string;
  SaveAddTaskBtn:string;
  CloseTaskDialog:string;
  AddTaskDlgHeadline:string;
  EditTaskDlgHeadline:string;
}

declare module 'KanbanBoardStrings' {
  const strings: IKanbanBoardStrings;
  export = strings;
}
