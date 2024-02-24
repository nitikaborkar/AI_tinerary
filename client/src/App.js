import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Note 'Routes' instead of 'Switch'
import Navbar from "./Navbar"; // Correct the import if the file name is different
import EventSearchPage from "./EventFinder";
import HotelSearchComponent from "./hotel_finder";
import Itinerary from "./itinerary";
import FlightSearchComponent from "./flights";
import CurrencyConverter from "./currency";
import RestaurantSearchComponent from "./restaurant";
import HomePage from './HomePage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            {" "}
            {/* Updated from 'Switch' to 'Routes' */}
            <Route exact path="/" element={<HomePage />}/>
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/events" element={<EventSearchPage />} />
            <Route path="/flights" element={<FlightSearchComponent />} />
            <Route path="/hotels" element={<HotelSearchComponent />} />
            <Route path="/currency converter" element={<CurrencyConverter />} />
            <Route
              path="/restaurants"
              element={<RestaurantSearchComponent />}
            />
            {/* You can add more <Route> components here for additional pages */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
