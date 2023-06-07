import React from 'react'
import Chats from './Chats'
import Navbar from './Navbar'
import Searchbar from './Searchbar'

const Sidebar = ({ currentUser,getData }) => {
  return (
    <div className='sidebar'>
      <Navbar currentUser={currentUser} />
      <Searchbar currentUser={currentUser} />
      <Chats currentUser={currentUser} getData={getData} />
    </div>
  )
}

export default Sidebar
