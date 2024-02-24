// App.js
import React from 'react';
import EventSearchPage from './EventFinder'; // Import the FlightSearch component
import HotelSearchComponent from './hotel_finder';
import CurrencyConverter from './currency';
import FlightSearchComponent from './flights';
import  RestaurantSearchComponent from './restaurant';
import Itinerary from './itinerary';

function App() {
  return (
      <div className="App">
        <Itinerary/>
        <EventSearchPage /> {/* Use the FlightSearch component */}
        <HotelSearchComponent/>
        <CurrencyConverter />
        <FlightSearchComponent/>
        <RestaurantSearchComponent/>

      </div>
  );
}

export default App;
