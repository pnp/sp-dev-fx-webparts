import { HttpRequestError } from "@pnp/odata";
import { ValidationError } from "./ValidationError";

export class ErrorHandler {
    private _error: any;

    public get hasError() { return !!this._error; }

    public readonly catch = (error: any) => {
        if (!this.hasError) {
            this._error = error;
        }
    }

    public readonly throwIfError = () => {
        if (this.hasError) {
            ErrorHandler.throw(this._error);
        }
    }

    public readonly reportIfError = () => {
        if (this.hasError) {
            console.error(this._error);
        }
    }

    public static readonly throw = (error: any) => {
        console.error(error);
        throw error;
    }

    public get is_400_BAD_REQUEST() { return ErrorHandler.is_400_BAD_REQUEST(this._error); }
    public static readonly is_400_BAD_REQUEST = (error: any) => ErrorHandler.isErrorCode(error, 400);

    public get is_404_NOT_FOUND() { return ErrorHandler.is_404_NOT_FOUND(this._error); }
    public static readonly is_404_NOT_FOUND = (error: any) => ErrorHandler.isErrorCode(error, 404);

    public get is_412_PRECONDITION_FAILED() { return ErrorHandler.is_412_PRECONDITION_FAILED(this._error); }
    public static readonly is_412_PRECONDITION_FAILED = (error: any) => ErrorHandler.isErrorCode(error, 412);

    public get is_423_LOCKED() { return ErrorHandler.is_423_LOCKED(this._error); }
    public static readonly is_423_LOCKED = (error: any) => ErrorHandler.isErrorCode(error, 423);

    public get is_SPO_ValidationError() { return ErrorHandler.is_SPO_ValidationError(this._error); }
    public static readonly is_SPO_ValidationError = (error: any): error is ValidationError =>
        error && (error instanceof ValidationError)

    private static readonly isErrorCode = (error: any, code: number) =>
        error && (error as HttpRequestError).isHttpRequestError && (error as HttpRequestError).status === code

    public static readonly message = async (error: any): Promise<string> =>
        (error && (error as HttpRequestError).isHttpRequestError && (await (error as HttpRequestError).response.clone().json())['odata.error']?.message?.value) || error?.message || error
}