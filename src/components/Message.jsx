import React from 'react'

const Message = ({ currentUser, message, data }) => {
console.log(data[1].userInfo.photoURL)
  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className='messageinfo'>
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data[1].userInfo.photoURL} alt="" />
      </div>
      <div className="messagecontent">
        <p>{message.text}</p>
        {message.image && <img src={message.image} alt="" />}
      </div>
    </div>
  )
}

export default Message
