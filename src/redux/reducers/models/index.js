import { combineReducers } from "redux";

import { books, book } from './bookModelReducer';
import users from './userModelReducer';

export default combineReducers({
    books,
    book,
    users
});