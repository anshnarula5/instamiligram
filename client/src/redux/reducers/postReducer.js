import {
  COMMENT_FAIL,
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POSTS_FAIL,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_FOLLOWING_POSTS_FAIL,
  GET_FOLLOWING_POSTS_REQUEST,
  GET_FOLLOWING_POSTS_SUCCESS,
  LIKE_FAIL,
  LIKE_REQUEST,
  LIKE_SUCCESS,
} from "../types";

export const followingPostsReducer = (state = { posts: [] }, action) => {
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

export const allPostsReducer = (state = { posts: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_POSTS_REQUEST:
      return { loading: true };
    case GET_ALL_POSTS_SUCCESS:
      return { loading: false, posts: payload };
    case GET_ALL_POSTS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const likePostReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIKE_REQUEST:
      return { loading: true };
    case LIKE_SUCCESS:
      return { loading: false, success: true };
    case LIKE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const commentPostReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case COMMENT_REQUEST:
      return { loading: true };
    case COMMENT_SUCCESS:
      return { loading: false, success: true };
    case COMMENT_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const createPostReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_POST_REQUEST:
      return { loading: true };
    case CREATE_POST_SUCCESS:
      return { loading: false, success: true, post : payload };
    case CREATE_POST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
