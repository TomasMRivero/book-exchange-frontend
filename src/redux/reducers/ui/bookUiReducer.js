import {DELETE_BOOK, SHOW_BOOK_LIST_IDS} from '../../actions'

const initialState = [];

export default function books(state = initialState, action){
    switch (action.type) {
        case SHOW_BOOK_LIST_IDS:
            return action.payload;
        case DELETE_BOOK:
            const deleteID = action.payload.id;

            return state.filter(id => id !== deleteID);
        default:
            return state;
    }
};