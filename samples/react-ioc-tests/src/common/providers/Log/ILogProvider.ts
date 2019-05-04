export default interface ILogProvider {
    Debug(className: string, message: string, json: any): Promise<void>;
    Info(className: string, message: string, json: any): Promise<void>;
    Warning(className: string, message: string, json: any): Promise<void>;
    Error(className: string, message: string, json: any): Promise<void>;
}