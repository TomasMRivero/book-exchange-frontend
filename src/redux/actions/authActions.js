export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_AUTH_USER = 'SET_AUTH_USER'


export const setAuthenticated = () => {
    return {
        type: SET_AUTHENTICATED
    };
};

export const setAuthUser = user => {
    return {
        type: SET_AUTH_USER,
        payload: user
    }
}