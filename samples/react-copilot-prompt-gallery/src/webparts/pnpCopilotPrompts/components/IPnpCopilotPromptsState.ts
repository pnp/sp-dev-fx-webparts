export interface IImageInfo {
    RelativePath?: string;
    FullGitHubUrl: string;
}

export interface ISample {
    ReadmeUrl?: string;
    Contributors?: string;
    SamplePath?: string;
    Prompt?: string;
    Title?: string;
    FirstVersionDate?: string;
    SampleName?: string;
    Prerequisites?: string | string[];
    Images?: IImageInfo[] | { FullGitHubUrl?: string };
    Description: string;
}

export interface ICategoryStats {
    name: string;
    count: number;
}

export interface IPnpCopilotPromptsState {
    samples: ISample[];
    totalSamples?: number;
    categories: ICategoryStats[];
    copiedPromptIndex?: number;
    selectedCategory?: string;
    isCalling?: boolean;
    conversationId?: string;
    userQuery?: string;
    error?: string;
    chatResponse?: any;
    rawResponse?: string;
    showPromptInputModal?: boolean;
    currentSample?: any;
    placeholders?: string[];
    placeholderValues?: { [key: string]: string };
    generatedPrompt?: string;
}
