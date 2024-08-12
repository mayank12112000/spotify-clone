import React from 'react'

export default function Navbar() {
 
  return (
    <div className="d-flex contianer align-items-center">
      <div className="mx-5 icon d-flex align-items-center">
      <i className="spotify-icon fa fa-spotify" aria-hidden="true"></i> 
      <h1 className="p-1 fs-3">Spotify</h1>
      </div>
      <div className="pages">
      <div className="my-3 mx-0 btn-container container">
        <button className='mx-1 fs-4'> For You </button>
        <button className='mx-3 fs-4'> Top Tracks </button> <br />
        </div>
      </div>
  </div>
  )
}
