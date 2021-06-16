export const SHOW_USER_LIST = 'SHOW_USERS'
export const SHOW_USER_LIST_IDS = 'SHOW_USER_LIST_IDS'

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