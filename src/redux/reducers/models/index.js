import { combineReducers } from "redux";

import books from './bookModelReducer';
import users from './userModelReducer';


export default combineReducers({
    books,
    users
});