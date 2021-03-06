import {DELETE_BOOK, EDIT_BOOK, SHOW_BOOK, SHOW_BOOK_LIST} from '../../actions'

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
            case EDIT_BOOK:
            return{
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    ...action.payload
                }
            };
            case DELETE_BOOK:
                const copy = {...state};
                delete copy[action.payload.id];
                return copy;
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
        case EDIT_BOOK:
            return{
                ...action.payload
            };
        case DELETE_BOOK:
            return{
                state
            };
        default:
            return state;
    }
}