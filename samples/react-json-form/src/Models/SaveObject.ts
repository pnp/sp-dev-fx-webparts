import { IForm } from "./Form";

export interface SaveObject {
    form: IForm;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response: any;
}