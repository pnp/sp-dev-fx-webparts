export interface IConsoleMessageOptions {
  appName: string;
  functionName: string;
  messageType: "info" | "warn" | "error" | "log";
  message: string;
}