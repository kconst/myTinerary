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
export const signIn = (userData, history) => dispatch => {
  let status;
  axios
    .post("http://localhost:5000/api/users/signin", userData)
    .then(
      res => {
          if (res.data.success === "Authenticated") {
            status = true;
            return dispatch({
                type: SUCCESS_LOGIN_DISPATCH,
                payload: {
                    isAuthenticated: true,
                    user: {
                        name: res.data.user.name,
                        email: res.data.user.email,
                        token: res.data.user.token
                    }
                }
            });
        }

        return dispatch({
          type: FAILURE_LOGIN_DISPATCH,
          payload: res.data
        });
      },
      history.push("/")
    )
    .catch(err =>
      dispatch({
        type: FAILURE_LOGIN_DISPATCH,
        payload: err
      })
    );
};
