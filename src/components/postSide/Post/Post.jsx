import React, { useState } from "react";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import "./Post.css";
import useAuth from "../../../hooks/useAuth";
import { likePost } from "../../../redux/postReducer/postReducer";
import { useDispatch } from "react-redux";

const Post = ({ data }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(data.likes?.includes(user._id) ?? false);
  const [likes, setLikes] = useState(data.likes?.length ?? 0);

  const handleLike = () => {
    dispatch(likePost(data._id, user._id));
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  return (
    <div className="Post">
      <img
        src={
          data?.image ? process.env.REACT_APP_PUBLIC_FOLDER + data?.image : ""
        }
        alt=""
      />

      <div className="postReact">
        <div style={{ cursor: "pointer" }} onClick={handleLike}>
          {liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
        </div>
        <AiOutlineComment />
        <PiShareFat />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      <div className="detail">
        <span>
          <b>{data?.name}</b>
        </span>
        <span> {data?.desc}</span>
      </div>
    </div>
  );
};

export default Post;
