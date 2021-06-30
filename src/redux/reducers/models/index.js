import { combineReducers } from "redux";

import { books, book } from './bookModelReducer';
import { users, user } from './userModelReducer';
import authenticated from "./authModelReducer";

export default combineReducers({
    books,
    book,
    users,
    user,
    authenticated
});
