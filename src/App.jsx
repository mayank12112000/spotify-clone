import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SongList from "./components/SongList";
import MusicPlayer from "./components/MusicPlayer";
import "./App.css";
import Offcanvas from "./components/Offcanvas";

function App() {
  
  const [currentSong, setCurrentSong] = useState(null);
  const coverImageUrl = currentSong ? `https://cms.samespace.com/assets/${currentSong.cover}` : null;
  const [currentPage,setCurrentPage] = useState("for-you")
  const [songs, setSongs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [songsToShow,setSongsToShow] = useState(null)
  const [songsList, setSongsList] = useState(null);

  useEffect(()=>{
    setSongsToShow(songsList)
  },[songsList])
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("https://cms.samespace.com/items/songs");
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const songsWithDurations = await Promise.all(
          data.data.map(async (song,idx) => {
            return new Promise((resolve) => {
              const audio = new Audio(song.url);
              audio.addEventListener("loadedmetadata", () => {
                resolve({
                  ...song,
                  duration: audio.duration,seq:idx
                });
              });
            });
          })
        );
        setSongs(songsWithDurations);
      } catch (err) {
        console.error(err.message); // Changed from setError to console.error for simplicity
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);
  useEffect(() => {
    if (currentPage === "top-tracks") {
      setSongsToShow(songs?.filter((song) => song.top_track === true).map((song,idx)=>({...song,seq:idx})));
    } else {
      setSongsToShow(songs?.map((song,idx)=>({...song,seq:idx})));
    }
  }, [songs,currentPage]);


  return (
    <div className="max-height" style={{ background: `linear-gradient(to right, ${currentSong ? currentSong?.accent : "black"}, black)` }}>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <div className="container m-0">

      <div className="row">
        <div className="col-sm songlist-col">
          <SongList loading={loading} setSongsList={setSongsList} currentPage={currentPage} songsToShow={songsToShow} songsList={songsList} currentSong={currentSong} setCurrentSong={setCurrentSong} />
        </div>
        <div  className="col-sm d-flex min-h-90 justify-content-center p-0">
          <MusicPlayer songsList={songsList} currentSong={currentSong} setCurrentSong={setCurrentSong} />
        </div>
      </div>
      </div>
      <div style={{ background: `linear-gradient(to left, ${currentSong ? currentSong?.accent : "black"}, black)` }} className="fs-2 offcanvas-trigger offcanvas-footer" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
        <span>Click to open tracks →</span>
      </div>
      <Offcanvas setSongsList={setSongsList} songsToShow={songsToShow} setCurrentPage={setCurrentPage} currentPage={currentPage} setCurrentSong={setCurrentSong} currentSong={currentSong} songsList={songsList} />
    </div>

  );
}

export default App;
