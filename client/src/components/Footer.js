import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <div class="footer fixed-bottom bg-white py-2 footer">
      <div className="row text-center">
        <Link to = "/" className="col-3 "><i class="fas  fs-4 fa-home"></i></Link>
        <Link to = "/explore" className="col-3"><i class="far fs-4 fa-compass"></i></Link>
        <Link to = "/create" className="col-3"><i class="far fs-4 fa-plus-square"></i></Link>
        <Link to = "/profile/me" className="col-3"><i class="far fs-4 fa-user-circle"></i></Link>
      </div>
    </div>
  );
};

export default Footer;
