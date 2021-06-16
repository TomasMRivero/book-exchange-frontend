import { combineReducers } from "redux";

import books from './bookUiReducer';
import users from './userUiReducer';

export default combineReducers({
    books,
    users
});