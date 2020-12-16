import { HttpRequestError } from '@pnp/odata';
import { LogHelper } from "../utilities";


export class BaseService {
    constructor() {
    }

    public handleHttpError(methodName: string, error: HttpRequestError): void {
        this.logError(methodName, error);
    }

    public logError(methodName: string, error: Error) {
        LogHelper.exception(this.constructor.name, methodName, error);
    }

    public logPnpError(methodName: string, error: HttpRequestError | any): string {
        let msg: string;
        if (error instanceof HttpRequestError) {
            if (error.message) {
                msg = error.message;
                LogHelper.error(this.constructor.name, methodName, msg);
            }
            else {
                LogHelper.exception(this.constructor.name, methodName, error);
            }
        }
        else if (error.data != null && error.data.responseBody && error.data.responseBody.error && error.data.responseBody.error.message) {
            // for email exceptions they weren't coming in as "instanceof HttpRequestError"
            msg = error.data.responseBody.error.message.value;
            LogHelper.error(this.constructor.name, methodName, msg);
        }
        else if (error instanceof Error) {
            if (error.message.indexOf('[412] Precondition Failed') !== -1) {
                msg = 'Save Conflict. Your changes conflict with those made concurrently by another user. If you want your changes to be applied, resubmit your changes.';
                LogHelper.error(this.constructor.name, methodName, msg);
            }
            else if (error.message !== 'Unexpected token < in JSON at position 0') {
                // 'Unexpected token < in JSON at position 0' will be thrown if XML file is read; this was issue in MDF project
                msg = error.message;
                LogHelper.error(this.constructor.name, methodName, msg);
            }
            return msg;
        }
    }      
}
