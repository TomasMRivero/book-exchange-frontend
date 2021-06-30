import { SET_AUTHENTICATED } from "../../actions"

const INITIAL_STATE = false;

export default function authenticated( state = INITIAL_STATE, action) {
    switch(action.type) {
      case SET_AUTHENTICATED:
        return !state
      default:
        return state;
    }
  }