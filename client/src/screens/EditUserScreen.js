import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { updateUser } from "../redux/actions/usersAction";

const EditProfile = () => {
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { userInfo: profile, loading } = useSelector(
    (state) => state.userLogin
  );
  useEffect(() => {
    if (!profile) {
      navigate("/auth");
    } else {
      setFormData({
        email: profile.email,
        username: profile.username,
        fullname: profile.fullname,
        bio: profile.bio,
        website: profile.website,
        gender: profile.gender,
        profileImage: profile.profileImage,
      });
    }
  }, [profile, navigate, dispatch]);
  const [formData, setFormData] = useState({
    username: "",
    profileImage: "",
    fullname: "",
    bio: "",
    website: "",
    email: "",
    gender: "",
  });

  const { username, fullname, bio, website, email, gender, profileImage } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
  };
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post("/api/upload", fd, config);
      setFormData({ ...formData, profileImage: res.data });
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
    }
  };

  if (loading) {
    return "...Loading";
  }
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm ">
          <div className="modal-content text-center">
            <h5 className="py-3">Change Profile Photo</h5>
            <hr />
            <p className="py-2 text-primary" data-bs-dismiss="modal">
              Add new photo
              <div className="imageInput">
                <input type="file" name="image" onChange={handleUpload} />
              </div>
            </p>
            <hr />
            <p className="py-2 text-danger" data-bs-dismiss="modal">
              Remove current photo
            </p>
            <hr />
            <p className="py-2" data-bs-dismiss="modal">
              Close
            </p>
            <hr />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3 ">
          <div className="card my-5">
            <div className="card-body">
              <form className="px-4 py-5">
                <div className="form-group row mb-4">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">
                    <img
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                      src={profileImage}
                      width="60rem"
                      height="60rem"
                      alt=""
                    />
                    {uploading && "...Loadinf"}
                  </label>
                  <div className="col-sm-10">
                    <p className="fs-5">{username}</p>
                    <h6
                      id="emailHelp"
                      className="form-text text-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style={{ cursor: "pointer" }}
                    >
                      Change Profile Photo
                    </h6>
                  </div>
                </div>
                <div className="form-group row mb-4">
                  <label for="inputEmail3" className="col-sm-2 col-form-label">
                    <strong>Name</strong>
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="fullname"
                      className="form-control"
                      id="inputEmail3"
                      placeholder="Name"
                      value={fullname}
                      onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      Help people discover your account by using the name you're
                      known by: either your full name, nickname, or business
                      name.
                    </small>
                  </div>
                </div>
                <div className="form-group row mb-4">
                  <label
                    for="inputPassword32"
                    className="col-sm-2 col-form-label"
                  >
                    <strong>Username</strong>
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      id="inputPassword32"
                      placeholder="Username"
                      value={username}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row mb-4">
                  <label
                    for="inputPassword31"
                    className="col-sm-2 col-form-label"
                  >
                    <strong>Website</strong>
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="website"
                      className="form-control"
                      id="inputPassword31"
                      placeholder="Website"
                      value={website}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row mb-4">
                  <label
                    for="inputPassword34"
                    className="col-sm-2 col-form-label"
                  >
                    <strong>Bio</strong>
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      type="text"
                      name="bio"
                      className="form-control"
                      id="inputPassword34"
                      placeholder="Write about yourself (Max 100 characters)"
                      maxLength="100"
                      value={bio}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row mb-4">
                  <label
                    for="inputPassword34"
                    className="col-sm-2 col-form-label"
                  ></label>
                  <div className="col-sm-10">
                    <small id="emailHelp" className="form-text text-muted">
                      <div className="text-dark">Personal Information</div>
                      Provide your personal information, even if the account is
                      used for a business, a pet or something else. This won't
                      be a part of your public profile.
                    </small>
                  </div>
                </div>
                <div className="form-group row mb-4">
                  <label
                    for="inputPassword3s"
                    className="col-sm-2 col-form-label"
                  >
                    <strong>Email</strong>
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      id="inputPassword3s"
                      placeholder="Email"
                      value={email}
                      onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                </div>
                <div className="form-group row mb-4">
                  <label
                    for="inputPassword3c"
                    className="col-sm-2 col-form-label"
                  >
                    <strong>Gender</strong>
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="gender"
                      className="form-control"
                      id="inputPassword3c"
                      placeholder="Gender"
                      value={gender}
                      onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your identity with anyone else.
                    </small>
                  </div>
                </div>
                <div className="form-group row mb-4">
                  <label
                    for="inputPassword3c"
                    className="col-sm-2 col-form-label"
                  ></label>
                  <div className="col-sm-10">
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      Submit
                    </button>
                    <Link
                      to="/profile/me"
                      className="btn btn-outline-primary mx-3"
                    >
                      Go back
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
