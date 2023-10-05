import React from "react";
import { Button, Modal } from "react-bootstrap";

const ProfileModal = ({ modalOpened, handleClose }) => {
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
            <form className="infoForm">
              <div style={{ display: "flex", margin: "8px", gap: "1rem" }}>
                <input
                  type="text"
                  className="w-100 p-2 rounded-3"
                  name="FirstName"
                  placeholder="First Name"
                  style={{ outline: "none", border: "none" }}
                />

                <input
                  type="text"
                  className="w-100 p-2 rounded-3"
                  name="LastName"
                  placeholder="Last Name"
                  style={{ outline: "none", border: "none" }}
                />
              </div>

              <div style={{ margin: "8px", gap: "1rem" }}>
                <input
                  type="text"
                  className="w-100 p-2 rounded-3"
                  name="worksAT"
                  placeholder="Works at"
                  style={{ outline: "none", border: "none" }}
                />
              </div>

              <div style={{ display: "flex", margin: "8px", gap: "1rem" }}>
                <input
                  type="text"
                  className="w-100 p-2 rounded-3"
                  name="livesIN"
                  placeholder="LIves in"
                  style={{ outline: "none", border: "none" }}
                />

                <input
                  type="text"
                  className="w-100 p-2 rounded-3"
                  name="Country"
                  placeholder="Country"
                  style={{ outline: "none", border: "none" }}
                />
              </div>

              <div style={{ margin: "8px", gap: "1rem" }}>
                <input
                  type="text"
                  className="w-100 p-2 rounded-3"
                  placeholder="RelationShip Status"
                  style={{ outline: "none", border: "none" }}
                />
              </div>

              <div style={{ display: "flex", margin: "8px", gap: "1rem" }}>
                <div>
                  Profile Image
                  <input type="file" name="profileImg" />
                </div>
                <div>
                  Cover Image
                  <input type="file" name="coverImg" />
                </div>
              </div>

              {/* <button className="button infoButton">Update</button> */}
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
