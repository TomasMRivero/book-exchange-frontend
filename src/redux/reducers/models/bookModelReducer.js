import {SHOW_BOOK, SHOW_BOOK_LIST} from '../../actions'

export function books(state = {}, action) {
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
export function book(state = {}, action) {
    switch (action.type) {
        case SHOW_BOOK:
            return{
                ...action.payload
            };
        default:
            return state;
    }
}