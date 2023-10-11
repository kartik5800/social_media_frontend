import React, { useState } from "react";
import "./RightSide.css";
import { BiCommentDetail } from "react-icons/bi";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import TrendCard from "./trendCard/TrendCard";
import ShareModal from "./shareModal/ShareModal";
import { Link } from "react-router-dom";
import { PATH_LANDING_APP } from "../../routes/path";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const handleClose = () => setModalOpened(false);
  const handleShow = () => setModalOpened(true);
  return (
    <div className="RightSide">
      <div className="navIcons" style={{ fontSize: "25px" }}>
        <Link
          to={PATH_LANDING_APP.root}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <AiFillHome />
        </Link>
        <AiFillSetting />
        <IoIosNotifications />

        <Link
          to={PATH_LANDING_APP.chat}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <BiCommentDetail />
        </Link>
      </div>

      <TrendCard />

      <button className="button r-button" onClick={handleShow}>
        Share
      </button>
      <ShareModal handleClose={handleClose} modalOpened={modalOpened} />
    </div>
  );
};

export default RightSide;
