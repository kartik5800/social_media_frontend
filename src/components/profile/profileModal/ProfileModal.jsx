import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../../redux/postReducer/postReducer";
import { updateUser } from "../../../redux/userReducer/userReducer";
import "./profileModal.css";
import { GrFormClose } from "react-icons/gr";

const ProfileModal = ({ modalOpened, handleClose, Data }) => {
  const [formData, setFormData] = useState(Data);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();

  const { user, updateUserInAuth } = useAuth();

  useEffect(() => {
    setFormData(Data);
  }, [modalOpened, Data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        await dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        await dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }

    await dispatch(updateUser(params.id, UserData));
    updateUserInAuth({ ...user, ...UserData });
    handleClose();
  };

  return (
    <>
      <Modal
        show={modalOpened}
        onHide={handleClose}
        animation={false}
        size="lg"
      >
        <div style={{ backgroundColor: "#f0ede4" }}>
          <Modal.Header closeButton>
            <Modal.Title>Your info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="infoForm" onSubmit={handleSubmit}>
              <div>
                <input
                  value={formData?.firstname ?? ""}
                  onChange={handleChange}
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  className="infoInput"
                />
                <input
                  value={formData?.lastname ?? ""}
                  onChange={handleChange}
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  className="infoInput"
                />
              </div>

              <div>
                <input
                  value={formData?.worksAt ?? ""}
                  onChange={handleChange}
                  type="text"
                  placeholder="Works at"
                  name="worksAt"
                  className="infoInput"
                />
              </div>

              <div>
                <input
                  value={formData?.livesin ?? ""}
                  onChange={handleChange}
                  type="text"
                  placeholder="Lives in"
                  name="livesin"
                  className="infoInput"
                />
                <input
                  value={formData?.country ?? ""}
                  onChange={handleChange}
                  type="text"
                  placeholder="Country"
                  name="country"
                  className="infoInput"
                />
              </div>

              <div>
                <input
                  value={formData?.relationship ?? ""}
                  onChange={handleChange}
                  type="text"
                  className="infoInput"
                  placeholder="Relationship status"
                  name="relationship"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                  <label htmlFor="profileImage" className="custom-file-upload">
                    Profile image
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    onChange={onImageChange}
                    style={{ display: "none" }}
                  />

                  {!profileImage ? (
                    <div className="image-container">
                      <img
                        src={
                          Data?.profilePicture
                            ? process.env.REACT_APP_PUBLIC_FOLDER +
                              Data?.profilePicture
                            : ""
                        }
                        alt=""
                        className="profile-image"
                      />
                    </div>
                  ) : (
                    <div className="image-container">
                      <GrFormClose onClick={() => setProfileImage(null)} />
                      <img
                        src={URL.createObjectURL(profileImage)}
                        alt=""
                        width="60px"
                        className="profile-image"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="coverImage" className="custom-file-upload">
                    Cover image
                  </label>
                  <input
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    onChange={onImageChange}
                    style={{ display: "none" }}
                  />

                  {!coverImage ? (
                    <div className="image-container">
                      <img
                        src={
                          Data?.coverPicture
                            ? process.env.REACT_APP_PUBLIC_FOLDER +
                              Data?.coverPicture
                            : ""
                        }
                        alt=""
                        className="profile-image"
                      />
                    </div>
                  ) : (
                    <div className="image-container">
                      <GrFormClose onClick={() => setCoverImage(null)} />
                      <img
                        src={URL.createObjectURL(coverImage)}
                        alt=""
                        width="60px"
                        className="profile-image"
                      />
                    </div>
                  )}
                </div>
              </div>

              <button className="button infoButton" type="submit">
                Update
              </button>
            </form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default ProfileModal;
