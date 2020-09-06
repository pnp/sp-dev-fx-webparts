import {
    ADD_PAGECONTEXT
} from "../constants";

export function addPageContext(pageContext) {
    return {
        type: ADD_PAGECONTEXT,
        payload: {
            pageContext: pageContext
        }
    };
}

