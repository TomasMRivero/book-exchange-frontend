import { combineReducers } from "redux";

import { books, book } from './bookModelReducer';
import { users, user } from './userModelReducer';
import {authenticated, authUser} from "./authModelReducer";

export default combineReducers({
    books,
    book,
    users,
    user,
    authenticated,
    authUser
});
