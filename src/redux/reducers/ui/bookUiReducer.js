import {SHOW_BOOK_LIST_IDS} from '../../actions'

const initialState = [];

export default function books(state = initialState, action){
    switch (action.type) {
        case SHOW_BOOK_LIST_IDS:
            return action.payload;
        default:
            return state;
    }
};