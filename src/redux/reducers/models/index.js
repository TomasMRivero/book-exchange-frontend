import { combineReducers } from "redux";

import { books, book } from './bookModelReducer';
import { users, user } from './userModelReducer';

export default combineReducers({
    books,
    book,
    users,
    user
});
