import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import {commentPost, likePost} from "../redux/actions/postActions";


const PostElement = ({ post, profile, explore = true, myProfile = false }) => {
  const [text, setText] = useState("");
  const { userInfo: user } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(likePost(post._id));
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleComment = () => {
    dispatch(commentPost(post._id, text));
    setText("");
  };
  if (!post) return "...loading";
  return (
    <>
      <div
        className="modal fade"
        id={`body${post._id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div
              className="modal-body"
              style={{ padding: "0%", margin: "0%", borderRadius: "0%" }}
            >
              <div className="card">
                <div className="row no-gutters">
                  <div className="col-md-8">
                    <img
                      src={post.image}
                      className="card-img"
                      alt="..."
                      style={{
                        height: "35rem",
                        overflow: "hidden",
                        display: "block",
                        objectFit: "cover",
                        borderRadius: "0%",
                      }}
                    />
                  </div>
                  <div className="col-md-4 d-flex flex-column justify-content-between">
                    <div className="">
                      <section className="py-3 border-bottom d-flex justify-content-between align-items-center">
                        <section>
                          {myProfile ? (
                            <>
                              <img
                                data-bs-dismiss="modal"
                                style={{
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                                src={
                                  explore
                                    ? post.user.profileImage
                                    : profile.user.profileImage
                                }
                                width="30rem"
                                height="30rem"
                                alt=""
                              />
                              <h6
                                className="mx-3 d-inline"
                                data-bs-dismiss="modal"
                              >
                                {explore
                                  ? post.user.username
                                  : profile.user.username}
                              </h6>
                            </>
                          ) : (
                            <>
                              <Link
                                to={
                                  post.user._id === user._id
                                    ? "/profile/me"
                                    : `/profile/${post.user._id}`
                                }
                                className="mx-1"
                              >
                                <img
                                  data-bs-dismiss="modal"
                                  style={{
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                  src={
                                    explore
                                      ? post.user.profileImage
                                      : profile.user.profileImage
                                  }
                                  width="30rem"
                                  height="30rem"
                                  alt=""
                                />
                              </Link>
                              <Link
                                to={
                                  post.user._id === user._id
                                    ? "/profile/me"
                                    : `/profile/${post.user._id}`
                                }
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                <h6
                                  className="mx-3 d-inline"
                                  data-bs-dismiss="modal"
                                >
                                  {explore
                                    ? post.user.username
                                    : profile.user.username}
                                </h6>
                              </Link>
                            </>
                          )}
                        </section>
                        <p>actions</p>
                      </section>
                      <div className="commentsection">
                        {post.text && (
                          <div className="py-2">
                            <img
                              style={{
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              src={post.user.profileImage}
                              width="30rem"
                              height="30rem"
                              alt=""
                            />
                            <h6 className="mx-3">{post.user.username}</h6>{" "}
                            {post.text}
                          </div>
                        )}
                        {!post.comments ||
                          (post.comments.length === 0 && (
                            <small className="text-muted">No comments</small>
                          ))}
                        {post.comments &&
                          post.comments.length > 0 &&
                          post.comments.map((comment) => (
                            <div
                              className="py-3 d-flex justify-content-between align-items-center"
                              key={comment._id}
                            >
                              <section>
                                <img
                                  src={comment.profileImage}
                                  style={{
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                  width="25rem"
                                  height="25rem"
                                  alt=""
                                />
                                <h6 className="mx-2 d-inline ">
                                  {comment.username}
                                </h6>
                                {comment.text}
                                <section className="text-muted ">
                                  <small>
                                    <small>
                                      {moment(comment.date).fromNow(true)}
                                    </small>
                                  </small>
                                  <small className="mx-2">
                                    <small>{comment.likes.length} Likes</small>
                                  </small>
                                  {user.username === comment.username && (
                                    <small style={{ cursor: "pointer" }}>
                                      <small
                                      >
                                        Delete
                                      </small>
                                    </small>
                                  )}
                                </section>
                              </section>
                              <section
                                className="px-2"
                               
                              >
                                {!comment.likes.find(
                                  (like) => like._id === user._id
                                ) ? (
                                  <i
                                    className="far fa-heart"
                                    style={{ cursor: "pointer" }}
                                  ></i>
                                ) : (
                                  <i
                                    className="fas fa-heart"
                                    style={{
                                      color: "#fb3958",
                                      cursor: "pointer",
                                    }}
                                  ></i>
                                )}
                              </section>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="border-top pt-1">
                      <section>
                        <div className="d-flex justify-content-between">
                          <p className="card-text fs-5 pb-1">
                            {post.likes &&
                            post.likes.length > 0 &&
                            !post.likes.find(
                              (like) => like.user === user._id
                            ) ? (
                              <i
                                className="far fa-heart"
                                onClick={handleLike}
                                style={{ cursor: "pointer" }}
                              ></i>
                            ) : (
                              <i
                                className="fas fa-heart"
                                onClick={handleLike}
                                style={{ cursor: "pointer", color: "#fb3958" }}
                              ></i>
                            )}
                            <i
                              className="far fa-comment mx-3"
                              style={{ cursor: "pointer" }}
                            ></i>
                            <i
                              className="far fa-paper-plane"
                              style={{ cursor: "pointer" }}
                            ></i>
                          </p>
                          <p className="card-text fs-5 px-2">
                            <i
                              className="far fa-bookmark"
                              style={{ cursor: "pointer" }}
                            ></i>
                          </p>
                        </div>
                        <small className="py-1">
                          <b>
                            {post.likes && post.likes.length > 0
                              ? post?.likes?.length
                              : 0}
                          </b>{" "}
                          likes
                        </small>
                        <small>
                          <small className="text-muted d-block mb-2">
                            {moment(post.date).fromNow()}
                          </small>
                        </small>
                      </section>
                      <section className="border-top py-1">
                        <ul className="list-group list-group-flush d-flex flex-row align-items-center justify-content-between">
                          <input
                            className="list-group-item w-100"
                            placeholder="Add comment"
                            name="comment"
                            value={text}
                            style={{ borderBottom: "none" }}
                            onChange={handleChange}
                          ></input>
                          <p
                            className="px-2 text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={handleComment}
                          >
                            share
                          </p>
                        </ul>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        data-bs-toggle="modal"
        style={{ cursor: "pointer" }}
        data-bs-target={`#body${post._id}`}
      >
        <img className="post img-fluid" src={post.image} alt="" />
        <div className="over ">
          <div className="buttons fs-6 text-white ">
            <div className=" d-inline">
              <i className="fas fa-heart mx-1"></i>
              {post.likes.length}
            </div>
            <div className="px-3 d-inline">
              <i className="fas fa-comment mx-1"></i>
              {post.comments.length}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostElement;
