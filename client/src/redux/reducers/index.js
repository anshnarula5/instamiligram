import { combineReducers } from "redux";
import alert from "./alerts";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  followReducer,
} from "./usersReducer";

const rootReducer = combineReducers({
  alert,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  follow: followReducer,
});

export default rootReducer;
