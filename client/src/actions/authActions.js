import axios from "axios";
import {GET_ERRORS, SUCCESS_LOGIN_DISPATCH, SUCCESS_REGISTRATION_DISPATCH, FAILURE_LOGIN_DISPATCH} from "./types";

//Register User by POST and redirection will be performed to / which is the Landing Page defined in App.js in this line: <Route exact path="/" component={Landing} />
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("http://localhost:5000/api/users/register", userData)
        .then(
            res =>
                dispatch({
                    type: SUCCESS_REGISTRATION_DISPATCH,
                    payload: res.data
                }),
            history.push("/")
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const signIn = (userData) => dispatch => {
    axios
        .post(userData.type !== 'form' ? "http://localhost:5000/api/users/signInThirdParty" : "http://localhost:5000/api/users/signin", userData)
        .then(res => {
            if (res.data.success === "Authenticated") {
                window.sessionStorage.setItem('mytinerary-user', JSON.stringify({ ...res.data.user, token: res.data.token }));
                return dispatch({
                    type: SUCCESS_LOGIN_DISPATCH,
                    payload: {
                        isAuthenticated: true,
                        user: {
                            name: res.data.user.name,
                            email: res.data.user.email,
                            token: res.data.token
                        }
                    }
                });
            }
            return dispatch({
                type: FAILURE_LOGIN_DISPATCH,
                payload: {
                    isAuthenticated: false,
                    response: res.data
                }
            });
        })
        .catch(err => {
            return dispatch({
                type: FAILURE_LOGIN_DISPATCH,
                payload: {
                    isAuthenticated: false,
                    response: err.response
                }
            })
        });
};

export const getUser = () => dispatch => {
	let user = window.sessionStorage.getItem('mytinerary-user');
	if (user) {
	    user = JSON.parse(user);
		return dispatch({
			type: SUCCESS_LOGIN_DISPATCH,
			payload: {
				user
			}
		});
    } else {
		return dispatch({
			type: FAILURE_LOGIN_DISPATCH,
			payload: {
				isAuthenticated: false
			}
		})
    }
};

export const updateUser = (userData) => dispatch => {
	axios
		.put("http://localhost:5000/api/users/update", userData)
		.then(res => {
			window.sessionStorage.setItem('mytinerary-user', JSON.stringify(userData));
			return dispatch({
				type: SUCCESS_REGISTRATION_DISPATCH,
				payload: res.data
			})
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
