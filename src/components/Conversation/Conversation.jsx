import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/userReducer/userReducer";
import axios from "axios";

const Conversation = ({ data, currentUser, online }) => {
  let { users, isLoading } = useSelector((state) => state.userReducer);

  // const [userData, setUserData] = useState(null);
  // console.log("users", users);

  const dispatch = useDispatch();
  // console.log("data from conversion page", data);
  console.log("currentUser", currentUser);

  useEffect(async () => {
    const userId = data.members.find((id) => id !== currentUser);
    console.log("userId", userId);
    dispatch(getUser(userId));
    // try {
    //   const { data } = await axios.get(`http://localhost:8080/user/${userId}`);
    //   console.log(data);
    //   setUserData(data);
    // } catch (error) {}
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={
              users?.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER + users.profilePicture
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />

          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {users?.firstname} {users?.lastname}
            </span>
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;

// in this conversion section when i call api from redux toolkit its not working crectly and whrn call api from this page its working currectly
