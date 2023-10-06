import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { AiOutlineEdit } from "react-icons/ai";
import ProfileModal from "../profileModal/ProfileModal";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { getUser } from "../../../redux/userReducer/userReducer";
import { useDispatch, useSelector } from "react-redux";

const InfoCard = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.userReducer);
  const { user } = useAuth();
  const profileUserId = params.id;

  const [profileUser, setProfileUser] = useState({});
  console.log("profileUser", profileUser);
  // modal
  const [modalOpened, setModalOpened] = useState(false);
  const handleClose = () => setModalOpened(false);
  const handleShow = () => setModalOpened(true);

  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        if (profileUserId === user._id) {
          setProfileUser(user);
        } else {
          const responseData = await dispatch(getUser(profileUserId));
          setProfileUser(responseData);
        }
      } catch (error) {
        console.error("Error fetching profile user:", error);
      }
    };
    fetchProfileUser();
  }, [profileUserId, user._id, dispatch, getUser]);

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
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>Status :- </b>
        </span>
        <span>{profileUser.relationship ?? ""}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in :- </b>
        </span>
        <span>{profileUser.livesIn ?? ""}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at :- </b>
        </span>
        <span>{profileUser.worksAt ?? ""}</span>
      </div>

      <button className="button logout-button">Logout</button>
    </div>
  );
};

export default InfoCard;
