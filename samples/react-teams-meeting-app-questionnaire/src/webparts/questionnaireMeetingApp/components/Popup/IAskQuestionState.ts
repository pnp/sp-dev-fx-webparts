import {  IDropdownOption } from 'office-ui-fabric-react/';
export interface IAskQuestionState {
  questionTitle:string;
  questionDescription:string;  
  isloading:boolean; 
  isSaveClicked:boolean;
  isQuestionTitleEmpty:boolean; 
}
