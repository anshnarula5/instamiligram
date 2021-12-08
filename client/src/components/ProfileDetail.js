import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { follow } from "../../redux/actions/profile";

const ProfileDetail = ({ profile }) => {
  const {userInfo, error, loading} = useSelector((state) => state.userLogin);
  const isFollowing = false
  const dispatch = useDispatch();
  const handleFollow = () => {
    // dispatch(follow(profile._id));
    console.log("sad")
  };

  return (
    <>
      <div className="row">
        <div className="col-md-5 col-sm-4 text-center mt-3">
          <img
            src={profile.profileImage}
            style={{ width: "10rem",  height: "10rem", borderRadius: "50%", objectFit : "cover" }}
            alt=""
          />
        </div>
        <div className="col-md-7 col-sm-8 mt-3 d-flex flex-column">
          <div className="d-flex align-items-center">
            <h4 className="d-inline mr-md-3">{profile.username}</h4>
            {profile._id === userInfo._id ? (
              <Link className="btn btn-outline-dark mx-md-3" to="/profile/edit">
                Edit profile
              </Link>
            ) : !isFollowing ? (
              <button
                className="btn btn-primary px-2 mx-2"
                onClick={handleFollow}
              >
                Follow
              </button>
            ) : (
                  <>
                  <button
                className="btn btn-outline-dark btn-sm px-2 mx-2"
              >
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
              <strong>{profile.posts.length}</strong> posts
            </p>
            <p className="d-inline mx-md-3 mx-2">
              <strong>{profile.followers.length}</strong> followers
            </p>
            <p className="d-inline">
              <strong>{profile.following.length}</strong> following
            </p>
          </div>
          <div>
            <p>
              <strong>{profile.fullname}</strong>
              <p>{profile.bio}</p>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
