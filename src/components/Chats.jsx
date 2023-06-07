import React from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import user from "../images/user.png"

const Chats = ({ currentUser,getData }) => {

  const [chats, setChats] = useState([]);
  useEffect(() => {
      const getChats = () => {
      const path1 = doc(db, "userChats", currentUser.uid);
      const unsub = onSnapshot(path1, (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  console.log(Object.entries(chats));
  return (
    <div className="chats">
      { Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div className="userchats" key={chat[0]} onClick={ ()=>{return((getData(chat)))}}  >
        <img src={chat[1].userInfo.photoURL ? chat[1].userInfo.photoURL : user } alt="" />
        <div className="userchatinfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
      ))}
    </div>
  )

}

export default Chats;
