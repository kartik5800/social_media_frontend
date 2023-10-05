import React from "react";
import { Modal } from "react-bootstrap";
import PostShare from "../../postSide/PostShare/PostShare";
import "./ShareModal.css";

const ShareModal = ({ modalOpened, handleClose }) => {
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
            <Modal.Title>Share</Modal.Title>
          </Modal.Header>
          <PostShare />
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
