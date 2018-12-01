import axios from "axios";
import {GET_POSTS_BY_MYTINERARY, ADD_POST_BY_MYTINERARY} from "./types";

//Add post by Mytinerary
export const addPostByMyTinerary = postData => dispatch => {
	axios
		.post("/api/posts/add", postData)
		.then(
			res =>
				dispatch({
					type: ADD_POST_BY_MYTINERARY,
					payload: res.data
				}) //,
			//history.push(`/activities/${postData.title}`)
		)
		.catch(err =>
			dispatch({
				type: ADD_POST_BY_MYTINERARY,
				payload: {}
			})
		);
};

//Get posts by mytinerarys
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
				payload: []
			})
		);
};
