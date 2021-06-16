import { SHOW_USER_LIST } from "../../actions/userActions";

export default function users(state = {}, action){
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