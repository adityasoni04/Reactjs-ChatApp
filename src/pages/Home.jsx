import React, { useState } from 'react'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'
const Home = ({ currentUser }) => {
  const [data, setData] = useState();
  const getData = (data) => {
    setData(data)
  }
  return (
    <div className='home'>
      <span className='logo'>ChitChat</span>
      <div className='container'>
        <Sidebar currentUser={currentUser} getData={getData} />
        <Chat currentUser={currentUser} data={data} />
      </div>
    </div>
  )
}

export default Home
