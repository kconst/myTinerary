import { SUCCESS_REGISTRATION_DISPATCH } from "../actions/types";
import { SUCCESS_LOGIN_DISPATCH } from "../actions/types";
import { FAILURE_LOGIN_DISPATCH } from "../actions/types";
import { PENDING_LOGIN_DISPATCH } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_REGISTRATION_DISPATCH:
      return {
        ...state,
        user: action.payload
      };
    case SUCCESS_LOGIN_DISPATCH:
      return {
          ...state,
          user: action.payload
      };
    case FAILURE_LOGIN_DISPATCH:
      return {
          ...state,
          user: action.payload
      };
    case PENDING_LOGIN_DISPATCH:
      return {
          ...state,
          user: action.payload
      };
    default:
      return state;
  }
}
