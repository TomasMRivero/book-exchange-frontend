import { SHOW_USER_LIST_IDS } from "../../actions";

const initialState = [];

export default function users(state = initialState, action){
    switch (action.type) {
        case SHOW_USER_LIST_IDS:
            return action.payload;    
        default:
            return state;
    }
};