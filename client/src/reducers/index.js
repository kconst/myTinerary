import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import cityReducer from "./cityReducer";
import myTineraryReducer from "./myTineraryReducer";
import activityReducer from "./activityReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  city: cityReducer,
  myTinerary: myTineraryReducer,
  activity: activityReducer
});
