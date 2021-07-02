export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const UNSET_AUTHENTICATED = 'UNSET_AUTHENTICATED'

export const SET_AUTH_USER = 'SET_AUTH_USER'
export const UNSET_AUTH_USER = 'UNSET_AUTH_USER'

export const setAuthenticated = () => {
    return {
        type: SET_AUTHENTICATED
    };
};
export const unsetAuthenticated = () => {
    return {
        type: UNSET_AUTHENTICATED
    };
};

export const setAuthUser = user => {
    return {
        type: SET_AUTH_USER,
        payload: user
    }
}
export const unsetAuthUser = () => {
    return {
        type: SET_AUTH_USER
    }
}