import React from "react";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import "./Post.css";

const Post = ({ data }) => {
  return (
    <div className="Post">
      <img src={data.img} alt="" />

      <div className="postReact">
        {data.liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
        <AiOutlineComment />
        <PiShareFat />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {data.likes} likes
      </span>

      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
