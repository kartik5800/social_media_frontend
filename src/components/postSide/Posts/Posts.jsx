import React, { useEffect } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../../redux/postReducer/postReducer";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";

const Posts = () => {
  const { user } = useAuth();
  const params = useParams();
  const dispatch = useDispatch();
  let { posts, isLoading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [dispatch]);

  if (isLoading || !Array.isArray(posts)) {
    return (
      <div className="Posts">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!posts) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);

  return (
    <div className="Posts">
      {posts.map((post, id) => {
        return <Post data={post} key={id} />;
      })}
    </div>
  );
};

export default Posts;
