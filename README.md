# Music Player UI

A fully responsive music player interface built with React, designed to match the provided Figma design. This project showcases the implementation of a music player UI with features like song search, music controls, background color transitions, and responsive design adjustments.

## Features

- **Responsive Design**: The music player adjusts its layout based on screen size. On smaller screens, the player component becomes the main interface, with a menu button to show the song list.
- **Dynamic Background**: The background gradient color changes according to the cover image of the currently playing song.
- **Interactive UI**: Smooth animations and transitions are implemented for loading the song list, changing background colors, and interacting with music controls.
- **Music Control**: Includes play/pause, next, previous, and seeker controls.
- **Persistent Playback**: Music continues playing even if the user switches to another tab.
- **Search Functionality**: Users can search for songs by title or artist.
- **Tab Navigation**: Easily switch between "For You" and "Top Tracks" tabs.

## Technologies Used

- **React JS**: A JavaScript library for building user interfaces.
- **Bootstrap**: For styling and layout.
- **CSS**: Custom styles for animations and transitions.
- **REST API**: Fetches song data from a provided API.
  
## Deployement:
This project is deployed on netlify. Here's the deployed link: https://mayank-spotify.netlify.app/
## API
The project uses the following API to fetch song data:

Endpoint: https://cms.********.com/items/songs
Images: Fetch images based on the "cover" key from the API, e.g., https://cms.******.com/assets/{COVER_IMAGE_ID}.

## How to Use
- **Search**: Use the search bar to find songs by title or artist.
- **Music Controls**: Play, pause, skip to the next or previous song, and control the music via the seeker.
- **Tab Navigation**: Switch between "For You" and "Top Tracks" tabs using the navigation bar.
