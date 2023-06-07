import { onSnapshot } from 'firebase/firestore';
import React from 'react'
import { doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import Message from "./Message";

const Messages = ({currentUser,data}) => {
  const[messages, setMessages] = useState([]);
  var comId = data[0]

  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats", comId),(doc)=>{doc.exists() && setMessages(doc.data().messages) })
    return()=>{
      unSub();
    }
  },[(comId)])
  
  return (
    <div className='messages'>
    {messages.map((m)=>{return<Message message={m} key={m.id} currentUser={currentUser} data={data}/>})}
    </div>
  )
}

export default Messages
