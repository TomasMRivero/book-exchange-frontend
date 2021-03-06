export const SHOW_BOOK_LIST = 'SHOW_BOOKS';
export const SHOW_BOOK_LIST_IDS = 'SHOW_BOOK_LIST_IDS';
export const SHOW_BOOK = 'SHOW_BOOK';
export const SHOW_BOOK_ID = 'SHOW_BOOK_ID';

export const EDIT_BOOK = 'EDIT_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';


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
export const showBook = book => {
    return{
        type: SHOW_BOOK,
        payload: book
    }
};
export const showBookID = bookID => {
    return {
        type: SHOW_BOOK_ID,
        payload: bookID
    };
};

export const editBook = book => {
    return {
        type: EDIT_BOOK,
        payload: book
    }
};

export const deleteBook = book => {
    return {
        type: DELETE_BOOK,
        payload: book
    }
};