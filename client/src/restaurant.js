import React, { useState } from "react";
import axios from "axios";

class RestaurantSearch {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/";
    this.headers = {
      "X-RapidAPI-Key": this.apiKey,
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    };
  }

  async searchLocation(query) {
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

  async searchRestaurants(locationId) {
    try {
      const response = await axios.get(this.baseUrl + "searchRestaurants", {
        params: { locationId },
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async searchAndDisplayRestaurantsInfo(locationQuery) {
    try {
      const locationResponse = await this.searchLocation(locationQuery);
      if (locationResponse.status === true && locationResponse.data.length > 0) {
        const locationId = locationResponse.data[0].locationId;
        const restaurantResponse = await this.searchRestaurants(locationId);
        return restaurantResponse.data.data;
      } else {
        throw new Error("No restaurants found for the given location.");
      }
    } catch (error) {
      throw error;
    }
  }
}

const RestaurantSearchComponent = () => {
  const [locationQuery, setLocationQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const restaurantSearch = new RestaurantSearch(
        "Your_Key"
      );
      const restaurantsData = await restaurantSearch.searchAndDisplayRestaurantsInfo(
        locationQuery
      );
      setRestaurants(restaurantsData);
    } catch (error) {
      setError("Error fetching restaurants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <h2>Search Restaurants</h2>
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
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
          />
        </label>
        <button type="submit" disabled={!locationQuery}>
          Search
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {restaurants.length > 0 && (
        <div>
          <h3>Restaurants in {locationQuery}</h3>
          <ul className="no-bullets">
            {restaurants.map((restaurant, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <div className="answer-box">
                <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{index + 1}.</span>
                  <div>Name: {restaurant.name}</div>
                  <div>Rating: {restaurant.averageRating}</div>
                  <div>Review Count: {restaurant.userReviewCount}</div>
                  <div>Price: {restaurant.priceTag}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RestaurantSearchComponent;
