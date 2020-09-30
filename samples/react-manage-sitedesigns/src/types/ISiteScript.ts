
export interface ISiteScript {
  $schema: string;
  actions: IAction[];
  bindata: object;
  version: number;
}

export interface IAction {
  verb: string;
  [key: string]: any;
  subactions?: ISubaction[];
}
export interface ISubaction {
  verb: string;
  [key: string]: any;
}
