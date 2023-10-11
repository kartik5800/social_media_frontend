import "./Chat.css";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoSearch from "../../components/profileSide/logoSearch/LogoSearch";
import useAuth from "../../hooks/useAuth";
import { userChats } from "../../redux/chatReducer/chatReducer";
import Conversation from "../../components/Conversation/Conversation";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { PATH_LANDING_APP } from "../../routes/path";
import { BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import ChatBox from "../../components/chatBox/ChatBox";
import { io } from "socket.io-client";

const Chat = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const socket = useRef();
  let { chat, isLoading } = useSelector((state) => state.chatReducer);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  // console.log("chat from chat page", chat);

  // Get the chat in chat section
  useEffect(() => {
    dispatch(userChats(user._id));
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("http://localhost:9090");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chat.map((chat, index) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
                key={index}
              >
                <Conversation
                  data={chat}
                  currentUser={user?._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="navIcons" style={{ fontSize: "25px" }}>
            <Link
              to={PATH_LANDING_APP.root}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <AiFillHome />
            </Link>
            <AiFillSetting />
            <IoIosNotifications />

            <Link
              to={PATH_LANDING_APP.chat}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <BiCommentDetail />
            </Link>
          </div>
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
