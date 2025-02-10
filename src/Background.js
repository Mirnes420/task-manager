import { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_BG_API_KEY;
const STORAGE_KEY = "background_image";

const BackgroundImage = ({ bgImage, setBgImage }) => {
  useEffect(() => {
    if (!bgImage) {
      const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
      const lastUpdated = storedData?.timestamp;
      const now = Date.now();

      // Check if 24 hours have passed (86400000 ms)
      if (!storedData || now - lastUpdated > 86400000) {
        fetchRandomImage();
      } else {
        setBgImage(storedData.url);
      }
    }
  }, [bgImage, setBgImage]);

  const fetchRandomImage = () => {
    const URL =
      "https://api.pexels.com/v1/search?query=nature&per_page=1&page=" +
      Math.floor(Math.random() * 100);

    fetch(URL, {
      headers: { Authorization: API_KEY },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.photos.length > 0) {
          const imageUrl = data.photos[0].src.large;
          setBgImage(imageUrl);
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ url: imageUrl, timestamp: Date.now() })
          );
        }
      })
      .catch((error) => console.error("Error fetching background image:", error));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "fixed", /* Ensures it covers the whole screen */
        width: "100%",
        zIndex: "-1",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default BackgroundImage;
