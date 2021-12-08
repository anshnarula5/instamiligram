import {
  GET_FOLLOWING_POSTS_FAIL,
  GET_FOLLOWING_POSTS_REQUEST,
  GET_FOLLOWING_POSTS_SUCCESS,
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
