import React from "react";

export default function MusicPlayer({ currentSong }) {
  return (
    <div className="music-player row ">
      <div className="detials container  d-flex flex-column justify-content-center">
      <div className="music-player__info">
        <h3 className="music-player__title">{currentSong?.name}</h3>
        <p className="music-player__artist">{currentSong?.artist}</p>
      </div>
      <div className="music-player__image-container rounded-circle d-flex justify-content-center align-items-center">
        {currentSong && (
          <img
          className="music-player-image"
          src={
            currentSong.cover
            ? `https://cms.samespace.com/assets/${currentSong.cover}`
            : ""
          }
          alt={currentSong.name}
          />
        )}
      </div>
        </div>
      <div className="music-player__controls">
        Add your control buttons here (play, pause, etc.)
      </div>
    </div>
  );
}
