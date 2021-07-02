import { SET_AUTHENTICATED, UNSET_AUTHENTICATED, SET_AUTH_USER, UNSET_AUTH_USER } from "../../actions"

const INITIAL_STATE = false;

export function authenticated( state = INITIAL_STATE, action) {
    switch(action.type) {
      case SET_AUTHENTICATED:
        return !state;
      case UNSET_AUTHENTICATED:
        return !state;
      default:
        return state;
    }
  }

export function authUser( state = {}, action) {
  switch(action.type) {
    case SET_AUTH_USER:
      return {...action.payload};
    case UNSET_AUTH_USER:
      return state;
    default:
      return state;
  }
}