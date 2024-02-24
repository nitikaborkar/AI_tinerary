const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Backend logic for hotel search
class HotelSearch {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/';
        this.headers = {
            'X-RapidAPI-Key': this.apiKey,
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        };
    }

    async searchDestination(query) {
        try {
            const response = await axios.get(this.baseUrl + 'searchLocation', {
                params: { query },
                headers: this.headers
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async searchHotel(geoId, checkIn, checkOut, adults, rooms, priceMin, priceMax, currencyCode) {
        const options = {
            method: 'GET',
            url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels',
            params: {
                geoId,
                checkIn,
                checkOut,
                adults,
                rooms,
                priceMin,
                priceMax,
                currencyCode
            },
            headers: this.headers
        };
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async searchAndDisplayHotelsInfo(location, checkIn, checkOut, adults, rooms, priceMin, priceMax, currencyCode) {
        try {
            const response = await this.searchDestination(location);
            if (response.status && response.data.length > 0) {
                const geoId = response.data[0].geoId;
                const hotelResponse = await this.searchHotel(geoId, checkIn, checkOut, adults, rooms, priceMin, priceMax, currencyCode);
                return hotelResponse.data;
            } else {
                throw new Error('No destination found or invalid response data');
            }
        } catch (error) {
            throw error;
        }
    }
}

// Example usage:
const apiKey = '4b9307ee1bmsh438e7fcdf5b1b7ap11a42ejsn47f35e33616b'; // Replace with your actual API key
const hotelSearch = new HotelSearch(apiKey);

app.get('/api/hotels', async (req, res) => {
    const { location, checkIn, checkOut, adults, rooms, priceMin, priceMax, currencyCode } = req.query;
    try {
        const hotelsData = await hotelSearch.searchAndDisplayHotelsInfo(location, checkIn, checkOut, adults, rooms, priceMin, priceMax, currencyCode);
        res.json(hotelsData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
