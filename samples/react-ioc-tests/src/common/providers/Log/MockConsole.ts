import IConsole from "./IConsole";

export default class MockConsole implements IConsole {
    constructor() {
        this.debug = this.debug.bind(this);
        this.info = this.info.bind(this);
        this.log = this.log.bind(this);
        this.warn = this.warn.bind(this);
        this.error = this.error.bind(this);
    }

    public didDebug: string = "";
    public didInfo: string = "";
    public didLog: string = "";
    public didWarn: string = "";
    public didError: string = "";

    public debug(message?: any, ...optionalParams: any[]): void {
        this.didDebug = message;
    }
    public info(message?: any, ...optionalParams: any[]): void {
        this.didInfo = message;
    }
    public log(message?: any, ...optionalParams: any[]): void {
        this.didLog = message;
    }
    public warn(message?: any, ...optionalParams: any[]): void {
        this.didWarn = message;
    }
    public error(message?: any, ...optionalParams: any[]): void {
        this.didError = message;
    }
}

// export default class MockConsole implements Console {
//     public didDebug: boolean = false;
//     public didInfo: boolean = false;
//     public didLog: boolean = false;
//     public didWarn: boolean = false;
//     public didError: boolean = false;

//     public debug(message?: any, ...optionalParams: any[]): void {
//         this.didDebug = true;
//     }
//     public info(message?: any, ...optionalParams: any[]): void {
//         this.didInfo = true;
//     }
//     public log(message?: any, ...optionalParams: any[]): void {
//         this.didLog = true;
//     }
//     public warn(message?: any, ...optionalParams: any[]): void {
//         this.didWarn = true;
//     }
//     public error(message?: any, ...optionalParams: any[]): void {
//         this.didError = true;
//     }

//     // Not required to mock for console logging
//     public trace(message?: any, ...optionalParams: any[]): void {
//         // do nothing
//     }
//     public memory: any;    
//     public assert(condition?: boolean, message?: string, ...data: any[]): void {
// // do nothing
//     }
//     public clear(): void {
// // do nothing
//     }
//     public count(label?: string): void {
// // do nothing
//     }
//     public dir(value?: any, ...optionalParams: any[]): void {
// // do nothing
//     }
//     public dirxml(value: any): void {
// // do nothing
//     }
//     public exception(message?: string, ...optionalParams: any[]): void {
// // do nothing
//     }
//     public group(groupTitle?: string, ...optionalParams: any[]): void {
// // do nothing
//     }
//     public groupCollapsed(groupTitle?: string, ...optionalParams: any[]): void {
// // do nothing
//     }
//     public groupEnd(): void {
// // do nothing
//     }
//     public markTimeline(label?: string): void {
// // do nothing
//     }
//     public profile(reportName?: string): void {
// // do nothing
//     }
//     public profileEnd(reportName?: string): void {
// // do nothing
//     }
//     public table(...tabularData: any[]): void {
// // do nothing
//     }
//     public time(label?: string): void {
// // do nothing
//     }
//     public timeEnd(label?: string): void {
// // do nothing
//     }
//     public timeStamp(label?: string): void {
// // do nothing
//     }
//     public timeline(label?: string): void {
// // do nothing
//     }
//     public timelineEnd(label?: string): void {
// // do nothing
//     }
// }