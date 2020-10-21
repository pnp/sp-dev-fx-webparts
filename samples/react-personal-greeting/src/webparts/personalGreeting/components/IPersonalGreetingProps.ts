import { WebPartContext } from "@microsoft/sp-webpart-base";


export interface IPersonalGreetingProps {
  greetingText: string;
  context: WebPartContext;
  position: string;
  textColor: string;
  fontSize: number;
}
