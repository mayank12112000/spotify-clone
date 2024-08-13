import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SongList from "./components/SongList";
import MusicPlayer from "./components/MusicPlayer";
import "./App.css";
import useDominantColor from "./utils/useDominantColor";

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const coverImageUrl = currentSong ? `https://cms.samespace.com/assets/${currentSong.cover}` : null;
  const dominantColor = useDominantColor(coverImageUrl);
  
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
              audio.addEventListener("loadedmetadata", () => {
                resolve({
                  ...song,
                  duration: audio.duration,
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
    <div className="max-height" style={{ background: `linear-gradient(to right, ${dominantColor}, black)` }}>
      <Navbar />
      <div className="container m-0">

      <div className="row ">
        <div className="col-sm">
          <SongList songs={songs} loading={loading} setCurrentSong={setCurrentSong} />
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
