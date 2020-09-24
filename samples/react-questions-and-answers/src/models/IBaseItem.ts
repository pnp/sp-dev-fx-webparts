import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

export interface IBaseItem {
    id?: number;    
    title?: string;
    author?: IPersonaProps | null;
    editor?: IPersonaProps | null;
    createdDate?: Date | null;
    modifiedDate?: Date | null;
    etag?: string | null;

    uiErrors?: Map<string, string>;
}
