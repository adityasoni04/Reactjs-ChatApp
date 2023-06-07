import './App.css';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import "./style.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profileveiw from './pages/Profileveiw';

function App() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const userAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        console.log(currentUser);

      }
      else {
        setCurrentUser("");

      }
    });
    return () => {
      userAuth();
    };
  }, [currentUser])



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route path="home" element={<Home currentUser={currentUser} />} />
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='profile' element={<Profileveiw currentUser={currentUser}  />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
