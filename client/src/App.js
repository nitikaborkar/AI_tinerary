// App.js
import React from 'react';
import EventSearchPage from './EventFinder'; // Import the FlightSearch component
import HotelSearchComponent from './hotel_finder';
import CurrencyConverter from './currency';
import FlightSearchComponent from './flights'

function App() {
  return (
      <div className="App">
        <EventSearchPage /> {/* Use the FlightSearch component */}
        <HotelSearchComponent/>
        <div>
            <h1>My Currency Conversion App</h1>
            <CurrencyConverter />
        </div>
        <FlightSearchComponent/>

      </div>
  );
}

export default App;
