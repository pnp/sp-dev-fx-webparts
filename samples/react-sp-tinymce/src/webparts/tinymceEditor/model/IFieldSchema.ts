export interface IFieldSchema {    
    title: string;    
    staticName: string;    
    required: boolean;    
    fieldType: string;
    typeAsString: string;
    description: string;    
    choices?: any[];    
    multiChoices?: string[];    
    displayFormat?: number;    
    firstDayOfWeek?: number;    
    localeId?: string;    
    termSetId?: string;    
}

