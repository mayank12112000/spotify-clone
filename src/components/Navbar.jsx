import React from 'react'

export default function Navbar({setCurrentPage,currentPage}) {
 
  return (
    <div className="d-flex align-items-center">
      <div className="mx-5 icon d-flex align-items-center">
      <i className="spotify-icon fa fa-spotify" aria-hidden="true"></i> 
      <h1 className="p-1 fs-3">Spotify</h1>
      </div>
      <div className="pages">
      <div className="my-3 mx-0 btn-container container">
        <button onClick={()=>setCurrentPage("for-you")} className={`mx-1 fw-bold fs-4 ${currentPage==="for-you"?"":"faded"}`}> For You </button>
        <button onClick={()=>setCurrentPage("top-tracks")} className={`mx-3 fw-bold fs-4 ${currentPage==="top-tracks"?"":"faded"}`}> Top Tracks </button> <br />
        </div>
      </div>
  </div>
  )
}
