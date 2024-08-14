import React, { useRef, useState, useEffect } from "react";
import SongList from './SongList';

export default function MusicPlayer({ songsList,songs,setSongs,currentSong,setCurrentSong }) {
  console.log(songsList)
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong?.url || "";
      audioRef.current.load();
      console.log("isplaying value:", isPlaying);
      console.log("currrent play executed");
      audioRef.current.play()
      .then(()=>{setIsPlaying(true); setIsMuted(false)})
      .catch((err) => {
        console.log("error occured:", err);
      });
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      }
    };

    audioRef.current.addEventListener("timeupdate", updateProgress);

    return () => {
      audioRef.current?.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const previousSong = () => {
    if(currentSong){

      if(currentSong.seq === 0){
        setCurrentSong(currentSong)
      }else{
        const previousSong = songsList.find((song)=>song.seq === currentSong.seq -1)
        setCurrentSong(previousSong)
      }
    }
  };
  const nextSong =()=>{
    if(currentSong.seq >= songsList.length-1){
      setCurrentSong(currentSong)
    }else{
      const nextSong = songsList.find((song)=>song.seq === currentSong.seq + 1)
      setCurrentSong(nextSong)
    }
  }

  const handleProgressChange = (event) => {
    const newTime = (event.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        // Stop playback if already playing
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Resume or start playback
        setIsPlaying(true);
        audioRef.current.play();
      }
    }
  };
  useEffect(() => {
    console.log("isplaying value", isPlaying);
  }, [isPlaying]);
  return (
    <div className="music-player row">
      <div className="details p-0 container d-flex flex-column justify-content-center">
        <div className="music-player__info">
          <p className="music-player__title plr-3 fs-2 fw-bold m-0">{currentSong?currentSong.name:"Enjoy the music"}</p>
          <p className="music-player__artist plr-3 artist-faded fs-6">{currentSong? currentSong.artist:"Mayank Keshari"}</p>
        </div>
        <div className="music-player__image-container rounded-circle d-flex justify-content-center align-items-center">
          {currentSong ?(
            <img
              className="music-player-image"
              src={
                currentSong.cover
                  ? `https://cms.samespace.com/assets/${currentSong.cover}`
                  : ""
              }
              alt={currentSong.name}
            />
          )
        :
        <img className="music-player-image" src="images/defaultImage.jpeg" alt="select song to play music" />
        }
        </div>
      </div>
      <div className="player-toggles">

      {currentSong && (
        <div className="music-player-progress">
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleProgressChange}
            className="progress-bar"
            />
        </div>
      )}
      {currentSong && (
        <div className="music-player-controls d-flex align-items-center justify-content-between">
          <button className="musicplayer-icon bg-player offcanvas-trigger"
          type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            <span>...</span>
          </button>
          <div className="d-flex justify-content-center">
              <i
                onClick={previousSong}
                className={`fa fa-backward internal-icon  musicplayer-icon ${currentSong.seq === 0? "faded":""} mx-3`}
                aria-hidden="true"
              ></i>
          
            {isPlaying ? (
              <i
              className="fa fa-pause-circle  internal-icon musicplayer-icon mx-3 fs-1"
              onClick={togglePlayback}
              aria-hidden="true"
              ></i>
            ) : (
              <i
              className="fa fa-play-circle  internal-icon musicplayer-icon mx-3 fs-1"
              onClick={togglePlayback}
              aria-hidden="true"
              ></i>
            )}
              <i
                onClick={nextSong}
                className={`fa fa-forward  internal-icon musicplayer-icon ${currentSong.seq >= (songsList.length - 1 )?"faded":""} mx-3`}
                aria-hidden="true"
              ></i>
          </div>
          {isMuted ? (
            <i
              onClick={toggleMute}
              className="fa fa-volume-off musicplayer-icon bg-player"
              aria-hidden="true"
            >
              <i class="fa fa-times fs-6 text-danger" aria-hidden="true"></i>
            </i>
          ) : (
            <i
              onClick={toggleMute}
              className="fa fa-volume-up musicplayer-icon bg-player"
            ></i>
          )}
        </div>
      )}
      </div>
      <audio ref={audioRef} />
    </div>
  );
}
