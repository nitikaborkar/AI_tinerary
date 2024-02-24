// App.js
import React from 'react';
import EventsByLocation from './EventFinder'; // Import the FlightSearch component
import HotelSearchForm from './hotel';


function App() {
  return (
      <div className="App">
        <EventsByLocation /> {/* Use the FlightSearch component */}
        <HotelSearchForm/>
      </div>
  );
}

export default App;
