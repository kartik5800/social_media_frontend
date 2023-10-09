import React, { useEffect, useState } from "react";
import ProfileLeft from "../../components/profile/profileLeft/ProfileLeft";
import ProfileCard from "../../components/profileSide/profileCard/ProfileCard";
import PostSide from "../../components/postSide/PostSide";
import RightSide from "../../components/rightSide/RightSide";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { getUser } from "../../redux/userReducer/userReducer";

const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const profileUserId = params.id;

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        if (profileUserId === user._id) {
          setUserData(user);
        } else {
          const responseData = await dispatch(getUser(profileUserId));
          setUserData(responseData);
        }
      } catch (error) {
        console.error("Error fetching profile user:", error);
      }
    };
    fetchProfileUser();
  }, [profileUserId, user, dispatch, getUser]);

  return (
    <div className="Profile">
      <ProfileLeft userData={userData} />
      <div className="Profile-center">
        <ProfileCard location="profilePage" userData={userData} />
        <PostSide />
      </div>
      <RightSide />
    </div>
  );
};

export default Profile;
