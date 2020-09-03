import React, { useState, useEffect } from "react";

import "./Chat.scss";
import { Avatar, IconButton } from "@material-ui/core";

import firebase from "firebase";

import AttachFile from "@material-ui/icons/AttachFile";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../StateProvider";

const Chat = (props) => {
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("you types >>>", input);
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <div className="chat__bodyHeader">
          <Avatar
            src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}
          />
          <h2>Welcome to #{roomName}!</h2>
          <h3>This is the start of the #{roomName}.</h3>
        </div>

        {messages.map((message) => (
          <div
            className={`chat__message ${
              message.name === user.displayName && "chat__receiver"
            }`}
          >
            <Avatar className="chat__avatar">{message.name[0]}</Avatar>
            <div className="chat__messageContainer">
              <span className="chat__name">{message.name}</span>
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toLocaleString("en-US", {
                  timeZone: "UTC",
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </span>
              <div className="chat__messageBody">{message.message}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="chat__footer">
        <form>
          <ControlPointIcon />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
          <InsertEmoticonIcon />
        </form>
      </div>
    </div>
  );
};

Chat.propTypes = {};

export default Chat;
