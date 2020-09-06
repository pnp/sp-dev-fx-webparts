import ILogProvider from "./ILogProvider";

export default class MockLogProvider implements ILogProvider {
    public async Debug(className: string, message: string, json: any): Promise<void> {
        // do nothing
    }    
    public async Info(className: string, message: string, json: any): Promise<void> {
        // do nothing
    }
    public async Warning(className: string, message: string, json: any): Promise<void> {
        // do nothing
    }
    public async Error(className: string, message: string, json: any): Promise<void> {
        // do nothing
    }

}