import axios from "axios";
import {GET_CITIES} from "./types";

//Get All cities
export const getCities = () => dispatch => {
	axios
		.get("api/cities/all")
		.then(res =>
			dispatch({
				type: GET_CITIES,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_CITIES,
				payload: {}
			})
		);
};
