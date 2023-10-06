import React, { useEffect } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../../redux/postReducer/postReducer";
import useAuth from "../../../hooks/useAuth";

const Posts = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.postReducer);

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

  return (
    <div className="Posts">
      {posts.length === 0 ? (
        <p>No Posts</p>
      ) : (
        posts.map((post, id) => {
          return <Post data={post} key={id} />;
        })
      )}
    </div>
  );
};

export default Posts;
