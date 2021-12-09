import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setAlert} from "../redux/actions/alertAction";
import {login, register} from "../redux/actions/usersAction";
import {  useNavigate } from "react-router";
import Loader from "../components/Loader";

const AuthScreen = () => {
  const [isLogin, setisLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    fullname: "",
  });
  const {email, password, username, fullname} = formData;
  const { loading, userInfo, error } = useSelector((state) => state.userLogin);
  const { loading : registerLoading, userInfo : userRegister, error : registerError } = useSelector((state) => state.userLogin);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!email || !password || password.length < 6) {
        dispatch(setAlert("Please enter correct details", "danger"));
        return;
      }
      dispatch(login(formData))
    }
    else {
      if (!email || !password || !username || !fullname || password.length < 6) {
        dispatch(setAlert("Please enter correct details", "danger"));
        return;
      }
      dispatch(register(formData))
    }
    
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
    if (error) {
      dispatch(setAlert(error, "danger"))
    }
  }, [userInfo, navigate, error]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>{loading && <Loader />}
      <div className="row">
        <div className="col-md-4 mt-5 offset-md-4">
          <div className="card p-5">
            <form>
              <div className="mb-5">
                <span title="Instagram / Mackey Saturday, Public domain, via Wikimedia Commons">
                  <img
                    className  = "img-fluid"
                    alt="Instagram logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/256px-Instagram_logo.svg.png"
                  />
                </span>
              </div>
              <div className=" my-2">
                <input
                  type="email"
                  name="email"
                  className="form-control bg-light"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              {!isLogin && (
                <>
                  {" "}
                  <div className=" my-2">
                    <input
                      type="text"
                      name="username"
                      className="form-control bg-light"
                      required
                      placeholder="Username"
                      value={username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className=" my-2">
                    <input
                      type="text"
                      name="fullname"
                      className="form-control bg-light"
                      placeholder="Fullname"
                      required
                      value={fullname}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div className=" my-1">
                <input
                  type="password"
                  name="password"
                  className="form-control bg-light"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={handleChange}
                />
              </div>
            </form>
            <button
              className="btn btn-primary mt-3 btn-block"
              onClick={handleSubmit}
            >
              {isLogin ? "Sign in" : "Register"}
            </button>
          </div>
          <div className="card mt-3 text-center px-5 py-3">
            {isLogin ? (
              <>
                Don't have an account?
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setisLogin(!isLogin)}
                >
                  Sign Up
                </span>{" "}
              </>
            ) : (
              <>
                Already have an account?
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setisLogin(!isLogin)}
                >
                  Sign In
                </span>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthScreen;
