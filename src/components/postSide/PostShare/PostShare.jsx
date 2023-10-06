import React, { useRef, useState } from "react";
import "./PostShare.css";
import img3 from "../../../img/img3.jpeg";
import { BiPhotoAlbum } from "react-icons/bi";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BiSolidLocationPlus } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { GrFormClose } from "react-icons/gr";
import useAuth from "../../../hooks/useAuth";
import {
  uploadImage,
  uploadPost,
} from "../../../redux/postReducer/postReducer";
import { useDispatch } from "react-redux";

const PostShare = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState("");
  const imageRef = useRef();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc,
    };

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost));
    resetShare();
  };

  const resetShare = () => {
    setImage(null);
    setDesc("");
  };

  return (
    <div className="PostShare">
      <img src={img3} alt="" />
      <div>
        <input
          type="text"
          placeholder="What's happening"
          name="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <BiPhotoAlbum className="icons" />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <AiOutlinePlayCircle />
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            <BiSolidLocationPlus />
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <SlCalender />
            Shedule
          </div>
          <button className="button ps-button" onClick={handleUpload}>
            Share
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <GrFormClose onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
