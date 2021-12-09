import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createPost } from "../redux/actions/postActions";

const CreatePostScreen = () => {
  const [uploading, setUploading] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success, loading, error } = useSelector((state) => state.createPost);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "",
    text: "",
    location: "",
  });
  const [posted, setPosted] = useState(false);
  const { image, text, location } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    console.log(formData);
    dispatch(createPost(formData));
    setPosted(true);
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
      setFormData({ ...formData, image: res.data });
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
    }
  };
  if (posted && !loading && success) {
    navigate("/");
  }

  return (
    <div className="row ">
      {loading ? (
        "...loading"
      ) : error ? (
        error
      ) : (
        <div className="col-md-9 offset-md-1">
          <div className="card mt-5  offset-md-1">
            <div className="text-center mt-3">Create a post</div>
            <hr />
            <div className="row no-gutters ">
              <div className="col-md-8">
                <form className="md-form">
                  <div className="file-field">
                    <div className="z-depth-1-half mb-4">
                      {image ? (
                        <img
                          src={image}
                          className="img-fluid virtual"
                          alt="example "
                          style = {{objectFit : "contain"}}
                        />
                      ) : (
                        <img
                          src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                          className="img-fluid virtual"
                          alt="example placeholder"
                        />
                      )}
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="btn btn-mdb-color btn-rounded float-left">
                        {/* <FileBase
                      type="file"
                      multiple={false}
                      onDone={({base64}) => setFormData({...formData, image : base64})}
                    /> */}
                        <input
                          type="file"
                          name="image"
                          onChange={handleUpload}
                        />
                        {uploading && "...Loadinf"}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-4 ">
                <h5 className="card-title">
                  <img
                    src={userInfo.profileImage}
                    alt=""
                    width="25rem"
                    style={{ borderRadius: "50%" }}
                  />{" "}
                  {userInfo.username}
                </h5>
                <ul className="list-group list-group-flush">
                  <textarea
                    className="list-group-item"
                    rows="8"
                    name="text"
                    placeholder="Write a caption"
                    onChange={handleChange}
                    value={text}
                  ></textarea>
                  <input
                    className="list-group-item "
                    placeholder="Add location"
                    onChange={handleChange}
                    name="location"
                    value={location}
                  ></input>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handleSubmit}
                  >
                    Add post
                  </button>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-8"></div>
        </div>
      )}
    </div>
  );
};

export default CreatePostScreen;
