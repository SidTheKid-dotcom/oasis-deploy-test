import React, { useState, useEffect } from 'react';

const Banner = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        setFade(true);
      }, 350);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [banners.length]);

  const currentBanner = banners[currentIndex];

  return (
    <div className="w-full relative">
      {currentBanner?.link ? (
        <a href={currentBanner.link} target="_blank" rel="noopener noreferrer">
          <img
            src={currentBanner.image}
            alt="Google Banner"
            className={`w-full h-auto transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}
          />
        </a>
      ) : (
        <img
          src={currentBanner?.image}
          alt="Google Banner"
          className={`w-full h-auto transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};

export default Banner;
