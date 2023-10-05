import React, { useState } from "react";
import "./InfoCard.css";
import { AiOutlineEdit } from "react-icons/ai";
import ProfileModal from "../profileModal/ProfileModal";

const InfoCard = () => {
  // modal
  const [modalOpened, setModalOpened] = useState(false);
  const handleClose = () => setModalOpened(false);
  const handleShow = () => setModalOpened(true);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        <div>
          <AiOutlineEdit width="2rem" height="1.2rem" onClick={handleShow} />
          <ProfileModal handleClose={handleClose} modalOpened={modalOpened} />
        </div>
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>in Relationship</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>Multan</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>Zainkeepscode inst</span>
      </div>

      <button className="button logout-button">Logout</button>
    </div>
  );
};

export default InfoCard;
