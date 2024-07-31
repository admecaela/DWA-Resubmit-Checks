import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

//Homepage component displays a carousel of recommeded shows
const HomePage = () => {
  const [shows, setShows] = useState([]);

//Fetch the list of shows when the component mounts
  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(response => response.json())
      .then(data => setShows(data));
  }, []);

//Slider settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div>
      <h2>Recommended Shows</h2>
      <Slider {...settings}>
        {shows.map(show => (
          <div key={show.id}>
            <img src={show.previewImage} alt={show.title} />
            <h3>{show.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomePage;