import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import SongList from "./components/SongList";
import MusicPlayer from "./components/MusicPlayer";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSong,setCurrentSong] = useState(null)
console.log("current songs:", currentSong)
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("https://cms.samespace.com/items/songs");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const songsWithDurations = await Promise.all(
          data.data.map(async (song) => {
            return new Promise((resolve) => {
              const audio = new Audio(song.url);
              audio.addEventListener('loadedmetadata', () => {
                resolve({
                  ...song,
                  duration: audio.duration
                });
              });
            });
          })
        );
        setSongs(songsWithDurations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="row">
      <div className="col-sm-1 col-md-2 p-0">
        <Sidebar />
      </div>
      <div className="col-sm-5 col-md-5 p-0 d-flex align-items-center">
        <SongList songs={songs} loading={loading} setCurrentSong={setCurrentSong} />
      </div>
      <div className="col-sm-5 flex-grow-1 p-0">
        <MusicPlayer currentSong={currentSong} />
      </div>
    </div>
  );
}

export default App;
