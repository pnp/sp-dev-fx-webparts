import { ILink } from "../../entities/ILink";
import {  IReadonlyTheme } from '@microsoft/sp-component-base';
export interface ICustomLinksProps {
  title: string;
  backgroundColor: string;
  links: ILink[];
  fontSize: number;
  color:string;
  maxWidth: number;
  maxHeight: number;
  themeVariant: IReadonlyTheme | undefined;
  onConfigure : () => void;
}
