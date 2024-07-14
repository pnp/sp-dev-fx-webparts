export interface IAILogEntry
{
    level: AILogLevel;
    message: string;
    properties?: { [key: string]: string };
    measurements?: { [key: string]: number };
    exception?: Error;
    timestamp?: Date;
}

export enum AILogLevel{
    Off,
    Verbose,
    Info,
    Warning,
    Error,
    Critical
}