export interface ITodoList {
  id: string;
  displayName: string;
}

export interface ITodoListItem {
  importance: "low" | "normal" | "high";
  status: "notStarted" | "inProgress" | "completed" | "waitingOnOthers" | "deferred";
  title: string;
  body: {
    content: string;
    contentType: "text" | "html";
  };
}
