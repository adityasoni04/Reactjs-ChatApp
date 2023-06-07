import React from 'react'
import { arrayUnion, updateDoc, doc, Timestamp } from 'firebase/firestore'
import { db, storage } from "../firebase"
import { useState } from 'react'
import attach from "../images/attach.png"
import Img from "../images/Img.png"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
const Input = ({ currentUser, data }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
 
  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());
console.log(data)
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        (err) => {
          // setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", String(data[0])), {
              messages: arrayUnion({
                id: uuid(),
                text,
                image: downloadURL,
                senderId: currentUser.uid,
                date: Timestamp.now(),
              }),
            })
          });
        }
      );
      setImage(null)
    }
    else {
      await updateDoc(doc(db, "chats", String(data[0])), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      })
      setText("")
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data[0] + ".lastMessage"]: {
        text,
      }
    })
    await updateDoc(doc(db, "userChats", data[1].receiverId), {
      [data[0] + ".lastMessage"]: {
        text,
      }
    })
    setText("")
    setImage(null)
  }
  return (
    <div className="input">
      <input type="text" placeholder='type something.....' onChange={e => setText(e.target.value)} value={text} />
      <div className="send">
        <img src={attach} alt="" />
        <input type="file" style={{ display: "none" }} id="sendimg" onChange={e => setImage(e.target.files[0])} />
        <label htmlFor="sendimg">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>send</button>
      </div>
    </div>
  )
}

export default Input
