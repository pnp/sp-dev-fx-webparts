import { IPerson } from '../../index';

interface IPersonaCardListProps {   
    items?: IPerson[];      
    getPropertiesForUsers: (userLoginNames: string[]) => Promise<IPerson[]>;
}

export default IPersonaCardListProps;