import React, { useState } from "react";
import axios from "axios";
import currencies from "./codes";

class FlightSearch {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://tripadvisor16.p.rapidapi.com/api/v1/flights/";
    this.headers = {
      "X-RapidAPI-Key": this.apiKey,
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    };
  }

  async searchDestination(query) {
    try {
      const response = await axios.get(this.baseUrl + "searchAirport", {
        params: { query },
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async searchFlights(
    fromId,
    toId,
    departDate,
    returnDate,
    adults,
    cabinClass,
    itineraryType,
    currencyCode
  ) {
    const options = {
      method: "GET",
      url: "https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights",
      params: {
        sourceAirportCode: fromId,
        destinationAirportCode: toId,
        date: departDate,
        itineraryType,
        sortOrder: "PRICE",
        numAdults: adults,
        numSeniors: "0",
        classOfService: cabinClass,
        returnDate,
        pageNumber: "1",
        currencyCode,
      },
      headers: this.headers,
    };

    try {
      const response = await axios.request(options);
      return response.data; // Return the data directly
    } catch (error) {
      throw error; // Rethrow the error for the caller to handle
    }
  }

  async searchAndDisplayFlightsInfo(
    query1,
    query2,
    departDate,
    returnDate,
    adults,
    cabinClass,
    itineraryType,
    currencyCode
  ) {
    try {
      const response = await this.searchDestination(query1);
      const response2 = await this.searchDestination(query2);
      if (
        response.status &&
        response.data.length > 0 &&
        response2.status &&
        response2.data.length > 0
      ) {
        const fromId = response.data[0].airportCode;
        const toId = response2.data[0].airportCode;

        const flightsResponse = await this.searchFlights(
          fromId,
          toId,
          departDate,
          returnDate,
          adults,
          cabinClass,
          itineraryType,
          currencyCode
        );
        return flightsResponse;
      } else {
        throw new Error("No destination found or invalid response data");
      }
    } catch (error) {
      throw error;
    }
  }
}

const FlightSearchComponent = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState("");
  const [cabinClass, setCabinClass] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itineraryType, setItineraryType] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    try {
      const flightSearch = new FlightSearch(
        "bf0339b17fmsh4a17a88b1f35b45p18161cjsn35c3b3c9ad73"
      );
      const flightsData = await flightSearch.searchAndDisplayFlightsInfo(
        fromLocation,
        toLocation,
        departDate,
        returnDate,
        adults,
        cabinClass,
        itineraryType,
        currencyCode
      );
      setFlights(flightsData.data.flights);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <h2>Search Flights</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <label>
          From:
          <input
            type="text"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
          />
        </label>
        <label>
          To:
          <input
            type="text"
value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
          />
        </label>
        <label>
          Departure Date:
          <input
            type="date"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
          />
        </label>
        <label>
          Return Date:
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </label>
        <label>
          Adults:
          <input
            type="number"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
          />
        </label>
        <label>
          ItineraryType:
          <select
            value={itineraryType}
            onChange={(e) => setItineraryType(e.target.value)}
          >
            <option value="ONE_WAY">One Way</option>
            <option value="ROUND_TRIP">Round Trip</option>
          </select>
        </label>
        <label>
          Cabin Class:
          <select
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
          >
            <option value="ECONOMY">Economy</option>
            <option value="PREMIUM_ECONOMY">Premium Economy</option>
            <option value="BUSSINESS">Business</option>
            <option value="FIRST">First</option>
          </select>
        </label>
        <label>
          Currency Code:
          <select
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {flights.length > 0 && (
        <div>
          <h3>Flights</h3>
          <ul>
            {flights.map((flight, index) => (
              <li key={index}>
                <div>Flight Option {index + 1}</div>
                <div>Provider: {flight.purchaseLinks[0].providerId}</div>
                <div>
                  Total Price: {flight.purchaseLinks[0].totalPrice}
                  {flight.purchaseLinks[0].currency}
                </div>
                <div>
                  Departure: {flight.segments[0].legs[0].departureDateTime}
                </div>
                <div>Arrival: {flight.segments[0].legs[0].arrivalDateTime}</div>
                <div>URL: {flight.purchaseLinks[0].url}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlightSearchComponent;
