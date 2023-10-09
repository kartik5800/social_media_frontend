import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../../redux/postReducer/postReducer";
import { updateUser } from "../../../redux/userReducer/userReducer";

const ProfileModal = ({ modalOpened, handleClose, data }) => {
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();

  const { user, updateUserInAuth } = useAuth();
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
              <h3>Your Info</h3>
              <div>
                <input
                  value={formData.firstname}
                  onChange={handleChange}
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  className="infoInput"
                />
                <input
                  value={formData.lastname}
                  onChange={handleChange}
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  className="infoInput"
                />
              </div>

              <div>
                <input
                  value={formData.worksAt}
                  onChange={handleChange}
                  type="text"
                  placeholder="Works at"
                  name="worksAt"
                  className="infoInput"
                />
              </div>

              <div>
                <input
                  value={formData.livesin}
                  onChange={handleChange}
                  type="text"
                  placeholder="Lives in"
                  name="livesin"
                  className="infoInput"
                />
                <input
                  value={formData.country}
                  onChange={handleChange}
                  type="text"
                  placeholder="Country"
                  name="country"
                  className="infoInput"
                />
              </div>

              <div>
                <input
                  value={formData.relationship}
                  onChange={handleChange}
                  type="text"
                  className="infoInput"
                  placeholder="Relationship status"
                  name="relationship"
                />
              </div>

              <div>
                Profile image
                <input
                  type="file"
                  name="profileImage"
                  onChange={onImageChange}
                />
                Cover image
                <input type="file" name="coverImage" onChange={onImageChange} />
              </div>

              <button className="button infoButton" type="submit">
                Update
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button" onClick={handleClose}>
              Update
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default ProfileModal;
