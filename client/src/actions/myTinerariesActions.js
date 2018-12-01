import axios from "axios";
import {GET_MYTINERARIES_BY_CITY, GET_ALL_MYTINERARIES} from "./types";

//Get ALlmyTineraries
export const getAllMyTineraries = () => dispatch => {
	axios
		.get("/api/mytineraries/all")
		.then(res =>
			dispatch({
				type: GET_ALL_MYTINERARIES,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL_MYTINERARIES,
				payload: {}
			})
		);
};

//Get myTineraries by City
export const getMyTinerariesByCity = city => dispatch => {
	axios
		.get(`/api/mytineraries/${city}`)
		.then(res =>
			dispatch({
				type: GET_MYTINERARIES_BY_CITY,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_MYTINERARIES_BY_CITY,
				payload: {}
			})
		);
};
