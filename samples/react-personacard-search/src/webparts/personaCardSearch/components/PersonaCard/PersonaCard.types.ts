import { PersonaCard } from './PersonaCard';
import { ServiceScope } from '@microsoft/sp-core-library';
import { OrganisationChart } from './OrganisationChart';
import { PersonaList } from './PersonaList';
import { 
    Icon, 
    ITheme, 
    IIconProps 
} from 'office-ui-fabric-react';

export interface IPersonaCard {

}
export interface IPersonaCardProps extends React.Props<PersonaCard> {
    componentRef?: (component: IPersonaCard) => void;  
    getPropertiesForUsers: (userLoginNames: string[]) => Promise<IPerson[]>;
    className?: string;
    user: IPerson;   
}
export interface IPersonCardState {
    loading:boolean;    
    managers: IPerson[];
    reports: IPerson[];   
    activeActionKey:string;   
    ativeExpanderKey?:string;   
}

export interface IOrganisationChartProps extends React.Props<OrganisationChart> {
    componentRef?: (component: OrganisationChart) => void; 
    managers: IPerson[];
    user: IPerson;
    reports: IPerson[]; 
}

export interface IPersonaListProps extends React.Props<PersonaList> {
    componentRef?: (component: PersonaList) => void;  
    title: string;  
    users: IPerson[]; 
}

export interface IPerson {
    AccountName?:string;
    DisplayName?:string;
    Title?:string;
    UserUrl?:string;
    PictureUrl?:string;
    DirectReports?:string[];
    ExtendedManagers?:string[];
    Email?:string;
    UserProfileProperties?:IUserProfileProperty[];
    Properties?:any;
}
export interface IUserProfileProperty {
    Key?:string;
    Value?:any;
    ValueType?:string;
}







