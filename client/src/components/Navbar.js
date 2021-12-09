import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/usersAction";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white static-top border-bottom">
        <div className="container w-50">
          <Link className="navbar-brand " to="/">
            <img
              className="img-fluid"
              width= "140rem"
              alt="Instagram logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/256px-Instagram_logo.svg.png"
            />
          </Link>
          <div className = "navbar-hide">
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item fs-4 mx-1">
                <Link className="nav-link active" aria-current="page" to="/">
                  <i className="fas fa-home"></i>
                </Link>
              </li>
              <li className="nav-item fs-4 mx-1">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/auth"
                >
                  <i className="far fa-comment-dots"></i>
                </Link>
              </li>
              <li className="nav-item fs-4 mx-1">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/create"
                >
                  <i className="far fa-plus-square"></i>
                </Link>
              </li>
              <li className="nav-item fs-4 mx-1">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/explore"
                >
                  <i className="far fa-compass"></i>
                </Link>
              </li>
              <li className="nav-item fs-4 mx-1">
                <Link className="nav-link active" aria-current="page" to="/">
                  <i className="far fa-heart"></i>
                </Link>
              </li>

              <li className="nav-item dropdown fs-4 mx-1">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="far fa-user"></i>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile/me">
                      profile
                    </Link>
                  </li>
                  <li></li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={() => dispatch(logout())}
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
