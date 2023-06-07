import React from 'react'
import { useState } from 'react'
import { db } from "../firebase";
import { collection, query, where, getDocs, setDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';


const Searchbar = ({ currentUser }) => {

  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {

    const q = query(collection(db, "users"), where("displayName", "==", userName));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
  } catch (err) {
       setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {

    const combinedId =
      String(currentUser.uid) + user.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        const path1 = doc(db, "userChats", currentUser.uid);
        await updateDoc(path1, {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
          [combinedId + ".senderId"]: String(currentUser.uid),
          [combinedId + ".receiverId"]: user.uid,
        });

        const path2 = doc(db, "userChats", user.uid);
        await updateDoc(path2, {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: String(currentUser.displayName),
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
          [combinedId + ".senderId"]: String(currentUser.uid),
          [combinedId + ".receiverId"]: user.uid,
        });
      }
    } catch (err) { }

    setUser(null);
    setUserName("");
  };
  return (
    <div className='search'>
      <div className='form'>
        <input typr="text" placeholder='find your friend...' onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)} value={userName} />
      </div>
      {err && <span>User not Found!</span>}
      {user && (<div className="chats" onClick={handleSelect}>
        <div className="userchats">
          <img src={user.photoURL} alt="" />
          <div className="userchatinfo" >
            <span>{user.displayName}</span>
          </div>
        </div>
      </div>
      )}
    </div>


  )
}

export default Searchbar
