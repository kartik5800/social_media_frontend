import React from "react";
import "./ProfileCard.css";
import { Link } from "react-router-dom";
import { PATH_LANDING_APP } from "../../../routes/path";
import useAuth from "../../../hooks/useAuth";
import { useSelector } from "react-redux";

const ProfileCard = ({ location }) => {
  const { user } = useAuth();
  console.log("user", user);
  console.log("location", location);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { posts } = useSelector((state) => state.postReducer);

  return (
    <div className="ProfileCard">
      <div className="ProfileImage">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "cover.jpg"
          }
          alt="CoverImage"
        />

        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "profile.png"
          }
          alt="ProfileImage"
        />
      </div>

      <div className="ProfileName">
        <span>
          {user?.firstname} {user?.lastname}
        </span>
        <span>{user?.worksAt ? user?.worksAt : "write about your self"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user?.following?.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user?.followers?.length}</span>
            <span>Followers</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts?.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? (
        ""
      ) : (
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
