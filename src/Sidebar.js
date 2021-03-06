import React,{useState,useEffect} from "react"
import './Sidebar.css'
import {Avatar, IconButton} from "@material-ui/core"
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import SearchOutLined from "@material-ui/icons/SearchOutlined"

import SidebarChat from './SidebarChat'
import db from "./firebase";

function Sidebar(){
  const [rooms, setRooms] = useState([])
  useEffect(()=>{
    db.collection("rooms").onSnapshot(snapshot =>{
      setRooms(snapshot.docs.map(doc=> (
        {
          id: doc.id,
          data: doc.data(),

        }
      )))
    })
  },[])



  return(
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
            </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      {/* SIdebar Header */}
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutLined />
          <input placeholder="Search or Start new chats" type="text"/>
        </div>
          
        
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat/>
        {rooms.map((room) => <SidebarChat key={room.id} name={room.data.name} id={room.id} />)}
      </div>
    </div>
  )
}

export default Sidebar