import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ProfileDetail from "../components/ProfileDetail";
import { follow, getMyDetails, getUserDetails } from "../redux/actions/usersAction";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {userInfo, loading, error} = useSelector((state) => state.userLogin);
  const {success : followSuccess, loading : followLoading, error : followError} = useSelector((state) => state.follow);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (user && !user.name) {
      dispatch(getUserDetails(id));
    }
  }, [dispatch, followSuccess]);
  console.log(user);

  const handleFollow = () => {
    dispatch(follow(id));
    console.log("sad")
  };
  const isFollowing = user?.followers?.find(
    (follower) => follower === userInfo._id
  );

  return (
    <>
      {userLoading ? (
        "...LOADING"
      ) : (
        <div className=" offset-md-2 d-flex flex-column">
          <>
            <div className="row">
              <div className="col-md-5 col-sm-4 text-center mt-3">
                <img
                  src={user?.profileImage}
                  style={{
                    width: "10rem",
                    height: "10rem",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </div>
              <div className="col-md-7 col-sm-8 mt-3 d-flex flex-column">
                <div className="d-flex align-items-center">
                  <h4 className="d-inline mr-md-3">{user?.username}</h4>
                  {followLoading && "...Loading"}
                  {!isFollowing ? (
                    <button
                      className="btn btn-primary px-2 mx-2"
                      onClick={handleFollow}
                    >
                      Follow
                    </button>
                  ) : (
                    <>
                      <button className="btn btn-outline-dark btn-sm px-2 mx-2">
                        message
                      </button>
                      <button
                        className="btn btn-outline-dark btn-sm px-2"
                        onClick={handleFollow}
                      >
                        <i className="fas fa-user-check"></i>
                      </button>
                    </>
                  )}
                  <p className="d-inline fs-5 mx-3">
                    <i className="fas fa-cog"></i>
                  </p>
                </div>
                <div className="my-3">
                  <p className="d-inline mr-md-3 mr-2 ">
                    <strong>{user?.posts?.length}</strong> posts
                  </p>
                  <p className="d-inline mx-md-3 mx-2">
                    <strong>{user?.followers?.length}</strong> followers
                  </p>
                  <p className="d-inline">
                    <strong>{user?.following?.length}</strong> following
                  </p>
                </div>
                <div>
                  <p>
                    <strong>{user?.fullname}</strong>
                    <p>{user?.bio}</p>
                  </p>
                </div>
              </div>
            </div>
          </>
          <hr className="" />
          POSTS
        </div>
      )}
    </>
  );
};

export default ProfileScreen;
