import React from 'react'

export default function Sidebar() {
 
  return (
  <nav className="m-3 p-3 sidebar d-none d-md-block">
  <nav className="nav flex-column h-100">
    <div className="d-flex align-items-center">
      <i className="spotify-icon fa fa-spotify" aria-hidden="true"></i> 
      <span className="p-1">Spotify</span>
    </div>
    <div className="mt-auto">
      <img className="profile-photo" src="images/mayank.png" alt="Profile" />
    </div>
  </nav>
</nav>
  )
}
