import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <div class="footer fixed-bottom bg-white py-1 footer">
      <div className="row text-center">
        <Link to = "/" className="col-4"><i class="fas fa-home"></i></Link>
        <Link to = "/create" className="col-4"><i class="fas fa-plus-square"></i></Link>
        <Link to = "/profile/me" className="col-4"><i class="far fa-user-circle"></i></Link>
      </div>
    </div>
  );
};

export default Footer;
