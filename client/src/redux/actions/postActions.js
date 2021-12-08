import {
  COMMENT_FAIL,
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
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

import axios from "axios"

export const getFollowingPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_FOLLOWING_POSTS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(`/api/posts/following`, config);
    dispatch({ type: GET_FOLLOWING_POSTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_FOLLOWING_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getAllPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_POSTS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(`/api/posts`, config);
    dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const likePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LIKE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.put(`/api/posts/${id}/like`, {}, config);
    dispatch({ type: LIKE_SUCCESS});
  } catch (error) {
    dispatch({
      type: LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const commentPost = (id, text) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMMENT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(`/api/posts/${id}/comment`, {text}, config);
    dispatch({ type: COMMENT_SUCCESS});
  } catch (error) {
    dispatch({
      type: COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
