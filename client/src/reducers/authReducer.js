import {SUCCESS_REGISTRATION_DISPATCH} from "../actions/types";
import {SUCCESS_LOGIN_DISPATCH} from "../actions/types";
import {FAILURE_LOGIN_DISPATCH} from "../actions/types";
import {PENDING_LOGIN_DISPATCH} from "../actions/types";

const initialState = {
	isAuthenticated: false,
	user: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SUCCESS_REGISTRATION_DISPATCH:
			return Object.assign({}, state, {
				isAuthenticated: action.payload.isAuthenticated,
				user: action.payload.user,
				response: null
			});
		case SUCCESS_LOGIN_DISPATCH:
			return Object.assign({}, state, {
				isAuthenticated: action.payload.isAuthenticated,
				user: action.payload.user,
				response: null
			});
		case FAILURE_LOGIN_DISPATCH:
			return Object.assign({}, state, {
				isAuthenticated: action.payload.isAuthenticated,
				user: action.payload.user,
				response: action.payload.response
			});
		case PENDING_LOGIN_DISPATCH:
			return Object.assign({}, state, {
				isAuthenticated: action.payload.isAuthenticated,
				user: action.payload.user,
				response: null
			});
		default:
			return state;
	}
}
