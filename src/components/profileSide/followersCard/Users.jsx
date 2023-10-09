import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import {
  followUser,
  unFollowUser,
} from "../../../redux/userReducer/userReducer";
import { Link } from "react-router-dom";
import { PATH_LANDING_APP } from "../../../routes/path";

const Users = ({ person }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user, updateUserInAuth } = useAuth();
  const dispatch = useDispatch();

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );

  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    updateUserInAuth({
      ...user,
      following: following
        ? [...user.following.filter((personId) => personId !== person._id)]
        : [...user.following, person._id],
    });
    setFollowing((prev) => !prev);
  };

  return (
    <div className="follower">
      <div>
        <img
          src={
            person.coverPicture
              ? serverPublic + person.profilePicture
              : serverPublic + "profile.png"
          }
          alt=""
          className="followerImage"
        />

        <div className="name">
          <Link to={`${PATH_LANDING_APP.profile}/${person?._id}`}>
            {" "}
            <span>{person.firstname}</span>
          </Link>

          {/* <Link
            to={`${PATH_LANDING_APP.profile}/${user?._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link> */}

          <span>{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default Users;
