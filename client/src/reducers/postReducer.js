import {
	ADD_POST_BY_MYTINERARY,
	GET_POSTS_BY_MYTINERARY
} from "../actions/types";

const initialState = {
	posts: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case ADD_POST_BY_MYTINERARY:
			return {
				...state,
				posts: action.payload
			};
		case GET_POSTS_BY_MYTINERARY:
			return {
				...state,
				posts: action.payload //, ...state.posts]
			};
		default:
			return state;
	}
}
