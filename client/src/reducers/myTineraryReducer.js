import {
	GET_ALL_MYTINERARIES,
	GET_MYTINERARIES_BY_CITY
} from "../actions/types";

const initialState = {
	myTineraries: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ALL_MYTINERARIES:
			return {
				...state,
				myTineraries: action.payload
			};
		case GET_MYTINERARIES_BY_CITY:
			return {
				...state,
				myTineraries: action.payload
			};
		default:
			return state;
	}
}
