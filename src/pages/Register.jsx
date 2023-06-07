import React from 'react'
import { auth, db } from "../firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      await updateProfile(res.user, {
        displayName,
      });
      await setDoc(doc(db, "users", res.user.uid), {
        displayName,
        email,
        uid: res.user.uid,
      });
      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/home");

    } catch (err) {
      setErr(true);
    }
  }
  return (
    <div className='ocontainer'>
      <div className='icontainer'>
        <span className='logo'>ChitChat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Display Name' />
          <input type="text" placeholder='E-mail' />
          <input type="text" placeholder='Password' />
          <button>Sign In</button>
          {err && <span>Something went wrong....</span>}
        </form>
        <p>You do have an Account?<Link to="/">Login</Link> </p>
      </div>
    </div>
  )
}

export default Register
