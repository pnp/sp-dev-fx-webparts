export interface IKanbanTask {
    taskId: number | string;
    title: string;
    isCompleted?: boolean;
    bucket: string;
    mamagedProperties?: IKanbanTaskManagedProps[];
    
}

export interface IKanbanTaskManagedProps {
    name: string;
    displayName?: string;
    type: KanbanTaskMamagedPropertyType;
    value: any;
    renderer?: (name: string, value: object, type:KanbanTaskMamagedPropertyType) => JSX.Element;
}

export enum KanbanTaskMamagedPropertyType {

    string,
    number,
    percent,
    html,
    person,
    persons,
    complex
}