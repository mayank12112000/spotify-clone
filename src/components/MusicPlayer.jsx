import React, { useRef, useState, useEffect } from "react";

export default function MusicPlayer({ currentSong }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong?.url || "";
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted; // Mute or unmute audio based on isMuted
    }
  }, [isMuted]);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="music-player row">
      <div className="details container d-flex flex-column justify-content-center">
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
      <div className="music-player__controls d-flex align-items-center justify-content-between">
        <button className="musicplayer-icon bg-player">
          <span>...</span>
        </button>
        <div className="d-flex justify-content-center">
          <big>
            <i className="fa fa-backward musicplayer-icon faded mx-3" aria-hidden="true"></i>
          </big>
          {isPlaying ? (
            <i
              className="fa fa-pause-circle musicplayer-icon mx-3 fs-1"
              onClick={stopPlayback}
              aria-hidden="true"
            ></i>
          ) : (
            <i
              className="fa fa-play-circle musicplayer-icon mx-3 fs-1"
              onClick={togglePlayback}
              aria-hidden="true"
            ></i>
          )}
          <big>
            <i className="fa fa-forward musicplayer-icon faded mx-3" aria-hidden="true"></i>
          </big>
        </div>
        {isMuted ? (
          <i
            onClick={toggleMute}
            className="fa fa-volume-off musicplayer-icon bg-player"
            aria-hidden="true"
          ></i>
        ) : (
          <i
            onClick={toggleMute}
            className="fa fa-volume-up musicplayer-icon bg-player"
          ></i>
        )}
      </div>
      <audio ref={audioRef} />
    </div>
  );
}
