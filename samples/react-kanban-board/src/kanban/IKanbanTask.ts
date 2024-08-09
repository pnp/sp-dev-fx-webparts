import { IPersonaProps } from "@fluentui/react";

export interface IKanbanTask {
    taskId: string;
    title: string;
    isCompleted?: boolean;
    assignedTo?: IPersonaProps;
    htmlDescription?:string;
    priority?:string;
    bucket: string;
    mamagedProperties?: IKanbanTaskManagedProps[];

}

export interface IKanbanTaskManagedProps {
    name: string;
    displayName?: string;
    type: KanbanTaskMamagedPropertyType;
    value: string | number | IPersonaProps | IPersonaProps[] | any;
    renderer?: (name: string, value: object, type: KanbanTaskMamagedPropertyType) => JSX.Element;
}

/* 0 is bad because 
    const  value = EnumType.xyz // = 0
    if(value)  {is false}
*/
export enum KanbanTaskMamagedPropertyType {
    string = 1,
    number = 2,
    percent = 3,
    html = 4,
    person = 5,
    persons = 6,
    complex = 7
}