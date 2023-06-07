import React, { useEffect, useState } from 'react'
import { signOut, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase"
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import user from "../images/user.png"
import opt from "../images/opt.png"

const Navbar = ({ currentUser }) => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");
  const [err, setErr] = useState(false);
  const [updateImg, setUpdateImg] = useState("");
  const [toggle, setToggle] = useState(true);

  useEffect(() => {

    const uploadImg = () => {

      const storageRef = ref(storage, currentUser.displayName);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (err) => {
          // Handle unsuccessful uploads
          console.log(err)
        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL, "dwn")
            setUpdateImg(downloadURL)

            try {

              console.log("inside try block")
              //Update profile
              await updateProfile(currentUser, {
                photoURL: downloadURL,
              });
              await updateDoc(doc(db, "users", currentUser.uid), {
                photoURL: downloadURL,
              });
              alert("Image Uploaded Successfully :)")
            } catch (err) {
              console.log(err);
              setErr(true);
            }
          });
        }
      );
      setOpen(false);
      setToggle(true)
    };
    img && uploadImg();
  }, [img])


  const viewPhoto = () => {
    setToggle(true)
    navigate("/profile")
  }

  const logOut = () => {
    const logOut = document.getElementsByClassName("signout");
    logOut[0].addEventListener("click", () => {
      signOut(auth).then(() => {
        console.log("user signed out!")
        navigate("/")
        setToggle(true)
      })
        .catch((err) => {
          console.log(err.message)
        });
    })
  }

  return (

    <div className='navbar'>
      <div className="user">
        {currentUser.photoURL || updateImg ?
          <img src={updateImg ? updateImg : currentUser.photoURL} alt="" onClick={viewPhoto} />
          : <img src={user} alt="" onClick={viewPhoto} />}
        <span>{`${currentUser.displayName}`}</span>
        <div className={`dropdownItem ${open ? "active" : "inactive"}`}>
          <ul>
            <input type="file" style={{ display: "none" }} id='file' onChange={(e) => setImg(e.target.files[0])} />
            <label htmlFor="file" >
              <li className='li'>Upload Image</li>
            </label>
            <hr className='hr' />
            <li className='li' onClick={viewPhoto}>View Image</li>
            <hr className='hr' />
            <li className='signout' onClick={logOut}>LogOut</li>
          </ul>
        </div>
        {toggle ?  <img src={opt} alt="" onClick={() => { return (setOpen(!open), setToggle(false)) }} style={{ margin: " 0px 0px 0px 70px" }} /> :
          <button onClick={() => { return (setOpen(!open), setToggle(true)) }} style={{ margin: " 0px 0px 0px 80px" }} > X </button> 
         }
      </div>
    </div>
  )
}
export default Navbar

