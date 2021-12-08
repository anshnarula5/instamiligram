import {GET_FOLLOWING_POSTS_FAIL, GET_FOLLOWING_POSTS_REQUEST, GET_FOLLOWING_POSTS_SUCCESS} from "../types";

export const followingPostsReducer = (state = {posts : []}, action) => {
    const { type, payload } = action;
    switch (type) {
      case GET_FOLLOWING_POSTS_REQUEST:
        return { loading: true };
      case GET_FOLLOWING_POSTS_SUCCESS:
        return { loading: false, posts: payload };
      case GET_FOLLOWING_POSTS_FAIL:
        return { loading: false, error: payload };
      default:
        return state;
    }
  };