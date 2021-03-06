export const SHOW_USER = 'SHOW_USER';
export const SHOW_USER_LIST = 'SHOW_USERS';
export const SHOW_USER_LIST_IDS = 'SHOW_USER_LIST_IDS';

export const EDIT_USER = 'EDIT_USER';

export const showUserList = users => {
    return{
        type: SHOW_USER_LIST,
        payload: users
    };
};
export const showUserListIDs = userIDs => {
    return {
        type: SHOW_USER_LIST_IDS,
        payload: userIDs
    };
};
export const showUser = user => {
    return{
        type: SHOW_USER,
        payload: user
    }
};
export const editUser = user => {
    return {
        type: EDIT_USER,
        payload: user
    }
};