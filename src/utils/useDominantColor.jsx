// useDominantColor.js
import { useEffect, useState } from 'react';
import ColorThief from 'colorthief';

const useDominantColor = (imageUrl) => {
  const [dominantColor, setDominantColor] = useState('#000000'); // Default color

  useEffect(() => {
    if (!imageUrl) return; // Prevent unnecessary effect calls

    const img = new Image();
    img.crossOrigin = 'Anonymous'; // To allow loading images from other domains
    img.src = imageUrl;
    
    img.onload = () => {
      const colorThief = new ColorThief();
      const dominantColor = colorThief.getColor(img);
      setDominantColor(`rgb(${dominantColor.join(',')})`);
    };

  }, [imageUrl]);

  return dominantColor;
};

export default useDominantColor;
