import React, { useEffect } from "react";
import "./FollowersCard.css";

import { getAllUser } from "../../../redux/userReducer/userReducer";
import { useDispatch, useSelector } from "react-redux";
import Users from "./Users";
import useAuth from "../../../hooks/useAuth";

const FollowersCard = () => {
  const { allusers, isLoading } = useSelector((state) => state.userReducer);
  const { user } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  return (
    <div className="FollowersCard">
      <h3>Friends List</h3>

      {allusers.map((person, id) => {
        if (person._id !== user._id) return <Users person={person} key={id} />;
      })}
    </div>
  );
};

export default FollowersCard;
