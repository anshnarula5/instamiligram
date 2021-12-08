import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { getFollowingPosts } from "../redux/actions/postActions";
// import Post from "./Post/Post";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(
    (state) => state.followingPosts
  );
  const { success } = useSelector((state) => state.likePost);
  const { success: commentSuccess } = useSelector((state) => state.commentPost);
  useEffect(() => {
    dispatch(getFollowingPosts());
  }, [dispatch, success, commentSuccess]);
  return loading ? (
    "...Loading"
  ) : error ? (
    { error }
  ) : (
    <div className="offset-md-2">
      <div className="row">
        <div className="col-md-6">
          {posts.map((post) => (
            <Post post={post} />
          ))}
        </div>
        <div className="col-md-4 mt-4 " style={{ zIndex: "0" }}>
              <div className="sticky-top" style={{top: "2rem"}}>
                sada
            {/* <Right profile={profile} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
