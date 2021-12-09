import { combineReducers } from "redux";
import alert from "./alerts";
import {
  allPostsReducer,
  commentPostReducer,
  followingPostsReducer,
  likePostReducer,
} from "./postReducer";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  followReducer,
  notFollowingUsersListReducer,
} from "./usersReducer";

const rootReducer = combineReducers({
  alert,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  follow: followReducer,
  followingPosts: followingPostsReducer,
  likePost: likePostReducer,
  commentPost: commentPostReducer,
  allPosts: allPostsReducer,
  notFollowingUsersList : notFollowingUsersListReducer
});

export default rootReducer;
