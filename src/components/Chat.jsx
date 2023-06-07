import React from 'react'
import add from "../images/add.png"
import cam from "../images/cam.png"
import more from "../images/more.png"
import Messages from "./Messages";
import Input from "./Input";

const Chat = ({ currentUser, data }) => {
  if (!!data) {
    return (
      <div className='chat'>
        <div className="chatinfo">
          <span>{data[1]?.userInfo?.displayName}</span>
          <div className="chaticons">
            <img src={cam} alt="" />
            <img src={add} alt="" />
            <img src={more} alt="" />
          </div>
        </div>
        <Messages currentUser={currentUser} data={data} />
        <Input currentUser={currentUser} data={data} />
      </div>
    )
  }
  else {
    return (
      <div className='chat'>
        <div className='chatSpace'>
          <span>Start conversation with your friend</span>
        </div>
      </div>
    )
  }

}
export default Chat
