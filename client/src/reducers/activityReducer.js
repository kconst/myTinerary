import {
	GET_ALL_ACTIVITIES,
	GET_ACTIVITIES_BY_MYTINERARY,
	GET_POSTS_BY_MYTINERARY
} from "../actions/types";

const initialState = {
	activities: null,
	posts: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ALL_ACTIVITIES:
			return {
				...state,
				activities: action.payload
			};
		case GET_ACTIVITIES_BY_MYTINERARY:
			return {
				...state,
				activities: action.payload
			};
		case GET_POSTS_BY_MYTINERARY:
			return {
				...state,
				posts: action.payload
			};
		default:
			return state;
	}
}
