import axios from "axios";
import {
	GET_ACTIVITIES_BY_MYTINERARY,
	GET_ALL_ACTIVITIES,
	GET_POSTS_BY_MYTINERARY
} from "./types";

//Get AllActivities
export const getAllActivities = () => dispatch => {
	axios
		.get("/api/activities/all")
		.then(res =>
			dispatch({
				type: GET_ALL_ACTIVITIES,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL_ACTIVITIES,
				payload: {}
			})
		);
};

//Get activities by mytinerary
export const getActivitiesByMyTinerary = mytinerary => dispatch => {
	axios
		.get(`/api/activities/${mytinerary}`)
		.then(res =>
			dispatch({
				type: GET_ACTIVITIES_BY_MYTINERARY,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ACTIVITIES_BY_MYTINERARY,
				payload: []
			})
		);
};

//Get posts by mytinerary
export const getPostsByMyTinerary = mytinerary => dispatch => {
	axios
		.get(`/api/posts/${mytinerary}`)
		.then(res =>
			dispatch({
				type: GET_POSTS_BY_MYTINERARY,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POSTS_BY_MYTINERARY,
				payload: {}
			})
		);
};
