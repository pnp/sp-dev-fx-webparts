import ILogProvider from "./ILogProvider";
import IConsole from "./IConsole";

export default class ConsoleLogProvider implements ILogProvider {
    private consolelog: IConsole;

    constructor(consolelog: IConsole) {
        this.consolelog = consolelog;
    }

    public async Debug(className: string, message: string, json: any = undefined): Promise<void> {
        const jsonString: string = this.getJsonString(json);
        this.internalLog(this.consolelog.debug, className, message, jsonString);
    }
    public async Info(className: string, message: string, json: any = undefined): Promise<void> {
        const jsonString: string = this.getJsonString(json);
        this.internalLog(this.consolelog.info, className, message, jsonString);
    }
    public async Warning(className: string, message: string, json: any = undefined): Promise<void> {
        const jsonString: string = this.getJsonString(json);
        this.internalLog(this.consolelog.warn, className, message, jsonString);
    }
    public async Error(className: string, message: string, json: any = undefined): Promise<void> {
        const jsonString: string = this.getJsonString(json);
        this.internalLog(this.consolelog.error, className, message, jsonString);
    }

    private getJsonString(json: any): string {
        const jsonString: string = !!json ? JSON.stringify(json) : "";
        return jsonString;
    }

    private internalLog(log: (message:string) => void, className: string, message: string, jsonString: string): void {
        const logMessage: string = `${className}, ${message}, ${jsonString}`; 
        log(logMessage);
    }
}