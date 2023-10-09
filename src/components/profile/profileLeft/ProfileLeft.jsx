import React from "react";
import LogoSearch from "../../profileSide/logoSearch/LogoSearch";
import FollowersCard from "../../profileSide/followersCard/FollowersCard";
import InfoCard from "../infoCard/InfoCard";
import "./ProfileLeft.css";

const ProfileLeft = (props) => {
  const { userData } = props;

  return (
    <div className="ProfileSide">
      <LogoSearch />
      <InfoCard userData={userData} />
      <FollowersCard />
    </div>
  );
};

export default ProfileLeft;
