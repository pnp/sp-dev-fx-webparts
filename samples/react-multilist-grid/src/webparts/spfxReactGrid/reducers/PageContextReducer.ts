import {
    ADD_PAGECONTEXT
} from "../constants";
export default function PageContextReducer(state = {}, action: any = { type: "" }) {
    switch (action.type) {
        case ADD_PAGECONTEXT:
            return action.payload.pageContext;
        default:
            return state;
    }
}

