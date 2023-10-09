import React, { useState } from "react";
import "./InfoCard.css";
import { AiOutlineEdit } from "react-icons/ai";
import ProfileModal from "../profileModal/ProfileModal";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const InfoCard = ({ userData }) => {
  const params = useParams();
  const { user } = useAuth();
  const profileUserId = params.id;
  // modal
  const [modalOpened, setModalOpened] = useState(false);
  const handleClose = () => setModalOpened(false);
  const handleShow = () => setModalOpened(true);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>

        {user._id === profileUserId ? (
          <div>
            <AiOutlineEdit width="2rem" height="1.2rem" onClick={handleShow} />
            <ProfileModal
              handleClose={handleClose}
              modalOpened={modalOpened}
              data={userData}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>Name :- </b>
        </span>
        <span>{userData.firstname ?? ""}</span>
      </div>

      <div className="info">
        <span>
          <b>Status :- </b>
        </span>
        <span>{userData.relationship ?? ""}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in :- </b>
        </span>
        <span>{userData.livesin ?? ""}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at :- </b>
        </span>
        <span>{userData.worksAt ?? ""}</span>
      </div>
      {user._id === profileUserId ? (
        <button className="button logout-button">Logout</button>
      ) : (
        ""
      )}
    </div>
  );
};

export default InfoCard;
