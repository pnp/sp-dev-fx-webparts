import IConsole from "./IConsole";

export default class MockConsole implements IConsole {
    constructor() {
        this.debug = this.debug.bind(this);
        this.info = this.info.bind(this);
        this.warn = this.warn.bind(this);
        this.error = this.error.bind(this);
    }

    public didDebug: string = "";
    public didInfo: string = "";
    public didWarn: string = "";
    public didError: string = "";

    public debug(message?: any, ...optionalParams: any[]): void {
        this.didDebug = message;
    }
    public info(message?: any, ...optionalParams: any[]): void {
        this.didInfo = message;
    }
    public warn(message?: any, ...optionalParams: any[]): void {
        this.didWarn = message;
    }
    public error(message?: any, ...optionalParams: any[]): void {
        this.didError = message;
    }
}
