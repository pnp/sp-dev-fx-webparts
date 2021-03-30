import { Logger, LogLevel } from "@pnp/logging";

export class LogHelper {

    public static verbose(className: string, methodName: string, message: string) {
        message = this.formatMessage(className, methodName, message);
        Logger.write(message, LogLevel.Verbose);
    }

    public static info(className: string, methodName: string, message: string) {
        message = this.formatMessage(className, methodName, message);
        Logger.write(message, LogLevel.Info);
    }

    public static warning(className: string, methodName: string, message: string) {
        message = this.formatMessage(className, methodName, message);
        Logger.write(message, LogLevel.Warning);
    }

    public static error(className: string, methodName: string, message: string) {
        message = this.formatMessage(className, methodName, message);
        Logger.write(message, LogLevel.Error);
    }

    public static exception(className: string, methodName: string, error: Error) {
        error.message = this.formatMessage(className, methodName, error.message);
        Logger.error(error);
    }

    private static formatMessage(className: string, methodName: string, message: string): string {
        let d = new Date();
        let dateStr = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() + ' ' +
            d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '.' + d.getMilliseconds();
        return `${dateStr} ${className} > ${methodName} > ${message}`;
    }
}