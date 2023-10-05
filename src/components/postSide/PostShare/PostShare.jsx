import React, { useRef, useState } from "react";
import "./PostShare.css";
import img3 from "../../../img/img3.jpeg";
import { BiPhotoAlbum } from "react-icons/bi";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BiSolidLocationPlus } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { GrFormClose } from "react-icons/gr";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  return (
    <div className="PostShare">
      <img src={img3} alt="" />
      <div>
        <input type="text" placeholder="What's happening" />
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
          <button className="button ps-button">Share</button>
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
            <img src={image.image} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
