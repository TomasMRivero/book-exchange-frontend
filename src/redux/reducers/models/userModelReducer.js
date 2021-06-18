import { SHOW_USER_LIST, SHOW_USER } from "../../actions/userActions";

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
        default:
            return state;
    }
}