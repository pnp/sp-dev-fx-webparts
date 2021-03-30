import { IBaseItem } from "models";

export class ErrorHelper {

    public static setUIError(object: IBaseItem, propertyName: string, errorMessage: string): void {
        if (object && object.uiErrors) {
            object.uiErrors.set(propertyName, errorMessage);
        }
    }

    public static removeUIError(object: IBaseItem, propertyName: string): void {
        if (object && object.uiErrors && object.uiErrors.has(propertyName)) {
            object.uiErrors.delete(propertyName);
        }
    }

    public static getUIError(object: IBaseItem, propertyName: string): string | undefined {

        if (object && object.uiErrors) {
            return object.uiErrors.get(propertyName);
        }

        return undefined;
    }
}