import React from 'react';
import bg from './background.mp4';
import './HomePage.css'; // Import CSS file for styling

const HomePage = () => {
  return (
    <div className="home-page">
      <video src={bg} autoPlay loop muted className="video-background" />
    </div>
  );
}

export default HomePage;
