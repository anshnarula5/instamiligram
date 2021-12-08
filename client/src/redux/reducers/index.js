import { combineReducers } from "redux";
import alert from "./alerts";
import {followingPostsReducer} from "./postReducer";
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
  followingPosts: followingPostsReducer
});

export default rootReducer;
