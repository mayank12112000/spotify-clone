import React, { useEffect, useState } from 'react';

const SongList = ({ currentPage, setCurrentSong }) => {
  const [songs, setSongs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [songsList, setSongsList] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        console.error(err.message); // Changed from setError to console.error for simplicity
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    if (currentPage === "top-tracks") {
      setSongsList(songs.filter((song) => song.top_track === true));
    } else {
      setSongsList(songs);
    }
  }, [songs, currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSongs = songsList?.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className='song-list-container container'>
      <div className="row m-3 songlist-row">
        <div className="search-box">
          <input
            onChange={handleSearchChange}
            type="text"
            placeholder='Search Song, Artist'
          />
          <i className="search-icon fa fa-search" aria-hidden="true"></i>
        </div>

        <div className="my-3 song-list d-md-block">
          <div className="h-100 justify-content-center align-items-center">
            <div className="w-100">
              {filteredSongs && filteredSongs.map((song) => (
                <div
                  onClick={() => setCurrentSong(song)}
                  key={song.id}
                  className="song-box mb-3 d-flex align-items-center"
                >
                  <div>
                    <img
                      src={`https://cms.samespace.com/assets/${song.cover}`}
                      alt={song.name}
                      className="img-fluid songlist-images"
                    />
                  </div>
                  <div className='container'>
                    <p className='fs-5 m-0'>{song.name}</p>
                    <p className='artist-name fs-6 m-0'><small>{song.artist}</small></p>
                  </div>
                  <p>{`${Math.floor(song.duration / 60)}:${Math.floor(song.duration % 60)}`}</p>
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
