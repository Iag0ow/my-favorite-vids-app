import React from 'react'
import "./Navbar.css";
const Navbar = () => {
  return (
      <nav className='mb-5'>
          <h5 className="my-favorite-videos-title">My Favorite<span> Videos</span></h5>
          <ul>
              <li><a href="#">Geral</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">TikTok</a></li>
          </ul>
          <div className="search ms-auto me-5 pe-5">
            <input type="text" placeholder="Pesquisar"></input>
          </div>
      </nav>
  )
}

export default Navbar