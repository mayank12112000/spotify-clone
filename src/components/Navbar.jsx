import React from 'react'

export default function Navbar({setCurrentPage,currentPage}) {
 
  return (
    <div className="d-flex align-items-center">
      <div className="mx-5 icon d-flex align-items-center" onClick={()=>setCurrentPage("for-you")}
      type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
      <i  className="spotify-icon-box spotify-icon d-flex align-items-center fa fa-spotify offcanvas-trigger" aria-hidden="true">
      <span className="p-1 fs-3">Spotify<sup className='superscript faded'><i className="superscript faded fa fa-copyright" aria-hidden="true"></i></sup></span>
        </i> 
      </div>
      <div className="pages">
      <div className="my-3 mx-0 btn-container container">
        <button onClick={()=>setCurrentPage("for-you")} className={`mx-3 offcanvas-trigger fw-bold fs-4 ${currentPage==="for-you"?"":"route-faded"}` }
         type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"> For You </button>
        <button onClick={()=>setCurrentPage("top-tracks")} className={`mx-1 offcanvas-trigger fw-bold fs-4 ${currentPage==="top-tracks"?"":"route-faded"}`}
        type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
           Top Tracks </button> <br />
        </div>
      </div>
  </div>
  )
}
