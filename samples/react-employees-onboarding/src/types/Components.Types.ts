export type EmployeeInfo = {
    name: string;
    email: string;
    department: string;
};

export type EmployeeOnboarding = EmployeeInfo & {    
    teamMembership: boolean;
    notification: boolean;
    processedOn: string;
    completedOn: string;
};


