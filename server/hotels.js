const axios = require('axios');

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
            return response.data; // Return the data directly
        } catch (error) {
            throw error; // Rethrow the error for the caller to handle
        }
    }

    async searchAndDisplayHotelsInfo(location, checkIn, checkOut, adults, rooms, priceMin, priceMax, currencyCode) {
        try {
            const response = await this.searchDestination(location);
    
            if (response.status && response.data.length > 0) {
                const geoId = response.data[0].geoId;
                console.log('--------------------------------------------------------');
                const hotelResponse = await this.searchHotel(geoId, checkIn, checkOut, adults, rooms, priceMin, priceMax, currencyCode);
                if (hotelResponse) {
                    hotelResponse.data.data.forEach((data, index) => {
                        console.log(`Hotel ${index + 1}:`);
                        console.log(`Name: ${data.title}`);
                        console.log(`Location: ${data.secondaryInfo}`);
                        console.log(`Rating: ${data.bubbleRating.rating}`);
                        console.log(`Provider: ${data.provider}`);
                        console.log(`Price: ${data.priceForDisplay}`);
                        console.log(`Booking URL: ${data.commerceInfo.externalUrl}`);
                        console.log('---------------------');
                    });
                } else {
                    console.error('No hotels found or invalid response data');
                }
            } else {
                console.error('No destination found or invalid response data');
            }
        } catch (error) {
            console.error(error);
        }
    }
}
// Example usage:
const apiKey = '680597d649msh6ce713b39494317p102b14jsnd80d4502cb84'; // Replace with your actual API key
const hotelSearch = new HotelSearch(apiKey);

(async () => {
    try {
        await hotelSearch.searchAndDisplayHotelsInfo('Mumbai',  '2024-02-26', '2024-02-28', '1', '1', '1000', '50000','INR');
    } catch (error) {
        console.error(error);
    }
})();
