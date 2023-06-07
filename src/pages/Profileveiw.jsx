import React from 'react'
import { useNavigate } from 'react-router-dom';
import user from "../images/user.png"

const Profileveiw = ({ currentUser }) => {

    const navigate = useNavigate();

    return (
        <div className="profile">
            <div className="profileInfo">
                <h2>{currentUser.displayName}</h2>
                <button onClick={() => { navigate("/home") }}>X </button>
            </div>
            <p>Profile Photo</p>
            <img src={currentUser.photoURL ? currentUser.photoURL : user} alt="" />
        </div>
    )
}

export default Profileveiw
