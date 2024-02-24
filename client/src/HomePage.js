import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import bg from './background.mp4';
import './HomePage.css'; // Import CSS file for styling

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar /> {/* Include the Navbar component */}
      <video src={bg} autoPlay loop muted className="video-background" />
    </div>
  );
}

export default HomePage;
