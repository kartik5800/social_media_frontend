import React from "react";
import "./ProfileCard.css";
import { Link } from "react-router-dom";
import { PATH_LANDING_APP } from "../../../routes/path";
import useAuth from "../../../hooks/useAuth";
import { useSelector } from "react-redux";

const ProfileCard = ({ location, userData }) => {
  const { user } = useAuth();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { posts } = useSelector((state) => state.postReducer);

  const isProfilePage = location === "profilePage";

  const renderProfileInfo = () => {
    const profileData = isProfilePage ? userData : user;
    return (
      <>
        <div className="ProfileName">
          <span>
            {profileData?.firstname} {profileData?.lastname}
          </span>
          <span>
            {profileData?.worksAt
              ? profileData?.worksAt
              : "write about yourself"}
          </span>
        </div>
        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>{profileData?.following?.length}</span>
              <span>Following</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{profileData?.followers?.length}</span>
              <span>Followers</span>
            </div>
            {isProfilePage && (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>
                    {
                      posts?.filter((post) => post.userId === profileData?._id)
                        .length
                    }
                  </span>
                  <span>Posts</span>
                </div>
              </>
            )}
          </div>
          <hr />
        </div>
      </>
    );
  };

  return (
    <div className="ProfileCard">
      <div className="ProfileImage">
        <img
          src={
            isProfilePage
              ? serverPublic + userData?.coverPicture
              : serverPublic + user.coverPicture || "cover.jpg"
          }
          alt="CoverImage"
        />
        <img
          src={
            isProfilePage
              ? serverPublic + userData?.profilePicture
              : serverPublic + user.profilePicture || "profile.png"
          }
          alt="ProfileImage"
        />
      </div>
      {renderProfileInfo()}
      {!isProfilePage && (
        <span>
          <Link
            to={`${PATH_LANDING_APP.profile}/${user?._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
