import {SHOW_BOOK_LIST} from '../../actions'

export default function books(state = {}, action) {
    switch (action.type) {
        case SHOW_BOOK_LIST:
            const extend = {};

            for (const book of action.payload) {
                extend[book.id] = book;
            }

            return {
                ...state,
                ...extend
            };
        default:
            return state;
    }
}