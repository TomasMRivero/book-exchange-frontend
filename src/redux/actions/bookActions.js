export const SHOW_BOOK_LIST = 'SHOW_BOOKS'
export const SHOW_BOOK_LIST_IDS = 'SHOW_BOOK_LIST_IDS'

export const showBookList = books => {
    return{
        type: SHOW_BOOK_LIST,
        payload: books
    };
};
export const showBookListIDs = bookIDs => {
    return {
        type: SHOW_BOOK_LIST_IDS,
        payload: bookIDs
    };
};