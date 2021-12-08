import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import ProfileDetail from "../components/ProfileDetail";
import { getMyDetails, getUserDetails } from "../redux/actions/usersAction";

const MyProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {userInfo, loading, error} = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (!userInfo) {
      navigate("/auth")
    }
  }, [userInfo,loading])
  return (
    <>
      {loading ? (
        "...LOADING"
      ) : (
        <div className=" offset-md-2 d-flex flex-column">
          <>
            <div className="row">
              <div className="col-md-5 col-sm-4 text-center mt-3">
                <img
                  src={userInfo.profileImage}
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
                  <h4 className="d-inline mr-md-3">{userInfo.username}</h4>
                  <Link
                    className="btn btn-outline-dark mx-md-3"
                    to="/profile/edit"
                  >
                    Edit profile
                  </Link>
                  <p className="d-inline fs-5 mx-3">
                    <i className="fas fa-cog"></i>
                  </p>
                </div>
                <div className="my-3">
                  <p className="d-inline mr-md-3 mr-2 ">
                    <strong>{userInfo.posts.length}</strong> posts
                  </p>
                  <p className="d-inline mx-md-3 mx-2">
                    <strong>{userInfo.followers.length}</strong> followers
                  </p>
                  <p className="d-inline">
                    <strong>{userInfo.following.length}</strong> following
                  </p>
                </div>
                <div>
                  <p>
                    <strong>{userInfo.fullname}</strong>
                    <p>{userInfo.bio}</p>
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

export default MyProfileScreen;
