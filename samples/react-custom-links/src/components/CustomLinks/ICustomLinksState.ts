import { ILink } from "../../entities/ILink";

export interface ICustomLinksState {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  links: ILink[];
}
