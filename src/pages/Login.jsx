import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase"
import hide from "../images/hide.png"
import showpswd from "../images/showpswd.png"

const Login = () => {

  const [value, setValue] = useState({ email: "", pass: "" });
  const [err, setErr] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, value.email, value.pass);
      navigate("/home");
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };

  return (
    <div className='ocontainer'>
      <div className='icontainer'>
        <span className='logo'>ChitChat</span>
        <span className='title'>LogIn</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='E-mail' onChange={(event) => setValue((prev) => ({ ...prev, email: event.target.value }))} />
          <div className='password'>
            <input type={show ? "text" : "password"} placeholder='Password' onChange={(event) => setValue((prev) => ({ ...prev, pass: event.target.value }))} />
            {show ? <img src={showpswd} alt="" onClick={() => setShow(false)} />
              : <img src={hide} alt="" onClick={() => setShow(true)} />}
          </div>
          <button >Log In</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an Account?<Link to="/register"> Register</Link></p>
      </div>
    </div>
  )
}

export default Login
