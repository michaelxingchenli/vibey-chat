import React, { useState, useEffect } from "react";
import db from "../firebase";
import "./Sidebar.scss";

import SidebarChat from "./SidebarChat";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";

import { useStateValue } from "../StateProvider";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>

      <div className="sidebar__footer">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__footerRight">
          <IconButton>
            <MicIcon />
          </IconButton>
          <IconButton>
            <HeadsetIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
