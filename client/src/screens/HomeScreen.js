import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import { getFollowingPosts } from "../redux/actions/postActions";
import {
  follow,
  listNonFollowingUsers,
  logout,
} from "../redux/actions/usersAction";
// import Post from "./Post/Post";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(
    (state) => state.followingPosts
  );
  const { success } = useSelector((state) => state.likePost);
  const { success: commentSuccess } = useSelector((state) => state.commentPost);
  const { success: followSuccess } = useSelector((state) => state.follow);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useSelector((state) => state.notFollowingUsersList);

  useEffect(() => {
    dispatch(getFollowingPosts());
  }, [dispatch, success, commentSuccess, followSuccess]);

  useEffect(() => {
    if (users && users.length === 0) {
      dispatch(listNonFollowingUsers());
    }
  }, [dispatch, users, followSuccess, usersLoading, userInfo]);

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
        <div className="col-md-3 mt-4 " style={{ zIndex: "0" }}>
          <div className="sticky-top px-3" style={{ top: "2rem" }}>
            <section className="d-flex align-items-center justify-content-center">
              <img
                style={{ borderRadius: "50%", objectFit: "cover" }}
                width="50rem"
                height="50rem"
                src={userInfo.profileImage}
                alt=""
              />
              <h6 className=" d-inline mx-2 flex-grow-1">
                <Link to={`/profile/me`}>{userInfo.username}</Link>
              </h6>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(logout())}
              >
                Logout
              </p>
            </section>
            <section className="mt-4">
              <small className="text-muted mb-2">Suggestions for you</small>
              <section>
                {usersLoading
                  ? "...Loading"
                  : users.map((user) => (
                      <div
                        key={user._id}
                        className="d-flex py-2 justify-content-between align-items-center"
                      >
                        <img
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                          width="40rem"
                          height="40rem"
                          src={user.profileImage}
                          alt=""
                        />
                        <div className="flex-grow-1 mx-2">
                          <h6 className=" d-inline ">{user.username}</h6>
                          <small className="text-muted d-block">
                            {user.fullname}
                          </small>
                        </div>
                        {user.followers.find(
                          (follower) => follower === userInfo._id
                        ) ? (
                          <>
                            <Link to={`/profile/${user._id}`}>
                              <p
                                style={{ cursor: "pointer" }}
                                data-bs-dismiss="modal"
                                // onClick={() => {
                                //   dispatch(follow(user._id));
                                // }}
                              >
                                View Profile
                              </p>
                            </Link>
                          </>
                        ) : (
                          <Link to={`/profile/${user._id}`}>
                            <p
                              className="text-primary"
                              style={{ cursor: "pointer" }}
                            >
                              View Profile
                            </p>
                          </Link>
                        )}
                      </div>
                    ))}
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
