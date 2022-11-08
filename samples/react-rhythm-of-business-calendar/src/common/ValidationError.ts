export class ValidationError extends Error {
    constructor(
        public readonly fieldName: string,
        public readonly fieldErrorMessage: string,
    ) {
        super(`${fieldName}: ${fieldErrorMessage}`);
        Object.setPrototypeOf(this, ValidationError.prototype); // workaround to fix instanceof behavior for Error-derived classes https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}