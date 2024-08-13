import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SongList from "./components/SongList";
import MusicPlayer from "./components/MusicPlayer";
import "./App.css";
import useDominantColor from "./utils/useDominantColor";

function App() {
  const [error, setError] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const coverImageUrl = currentSong ? `https://cms.samespace.com/assets/${currentSong.cover}` : null;
  const dominantColor = useDominantColor(coverImageUrl);
  const [currentPage,setCurrentPage] = useState("for-you")

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-height" style={{ background: `linear-gradient(to right, ${dominantColor}, black)` }}>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <div className="container m-0">

      <div className="row">
        <div className="col-sm">
          <SongList  currentPage={currentPage} setCurrentSong={setCurrentSong} />
        </div>
        <div className="col-sm d-flex justify-content-center p-0">
          <MusicPlayer currentSong={currentSong} />
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
