import React, { useState } from "react";
import axios from "axios";
import currencies from "./codes";


class HotelSearch {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/";
    this.headers = {
      "X-RapidAPI-Key": this.apiKey,
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    };
  }

  async searchDestination(query) {
    try {
      const response = await axios.get(this.baseUrl + "searchLocation", {
        params: { query },
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async searchHotel(
    geoId,
    checkIn,
    checkOut,
    adults,
    rooms,
    priceMin,
    priceMax,
    currencyCode
  ) {
    const options = {
      method: "GET",
      url: "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels",
      params: {
        geoId,
        checkIn,
        checkOut,
        adults,
        rooms,
        priceMin,
        priceMax,
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

  async searchAndDisplayHotelsInfo(
    location,
    checkIn,
    checkOut,
    adults,
    rooms,
    priceMin,
    priceMax,
    currencyCode
  ) {
    try {
      const response = await this.searchDestination(location);

      if (response.status && response.data.length > 0) {
        const geoId = response.data[0].geoId;
        const hotelResponse = await this.searchHotel(
          geoId,
          checkIn,
          checkOut,
          adults,
          rooms,
          priceMin,
          priceMax,
          currencyCode
        );
        return hotelResponse;
      } else {
        throw new Error("No destination found or invalid response data");
      }
    } catch (error) {
      throw error;
    }
  }
}

const HotelSearchComponent = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("");
  const [rooms, setRooms] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const hotelSearch = new HotelSearch(
        "9dad35ef59mshb8ee0cd46f48a74p1eea52jsnee86a8bb3772"
      );
      const hotelsData = await hotelSearch.searchAndDisplayHotelsInfo(
        location,
        checkIn,
        checkOut,
        adults,
        rooms,
        priceMin,
        priceMax,
        currencyCode
      );
      setHotels(hotelsData.data.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Search Hotels</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Check-in Date:
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </label>
        <label>
          Check-out Date:
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
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
          Rooms:
          <input
            type="number"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          />
        </label>
        <label>
          Min Price:
          <input
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
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
      {hotels.length > 0 && (
        <div>
          <h3>Hotels in {location}</h3>
          <ul>
            {hotels.map((data, index) => (
              <li key={index}>
                <div>Name: {data.title}</div>
                <div>Location: {data.secondaryInfo}</div>
                <div>Rating: {data.bubbleRating.rating}</div>
                <div>Provider: {data.provider}</div>
                <div>Price: {data.priceForDisplay}</div>
                <div>Booking URL: {data.commerceInfo.externalUrl}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HotelSearchComponent;
