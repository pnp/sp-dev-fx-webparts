export interface IGroup {
    groupid: string;
    mail: string;
    Title: string;
    visibility: string;
   description:string;
   subscribe:boolean;
}

export interface IGroupCollection {
    value?: IGroup[];
}