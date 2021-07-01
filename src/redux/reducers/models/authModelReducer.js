import { SET_AUTHENTICATED, SET_AUTH_USER } from "../../actions"

const INITIAL_STATE = false;

export function authenticated( state = INITIAL_STATE, action) {
    switch(action.type) {
      case SET_AUTHENTICATED:
        return !state
      default:
        return state;
    }
  }

export function authUser( state = {}, action) {
  switch(action.type) {
    case SET_AUTH_USER:
      return {...action.payload};
    default:
      return state;
  }
}