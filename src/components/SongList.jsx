import React, { useEffect, useState } from 'react';

const SongList = ({loading,setSongsList,songsToShow,setCurrentSong, currentSong }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showTimeoutMessage,setShowTimeoutMessage] = useState(false)
  const filteredSongs = songsToShow?.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // setting the current song while clicking
  const handleSongClick = (song) => {
    setSongsList(songsToShow)
    setCurrentSong(song);
  };
  // handling the search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(()=>{
    const timeout = setTimeout(() => {
      if(loading){
        setShowTimeoutMessage(true)
      }
    }, 1200);
    return ()=>clearTimeout(timeout)
  },[loading])
  return (
    <main className='song-list-container container'>
      <div className="row m-3 songlist-row">
        <div className="search-box">
          <input
            onChange={handleSearchChange}
            type="text"
            placeholder='Search Song, Artist'
            />
          <i className="search-icon fa fa-search" aria-hidden="true"></i>
        </div>
            {
              loading ?<div className="my-2 d-flex flex-column align-items-center justify-content-center">
               <div className="spinner-border text-secondary " role="status">
              {/* <span className="visually-hidden">Loading...</span>  */}
            </div> <br />
            {
              showTimeoutMessage? <div>This is taking longer than expected please wait....</div>:<></>
            }
              </div>:<></>
            }

        <div className="my-3 song-list d-md-block">
          <div className="h-100 justify-content-center align-items-center">
            <div className="w-100">
              {filteredSongs && filteredSongs.map((song) => (
                <div onClick={() => handleSongClick(song)} key={song.id}
                className={`song-box mb-2 d-flex align-items-center ${currentSong && song.id === currentSong.id ? 'selected' : ''}`}>
                  <div>
                    <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} className="img-fluid songlist-images"/>
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
    </main>
  );
};

export default SongList;
