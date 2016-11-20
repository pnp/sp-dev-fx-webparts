import Action from "./action";
export const ACTION_INIT = "ACTION_INIT";
export type ACTION_INIT = { foo: number, message: string }

export function doActionInit(message: string): Action<ACTION_INIT> {
    return {
        type: ACTION_INIT,
        payload: {
            foo: 123,
            message
        }
    }
}