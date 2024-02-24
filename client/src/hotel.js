import React, { useState } from 'react';
import axios from 'axios';

const HotelSearchForm = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('');
  const [rooms, setRooms] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [currencyCode, setCurrencyCode] = useState('');
  const [hotels, setHotels] = useState([]);

  const apiKey = '4b9307ee1bmsh438e7fcdf5b1b7ap11a42ejsn47f35e33616b';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3000/api/hotels', {
        params: {
          location,
          checkIn,
          checkOut,
          adults,
          rooms,
          priceMin,priceMax,
          currencyCode,
        },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
        },
      });
      setHotels(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>
          Check In:
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </label>
        <label>
          Check Out:
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </label>
        <label>
          Adults:
          <input type="number" value={adults} onChange={(e) => setAdults(e.target.value)} />
        </label>
        <label>
          Rooms:
          <input type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} />
        </label>
        <label>
          Price Min:
          <input type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
        </label>
        <label>
          Price Max:
          <input type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
        </label>
        <label>
          Currency Code:
          <input type="text" value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)} />
        </label>
        <button type="submit">Search Hotels</button>
      </form>
      <div>
        {hotels.map((hotel, index) => (
          <div key={index}>
            <h3>{hotel.title}</h3>
            <p>Location: {hotel.secondaryInfo}</p>
            <p>Rating: {hotel.bubbleRating.rating}</p>
            <p>Provider: {hotel.provider}</p>
            <p>Price: {hotel.priceForDisplay}</p>
            <p>Booking URL: {hotel.commerceInfo.externalUrl}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelSearchForm;
