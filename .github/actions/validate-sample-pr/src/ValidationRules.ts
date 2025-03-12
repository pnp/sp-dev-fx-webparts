export interface ValidationRules {
    messageTemplate: MessageTemplate;
    contributionsFolder?:        string;
    limitToSingleFolder?: ValidationRule;
    requireVisitorStats?: ValidationRule;
    folderName?:    FolderRule;
    fileRules?:           FileRule[];
}

export interface FileRule {
    filePath: string;
    ruleText: string;
    ruleLink: string;
}

export interface FolderRule extends ValidationRule{
    acceptedPrefixes?: string[];
}

export interface ValidationRule {
    ruleText: string;
    ruleLink: string;
}

export interface MessageTemplate {
    warningMessage: string;
    title: string;
    intro?: string;
    issueSummary?: string;
    validationWarningSummary?: string;
    validationSuccessSummary?: string;
    ruleStatusSuccess?: string;
    ruleStatusWarning?: string;
}