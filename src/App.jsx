import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SongList from "./components/SongList";
import MusicPlayer from "./components/MusicPlayer";
import "./App.css";
import useDominantColor from "./utils/useDominantColor";
import Offcanvas from "./components/Offcanvas";

function App() {
  
  const [error, setError] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const coverImageUrl = currentSong ? `https://cms.samespace.com/assets/${currentSong.cover}` : null;
  const dominantColor = useDominantColor(coverImageUrl);
  const [currentPage,setCurrentPage] = useState("for-you")
  const [songs, setSongs] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [songsList, setSongsList] = useState(null);


  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("https://cms.samespace.com/items/songs");
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
  console.log("songs seq:",songsList)
  useEffect(() => {
    if (currentPage === "top-tracks") {
      setSongsList(songs?.filter((song) => song.top_track === true).map((song,idx)=>({...song,seq:idx})));
    } else {
      setSongsList(songs?.map((song,idx)=>({...song,seq:idx})));
    }
  }, [songs, currentPage]);




  return (
    <div className="max-height" style={{ background: `linear-gradient(to right, ${dominantColor}, black)` }}>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <div className="container m-0">

      <div className="row">
        <div className="col-sm">
          <SongList songsList={songsList} songs={songs} setSongs={setSongs}  currentPage={currentPage} currentSong={currentSong} setCurrentSong={setCurrentSong} />
        </div>
        <div className="col-sm d-flex justify-content-center p-0">
          <MusicPlayer songsList={songsList} songs={songs} setSongs={setSongs} currentSong={currentSong} setCurrentSong={setCurrentSong} />
        </div>
      </div>
      </div>
      <div style={{ background: `linear-gradient(to left, ${dominantColor}, black)` }} className="fs-2 offcanvas-trigger offcanvas-footer" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
        <span onClick={()=>setCurrentPage("for-you")}>Tracks for you →</span>
        <span onClick={()=>setCurrentPage("top-tracks")}>Top Tracks→</span>
      </div>
      <Offcanvas dominantColor={dominantColor} currentPage={currentPage} setCurrentSong={setCurrentSong} songs={songs} currentSong={currentSong} songsList={songsList} />
    </div>

  );
}

export default App;
