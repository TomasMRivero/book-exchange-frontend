import { SHOW_USER_LIST, SHOW_USER, EDIT_USER } from "../../actions/userActions";

export function users(state = {}, action){
    switch (action.type) {
        case SHOW_USER_LIST:
            const extend = {};
            
            for (const user of action.payload) {
                extend[user.id] = user;
            }

            return{
                ...state,
                ...extend
            };
        case EDIT_USER:
            return{
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    ...action.payload
                }
            };    
        default:
            return state;
    }

}
export function user(state = {}, action) {
    switch (action.type) {
        case SHOW_USER:
            return{
                ...action.payload
            };
        case EDIT_USER:
            return{
                ...action.payload
            };
        default:
            return state;
    }
}