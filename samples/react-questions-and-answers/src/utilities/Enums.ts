
export enum FormMode {
    View = 'View',
    New = 'New',
    Edit = 'Edit'
}

export enum Action {
    Cancel = 'cancel',
    Add = 'add',
    Update = 'update',
    Delete = 'delete'
}

export enum SortOption {
    Title = 'Title',
    MostRecent = 'MostRecent',
    MostLiked = 'MostLiked'
}

export enum ShowQuestionsOption {
    All = 'all',
    Open = 'open',
    Answered = 'answered'
}

export enum WebPartRenderMode {
    Standard = 'standard',
    Application = 'application',
    OpenQuestions = 'openQuestions',
    AnsweredQuestions = 'answeredQuestions',
    ConversationsList = 'conversationsList'
}

export enum DiscussionType {
    Question = 'Question',
    Conversation = 'Conversation'
}
