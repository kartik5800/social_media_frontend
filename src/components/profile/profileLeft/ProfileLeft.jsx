import React from "react";
import LogoSearch from "../../profileSide/logoSearch/LogoSearch";
import FollowersCard from "../../profileSide/followersCard/FollowersCard";
import InfoCard from "../infoCard/InfoCard";
import "./ProfileLeft.css";

const ProfileLeft = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileLeft;
