import React, { useEffect, useState } from 'react';

const SongList = ({songs,loading,setCurrentSong}) => {
  
 console.log(songs)
    return (
      <main className='song-list container'>
      <div className="row m-3 songlist-row">
        <div className="search-box">
        <input type="text" placeholder='Search Song, Artist' />
        <i className="search-icon fa fa-search" aria-hidden="true"></i>
        </div>
  
        <div className="my-3 song-list d-md-block">
          <div className=" h-100 justify-content-center align-items-center">
            <div className="w-100">
              {songs && songs.map((song) => (
                <div onClick={()=>setCurrentSong(song)} key={song.id} className="song-box mb-3 d-flex align-items-center">
                  <div>
                  <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} className="img-fluid songlist-images" />
                  </div>
                  <div className='container'>
                  <p className='fs-5 m-0'>{song.name}</p>
                  <p className='artist-name fs-6 m-0'><small>{song.artist}</small></p>
                  </div>
                  <p>{`${Math.floor(song.duration/60)}:${Math.floor(song.duration%60)}`}</p>
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
