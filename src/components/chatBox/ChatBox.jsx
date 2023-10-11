import React, { useEffect, useState } from "react";
import "./ChatBox.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/userReducer/userReducer";
import {
  addMessage,
  getMessages,
} from "../../redux/messageReducer/messageReducer";
import InputEmoji from "react-input-emoji";
import axios from "axios";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const { users } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch();

  // const [message, setMessage] = useState(messages || []);
  const [message, setMessage] = useState(
    Array.isArray(messages) ? messages : []
  );

  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    setMessage(messages);
  }, [messages]);

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    if (chat !== null) dispatch(getUser(userId));
  }, [chat, currentUser]);

  useEffect(() => {
    if (chat !== null) dispatch(getMessages(chat._id));
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    const messageData = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...messageData, receiverId });
    try {
      // dispatch(addMessage(messageData));

      const responce = await axios.post(
        `http://localhost:8080/message`,
        messageData
      );
      console.log("responce", responce.data);
      setMessage((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessage((prevMessages) => [...prevMessages, receivedMessage]);
    }
  }, [receivedMessage]);

  return (
    <div className="ChatBox-container">
      {chat ? (
        <>
          {/* chat-header */}
          <div className="chat-header">
            <div className="follower">
              <div>
                <img
                  src={
                    users?.profilePicture
                      ? process.env.REACT_APP_PUBLIC_FOLDER +
                        users.profilePicture
                      : process.env.REACT_APP_PUBLIC_FOLDER +
                        "defaultProfile.png"
                  }
                  alt="Profile"
                  className="followerImage"
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="name" style={{ fontSize: "0.9rem" }}>
                  <span>
                    {users?.firstname} {users?.lastname}
                  </span>
                </div>
              </div>
            </div>
            <hr
              style={{
                width: "95%",
                border: "0.1px solid #ececec",
                marginTop: "20px",
              }}
            />
          </div>
          {/* chat-body */}
          <div className="chat-body">
            {message?.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.senderId === currentUser ? "message own" : "message"
                }
              >
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
          {/* chat-sender */}
          <div className="chat-sender">
            <InputEmoji value={newMessage} onChange={handleChange} />
            <div className="send-button button" onClick={handleSend}>
              Send
            </div>
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a chat to start a conversation...
        </span>
      )}
    </div>
  );
};

export default ChatBox;
