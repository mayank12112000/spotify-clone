import React, { useState } from "react";

export default function Offcanvas({setCurrentSong,setSongsList,setCurrentPage,currentSong,songsToShow,currentPage}) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredSongs = songsToShow?.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSongClick = (song) => {
    setSongsList(songsToShow)
    setCurrentSong(song);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div
      style={{
        background: `linear-gradient(to left, ${currentSong ? currentSong?.accent : "black"}, #5d5f60)`,
        color: "white",
      }}
      className="offcanvas offcanvas-start whole-offcanvas"
      data-bs-scroll="true"
      tabIndex="-1"
      id="offcanvasWithBothOptions"
      aria-labelledby="offcanvasWithBothOptionsLabel"
    >
      <div className="offcanvas-header">
        <div onClick={() => setCurrentPage("for-you")} className={`mx-1 offcanvas-trigger fw-bold fs-4 
        ${currentPage === "for-you" ? "" : "route-faded" }`}>For You{" "}
        </div>
        <div onClick={() => setCurrentPage("top-tracks")} className={`mx-3 offcanvas-trigger fw-bold fs-4 
          ${currentPage === "top-tracks" ? "" : "route-faded" }`}>Top Tracks{" "}
        </div>
        <i
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          className="fa fa-times offcanvas-close"
          aria-hidden="true"
        ></i>
      </div>
      <div className="offcanvas-body small">
        <div className="search-box">
          <input
            onChange={handleSearchChange}
            type="text"
            placeholder="Search Song, Artist"
          />
          <i className="search-icon fa fa-search" aria-hidden="true"></i>
        </div>

        <div className="my-3 song-list d-md-block">
          <div className="h-100 justify-content-center align-items-center">
            <div className="w-100">
              {filteredSongs &&
                filteredSongs.map((song) => (
                  <div onClick={() => handleSongClick(song)} key={song.id} 
                  className={`song-box mb-2 d-flex align-items-center ${currentSong && song.id === currentSong.id? "selected": ""}`}>
                    <div>
                      <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} className="img-fluid songlist-images"/>
                    </div>
                    <div className="container">
                      <p className="fs-5 m-0">{song.name}</p>
                      <p className="artist-name artist-faded fs-6 m-0">
                        <small>{song.artist}</small>
                      </p>
                    </div>
                    <p className="song-duration">{`${Math.floor(
                      song.duration / 60
                    )}:${Math.floor(song.duration % 60)}`}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
