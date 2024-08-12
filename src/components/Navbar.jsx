import React from 'react'

export default function Navbar() {
 
  return (
    <div className="d-flex contianer align-items-center">
      <div className="mx-5 icon d-flex align-items-center">
      <i className="spotify-icon fa fa-spotify" aria-hidden="true"></i> 
      <span className="p-1 fs-4">Spotify</span>
      </div>
      <div className="pages">
      <div className="my-3 mx-0 btn-container container">
        <button className='mx-3 fs-5'> For You </button>
        <button className='ml-3 fs-5'> Top Tracks </button> <br />
        </div>
      </div>
  </div>
  )
}
