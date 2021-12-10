import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

// import { comment, deletePost, likeComment, likePost, deleteComment } from "../../../redux/actions/post";

import { Link } from "react-router-dom";
import {commentPost, likePost} from "../redux/actions/postActions";

const Post = ({post}) => {
  const [showText, setShowText] = useState(false);
  const [text, setText] = useState("");
  const {userInfo : user, loading, error} = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(likePost(post._id));
  };
  const handleDelete = () => {
    // dispatch(deletePost(post._id));
    console.log("sadsdsd")
      
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleComment = () => {
    dispatch(commentPost(post._id, text))
    setText("");
  };
  return (
    <>
      <div className="card offset-md-2  my-2  ">
        <div
          className="modal fade "
          id={`header${post._id}`}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ cursor: "pointer" }}
          >
            <div className="modal-content text-center w-75">
              {post.user._id === user._id ? (
                <>
                  <div
                    className="my-2 text-danger"
                    data-bs-dismiss="modal"
                    onClick={handleDelete}
                  >
                    Delete post
                  </div>
                  <hr />
                  <div className="my-2 ">Edit post</div>
                  <hr />
                </>
              ) : (
                <>
                   <Link to={`/profile/${post.user._id}`} > <div className="my-2"  data-bs-dismiss="modal">Open Profile</div></Link>
                  <hr />
                </>
              )}
              <div className="my-2" data-bs-dismiss="modal" data-bs-toggle="modal"
                data-bs-target={`#body${post._id}`}>Open post</div>
              <hr />
              <div className="my-2" data-bs-dismiss="modal">
                Close
              </div>
            </div>
          </div>
        </div>
       
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
                    <div className="col-md-8"  >
                      <img
                        src={post.image}
                        className="card-img img-fluid"
                        alt="..."
                        style={{ height: "35rem", overflow: "hidden", display: "block", objectFit : "cover" , borderRadius: "0%"  }}
                      />
                    </div>
                    <div className="col-md-4 d-flex flex-column justify-content-between"  >
                      <div className="">
                        <section className = "py-3 border-bottom d-flex justify-content-between">
                          <section>
                          <img style = {{borderRadius : "50%", objectFit : "cover"}} src={post.user.profileImage} width = "30rem" height = "30rem" alt="" />
                          <h6 className = "mx-3 d-inline">{post.user.username}</h6>
                          </section>
                          <p className = "fs-5 px-2"  data-bs-dismiss="modal"><i class="fas fa-times"></i></p>
                        </section>
                        <div className="commentsection">
                          {post.text && <div className="py-2">
                      {post.text}
                          </div>}
                          {post.comments.map(comment =>
                            <div className="py-3 d-flex justify-content-between" key={comment._id}>
                              <section>
                              <img src={comment.profileImage} style = {{borderRadius : "50%" , objectFit : "cover"}} height = "30rem"  width = "30rem" alt="" />
                                  <b className="mx-2">{comment.username}</b>
                                {comment.text}
                                <section className = "text-muted ">
                                <small ><small>{moment(comment.date).fromNow(true)}</small></small>
                                <small className = "mx-2"><small>{comment.likes.length} Likes</small></small>
                                {user.username === comment.username && <small style = {{ cursor: "pointer"}}><small  >Delete</small></small> }
                                </section>
                              </section>
                              <section className="px-2"  >{!comment.likes.find(like => like._id === user._id) ? <i className="far fa-heart"  style={{ cursor: "pointer" }} ></i>: <i className="fas fa-heart"style = {{color : "#fb3958",  cursor: "pointer"}}></i>}</section>
                            </div>)}
                      </div>
                      </div>
                      <div className="border-top pt-1">
                      <section>
                      <div className="d-flex justify-content-between">
                        <p className="card-text fs-5 pb-1">
                          {!post.likes.find(like => like.user === user._id) ? <i
                            className="far fa-heart disabled"
                            style={{ cursor: "pointer" }}
                          ></i> : <i
                          className="fas fa-heart disabled"
                          style={{ cursor: "pointer", color: "#fb3958" }}
                        ></i>}
                          <i className="far fa-comment mx-3" style={{ cursor: "pointer" }}></i>
                          <i className="far fa-paper-plane" style={{ cursor: "pointer" }}></i>
                        </p>
                        <p className="card-text fs-5 px-2">
                          <i className="far fa-bookmark" style={{ cursor: "pointer" }}></i>
                        </p>
                      </div>
                      <small className="py-1">
                      <b>{post.likes.length}</b> likes
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
                          disabled
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
        <section className="card-title mt-2 d-flex align-items-center justify-content-between ">
          <div className=" d-flex align-items-center">
            <Link
              to={
                post.user._id === user._id
                  ? "/profile"
                  : `/profile/${post.user._id}`
              }
              className="mx-1"
            >
              <img
                src={post.user.profileImage}
                alt=""
                width="30rem"
                height="30rem"
                className="postImage"
                style={{ borderRadius: "50%", margin: "0px 8px", objectFit : "cover" }}
              />
            </Link>
            <div className="d-flex flex-column">
              <Link
                to={
                  `/profile/${post.user._id}`
                }
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>{post.user.username}</h6>
              </Link>
              <small className="text-muted">{post?.location}</small>
            </div>
          </div>
          <i
            className="fas fa-ellipsis-h mx-3"
            style={{ cursor: "pointer" }}
            data-bs-toggle="modal"
            data-bs-target={`#header${post._id}`}
          ></i>
        </section>
        <img
          className="card-img-top postImage"
          alt = "post"
          src={post.image}
          style={{ maxHeight: "30rem", overflow: "hidden", display: "block", objectFit : "contain" }}
        />
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <p className="card-text fs-5">
                {!post.likes.find(like => like.user === user._id) ? <i
                  className="far fa-heart"
                  onClick={handleLike}
                  style={{ cursor: "pointer" }}
                ></i> : <i
                className="fas fa-heart like"
                onClick={handleLike}
                style={{ cursor: "pointer", color: "#fb3958" }}
              ></i>}          
              <i className="far fa-comment mx-3" style={{ cursor: "pointer" }}></i>
              <i className="far fa-paper-plane" style={{ cursor: "pointer" }}></i>
            </p>
            <p className="card-text fs-5">
              <i className="far fa-bookmark" style={{ cursor: "pointer" }}></i>
            </p>
          </div>
          <p className="mt-1">
            <b>{post.likes.length}</b> likes
          </p>
          <div>
            <b>{post.user.username}</b>{" "}
            <small>
              {showText
                ? post.text
                : post?.text?.length > 50
                ? post.text.slice(0, 50)
                              : post.text
                          }
              {!showText && post.text.length > 50 && (
                <small
                  className="text-muted d-block"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowText(true)}
                >
                  ...Read more
                </small>
              )}
            </small>
          </div>
          <small className="text-muted">
              <p
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target={`#body${post._id}`}
              >
                View Comments
              </p>
            
          </small>
          <small>
            <small className="text-muted d-block">
              {moment(post.date).fromNow()}
            </small>
          </small>
        </div>
        <section className="border-top">
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
    </>
  );
};

export default Post;
