export interface ValidationRules {
    templateLines: string[];
    contributionsFolder?:        string;
    limitToSingleFolder?: ValidationRule;
    requireVisitorStats?: ValidationRule;
    folderName?:    FolderRule;
    fileRules?:           FileRule[];
}

export interface FileRule {
    require?: string;
    forbid?: string;
    rule: string;
    href: string;
    order?: number;
}

export interface FolderRule extends ValidationRule{
    acceptedPrefixes?: string[];
}

export interface ValidationRule {
    rule: string;
    href: string;
    order?: number;
}