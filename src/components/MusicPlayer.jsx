import React, { useRef, useState, useEffect } from "react";

export default function MusicPlayer({ currentSong }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  

  useEffect(() => {
    console.log("audioref.current", audioRef.current);
    if (audioRef.current) {
      audioRef.current.src = currentSong?.url || "";
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true)
    }
  }, [currentSong]);

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
        <button className="musicplayer-icon bg-player "><span>...</span></button>
        <div>
          <big>

        <i class="fa fa-backward musicplayer-icon" aria-hidden="true"></i>
          </big>
        {isPlaying ? (
           <big> <i class="fa fa-pause-circle musicplayer-icon mx-3" onClick={stopPlayback} aria-hidden="true"></i></big>
        ) : (
            <big><i class="fa fa-play-circle musicplayer-icon mx-3" onClick={togglePlayback} aria-hidden="true"></i></big>
        )}
        <big><i class="fa fa-forward musicplayer-icon" aria-hidden="true"></i></big>
        </div>
        <i class="fa fa-volume-up musicplayer-icon bg-player" aria-hidden="true"></i>
      </div>
      <audio ref={audioRef} />
    </div>
  );
}
