import React, { useState } from "react";
import axios from "axios";
const RestaurantSearchComponent = () => {
    // State variables
    const [locationQuery, setLocationQuery] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    // Function to handle search
    const handleSearch = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation', {
          params: { query: locationQuery },
          headers: {
            'X-RapidAPI-Key': '2adddba381msh2b5fe7644dec058p1461dfjsndbe77023b9f3',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
          }
        });
  
        if (response.data.status === true) {
          const locationId = response.data.data[0].locationId;
          const restaurantsResponse = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants', {
            params: { locationId },
            headers: {
              'X-RapidAPI-Key': '4b9307ee1bmsh438e7fcdf5b1b7ap11a42ejsn47f35e33616b',
              'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
            }
          });
          setRestaurants(restaurantsResponse.data.data);
        } else {
          setError('No restaurants found for the given location.');
        }
      } catch (error) {
        setError('Error fetching restaurants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    // JSX for rendering
    return (
      <div className="main-content">
        <h2>Search Restaurants</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <label>
            Location:
            <input type="text" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} />
          </label>
          <button type="submit" disabled={!locationQuery}>Search</button>
        </form>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {restaurants.length > 0 && (
          <div>
            <h3>Restaurants</h3>
            <ul>
              {restaurants.map((restaurant, index) => (
                <li key={index}>
                  <div>Name: {restaurant.name}</div>
                  <div>Rating: {restaurant.averageRating}</div>
                  <div>Review Count: {restaurant.userReviewCount}</div>
                  <div>Price: {restaurant.priceTag}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default RestaurantSearchComponent;
  