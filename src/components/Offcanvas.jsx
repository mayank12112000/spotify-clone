import React, { useState } from 'react'

export default function Offcanvas({ setCurrentSong, songs, currentSong , songsList,currentPage,dominantColor}) {
    const [selectedSongId, setSelectedSongId] = useState(null); // State to track the selected song
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredSongs = songsList?.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSongClick = (song) => {
    setCurrentSong(song);
    setSelectedSongId(song.id); // Set the selected song ID
  };
console.log("offcanvas filtered songs",filteredSongs)
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    
<div style={{ background: `linear-gradient(to left, ${dominantColor}, #5d5f60)`,color:"white" }} className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasBottomLabel">{currentPage==="for-you"?"For You":"Top Tracks"}</h5>
        <button  type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><i class="fa fa-times fs-1 offcanvas-close" aria-hidden="true"></i></button>
    </div>
    <div className="offcanvas-body small">
        <div className="search-box">
          <input
            onChange={handleSearchChange}
            type="text"
            placeholder='Search Song, Artist'
          />
          <i className="search-icon fa fa-search" aria-hidden="true"></i>
        </div>

        <div className="my-3 song-list d-md-block">
          <div className="h-100 justify-content-center align-items-center">
            <div className="w-100">
              {filteredSongs && filteredSongs.map((song) => (
                <div
                  onClick={() => handleSongClick(song)}
                  key={song.id}
                  className={`song-box mb-2 d-flex align-items-center ${
                    currentSong && song.seq === currentSong.seq ? 'selected' : ''
                  }`}
                >
                  <div>
                    <img
                      src={`https://cms.samespace.com/assets/${song.cover}`}
                      alt={song.name}
                      className="img-fluid songlist-images"
                    />
                  </div>
                  <div className='container'>
                    <p className='fs-5 m-0'>{song.name}</p>
                    <p className='artist-name artist-faded fs-6 m-0'><small>{song.artist}</small></p>
                  </div>
                  <p className='song-duration'>{`${Math.floor(song.duration / 60)}:${Math.floor(song.duration % 60)}`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      
    </div>
    </div>
  )
}
