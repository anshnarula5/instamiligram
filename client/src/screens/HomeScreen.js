import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import {getFollowingPosts} from "../redux/actions/postActions";
// import Post from "./Post/Post";

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFollowingPosts());
  }, [dispatch]);
  const { posts, loading, error } = useSelector((state) => state.followingPosts);
  return loading ? "...Loading" : error ? {error} : (
    <div className="w-75 offset-md-1">
    <div className="row">
      <div className="col-md-8 mt-4 ">
          {posts.map(post => (
          <Post post= {post} />
        ))}
      </div>
      <div className="col-md-4 mt-4 " style={{ zIndex: "0" }}>
        <div className="sticky-top" style={{ top: "2rem" }}>
          {/* <Right profile={profile} /> */}
        </div>
      </div>
    </div>
  </div>
  )
};

export default HomeScreen;
