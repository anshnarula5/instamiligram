import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import PostElement from "../components/PostElement";
import ProfileDetail from "../components/ProfileDetail";
import {
  follow,
  getMyDetails,
  getUserDetails,
} from "../redux/actions/usersAction";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userInfo, loading, error } = useSelector((state) => state.userLogin);
  const {
    success: followSuccess,
    loading: followLoading,
    error: followError,
  } = useSelector((state) => state.follow);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userDetails);

  useEffect(() => {
      dispatch(getUserDetails(id));
  }, [dispatch, followSuccess]);
  console.log(user);

  const handleFollow = () => {
    dispatch(follow(id));
    console.log("sad");
  };
  const isFollowing = user?.followers?.find(
    (follower) => follower === userInfo._id
  );

  return (
    <>
      {userLoading ? (
      <Loader />
      ) : (
        <div className="  d-flex flex-column">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="row">
                  <div className="col-4 text-center mt-3">
                    <img
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                    src={user?.profileImage}
                    width="120rem"
                    height="120rem"
                    alt=""
                  />
                  </div>
                  <div className="col-7 col-sm-8 mt-3 d-flex flex-column">
                    <div className="d-flex align-items-center">
                      <h4 className="d-inline mx-2">{user.username}</h4>
                      {followLoading && "...Loading"}
                      {!isFollowing ? (
                        <button
                          className="btn btn-primary "
                          onClick={handleFollow}
                        >
                          Follow
                        </button>
                      ) : (
                        <>
                          <button className="btn btn-outline-dark btn-sm navbar-hide">
                            message
                          </button>
                          <button
                            className="btn btn-outline-dark btn-sm"
                            onClick={handleFollow}
                          >
                            <i className="fas fa-user-check"></i>
                          </button>
                        </>
                      )}
                   
                    </div>
                    <div className="my-3 d-flex">
                      <p className="d-inline mx-2 d-flex flex-column text-center">
                        <strong>{user?.posts?.length}</strong> posts
                      </p>
                      <p className="d-inline mx-2 d-flex flex-column text-center">
                        <strong>{user?.followers?.length}</strong> followers
                      </p>
                      <p className="d-inline mx-2 d-flex flex-column text-center">
                        <strong>{user?.following?.length}</strong> following
                      </p>
                    </div>
                    <div>
                      <p className="mx-3">
                        <strong>{user?.fullname}</strong>
                        <p>{user?.bio}</p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <hr className="" />
          <>
            <div className="row">
              <div className="col-md-7 offset-md-2">
                <div className="row">
                  {userLoading ? (
                    <Loader />
                  ) : (
                    <>
                      {user?.posts?.map((post) => (
                        <div className="col-md-4 my-2   profilepost ">
                          <PostElement
                            post={post}
                            key={post._id}
                            profile={user}
                            myProfile={true}
                            explore={false}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default ProfileScreen;
