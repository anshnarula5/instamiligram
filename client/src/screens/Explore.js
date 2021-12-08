import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostElement from "../components/PostElement";
import { getAllPosts } from "../redux/actions/postActions";

const Explore = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.allPosts);
  const { userInfo: profile } = useSelector((state) => state.userLogin);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return loading ? (
    "...Loading"
  ) : error ? (
    error
  ) : (
    <div className="row pt-3">
      <div className="col-md-7 offset-md-2">
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-4 my-2   profilepost ">
              <PostElement
                post={post}
                key={post._id}
                profile={profile}
                explore={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
